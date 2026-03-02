export type CurrencyCode = 'USD' | 'LKR' | 'AED' | 'INR' | 'EUR';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number;
  label: string;
}

export interface Tour {
  id: number;
  title: string;
  category: string;
  duration: string;
  price: number;
  description: string;
  itinerary: string; // JSON string
  includes: string; // JSON string
  excludes: string; // JSON string
  image_url: string;
}

export interface Booking {
  id: number;
  tour_id: number;
  tour_title?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  image_url: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}
