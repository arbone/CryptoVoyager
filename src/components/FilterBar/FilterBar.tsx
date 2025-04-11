// src/components/FilterBar/FilterBar.tsx
import { useState } from 'react';
import { FilterOptions } from '../../types';

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
  locations: string[];
  categories: string[];
}

const FilterBar = ({ onFilterChange, locations, categories }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    category: null,
    priceRange: null,
    duration: null,
    location: null
  });

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2"
            onChange={(e) => handleFilterChange('category', e.target.value || null)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Price Range (ETH)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2"
              onChange={(e) => handleFilterChange('priceRange', {
                min: parseFloat(e.target.value),
                max: filters.priceRange?.max || null
              })}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2"
              onChange={(e) => handleFilterChange('priceRange', {
                min: filters.priceRange?.min || null,
                max: parseFloat(e.target.value)
              })}
            />
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <select
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2"
            onChange={(e) => handleFilterChange('location', e.target.value || null)}
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filters */}
        <div className="flex items-end">
          <button
            onClick={() => {
              const resetFilters = {
                category: null,
                priceRange: null,
                duration: null,
                location: null
              };
              setFilters(resetFilters);
              onFilterChange(resetFilters);
            }}
            className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
