// src/context/Web3Context.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { GIANNI_WALLET_ADDRESS } from '../constants';
import { TransactionStatus } from '../types';

interface Web3ContextType {
  isConnected: boolean;
  account: string | null;
  balance: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  purchaseProduct: (price: string, productId: number) => Promise<TransactionStatus>;
  isProcessing: boolean;
}

const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const updateBalance = async (address: string) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const balance = await provider.getBalance(address);
    setBalance(ethers.formatEther(balance));
  };

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask non è installato. Installalo per utilizzare questa funzionalità');
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

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
  };

  const purchaseProduct = async (price: string, productId: number): Promise<TransactionStatus> => {
    if (!account) return { status: 'error', message: 'Wallet non connesso' };
    if (isProcessing) return { status: 'error', message: 'Transazione in corso' };

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

    const handleChainChanged = () => {
      window.location.reload();
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
      connectWallet,
      disconnectWallet,
      purchaseProduct,
      isProcessing
    }}>
      {children}
    </Web3Context.Provider>
  );
};
