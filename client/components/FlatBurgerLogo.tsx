import React from 'react';

interface FlatBurgerLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export const FlatBurgerLogo: React.FC<FlatBurgerLogoProps> = ({ 
  size = 'md', 
  animated = false,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} ${animated ? 'animate-bounce' : ''}`}>
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circle */}
        <circle 
          cx="200" 
          cy="200" 
          r="180" 
          fill="#1B35EF" 
          className={animated ? 'animate-pulse' : ''}
        />
        
        {/* Brand Text - Top */}
        <path
          d="M 100 80 A 100 100 0 0 1 300 80"
          id="top-curve"
          fill="none"
        />
        <text className="fill-flat-cream font-bold text-2xl tracking-wider">
          <textPath href="#top-curve" startOffset="50%" textAnchor="middle">
            FLAT BURGER
          </textPath>
        </text>
        
        {/* Brand Text - Bottom */}
        <path
          d="M 300 320 A 100 100 0 0 1 100 320"
          id="bottom-curve"
          fill="none"
        />
        <text className="fill-flat-cream font-bold text-2xl tracking-wider">
          <textPath href="#bottom-curve" startOffset="50%" textAnchor="middle">
            FLAT BURGER
          </textPath>
        </text>
        
        {/* Inner Circle Background */}
        <circle cx="200" cy="200" r="100" fill="#FAEBD7" />
        
        {/* Burger Icon */}
        <g transform="translate(200, 200)">
          {/* Top Bun */}
          <rect 
            x="-50" 
            y="-40" 
            width="100" 
            height="16" 
            rx="8" 
            fill="#1B35EF"
            className={animated ? 'animate-pulse' : ''}
          />
          
          {/* Lettuce/Sauce Layer */}
          <path 
            d="M -45 -15 Q -30 -25 -15 -15 Q 0 -25 15 -15 Q 30 -25 45 -15 L 45 -5 L -45 -5 Z" 
            fill="#1B35EF"
            className={animated ? 'animate-pulse' : ''}
          />
          
          {/* Meat Patty */}
          <rect 
            x="-40" 
            y="0" 
            width="80" 
            height="12" 
            rx="6" 
            fill="#1B35EF"
          />
          
          {/* Bottom Bun */}
          <rect 
            x="-50" 
            y="25" 
            width="100" 
            height="16" 
            rx="8" 
            fill="#1B35EF"
          />
        </g>
      </svg>
    </div>
  );
};
