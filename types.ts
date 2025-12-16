export type LanguageCode = 'th' | 'en' | 'ru' | 'zh';

export interface LocalizedString {
  th: string;
  en: string;
  ru: string;
  zh: string;
}

export interface MenuItem {
  id: string;
  categoryIds: string[]; // Changed from single category to array
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  image: string;
  isSpicy?: boolean;
  isHidden?: boolean; // New field to soft-delete
}

export interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
}

export interface Category {
  id: string;
  name: LocalizedString;
}

export interface Order {
  id: string;
  table: string;
  timestamp: string;
  items: CartItem[];
  total: number;
  status: 'new' | 'progress' | 'done';
}