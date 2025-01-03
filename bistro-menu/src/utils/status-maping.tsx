export const statusMapping = (status:string) => {
     switch(status) {
         case 'PAYMENT_PENDING':
             return 'Menunggu Pembayaran';
         case 'PAID':
             return 'Pembayaran Berhasil';
         case 'CANCELED':
             return 'Pesanan Dibatalkan';
         default:
             return 'Menunggu Pembayaran';
     }
 };