import React from 'react';
import './FilterBar.css';
import { FilterOptions } from '../../types';

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (value: string) => void;
  locations: string[];
  categories: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, onSortChange, locations, categories }) => {
  const [currentFilters, setCurrentFilters] = React.useState<FilterOptions>({
    category: null,
    priceRange: null,
    duration: null,
    location: null
  });

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = {
      ...currentFilters,
      [key]: value
    };
    setCurrentFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters: FilterOptions = {
      category: null,
      priceRange: null,
      duration: null,
      location: null
    };
    setCurrentFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="filter-bar">
      <div className="filters-grid">
        <div className="filter-group">
          <label className="filter-label">Location</label>
          <select 
            className="filter-select"
            value={currentFilters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value || null)}
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select 
            className="filter-select"
            value={currentFilters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value || null)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Price Range</label>
          <div className="price-range">
            <input
              type="number"
              placeholder="Min"
              className="price-input"
              value={currentFilters.priceRange?.min || ''}
              onChange={(e) => handleFilterChange('priceRange', {
                ...currentFilters.priceRange,
                min: e.target.value ? Number(e.target.value) : null
              })}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              className="price-input"
              value={currentFilters.priceRange?.max || ''}
              onChange={(e) => handleFilterChange('priceRange', {
                ...currentFilters.priceRange,
                max: e.target.value ? Number(e.target.value) : null
              })}
            />
          </div>
        </div>
      </div>
      <div className="filter-actions">
        <button onClick={clearFilters} className="clear-filters">
          Clear Filters
        </button>
        <select 
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          <option value="default">Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
