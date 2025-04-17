export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  duration: string;
  location: string;
  category: 'eco' | 'avventura' | 'culturale';
  features: string[];
  rating: number;
  maxParticipants: number;
  sustainabilityScore: number;
}

export interface TransactionStatus {
  status: 'pending' | 'success' | 'error';
  message: string;
  hash?: string;
}

export interface FilterOptions {
  category: string | null;
  priceRange: { min: number; max: number } | null;
  duration: string | null;
  location: string | null;
}

export interface Transaction {
  hash: string;
  status: 'pending' | 'completed' | 'failed';
  productId: number;
  price: string;
  timestamp: number;
}