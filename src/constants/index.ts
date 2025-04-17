import { Product } from '../types';

export const SUPPORTED_CHAIN_ID = 11155111;
export const GIANNI_WALLET_ADDRESS = "0x76CFa7a879d03DC38229E8D087Bfe0476D6e4150";

export const NETWORK_CONFIG = {
  chainId: SUPPORTED_CHAIN_ID,
  chainName: 'Sepolia',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: ['https://sepolia.infura.io/v3/YOUR-PROJECT-ID'],
  blockExplorerUrls: ['https://sepolia.etherscan.io']
};


export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Avventura Green in Costa Rica",
    description: "Esplora foreste pluviali incontaminate e contribuisci agli sforzi di conservazione locale in Costa Rica.",
    price: "0.01",
    image: "https://images.unsplash.com/photo-1536514072410-5019a3c69182",
    duration: "7 giorni",
    location: "Costa Rica",
    category: "eco",
    features: ["Esplorazione foresta pluviale", "Osservazione fauna selvatica", "Progetto comunitario locale"],
    rating: 4.8,
    maxParticipants: 12,
    sustainabilityScore: 5
  },
  {
    id: 2,
    name: "Ritiro Sostenibile a Bali",
    description: "Vivi la tradizionale cultura balinese soggiornando in case di bambù eco-compatibili.",
    price: "0.4",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    duration: "5 giorni",
    location: "Indonesia",
    category: "culturale",
    features: ["Alloggio eco-sostenibile", "Arti tradizionali", "Agricoltura biologica"],
    rating: 4.6,
    maxParticipants: 8,
    sustainabilityScore: 4
  },
  {
    id: 3,
    name: "Tour Verde in Islanda",
    description: "Visita siti di energia rinnovabile e meraviglie naturali nel paesaggio unico dell'Islanda.",
    price: "0.6",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad",
    duration: "6 giorni",
    location: "Islanda",
    category: "avventura",
    features: ["Siti geotermici", "Escursioni sui ghiacciai", "Aurora boreale"],
    rating: 4.9,
    maxParticipants: 10,
    sustainabilityScore: 5
  },
  {
    id: 4,
    name: "Esperienza nella Natura Selvaggia della Nuova Zelanda",
    description: "Scopri la natura incontaminata della Nuova Zelanda attraverso avventure eco-compatibili ed esperienze Maori.",
    price: "0.7",
    image: "https://images.unsplash.com/photo-1570459027562-4a916cc6113f",
    duration: "10 giorni",
    location: "Nuova Zelanda",
    category: "avventura",
    features: ["Escursioni in montagna", "Tradizioni Maori", "Santuari faunistici"],
    rating: 4.8,
    maxParticipants: 10,
    sustainabilityScore: 5
  },
  {
    id: 5,
    name: "Tour Eco dei Fiordi Norvegesi",
    description: "Vivi la bellezza dei fiordi norvegesi soggiornando in fattorie sostenibili e imparando sulle energie rinnovabili.",
    price: "0.55",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
    duration: "8 giorni",
    location: "Norvegia",
    category: "eco",
    features: ["Crociera nei fiordi", "Agricoltura biologica", "Educazione su energie rinnovabili"],
    rating: 4.7,
    maxParticipants: 12,
    sustainabilityScore: 4
  },
  {
    id: 6,
    name: "Immersione Culturale in Bhutan",
    description: "Esplora l'unico paese al mondo a emissioni negative di carbonio attraverso monasteri, festival e pratiche sostenibili.",
    price: "0.65",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
    duration: "9 giorni",
    location: "Bhutan",
    category: "culturale",
    features: ["Templi buddisti", "Festival tradizionali", "Trekking in montagna"],
    rating: 4.9,
    maxParticipants: 8,
    sustainabilityScore: 5
  },
  {
    id: 7,
    name: "Esperienza di Conservazione alle Galapagos",
    description: "Partecipa alla conservazione della fauna selvatica esplorando gli ecosistemi unici delle Isole Galapagos.",
    price: "0.8",
    image: "https://images.unsplash.com/photo-1544979590-37e9b47eb705",
    duration: "11 giorni",
    location: "Ecuador",
    category: "eco",
    features: ["Conservazione fauna", "Island hopping", "Biologia marina"],
    rating: 4.9,
    maxParticipants: 14,
    sustainabilityScore: 5
  },
  {
    id: 8,
    name: "Ritiro Rurale Giapponese",
    description: "Vivi la tradizionale vita rurale giapponese attraverso soggiorni in fattoria e laboratori di antichi mestieri.",
    price: "0.45",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9",
    duration: "7 giorni",
    location: "Giappone",
    category: "culturale",
    features: ["Soggiorno in fattoria", "Mestieri tradizionali", "Cerimonia del tè"],
    rating: 4.6,
    maxParticipants: 8,
    sustainabilityScore: 4
  },
  {
    id: 9,
    name: "Safari Faunistico in Kenya",
    description: "Unisciti a un'esperienza di safari sostenibile che supporta gli sforzi di conservazione locale e le comunità.",
    price: "0.75",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
    duration: "8 giorni",
    location: "Kenya",
    category: "avventura",
    features: ["Safari faunistico", "Visite tribali", "Progetti di conservazione"],
    rating: 4.8,
    maxParticipants: 12,
    sustainabilityScore: 4
  },
  {
    id: 10,
    name: "Avventura in Lapponia Svedese",
    description: "Vivi la natura artica imparando la cultura Sami e uno stile di vita sostenibile.",
    price: "0.7",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7",
    duration: "6 giorni",
    location: "Svezia",
    category: "avventura",
    features: ["Aurora boreale", "Cultura Sami", "Corsa con i cani da slitta"],
    rating: 4.7,
    maxParticipants: 10,
    sustainabilityScore: 4
  },
  {
    id: 11,
    name: "Tour Eco del Delta del Vietnam",
    description: "Esplora i villaggi sostenibili e la cultura acquatica tradizionale del Delta del Mekong.",
    price: "0.35",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592",
    duration: "5 giorni",
    location: "Vietnam",
    category: "culturale",
    features: ["Vita fluviale", "Mercati galleggianti", "Alloggi locali"],
    rating: 4.5,
    maxParticipants: 10,
    sustainabilityScore: 4
  },
  {
    id: 12,
    name: "Antichi Sentieri del Perù",
    description: "Percorri i sentieri montani sostenibili verso gli antichi siti Inca supportando le comunità locali.",
    price: "0.6",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377",
    duration: "9 giorni",
    location: "Perù",
    category: "avventura",
    features: ["Sentieri Inca", "Comunità locali", "Campeggio in montagna"],
    rating: 4.8,
    maxParticipants: 12,
    sustainabilityScore: 4
  }
];
