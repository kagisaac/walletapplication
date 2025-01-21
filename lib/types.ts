export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  subcategory: string;
  account: string;
  note: string;
  date: string;
}

export interface Budget {
  id: string;
  amount: number;
  period: 'weekly' | 'monthly' | 'yearly';
  category?: string;
  spent: number;
}

export interface Category {
  name: string;
  subcategories: string[];
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: 'bank' | 'mobile' | 'cash';
}