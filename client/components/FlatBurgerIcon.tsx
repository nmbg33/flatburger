import React from 'react';

interface FlatBurgerIconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const FlatBurgerIcon: React.FC<FlatBurgerIconProps> = ({ 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <img 
      src="https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F8cda230b1d45448692bf3fd9dbb45d51?format=webp&width=800"
      alt="Flat Burger Icon"
      className={`${sizeClasses[size]} object-contain ${className}`}
    />
  );
};
