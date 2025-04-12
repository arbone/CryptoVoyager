// src/pages/ProductDetail/ProductDetail.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWeb3 } from '../../context/Web3Context';
import { PRODUCTS } from '../../constants';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isConnected, account, balance, purchaseProduct, isProcessing } = useWeb3();
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const product = PRODUCTS.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="error-container">
        <div className="error-message">
          Prodotto non trovato
          <button onClick={() => navigate('/')}>Torna alla Home</button>
        </div>
      </div>
    );
  }

  const handlePurchaseClick = () => {
    if (!isConnected) {
      setError('Per favore connetti il tuo wallet per procedere');
      return;
    }
    
    if (balance && Number(balance) < Number(product.price)) {
      setError('Saldo insufficiente per completare l\'acquisto');
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
      setError(err.message || 'Errore durante l\'acquisto');
      setShowConfirm(false);
    }
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-badges">
            <span className={`badge category-${product.category}`}>
              {product.category}
            </span>
            <span className="badge sustainability">
              Sustainability Score: {product.sustainabilityScore}/5
            </span>
          </div>
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>

          <div className="product-stats">
            <div className="stat-item">
              <span className="stat-label">Durata</span>
              <span className="stat-value">{product.duration}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Località</span>
              <span className="stat-value">{product.location}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Partecipanti Max</span>
              <span className="stat-value">{product.maxParticipants}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Rating</span>
              <span className="stat-value">⭐ {product.rating}</span>
            </div>
          </div>

          <div className="product-features">
            <h2>Caratteristiche del Viaggio</h2>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="purchase-section">
            <div className="price-info">
              <span className="price-label">Prezzo</span>
              <span className="price-value">{product.price} ETH</span>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              className={`purchase-button ${isProcessing ? 'processing' : ''}`}
              onClick={handlePurchaseClick}
              disabled={!isConnected || isProcessing}
            >
              {isProcessing ? 'Elaborazione...' : 'Prenota Ora'}
            </button>

            {!isConnected && (
              <p className="connect-prompt">
                Connetti il tuo wallet per prenotare questo viaggio
              </p>
            )}
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <h2>Conferma Prenotazione</h2>
            <p>Stai per prenotare: {product.name}</p>
            <p>Prezzo: {product.price} ETH</p>
            <p>Dal wallet: {account}</p>
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
