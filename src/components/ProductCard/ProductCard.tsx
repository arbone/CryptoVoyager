// src/components/ProductCard/ProductCard.tsx
import React, { useEffect, useRef } from 'react';
import './ProductCard.css';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  loading?: boolean;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, loading, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

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
    <div
      ref={cardRef}
      className="product-card"
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        transition: 'all 0.5s ease',
        transitionDelay: `${index * 0.1}s`
      }}
    >
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          loading="lazy"
        />
      </div>
      
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
