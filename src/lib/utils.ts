import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function terbilang(nominal: number): string {
  const bilangan = [
    '', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas'
  ];
  let result = '';

  const num = Math.abs(nominal);

  if (num < 12) {
    result = ' ' + bilangan[num];
  } else if (num < 20) {
    result = terbilang(num - 10) + ' Belas';
  } else if (num < 100) {
    result = terbilang(Math.floor(num / 10)) + ' Puluh' + terbilang(num % 10);
  } else if (num < 200) {
    result = ' Seratus' + terbilang(num - 100);
  } else if (num < 1000) {
    result = terbilang(Math.floor(num / 100)) + ' Ratus' + terbilang(num % 100);
  } else if (num < 2000) {
    result = ' Seribu' + terbilang(num - 1000);
  } else if (num < 1000000) {
    result = terbilang(Math.floor(num / 1000)) + ' Ribu' + terbilang(num % 1000);
  } else if (num < 1000000000) {
    result = terbilang(Math.floor(num / 1000000)) + ' Juta' + terbilang(num % 1000000);
  } else if (num < 1000000000000) {
    result = terbilang(Math.floor(num / 1000000000)) + ' Miliar' + terbilang(num % 1000000000);
  } else if (num < 1000000000000000) {
    result = terbilang(Math.floor(num / 1000000000000)) + ' Triliun' + terbilang(num % 1000000000000);
  }

  return result.trim();
}
