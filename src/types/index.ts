// src/types/index.ts
export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
  }
  
  export interface TransactionStatus {
    status: 'pending' | 'success' | 'error';
    message: string;
  }
  