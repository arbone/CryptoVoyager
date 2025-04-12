// src/pages/ProductDetail/ProductDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useWeb3 } from '../../context/Web3Context';
import { PRODUCTS } from '../../constants';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { isConnected, account } = useWeb3();
  
  const product = PRODUCTS.find(p => p.id === Number(id));

  if (!product) {
    return <div className="error-message">Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <img src={product.image} alt={product.name} className="product-detail-image" />
        <div className="product-detail-header-info">
          <h1>{product.name}</h1>
          <div className="product-price">{product.price} ETH</div>
          <div className="product-location">{product.location}</div>
          <div className="product-duration">{product.duration}</div>
        </div>
      </div>

      <div className="product-detail-content">
        <div className="product-detail-main">
          <section className="product-description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </section>

          <section className="product-features">
            <h2>Features</h2>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="product-sustainability">
            <h2>Sustainability Score</h2>
            <div className="sustainability-score">
              {"⭐".repeat(product.sustainabilityScore)}
            </div>
          </section>
        </div>

        <div className="product-detail-sidebar">
          <div className="booking-card">
            <h3>Book This Trip</h3>
            <div className="booking-price">
              <span>Price</span>
              <span className="price-value">{product.price} ETH</span>
            </div>
            <div className="booking-info">
              <div>Max Participants: {product.maxParticipants}</div>
              <div>Duration: {product.duration}</div>
            </div>
            <button 
              className={`book-button ${!isConnected ? 'disabled' : ''}`}
              disabled={!isConnected}
            >
              {!isConnected ? 'Connect Wallet to Book' : 'Book Now'}
            </button>
            {!isConnected && (
              <p className="connect-warning">Please connect your wallet to make a booking</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
