import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
  type?: 'card' | 'text' | 'title';
  count?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ type = 'text', count = 1 }) => {
  const elements = Array(count).fill(null);

  return (
    <>
      {elements.map((_, index) => (
        <div key={index} className={`skeleton skeleton-${type}`}>
          <div className="skeleton-animation" />
        </div>
      ))}
    </>
  );
};

export default Skeleton;
