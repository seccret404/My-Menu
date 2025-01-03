export function numberToRupiah(number: number | bigint) {
     const formatter = new Intl.NumberFormat('id-ID', {
         style: 'currency',
         currency: 'IDR',
         minimumFractionDigits: 0
     });
 
     return formatter.format(number);
 }