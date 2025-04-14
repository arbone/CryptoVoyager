// ProductDetail.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWeb3 } from '../../context/Web3Context';
import { PRODUCTS } from '../../constants';
import './ProductDetail.css';

const SEPOLIA_CHAIN_ID = 11155111;

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    isConnected, 
    account, 
    balance, 
    purchaseProduct, 
    isProcessing,
    chainId,
    switchToSepolia 
  } = useWeb3();

  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const product = PRODUCTS.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Oops! Destinazione non trovata</h2>
          <button onClick={() => navigate('/')} className="back-button">
            Torna alla Home
          </button>
        </div>
      </div>
    );
  }

  const handlePurchaseClick = async () => {
    if (!isConnected) {
      setError('Connetti il tuo wallet per iniziare l\'avventura');
      return;
    }

    if (chainId !== SEPOLIA_CHAIN_ID) {
      try {
        await switchToSepolia();
        setError('Conferma il cambio di rete a Sepolia');
        return;
      } catch (err) {
        setError('Cambio di rete necessario per procedere');
        return;
      }
    }

    if (balance && Number(balance) < Number(product.price)) {
      setError('Fondi insufficienti per prenotare');
      return;
    }

    setShowConfirm(true);
    setError(null);
  };

  const handleConfirmPurchase = async () => {
    try {
      const result = await purchaseProduct(product.price, product.id);
      if (result.status === 'success' && result.hash) {
        setShowConfirm(false);
        navigate('/purchase-success', { 
          state: { 
            productName: product.name,
            transactionHash: result.hash,
            price: product.price
          }
        });
      } else {
        setError(result.message);
        setShowConfirm(false);
      }
    } catch (err: any) {
      setError(err.message || 'Errore durante la prenotazione');
      setShowConfirm(false);
    }
  };

  return (
    <div className="product-container">
      <div className="product-hero">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-badges">
          <span className="badge eco">{product.category}</span>
          <span className="badge sustainability">
            Eco Score: {product.sustainabilityScore}/5
          </span>
        </div>
      </div>

      <div className="product-content">
        <div className="product-main">
          <div className="product-header">
            <h1>{product.name}</h1>
            <p className="product-description">{product.description}</p>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <span className="info-label">Durata</span>
              <span className="info-value">{product.duration}</span>
            </div>
            <div className="info-card">
              <span className="info-label">Località</span>
              <span className="info-value">{product.location}</span>
            </div>
            <div className="info-card">
              <span className="info-label">Gruppo</span>
              <span className="info-value">Max {product.maxParticipants}</span>
            </div>
            <div className="info-card">
              <span className="info-label">Rating</span>
              <span className="info-value">⭐ {product.rating}</span>
            </div>
          </div>

          <div className="features-section">
            <h2>Highlights del Viaggio</h2>
            <ul className="features-list">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="booking-section">
          <div className="booking-card">
            <div className="price-display">
              <span className="price-amount">{product.price} ETH</span>
              <span className="price-person">per persona</span>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              className={`book-button ${isProcessing ? 'processing' : ''}`}
              onClick={handlePurchaseClick}
              disabled={!isConnected || isProcessing}
            >
              {isProcessing ? 'Elaborazione...' : 'Prenota Ora'}
            </button>

            {!isConnected && (
              <p className="connect-prompt">
                Connetti il wallet per prenotare
              </p>
            )}

            {chainId !== SEPOLIA_CHAIN_ID && isConnected && (
              <div className="network-notice">
                Rete richiesta: Sepolia
              </div>
            )}
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Conferma Prenotazione</h2>
            <div className="modal-details">
              <p className="modal-destination">{product.name}</p>
              <p className="modal-price">{product.price} ETH</p>
              <p className="modal-wallet">{account}</p>
            </div>
            <div className="modal-actions">
              <button 
                className="confirm-button" 
                onClick={handleConfirmPurchase}
                disabled={isProcessing}
              >
                Conferma
              </button>
              <button 
                className="cancel-button" 
                onClick={() => setShowConfirm(false)}
                disabled={isProcessing}
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
