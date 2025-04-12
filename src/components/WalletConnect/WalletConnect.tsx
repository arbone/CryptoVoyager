// src/components/WalletConnect/WalletConnect.tsx
import React from 'react';
import './WalletConnect.css';
import { useWeb3 } from '../../context/Web3Context';

export const WalletConnect = () => {
  const { isConnected, account, balance, connectWallet, disconnectWallet } = useWeb3();

  return (
    <div className="wallet-connect">
      {isConnected ? (
        <div className="wallet-info">
          <div className="balance">
            <span>{Number(balance).toFixed(4)} ETH</span>
          </div>
          <div className="address">
            <span>{account?.substring(0, 6)}...{account?.substring(account.length - 4)}</span>
          </div>
          <button 
            onClick={disconnectWallet} 
            className="disconnect-button"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button 
          onClick={connectWallet} 
          className="connect-button"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};
