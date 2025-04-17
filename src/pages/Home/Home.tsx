import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PRODUCTS } from '../../constants';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterBar from '../../components/FilterBar/FilterBar';
import { FilterOptions } from '../../types';
import './Home.css';

const ITEMS_PER_LOAD = 6;

const Home: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    category: null,
    priceRange: null,
    duration: null,
    location: null
  });
  
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_LOAD);
  const [sortBy, setSortBy] = useState('default');
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const filteredAndSortedProducts = useMemo(() => {
    let result = PRODUCTS.filter(product => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.location && product.location !== filters.location) return false;
      if (filters.priceRange) {
        const price = parseFloat(product.price);
        if (filters.priceRange.min && price < filters.priceRange.min) return false;
        if (filters.priceRange.max && price > filters.priceRange.max) return false;
      }
      return true;
    });

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [filters, sortBy]);

  useEffect(() => {
    setVisibleItems(ITEMS_PER_LOAD);
  }, [filters, sortBy]);

  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || visibleItems >= filteredAndSortedProducts.length) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      if (windowHeight + scrollTop >= documentHeight - 100) {
        setIsLoading(true);
        
        setTimeout(() => {
          setVisibleItems(prev => Math.min(prev + ITEMS_PER_LOAD, filteredAndSortedProducts.length));
          setIsLoading(false);
        }, 800);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleItems, filteredAndSortedProducts.length, isLoading]);

  const currentProducts = filteredAndSortedProducts.slice(0, visibleItems);

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1 className="hero-title">
          Esperienze e viaggi sostenibili
        </h1>
        <p className="hero-subtitle">
          Scopri i nostri pacchetti viaggio eco-friendly e le esperienze uniche che offriamo.
        </p>
      </section>
  
      <div className="filters-section">
        <FilterBar 
          onFilterChange={setFilters}
          onSortChange={setSortBy}
          locations={locations}
          categories={categories}
        />
      </div>

      <section className="products-section">
        {currentProducts.length === 0 ? (
          <div className="no-products">
            Nessun prodotto trovato
          </div>
        ) : (
          <>
            <div className="products-grid">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {(isLoading || visibleItems < filteredAndSortedProducts.length) && (
              <div 
                ref={loaderRef}
                className="loader"
              >
                Caricando altre esperienze per te...
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
