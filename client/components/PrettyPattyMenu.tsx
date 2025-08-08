import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface BurgerItem {
  id: string;
  nameKey: string;
  descriptionKey: string;
  price: number;
}

const burgers: BurgerItem[] = [
  { id: 'classic', nameKey: 'burger.classic.name', descriptionKey: 'burger.classic.description', price: 890 },
  { id: 'fancy', nameKey: 'burger.fancy.name', descriptionKey: 'burger.fancy.description', price: 1290 },
  { id: 'pyro', nameKey: 'burger.pyro.name', descriptionKey: 'burger.pyro.description', price: 990 },
  { id: 'baconJam', nameKey: 'burger.baconJam.name', descriptionKey: 'burger.baconJam.description', price: 1190 },
  { id: 'alabama', nameKey: 'burger.alabama.name', descriptionKey: 'burger.alabama.description', price: 1090 },
  { id: 'chickenFlat', nameKey: 'burger.chickenFlat.name', descriptionKey: 'burger.chickenFlat.description', price: 790 },
];

export const PrettyPattyMenu: React.FC = () => {
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
      className="py-20 bg-flat-cream relative overflow-hidden"
    >
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-[15vw] font-black text-flat-blue/5 whitespace-nowrap animate-slide-left">
          MENU MENU MENU MENU MENU
        </div>
      </div>

      <div className="relative z-10">
        {/* Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-12'
        }`}>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-flat-blue mb-4 leading-tight">
            {t('menu.title')}
          </h2>
        </div>

        {/* Horizontal Scrolling Burgers */}
        <div className="overflow-hidden">
          <div className="flex space-x-8 px-8 pb-8 overflow-x-auto scrollbar-hide">
            {burgers.map((burger, index) => (
              <div 
                key={burger.id}
                className={`flex-shrink-0 w-80 lg:w-96 transition-all duration-1000 ease-out ${
                  isVisible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Burger Card */}
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 group">
                  {/* Photo Placeholder */}
                  <div className="w-full h-64 bg-gradient-to-br from-flat-blue/20 to-flat-blue/10 rounded-2xl mb-6 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <div className="text-6xl animate-bounce group-hover:scale-110 transition-transform duration-300">
                      🍔
                    </div>
                  </div>
                  
                  {/* Burger Name */}
                  <h3 className="text-3xl lg:text-4xl font-black text-flat-blue mb-3 tracking-tight">
                    {t(burger.nameKey)}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-flat-dark/80 text-lg mb-6 leading-relaxed">
                    {t(burger.descriptionKey)}
                  </p>
                  
                  {/* Price */}
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black text-flat-blue">
                      {burger.price} {t('price.currency')}
                    </span>
                    <button className="bg-flat-blue text-flat-cream px-6 py-3 rounded-full font-bold tracking-wider uppercase hover:bg-flat-dark transition-all duration-300 transform hover:scale-105">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div className={`mt-20 text-center transition-all duration-1000 ease-out delay-700 ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-12'
        }`}>
          <h3 className="text-4xl md:text-5xl font-black text-flat-blue mb-8">
            {t('menu.addOns')}
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              { key: 'addon.sweetPotato', price: 390 },
              { key: 'addon.fries', price: 290 },
              { key: 'addon.onionRings', price: 350 }
            ].map((addon, index) => (
              <div 
                key={addon.key}
                className="bg-flat-blue text-flat-cream px-8 py-4 rounded-full hover:bg-flat-dark transition-all duration-300 cursor-pointer transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="font-bold text-lg tracking-wider">
                  {t(addon.key)} - {addon.price} {t('price.currency')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
