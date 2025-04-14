import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../../context/Web3Context';
import { Product } from '../../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  loading?: boolean;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, loading, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { isConnected, purchaseProduct } = useWeb3();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const currentCardRef = cardRef.current;

    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []);

  const handleBooking = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isConnected) {
      alert('Per favore connetti il tuo wallet per procedere');
      return;
    }

    try {
      const result = await purchaseProduct(product.price, product.id);
      if (result.status === 'success') {
        alert('Prenotazione completata con successo!');
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      console.error('Errore durante la prenotazione:', error);
      alert(error.message || 'Errore durante la prenotazione. Riprova.');
    }
  };

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
    <Link
      to={`/product/${product.id}`}
      className="product-card-link"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div
        ref={cardRef}
        className="product-card"
        style={{
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'all 0.5s ease',
          transitionDelay: `${index * 0.1}s`,
        }}
      >
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
          {product.sustainabilityScore > 0 && (
            <div className="product-badge">
              <span>{"⭐".repeat(product.sustainabilityScore)}</span>
            </div>
          )}
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
            <div className="product-actions">
              <span className="box-style">{product.duration}</span>
              <button className="book-button">{'Prenota Ora'}</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
