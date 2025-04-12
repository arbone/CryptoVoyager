import React from 'react';
import './WalletConnect.css';
import { useWeb3 } from '../../context/Web3Context';

const WalletConnect = () => {
  const { account, balance, connectWallet, isConnected } = useWeb3();

  return (
    <div className="wallet-connect">
      {isConnected ? (
        <div className="wallet-info">
          <div className="balance">
            <span>{balance?.substring(0, 6)} ETH</span>
          </div>
          <div className="address">
            <span>{account?.substring(0, 6)}...{account?.substring(account.length - 4)}</span>
          </div>
        </div>
      ) : (
        <button onClick={connectWallet} className="connect-button">
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
