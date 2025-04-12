// src/pages/PurchaseSuccess/PurchaseSuccess.tsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './PurchaseSuccess.css';

const PurchaseSuccess: React.FC = () => {
  const location = useLocation();
  const { productName, transactionHash } = location.state || {};

  return (
    <div className="purchase-success">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Acquisto Completato!</h1>
        <p>Grazie per aver acquistato {productName}</p>
        
        <div className="transaction-info">
          <p>Hash della transazione:</p>
          <a 
            href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {transactionHash}
          </a>
        </div>

        <Link to="/" className="home-button">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
