import React, { useState, useEffect } from 'react';
import './WalletConnect.css';
import { useWeb3 } from '../../context/Web3Context';

export const WalletConnect = () => {
  const { isConnected, account, balance, connectWallet, disconnectWallet } = useWeb3();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [accountName, setAccountName] = useState<string>('');

  useEffect(() => {
    const getAccountName = async () => {
      if (window.ethereum && account) {
        try {
          const permissions = await window.ethereum.request({
            method: 'wallet_getPermissions'
          });
          
          const accountDetails = await window.ethereum.request({
            method: 'wallet_getAccountDetails',
            params: [account]
          });
          
          if (accountDetails?.accountName) {
            setAccountName(accountDetails.accountName);
          }
        } catch (error) {
          console.log('Impossibile ottenere il nome dell\'account:', error);
        }
      }
    };

    getAccountName();
  }, [account]);

  const handleDisconnect = () => {
    setShowConfirmDialog(true);
  };

  const confirmDisconnect = () => {
    localStorage.removeItem('walletconnect');
    
    if (window.ethereum) {
      const emptyCallback = () => {};
      window.ethereum.removeListener('accountsChanged', emptyCallback);
      window.ethereum.removeListener('chainChanged', emptyCallback);
      window.ethereum.removeListener('connect', emptyCallback);
      window.ethereum.removeListener('disconnect', emptyCallback);
    }

    disconnectWallet();
    setShowConfirmDialog(false);
  };

  const cancelDisconnect = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <div className="wallet-connect">
        {isConnected ? (
          <div className="wallet-info">
            <div className="balance">
              <span>{Number(balance).toFixed(4)} ETH</span>
            </div>
            
            <button 
              onClick={handleDisconnect} 
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
            Connect MetaMask Wallet
          </button>
        )}
      </div>

      {showConfirmDialog && (
        <div className="confirm-dialog-overlay">
          <div className="confirm-dialog">
            <h3>Disconnect Wallet</h3>
            <p>Are you sure you want to disconnect your wallet?</p>
            <div className="confirm-dialog-buttons">
              <button 
                onClick={confirmDisconnect}
                className="confirm-button"
              >
                Proceed
              </button>
              <button 
                onClick={cancelDisconnect}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnect;
