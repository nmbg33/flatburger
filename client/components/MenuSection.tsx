import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BurgerItem {
  id: string;
  nameKey: string;
  descriptionKey: string;
  price: number;
  image?: string;
}

interface AddonItem {
  id: string;
  nameKey: string;
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

const addons: AddonItem[] = [
  { id: 'sweetPotato', nameKey: 'addon.sweetPotato', price: 390 },
  { id: 'fries', nameKey: 'addon.fries', price: 290 },
  { id: 'onionRings', nameKey: 'addon.onionRings', price: 350 },
];

export const MenuSection: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const scrollRight = () => {
    if (currentIndex < burgers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = 320; // Width of each card + margin
      scrollRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const BurgerCard: React.FC<{ burger: BurgerItem; index: number }> = ({ burger, index }) => (
    <div className={`flex-shrink-0 w-80 bg-flat-cream rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 mr-6 ${
      isVisible ? 'animate-fade-in-up' : 'opacity-0'
    }`} style={{ animationDelay: `${index * 100}ms` }}>
      {/* Burger Icon */}
      <div className="w-24 h-24 bg-flat-blue rounded-full mx-auto mb-4 flex items-center justify-center">
        <div className="text-flat-cream text-4xl">🍔</div>
      </div>
      
      {/* Burger Name */}
      <h3 className="text-2xl font-black text-flat-blue text-center mb-2 tracking-wider uppercase">
        {t(burger.nameKey)}
      </h3>
      
      {/* Description */}
      <p className="text-flat-dark text-center mb-4 leading-relaxed">
        {t(burger.descriptionKey)}
      </p>
      
      {/* Price */}
      <div className="text-center">
        <span className="text-3xl font-black text-flat-blue">
          {burger.price} {t('price.currency')}
        </span>
      </div>
      
      {/* Order Button */}
      <button className="w-full mt-4 bg-flat-blue text-flat-cream py-3 rounded-full font-bold tracking-wider uppercase hover:bg-flat-dark transition-colors duration-300">
        {t('locations.orderNow')}
      </button>
    </div>
  );

  return (
    <section 
      id="menu"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-flat-cream to-[#F0E68C] relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 Q50,30 100,0 L100,20 Q50,50 0,20 Z" fill="#1B35EF" className="animate-pulse" />
          <path d="M0,80 Q50,50 100,80 L100,100 Q50,70 0,100 Z" fill="#1B35EF" className="animate-pulse" style={{animationDelay: '1s'}} />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${
          isVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-flat-blue mb-4 tracking-wider uppercase">
            {t('menu.title')}
          </h2>
        </div>

        {/* Burger Cards Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-flat-blue text-flat-cream p-3 rounded-full shadow-lg hover:bg-flat-dark transition-colors duration-300 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={scrollRight}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-flat-blue text-flat-cream p-3 rounded-full shadow-lg hover:bg-flat-dark transition-colors duration-300 ${currentIndex === burgers.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentIndex === burgers.length - 1}
          >
            <ChevronRight size={24} />
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide px-12 py-8"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {burgers.map((burger, index) => (
              <BurgerCard key={burger.id} burger={burger} index={index} />
            ))}
          </div>
        </div>

        {/* Add-ons Section */}
        <div className={`mt-16 transform transition-all duration-1000 delay-600 ${
          isVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-10 opacity-0'
        }`}>
          <h3 className="text-3xl md:text-4xl font-black text-flat-blue text-center mb-8 tracking-wider uppercase">
            {t('menu.addOns')}
          </h3>
          
          <div className="flex flex-wrap justify-center gap-6">
            {addons.map((addon, index) => (
              <div 
                key={addon.id}
                className="bg-flat-blue text-flat-cream px-6 py-4 rounded-full hover:bg-flat-dark transition-colors duration-300 cursor-pointer transform hover:scale-105"
              >
                <span className="font-bold tracking-wider uppercase">
                  {t(addon.nameKey)} - {addon.price} {t('price.currency')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
