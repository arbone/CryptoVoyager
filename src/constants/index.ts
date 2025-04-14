// src/constants/index.ts
import { Product } from '../types';

// src/constants/index.ts
export const SUPPORTED_CHAIN_ID = 11155111; // Sepolia chain ID
export const GIANNI_WALLET_ADDRESS = "0x76CFa7a879d03DC38229E8D087Bfe0476D6e4150"; // Inserisci qui l'indirizzo del wallet di Gianni

export const NETWORK_CONFIG = {
  chainId: SUPPORTED_CHAIN_ID,
  chainName: 'Sepolia',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: ['https://sepolia.infura.io/v3/YOUR-PROJECT-ID'], // Sostituisci con il tuo Project ID
  blockExplorerUrls: ['https://sepolia.etherscan.io']
};


export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Costa Rica Eco Adventure",
    description: "Explore pristine rainforests and contribute to local conservation efforts in Costa Rica.",
    price: "0.01",
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
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad",
    duration: "6 days",
    location: "Iceland",
    category: "adventure",
    features: ["Geothermal sites", "Glacier hiking", "Northern lights"],
    rating: 4.9,
    maxParticipants: 10,
    sustainabilityScore: 5
  },
  {
    id: 4,
    name: "New Zealand Wilderness Experience",
    description: "Discover New Zealand's pristine wilderness through eco-friendly adventures and Maori experiences.",
    price: "0.7",
    image: "https://images.unsplash.com/photo-1570459027562-4a916cc6113f",
    duration: "10 days",
    location: "New Zealand",
    category: "adventure",
    features: ["Mountain hiking", "Maori traditions", "Wildlife sanctuaries"],
    rating: 4.8,
    maxParticipants: 10,
    sustainabilityScore: 5
  },
  {
    id: 5,
    name: "Norwegian Fjords Eco-Tour",
    description: "Experience Norway's stunning fjords while staying in sustainable farms and learning about renewable energy.",
    price: "0.55",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
    duration: "8 days",
    location: "Norway",
    category: "eco",
    features: ["Fjord cruising", "Organic farming", "Renewable energy education"],
    rating: 4.7,
    maxParticipants: 12,
    sustainabilityScore: 4
  },
  {
    id: 6,
    name: "Bhutan Cultural Immersion",
    description: "Explore the world's only carbon-negative country through its monasteries, festivals, and sustainable practices.",
    price: "0.65",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
    duration: "9 days",
    location: "Bhutan",
    category: "cultural",
    features: ["Buddhist temples", "Traditional festivals", "Mountain trekking"],
    rating: 4.9,
    maxParticipants: 8,
    sustainabilityScore: 5
  },
  {
    id: 7,
    name: "Galapagos Conservation Experience",
    description: "Participate in wildlife conservation while exploring the unique ecosystems of the Galapagos Islands.",
    price: "0.8",
    image: "https://images.unsplash.com/photo-1544979590-37e9b47eb705",
    duration: "11 days",
    location: "Ecuador",
    category: "eco",
    features: ["Wildlife conservation", "Island hopping", "Marine biology"],
    rating: 4.9,
    maxParticipants: 14,
    sustainabilityScore: 5
  },
  {
    id: 8,
    name: "Japanese Rural Retreat",
    description: "Experience traditional Japanese rural life through farm stays and ancient craft workshops.",
    price: "0.45",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9",
    duration: "7 days",
    location: "Japan",
    category: "cultural",
    features: ["Farm stay", "Traditional crafts", "Tea ceremony"],
    rating: 4.6,
    maxParticipants: 8,
    sustainabilityScore: 4
  },
  {
    id: 9,
    name: "Kenya Wildlife Safari",
    description: "Join a sustainable safari experience supporting local conservation efforts and communities.",
    price: "0.75",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
    duration: "8 days",
    location: "Kenya",
    category: "adventure",
    features: ["Wildlife safari", "Tribal visits", "Conservation projects"],
    rating: 4.8,
    maxParticipants: 12,
    sustainabilityScore: 4
  },
  {
    id: 10,
    name: "Swedish Lapland Adventure",
    description: "Experience the Arctic wilderness while learning about Sami culture and sustainable living.",
    price: "0.7",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7",
    duration: "6 days",
    location: "Sweden",
    category: "adventure",
    features: ["Northern lights", "Sami culture", "Dog sledding"],
    rating: 4.7,
    maxParticipants: 10,
    sustainabilityScore: 4
  },
  {
    id: 11,
    name: "Vietnam Eco Delta Tour",
    description: "Explore the Mekong Delta's sustainable villages and traditional water-based culture.",
    price: "0.35",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592",
    duration: "5 days",
    location: "Vietnam",
    category: "cultural",
    features: ["River life", "Floating markets", "Local homestays"],
    rating: 4.5,
    maxParticipants: 10,
    sustainabilityScore: 4
  },
  {
    id: 12,
    name: "Peru Ancient Trails",
    description: "Trek the sustainable mountain routes to ancient Incan sites while supporting local communities.",
    price: "0.6",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377",
    duration: "9 days",
    location: "Peru",
    category: "adventure",
    features: ["Inca trails", "Local communities", "Mountain camping"],
    rating: 4.8,
    maxParticipants: 12,
    sustainabilityScore: 4
  }
];
