// src/types/index.ts
export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    duration: string;
    location: string;
    category: 'eco' | 'adventure' | 'cultural';
    features: string[];
    rating: number;
    maxParticipants: number;
    sustainabilityScore: number; // 1-5 rating per eco-friendliness
  }
  
  export interface TransactionStatus {
    status: 'pending' | 'success' | 'error';
    message: string;
  }
  
  export interface FilterOptions {
    category: string | null;
    priceRange: { min: number; max: number } | null;
    duration: string | null;
    location: string | null;
  }
  