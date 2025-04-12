// src/components/SortBar/SortBar.tsx
import React from 'react';
import './SortBar.css';

interface SortBarProps {
  onSortChange: (value: string) => void;
}

const SortBar: React.FC<SortBarProps> = ({ onSortChange }) => {
  return (
    <div className="sort-bar">
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
  );
};

export default SortBar;
