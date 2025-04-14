// src/pages/PurchaseSuccess/PurchaseSuccess.tsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './PurchaseSuccess.css';

const PurchaseSuccess: React.FC = () => {
  const location = useLocation();
  const { productName, transactionHash } = location.state || {};

  const copyToClipboard = () => {
    if (!transactionHash) return;
    
    navigator.clipboard.writeText(transactionHash);
    const copyBtn = document.querySelector('.copy-button');
    
    if (copyBtn) {
      copyBtn.textContent = 'Copiato!';
      setTimeout(() => {
        if (copyBtn) {
          copyBtn.textContent = 'Copia';
        }
      }, 2000);
    }
  };

  return (
    <div className="purchase-success">
      <div className="success-card">
        <div className="success-icon">
          <div className="checkmark">✓</div>
        </div>
        
        <h1>Acquisto Completato!</h1>
        <p className="success-message">Grazie per aver acquistato <span className="highlight">{productName}</span></p>
        
        {transactionHash && (
          <div className="transaction-section">
            <h3>Dettagli Transazione</h3>
            <div className="transaction-details">
              <div className="detail-row">
                <span className="detail-label">Stato:</span>
                <span className="status-badge confirmed">Confermato</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Hash:</span>
                <div className="hash-wrapper">
                  <a 
                    href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transaction-hash"
                  >
                    {transactionHash}
                  </a>
                  <button onClick={copyToClipboard} className="copy-button">
                    Copia
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="action-buttons">
          <Link to="/" className="button primary">
            Torna alla Home
          </Link>
          <Link to="/my-bookings" className="button secondary">
            I Miei Ordini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;