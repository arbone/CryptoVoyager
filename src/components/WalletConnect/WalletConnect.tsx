import React, { useState, useEffect } from 'react';
import './WalletConnect.css';
import { useWeb3 } from '../../context/Web3Context';

export const WalletConnect = () => {
  const { isConnected, account, balance, connectWallet, disconnectWallet } = useWeb3();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showMetaMaskOverlay, setShowMetaMaskOverlay] = useState(false);
  const [accountName, setAccountName] = useState('');

  // Detect if user is on mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
    if (isMobile) {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        // If MetaMask is installed, open the dapp in MetaMask browser
        const dappUrl = window.location.href;
        const metamaskAppDeepLink = `metamask://dapp/${dappUrl}`;
        window.location.href = metamaskAppDeepLink;
      } else {
        // If MetaMask is not installed, redirect to app store
        if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
          // iOS
          window.location.href = 'https://apps.apple.com/us/app/metamask/id1438144202';
        } else {
          // Android
          window.location.href = 'https://play.google.com/store/apps/details?id=io.metamask';
        }
      }
    } else {
      // Desktop flow
      if (window.ethereum) {
        await connectWallet();
        setShowMetaMaskOverlay(false);
      } else {
        setShowMetaMaskOverlay(true);
      }
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
            <button 
              onClick={handleDisconnect} 
              className="disconnect-button"
              aria-label="Disconnetti wallet"
            >
              <svg 
                viewBox="0 0 1200 1200" 
                className="disconnect-icon"
                fill="currentColor"
              >
                <path d="M513.94,0v693.97H686.06V0H513.94z M175.708,175.708 C67.129,284.287,0,434.314,0,600c0,331.371,268.629,600,600,600s600-268.629,600-600c0-165.686-67.13-315.713-175.708-424.292 l-120.85,120.85C981.102,374.216,1029.126,481.51,1029.126,600c0,236.981-192.146,429.126-429.126,429.126 c-236.981,0-429.126-192.145-429.126-429.126c0-118.49,48.025-225.784,125.684-303.442L175.708,175.708z" />
              </svg>
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

      {/* MetaMask compatibility overlay - shown only on desktop */}
      {!isMobile && showMetaMaskOverlay && (
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
