// src/pages/Home/Home.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../../constants';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterBar from '../../components/FilterBar/FilterBar';
import { FilterOptions } from '../../types';
import './Home.css';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    category: null,
    priceRange: null,
    duration: null,
    location: null
  });

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [filters]);

  const locations = useMemo(() => {
    const locationSet = new Set<string>();
    PRODUCTS.forEach(p => locationSet.add(p.location));
    return Array.from(locationSet);
  }, []);

  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    PRODUCTS.forEach(p => categorySet.add(p.category));
    return Array.from(categorySet);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.location && product.location !== filters.location) return false;
      if (filters.priceRange) {
        const price = parseFloat(product.price);
        if (filters.priceRange.min && price < filters.priceRange.min) return false;
        if (filters.priceRange.max && price > filters.priceRange.max) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1 className="hero-title">
          Sustainable Travel Experiences
        </h1>
        <p className="hero-subtitle">
          Discover eco-friendly travel packages that make a positive impact
        </p>
      </section>

      <FilterBar 
        onFilterChange={setFilters}
        locations={locations}
        categories={categories}
      />

      <section className="products-section">
        {loading ? (
          <div className="products-grid">
            {[...Array(6)].map((_, index) => (
              <ProductCard 
                key={`skeleton-${index}`} 
                product={PRODUCTS[0]} 
                loading={true}
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products">
            No products match your filters
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                loading={false}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
