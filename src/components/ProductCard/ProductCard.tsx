// src/components/ProductCard/ProductCard.tsx
import React from 'react';
import './ProductCard.css';  // Corretto il percorso del CSS
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  loading?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, loading }) => {
  if (loading) {
    return (
      <div className="product-card skeleton">
        <div className="product-image skeleton" />
        <div className="product-content">
          <div className="product-tags">
            <div className="product-tag skeleton" />
            <div className="product-tag skeleton" />
          </div>
          <div className="product-title skeleton" />
          <div className="product-description skeleton" />
          <div className="product-footer skeleton" />
        </div>
      </div>
    );
  }

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-content">
        <div className="product-tags">
          <span className="product-tag tag-location">{product.location}</span>
          <span className="product-tag tag-category">{product.category}</span>
        </div>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{product.price} ETH</span>
          <button className="book-button">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
