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
    imageUrl: 'https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F9e602f8c0b5247bf861442f769eb163e?format=webp&width=800'
  },
  {
    id: 'fancy',
    nameKey: 'burger.fancy.name',
    descriptionKey: 'burger.fancy.description',
    price: 1290,
    imageUrl: 'https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F52177a65630b49e2ba78eb585e9e8817?format=webp&width=800'
  },
  {
    id: 'pyro',
    nameKey: 'burger.pyro.name',
    descriptionKey: 'burger.pyro.description',
    price: 990,
    imageUrl: 'https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2Fc3cec27234be4f51ab1d3d79f7aee388?format=webp&width=800'
  },
  {
    id: 'baconJam',
    nameKey: 'burger.baconJam.name',
    descriptionKey: 'burger.baconJam.description',
    price: 1190,
    imageUrl: 'https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F291b0f2c508c466d927c3acf2d4dea65?format=webp&width=800'
  }
];

export const CleanMenu: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      data-section="menu"
      className="py-24 bg-flat-cream relative"
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className={`text-center mb-20 transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-12'
        }`}>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-flat-blue mb-4 leading-tight tracking-tight">
            {t('menu.title')}
          </h2>
          <p className="text-xl md:text-2xl text-flat-dark/70 font-medium">
            {t('menu.subtitle')}
          </p>
        </div>

        {/* Burger Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {burgers.map((burger, index) => (
            <div 
              key={burger.id}
              className={`group transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Burger Card */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
                {/* Burger Photo */}
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={burger.imageUrl}
                    alt={t(burger.nameKey)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Content */}
                <div className="p-8">
                  {/* Burger Name */}
                  <h3 className="text-2xl lg:text-3xl font-black text-flat-blue mb-3 tracking-tight">
                    {t(burger.nameKey)}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-flat-dark/80 text-lg mb-6 leading-relaxed">
                    {t(burger.descriptionKey)}
                  </p>
                  
                  {/* Price and Button */}
                  <div className="flex justify-between items-center">
                    <span className="text-2xl lg:text-3xl font-black text-flat-blue">
                      {burger.price} {t('price.currency')}
                    </span>
                    <button className="bg-flat-blue text-flat-cream px-6 py-3 rounded-full font-bold tracking-wider uppercase hover:bg-flat-dark transition-all duration-300 transform hover:scale-105">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className={`text-center transition-all duration-1000 ease-out delay-700 ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-12'
        }`}>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-flat-blue mb-8 tracking-tight">
            {t('menu.addOns')}
          </h3>
          
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {[
              { key: 'addon.sweetPotato', price: 390 },
              { key: 'addon.fries', price: 290 },
              { key: 'addon.onionRings', price: 350 }
            ].map((addon, index) => (
              <div 
                key={addon.key}
                className="bg-flat-blue text-flat-cream px-8 py-4 rounded-full hover:bg-flat-dark transition-all duration-300 cursor-pointer transform hover:scale-105"
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
