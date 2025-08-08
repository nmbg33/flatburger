import React, { useEffect, useState } from 'react';
import { FlatBurgerLogo } from './FlatBurgerLogo';
import { useLanguage } from '../contexts/LanguageContext';

export const PrettyPattyHero: React.FC = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector('[data-section="about"]');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden bg-flat-cream">
      {/* Moving Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-[20vw] font-black text-flat-blue/5 whitespace-nowrap animate-slide-right">
          FLAT BURGER FLAT BURGER FLAT BURGER
        </div>
      </div>
      
      {/* Another layer of moving text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{top: '20%'}}>
        <div className="text-[15vw] font-black text-flat-blue/3 whitespace-nowrap animate-slide-left">
          BURGERS BURGERS BURGERS
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo */}
        <div className={`transition-all duration-1500 ease-out ${
          isLoaded 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-95'
        }`}>
          <FlatBurgerLogo size="xl" className="mx-auto mb-8" />
        </div>

        {/* Main Tagline */}
        <div className={`transition-all duration-1500 ease-out delay-300 ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-flat-blue mb-6 leading-tight">
            <span className="block">{t('hero.tagline').split('.')[0]}.</span>
            <span className="block text-flat-dark">{t('hero.tagline').split('.')[1]}.</span>
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1500 ease-out delay-1000 ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <button
            onClick={scrollToNext}
            className="text-flat-blue hover:text-flat-dark transition-colors duration-300"
          >
            <div className="text-sm font-semibold mb-2 tracking-wider uppercase">
              Scroll
            </div>
            <div className="w-px h-12 bg-flat-blue mx-auto animate-pulse"></div>
          </button>
        </div>
      </div>
    </section>
  );
};
