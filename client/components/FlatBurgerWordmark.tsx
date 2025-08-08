import React from 'react';

interface FlatBurgerWordmarkProps {
  className?: string;
  width?: number;
  height?: number;
}

export const FlatBurgerWordmark: React.FC<FlatBurgerWordmarkProps> = ({ 
  className = '',
  width,
  height
}) => {
  return (
    <img 
      src="https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F99ffb6d397fb476f9b4736eb8c670c07?format=webp&width=800"
      alt="Flat Burger"
      className={`object-contain ${className}`}
      width={width}
      height={height}
      style={{ width: width ? `${width}px` : undefined, height: height ? `${height}px` : undefined }}
    />
  );
};
