// src/pages/Home/Home.tsx
import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../../constants';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterBar from '../../components/FilterBar/FilterBar';
import SortBar from '../../components/SortBar/SortBar';
import { FilterOptions } from '../../types';
import './Home.css';

const ITEMS_PER_PAGE = 6;

const Home: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    category: null,
    priceRange: null,
    duration: null,
    location: null
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');

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

    // Sorting
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

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

      <div className="filters-section">
        <FilterBar 
          onFilterChange={setFilters}
          locations={locations}
          categories={categories}
        />
        <SortBar onSortChange={setSortBy} />
      </div>

      <section className="products-section">
        {paginatedProducts.length === 0 ? (
          <div className="no-products">
            No products match your filters
          </div>
        ) : (
          <>
            <div className="products-grid">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`pagination-button ${
                      currentPage === index + 1 ? 'active' : ''
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
