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
  const [participants, setParticipants] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const product = PRODUCTS.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="product-detail-error-container">
        <div className="product-detail-error-content">
          <h2>Oops! Destinazione non trovata</h2>
          <button onClick={() => navigate('/')} className="product-detail-back-button">
            Torna alla Home
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = (Number(product.price) * participants).toFixed(3);

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

    if (balance && Number(balance) < Number(totalPrice)) {
      setError('Fondi insufficienti per prenotare');
      return;
    }

    setShowConfirm(true);
    setError(null);
  };

  const handleConfirmPurchase = async () => {
    try {
      setShowConfirm(false); // Chiudi il modal prima di mostrare il loading
      setIsLoading(true); // Mostra il loader
      
      const result = await purchaseProduct(totalPrice, product.id);
      if (result.status === 'success' && result.hash) {
        navigate('/purchase-success', { 
          state: { 
            productName: product.name,
            transactionHash: result.hash,
            price: totalPrice,
            participants
          }
        });
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message || 'Errore durante la prenotazione');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-hero">
        <img src={product.image} alt={product.name} className="product-detail-image" />
        <div className="product-detail-badges">
          <span className="product-detail-badge product-detail-eco">{product.category}</span>
          <span className="product-detail-badge product-detail-sustainability">
            Eco Score: {product.sustainabilityScore}/5
          </span>
        </div>
      </div>

      <div className="product-detail-content">
        <div className="product-detail-main">
          <div className="product-detail-header">
            <h1>{product.name}</h1>
            <p className="product-detail-description">{product.description}</p>
          </div>

          <div className="product-detail-info-grid">
            <div className="product-detail-info-card">
              <span className="product-detail-info-label">Durata</span>
              <span className="product-detail-info-value">{product.duration}</span>
            </div>
            <div className="product-detail-info-card">
              <span className="product-detail-info-label">Località</span>
              <span className="product-detail-info-value">{product.location}</span>
            </div>
            <div className="product-detail-info-card">
              <span className="product-detail-info-label">Gruppo</span>
              <span className="product-detail-info-value">Max {product.maxParticipants}</span>
            </div>
            <div className="product-detail-info-card">
              <span className="product-detail-info-label">Rating</span>
              <span className="product-detail-info-value">⭐ {product.rating}</span>
            </div>
          </div>

          <div className="product-detail-features-section">
            <h2>Highlights del Viaggio</h2>
            <ul className="product-detail-features-list">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="product-detail-booking-section">
          <div className="product-detail-booking-card">
            <div className="product-detail-price-display">
              <span className="product-detail-price-amount">{product.price} ETH</span>
              <span className="product-detail-price-person">per persona</span>
            </div>

            <div className="product-detail-participants">
              <label>Numero partecipanti</label>
              <div className="product-detail-participants-control">
                <button 
                  onClick={() => setParticipants(prev => Math.max(1, prev - 1))}
                  disabled={participants <= 1}
                >
                  -
                </button>
                <span>{participants}</span>
                <button 
                  onClick={() => setParticipants(prev => Math.min(product.maxParticipants, prev + 1))}
                  disabled={participants >= product.maxParticipants}
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-detail-total">
              <span>Totale</span>
              <span className="product-detail-total-amount">{totalPrice} ETH</span>
            </div>

            {error && <div className="product-detail-error-message">{error}</div>}

            <button
              className={`product-detail-book-button ${isProcessing ? 'product-detail-processing' : ''}`}
              onClick={handlePurchaseClick}
              disabled={!isConnected || isProcessing}
            >
              {isProcessing ? 'Elaborazione...' : 'Prenota Ora'}
            </button>

            {!isConnected && (
              <p className="product-detail-connect-prompt">
                Connetti il wallet per prenotare
              </p>
            )}

            {chainId !== SEPOLIA_CHAIN_ID && isConnected && (
              <div className="product-detail-network-notice">
                Rete richiesta: Sepolia
              </div>
            )}
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="product-detail-modal-overlay">
          <div className="product-detail-modal-content">
            <h2>Conferma Prenotazione</h2>
            <div className="product-detail-modal-details">
              <p className="product-detail-modal-destination">{product.name}</p>
              <p className="product-detail-modal-participants">Partecipanti: {participants}</p>
              <p className="product-detail-modal-price">{totalPrice} ETH</p>
              <p className="product-detail-modal-wallet">{account}</p>
            </div>
            <div className="product-detail-modal-actions">
              <button 
                className="product-detail-confirm-button" 
                onClick={handleConfirmPurchase}
                disabled={isProcessing}
              >
                Conferma
              </button>
              <button 
                className="product-detail-cancel-button" 
                onClick={() => setShowConfirm(false)}
                disabled={isProcessing}
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="product-detail-loading-overlay">
          <div className="product-detail-loading-spinner"></div>
          <p className="product-detail-loading-message">
            Stiamo elaborando la tua prenotazione...<br />
            Un attimo di pazienza mentre confermiamo la magia del tuo viaggio!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;