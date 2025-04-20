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

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
              Disconnetti
            </button>
          </div>
        ) : (
          <button 
            onClick={connectWallet} 
            className="connect-button"
          >
            Connetti Wallet
          </button>
        )}
      </div>

      {showConfirmDialog && (
        <div className="confirm-dialog-overlay">
          <div className="confirm-dialog">
            <h3>Disconnetti Wallet</h3>
            <p>Sei sicuro di voler disconnettere il tuo wallet?</p>
            <div className="confirm-dialog-buttons">
              <button 
                onClick={confirmDisconnect}
                className="confirm-button"
              >
                Procedi
              </button>
              <button 
                onClick={cancelDisconnect}
                className="cancel-button"
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}

      {!isMobile && isSafari && (
        <div className="safari-warning-overlay">
          <div className="safari-warning">
            <h3>Browser non supportato</h3>
            <p>Safari non supporta MetaMask. Per utilizzare questa dApp, installa MetaMask su un browser compatibile come Chrome o Firefox.</p>
            <button 
              onClick={() => window.open('https://metamask.io/download/', '_blank')}
              className="safari-warning-button"
            >
              Scarica MetaMask
            </button>
          </div>
        </div>
      )}

    </>
  );
};

export default WalletConnect;
