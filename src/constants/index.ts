// src/constants/index.ts
import { Product } from '../types';

export const GIANNI_WALLET_ADDRESS = "0x..." // Inserisci qui l'indirizzo del wallet di Gianni

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Tour Sostenibile Toscana",
    description: "7 giorni di tour ecologico attraverso la Toscana",
    price: "0.1",
    image: "/images/toscana.jpg"
  },
  {
    id: 2,
    name: "Eco-Adventure Costa Rica",
    description: "10 giorni di immersione nella natura del Costa Rica",
    price: "0.15",
    image: "/images/costarica.jpg"
  }
];

export const SUPPORTED_NETWORKS = {
  sepolia: {
    chainId: '0xaa36a7',
    chainName: 'Sepolia Test Network',
    nativeCurrency: {
      name: 'SepoliaETH',
      symbol: 'SEP',
      decimals: 18
    },
    rpcUrls: ['https://sepolia.infura.io/v3/YOUR-PROJECT-ID'],
    blockExplorerUrls: ['https://sepolia.etherscan.io']
  }
};
