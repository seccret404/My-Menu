import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../../utils/Const";
import { FloatingCheckout } from "./FloatingCheckout";
import { ItemProduct } from "./ItemProduct";
import { Header } from "./Header";
import './home.css';

// Definisikan tipe data untuk produk dan keranjang
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  count?: number; // Bersifat opsional karena tidak semua produk memiliki properti count
}

interface CartItem extends Product {
  count: number; // Count wajib ada untuk item di keranjang
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]); // State produk dengan tipe array Product
  const [cart, setCart] = useState<CartItem[]>([]); // State keranjang dengan tipe array CartItem

  const getCartFromLocalStorage = useCallback(async (): Promise<CartItem[]> => {
    const cart = JSON.parse(localStorage.getItem('cart') || "[]") as CartItem[];
    setCart(cart);
    return cart;
  }, []);

  const getProducts = useCallback(async () => {
    const response = await fetch(`${API_URL}/products`);
    const { data }: { data: Product[] } = await response.json();

    const cart = await getCartFromLocalStorage();
    const productList = data.map((item) => {
      const productItem = cart.find((product) => product.id === item.id);
      if (productItem) {
        return {
          ...item,
          count: productItem.count
        };
      }
      return item;
    });
    setProducts(productList);
  }, [getCartFromLocalStorage]);

  const handleProductChange = async (product: Product, value: number) => {
    let newCart = [...cart];

    if (value === 0) {
      // Hapus produk dari keranjang
      newCart = cart.filter((item) => item.id !== product.id);
    } else {
      const productItem = cart.find((item) => item.id === product.id);
      const findIndex = cart.findIndex((item) => item.id === product.id);

      if (productItem) {
        // Update jumlah produk dalam keranjang
        productItem.count = value;
        newCart[findIndex] = productItem;
      } else if (value > 0) {
        // Tambahkan produk baru ke keranjang
        newCart.push({
          ...product,
          count: value,
        });
      }
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="container">
      <Header />
      <div className="main-content">
        {products.map((product) => (
          <ItemProduct
            key={product.id}
            defaultCount={product.count || 0}
            name={product.name}
            price={product.price}
            image={product.image}
            onProductChange={(value) => handleProductChange(product, value)}
          />
        ))}
      </div>
      {cart.length > 0 && <FloatingCheckout cart={cart} />}
    </div>
  );
}

export default Home;
