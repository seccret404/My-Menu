import { useState } from "react";
import { Button } from "../../components/Buttons/button";
import { Counter } from "../../components/Counter";
import { numberToRupiah } from "../../utils/numberTOrupiah";

// Definisikan tipe untuk properti komponen
interface ItemProductProps {
  name: string;
  price: number;
  image: string;
  onProductChange?: (value: number) => void;
  defaultCount: number;
}

export const ItemProduct: React.FC<ItemProductProps> = ({ 
  name, 
  price, 
  image, 
  onProductChange, 
  defaultCount 
}) => {
  const [count, setCount] = useState<number>(defaultCount);

  const handleCountChange = (value: number) => {
    setCount(value);
    if (onProductChange) onProductChange(value);
  };

  return (
    <div className="item-product">
      <div>
        <img className="image-product" src={image} alt={name} />
        <div className="info-product">
          <p className="name-product">{name}</p>
          <p className="price-product">{numberToRupiah(price)}</p>
        </div>
      </div>
      <div>
        {count > 0 ? (
          <Counter defaultValue={count} onValueChange={handleCountChange} />
        ) : (
          <Button onClick={() => handleCountChange(1)}>Beli</Button>
        )}
      </div>
    </div>
  );
};
