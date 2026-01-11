import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function formatCurrency(amount) {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
}
function terbilang(nominal) {
  const bilangan = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
    "Sebelas"
  ];
  let result = "";
  const num = Math.abs(nominal);
  if (num < 12) {
    result = " " + bilangan[num];
  } else if (num < 20) {
    result = terbilang(num - 10) + " Belas";
  } else if (num < 100) {
    result = terbilang(Math.floor(num / 10)) + " Puluh" + terbilang(num % 10);
  } else if (num < 200) {
    result = " Seratus" + terbilang(num - 100);
  } else if (num < 1e3) {
    result = terbilang(Math.floor(num / 100)) + " Ratus" + terbilang(num % 100);
  } else if (num < 2e3) {
    result = " Seribu" + terbilang(num - 1e3);
  } else if (num < 1e6) {
    result = terbilang(Math.floor(num / 1e3)) + " Ribu" + terbilang(num % 1e3);
  } else if (num < 1e9) {
    result = terbilang(Math.floor(num / 1e6)) + " Juta" + terbilang(num % 1e6);
  } else if (num < 1e12) {
    result = terbilang(Math.floor(num / 1e9)) + " Miliar" + terbilang(num % 1e9);
  } else if (num < 1e15) {
    result = terbilang(Math.floor(num / 1e12)) + " Triliun" + terbilang(num % 1e12);
  }
  return result.trim();
}

export { cn as c, formatCurrency as f, terbilang as t };
//# sourceMappingURL=index-B7s_3MI_.mjs.map
