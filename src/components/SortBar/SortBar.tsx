// src/components/SortBar/SortBar.tsx
interface SortBarProps {
    onSortChange: (value: string) => void;
  }
  
  const SortBar = ({ onSortChange }: SortBarProps) => {
    return (
      <div className="flex justify-end mb-6">
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          <option value="recommended">Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Highest Rated</option>
          <option value="sustainability-desc">Most Sustainable</option>
        </select>
      </div>
    );
  };
  
  export default SortBar;
  