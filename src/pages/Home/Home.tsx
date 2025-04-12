// src/pages/Home/Home.tsx
import { useState, useMemo } from 'react';
import { PRODUCTS } from '../../constants';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterBar from '../../components/FilterBar/FilterBar';
import { FilterOptions, Product } from '../../types';
import './Home.css';

const Home = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    category: null,
    priceRange: null,
    duration: null,
    location: null
  });

  // Extract unique locations and categories
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

  // Filter products based on selected filters
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
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          Sustainable Travel Experiences
        </h1>
        <p className="hero-subtitle">
          Discover eco-friendly travel packages that make a positive impact
        </p>
      </section>

      {/* Filters */}
      <FilterBar 
        onFilterChange={setFilters}
        locations={locations}
        categories={categories}
      />

      {/* Products Grid */}
      <section className="products-section">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            No products match your filters
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
