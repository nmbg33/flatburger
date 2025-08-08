import React from 'react';
import { FlatBurgerIcon } from './FlatBurgerIcon';

export const IconsScrollSection: React.FC = () => {
  // Create array of icon elements for continuous scroll
  const iconElements = [
    { icon: <FlatBurgerIcon size="lg" />, label: 'FLAT' },
    { icon: '🔥', label: 'FIRE' },
    { icon: <FlatBurgerIcon size="lg" />, label: 'BURGER' },
    { icon: '⚡', label: 'POWER' },
    { icon: <FlatBurgerIcon size="lg" />, label: 'STREET' },
    { icon: '💯', label: 'REAL' },
  ];

  // Duplicate the array for seamless infinite scroll
  const duplicatedIcons = [...iconElements, ...iconElements, ...iconElements];

  return (
    <section className="py-16 bg-flat-blue overflow-hidden">
      <div className="relative">
        {/* Infinite scrolling container */}
        <div className="flex animate-infinite-scroll">
          {duplicatedIcons.map((item, index) => (
            <div 
              key={index}
              className="flex-shrink-0 flex flex-col items-center justify-center mx-12 text-flat-cream"
            >
              {/* Icon */}
              <div className="mb-3 text-4xl">
                {typeof item.icon === 'string' ? (
                  <span className="text-4xl">{item.icon}</span>
                ) : (
                  item.icon
                )}
              </div>
              
              {/* Label */}
              <span className="text-sm font-black tracking-wider uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
