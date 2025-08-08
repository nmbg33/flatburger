import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface BurgerItem {
  id: string;
  nameKey: string;
  descriptionKey: string;
  price: number;
  imageUrl: string;
}

const burgers: BurgerItem[] = [
  {
    id: 'classic',
    nameKey: 'burger.classic.name',
    descriptionKey: 'burger.classic.description',
    price: 890,
    imageUrl: 'https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2Ffc64a20eae404dba92ec338c7723dce9?format=webp&width=800'
  },
  {
    id: 'fancy',
    nameKey: 'burger.fancy.name',
    descriptionKey: 'burger.fancy.description',
    price: 1290,
    imageUrl: 'https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2Fce01505dad774723bc59d2fd7fda30dd?format=webp&width=800'
  },
  {
    id: 'pyro',
    nameKey: 'burger.pyro.name',
    descriptionKey: 'burger.pyro.description',
    price: 990,
    imageUrl: 'https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2Fb19f4fd205004c67865b303c041fcde0?format=webp&width=800'
  },
  {
    id: 'baconJam',
    nameKey: 'burger.baconJam.name',
    descriptionKey: 'burger.baconJam.description',
    price: 1190,
    imageUrl: 'https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F3e6a635cde5a45ababaa81e256bee4a1?format=webp&width=800'
  }
];

export const PrettyPattyStyleBurgers: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = sectionRef.current?.querySelectorAll('[data-index]');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        {/* Title with Pretty Patty-style animation */}
        <div className="text-center mb-16" data-index="0">
          <div className={`transform transition-all duration-1000 ease-out ${
            visibleItems.has(0) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-flat-blue mb-4 leading-tight tracking-tight">
              {t('menu.title')}
            </h2>
            <p className="text-xl md:text-2xl text-flat-dark/70 font-medium">
              {t('menu.subtitle')}
            </p>
          </div>
        </div>

        {/* Burger Grid - Pretty Patty style */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto mb-20">
          {burgers.map((burger, index) => (
            <div 
              key={burger.id}
              data-index={index + 1}
              className={`group transform transition-all duration-1000 ease-out ${
                visibleItems.has(index + 1)
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Burger Card - matching Pretty Patty's card style */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-700 border border-gray-100">
                {/* Image with Pretty Patty-style hover effect */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={burger.imageUrl}
                    alt={t(burger.nameKey)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Content */}
                <div className="p-8">
                  {/* Name */}
                  <h3 className="text-3xl lg:text-4xl font-black text-flat-blue mb-4 tracking-tight">
                    {t(burger.nameKey)}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-flat-dark/80 text-lg mb-6 leading-relaxed">
                    {t(burger.descriptionKey)}
                  </p>
                  
                  {/* Price and Button */}
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black text-flat-blue">
                      {burger.price} {t('price.currency')}
                    </span>
                    <button className="bg-flat-blue text-flat-cream px-6 py-3 rounded-full font-bold tracking-wider uppercase hover:bg-flat-dark transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div 
          data-index={burgers.length + 1}
          className={`text-center transform transition-all duration-1000 ease-out ${
            visibleItems.has(burgers.length + 1)
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <h3 className="text-4xl md:text-5xl font-black text-flat-blue mb-8 tracking-tight">
            {t('menu.addOns')}
          </h3>
          
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {[
              { key: 'addon.pomfrit', price: 290 },
              { key: 'addon.batat', price: 390 },
              { key: 'addon.onionRings', price: 350 }
            ].map((addon, index) => (
              <div 
                key={addon.key}
                className="bg-flat-blue text-flat-cream px-8 py-4 rounded-full hover:bg-flat-dark transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="font-bold text-lg tracking-wider">
                  {t(addon.key)} — {addon.price} {t('price.currency')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
