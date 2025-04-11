// src/constants/index.ts
import { Product } from '../types';

export const GIANNI_WALLET_ADDRESS = "0xYourWalletAddress"; // Sostituisci con il tuo indirizzo

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Costa Rica Eco Adventure",
    description: "Explore pristine rainforests and contribute to local conservation efforts in Costa Rica.",
    price: "0.5",
    image: "https://images.unsplash.com/photo-1536514072410-5019a3c69182",
    duration: "7 days",
    location: "Costa Rica",
    category: "eco",
    features: ["Rainforest exploration", "Wildlife watching", "Local community project"],
    rating: 4.8,
    maxParticipants: 12,
    sustainabilityScore: 5
  },
  {
    id: 2,
    name: "Bali Sustainable Retreat",
    description: "Experience traditional Balinese culture while staying in eco-friendly bamboo houses.",
    price: "0.4",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    duration: "5 days",
    location: "Bali",
    category: "cultural",
    features: ["Eco-lodging", "Traditional crafts", "Organic farming"],
    rating: 4.6,
    maxParticipants: 8,
    sustainabilityScore: 4
  },
  {
    id: 3,
    name: "Iceland Green Tour",
    description: "Visit renewable energy sites and natural wonders in Iceland's unique landscape.",
    price: "0.6",
    image: "https://images.unsplash.com/photo-1520681363448-471b4b0242b4",
    duration: "6 days",
    location: "Iceland",
    category: "adventure",
    features: ["Geothermal sites", "Glacier hiking", "Northern lights"],
    rating: 4.9,
    maxParticipants: 10,
    sustainabilityScore: 5
  }
];
