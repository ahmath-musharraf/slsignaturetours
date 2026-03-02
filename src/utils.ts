import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CurrencyCode } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CURRENCIES: Record<CurrencyCode, { symbol: string, rate: number, label: string }> = {
  USD: { symbol: '$', rate: 1, label: 'US Dollar' },
  LKR: { symbol: 'Rs.', rate: 300, label: 'Sri Lankan Rupee' },
  AED: { symbol: 'DH', rate: 3.67, label: 'UAE Dirham' },
  INR: { symbol: '₹', rate: 83, label: 'Indian Rupee' },
  EUR: { symbol: '€', rate: 0.92, label: 'Euro' },
};

export const formatPrice = (price: number, currencyCode: CurrencyCode = 'USD') => {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = price * currency.rate;
  
  return `${currency.symbol}${converted.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};
