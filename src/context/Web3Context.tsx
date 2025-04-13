// src/context/Web3Context.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { GIANNI_WALLET_ADDRESS } from '../constants';
import { TransactionStatus } from '../types';
import { CONTRACT_ADDRESS } from '../config/contract';
import TravelBookingABI from '../abi/TravelBooking.json';


const SEPOLIA_CHAIN_ID = 11155111;

interface Web3ContextType {
  isConnected: boolean;
  account: string | null;
  balance: string | null;
  chainId: number | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  purchaseProduct: (price: string, productId: number) => Promise<TransactionStatus>;
  isProcessing: boolean;
  switchToSepolia: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chainId, setChainId] = useState<number | null>(null);

  const updateBalance = async (address: string) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const balance = await provider.getBalance(address);
    setBalance(ethers.formatEther(balance));
  };

  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}` }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}`,
              chainName: 'Sepolia Test Network',
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['https://sepolia.infura.io/v3/'],
              blockExplorerUrls: ['https://sepolia.etherscan.io']
            }]
          });
        } catch (addError) {
          throw new Error('Impossibile aggiungere la rete Sepolia');
        }
      } else {
        throw error;
      }
    }
  };

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask non è installato. Installalo per utilizzare questa funzionalità');
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      const currentChainId = await window.ethereum.request({ 
        method: 'eth_chainId' 
      });
      
      setChainId(parseInt(currentChainId, 16));

      const account = accounts[0];
      setAccount(account);
      setIsConnected(true);
      await updateBalance(account);

    } catch (error: any) {
      console.error('Errore durante la connessione del wallet:', error);
      throw new Error(error.message || 'Errore durante la connessione del wallet');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    setIsConnected(false);
    setChainId(null);
  };

  const purchaseProduct = async (price: string, productId: number): Promise<TransactionStatus> => {
    if (!account) return { status: 'error', message: 'Wallet non connesso' };
    if (isProcessing) return { status: 'error', message: 'Transazione in corso' };
    if (chainId !== SEPOLIA_CHAIN_ID) {
      return { status: 'error', message: 'Per favore, passa alla rete Sepolia per continuare' };
    }

    setIsProcessing(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: GIANNI_WALLET_ADDRESS,
        value: ethers.parseEther(price)
      });

      await tx.wait();
      await updateBalance(account);
      
      return { 
        status: 'success', 
        message: 'Transazione completata con successo',
        hash: tx.hash
      };
    } catch (error: any) {
      if (error.code === 'ACTION_REJECTED') {
        return { 
          status: 'error', 
          message: 'Transazione rifiutata dall\'utente'
        };
      }
      return { 
        status: 'error', 
        message: error.message || 'Errore durante la transazione'
      };
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (typeof window.ethereum === 'undefined') return;

    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        const newAccount = accounts[0];
        setAccount(newAccount);
        setIsConnected(true);
        await updateBalance(newAccount);
      }
    };

    const handleChainChanged = (chainId: string) => {
      setChainId(parseInt(chainId, 16));
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    const checkConnection = async () => {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_accounts' 
        });
        if (accounts.length > 0) {
          const account = accounts[0];
          setAccount(account);
          setIsConnected(true);
          await updateBalance(account);

          const chainId = await window.ethereum.request({ 
            method: 'eth_chainId' 
          });
          setChainId(parseInt(chainId, 16));
        }
      } catch (error) {
        console.error('Errore durante il controllo della connessione:', error);
      }
    };

    checkConnection();

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  return (
    <Web3Context.Provider value={{
      isConnected,
      account,
      balance,
      chainId,
      connectWallet,
      disconnectWallet,
      purchaseProduct,
      isProcessing,
      switchToSepolia
    }}>
      {children}
    </Web3Context.Provider>
  );
};
