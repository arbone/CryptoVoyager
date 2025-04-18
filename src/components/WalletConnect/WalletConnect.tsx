import React, { useState, useEffect } from 'react';
import './WalletConnect.css';
import { useWeb3 } from '../../context/Web3Context';

export const WalletConnect = () => {
  const { isConnected, account, balance, connectWallet, disconnectWallet } = useWeb3();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showMetaMaskOverlay, setShowMetaMaskOverlay] = useState(false); // Added state for MetaMask overlay
  const [accountName, setAccountName] = useState<string>('');

  useEffect(() => {
    const getAccountName = async () => {
      if (window.ethereum && account) {
        try {
          const accountDetails = await window.ethereum.request({
            method: 'wallet_getAccountDetails',
            params: [account],
          });

          if (accountDetails?.accountName) {
            setAccountName(accountDetails.accountName);
          }
        } catch (error) {
          console.log("Impossibile ottenere il nome dell'account:", error);
        }
      }
    };

    getAccountName();
  }, [account]);

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      // Attempt to connect wallet
      await connectWallet();
      setShowMetaMaskOverlay(false);
    } else {
      // Show overlay if MetaMask is not available
      setShowMetaMaskOverlay(true);
    }
  };

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
              <span>{Number(balance).toFixed(4)} Ξ</span>
            </div>
            <button onClick={handleDisconnect} className="disconnect-button">
              Disconnetti
            </button>
          </div>
        ) : (
          <button onClick={handleConnectWallet} className="connect-button">
            Connetti Wallet
          </button>
        )}
      </div>

      {/* Confirm disconnect dialog */}
      {showConfirmDialog && (
        <div className="confirm-dialog-overlay">
          <div className="confirm-dialog">
            <h3>Disconnetti Wallet</h3>
            <p>Sei sicuro di voler disconnettere il tuo wallet?</p>
            <div className="confirm-dialog-buttons">
              <button onClick={confirmDisconnect} className="confirm-button">
                Procedi
              </button>
              <button onClick={cancelDisconnect} className="cancel-button">
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MetaMask compatibility overlay */}
      {showMetaMaskOverlay && (
        <div className="metamask-overlay">
          <div className="metamask-dialog">
            <h3>Browser non compatibile con Metamask</h3>
            <p>Usa un browser che supporta l'estensione di MetaMask (come Chrome o Firefox) per connettere il tuo wallet.</p>
            <div className="metamask-buttons">
              <button
                onClick={() => setShowMetaMaskOverlay(false)}
                className="metamask-close-button"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnect;
