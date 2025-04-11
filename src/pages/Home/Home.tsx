// src/pages/Home/Home.tsx
import { useState, useMemo } from 'react';
import { PRODUCTS } from '../../constants';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterBar from '../../components/FilterBar/FilterBar';
import { FilterOptions, Product } from '../../types';

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
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Sustainable Travel Experiences
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
      <section className="mt-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            No products match your filters
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
