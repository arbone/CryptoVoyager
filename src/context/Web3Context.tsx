// src/context/Web3Context.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrowserProvider, JsonRpcSigner, formatEther } from 'ethers';

// Aggiungiamo la dichiarazione del tipo window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType {
  account: string | null;
  balance: string | null;
  connectWallet: () => Promise<void>;
  isConnected: boolean;
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
}

const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const balance = await provider.getBalance(accounts[0]);
        
        setAccount(accounts[0]);
        setBalance(formatEther(balance));
        setProvider(provider);
        setSigner(signer);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null);
        // Riconnetti il wallet quando cambia l'account
        connectWallet();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', connectWallet);
      }
    };
  }, []);

  return (
    <Web3Context.Provider value={{
      account,
      balance,
      connectWallet,
      isConnected: !!account,
      provider,
      signer
    }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
