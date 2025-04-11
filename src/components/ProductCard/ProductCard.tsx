// src/components/ProductCard/ProductCard.tsx
import { Product } from '../../types';
import { useWeb3 } from '../../context/Web3Context';
import { useState } from 'react';
import { parseEther } from 'ethers';
import { GIANNI_WALLET_ADDRESS } from '../../constants';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { signer, isConnected } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    if (!signer || !isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const tx = await signer.sendTransaction({
        to: GIANNI_WALLET_ADDRESS,
        value: parseEther(product.price)
      });

      await tx.wait();
      // Qui potremmo aggiungere una notifica di successo
      // o reindirizzare alla pagina di successo
    } catch (err) {
      setError('Transaction failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
      <div className="relative pb-[60%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {product.price} ETH
          </span>
          
          <button
            onClick={handlePurchase}
            disabled={!isConnected || isLoading}
            className={`px-6 py-2 rounded-lg text-white font-medium transition-colors duration-200
              ${isConnected 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'bg-gray-400 cursor-not-allowed'
              } ${isLoading ? 'opacity-75 cursor-wait' : ''}`}
          >
            {isLoading ? 'Processing...' : 'Buy Now'}
          </button>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
