import React, { useEffect, useState } from 'react';
import { FlatBurgerWordmark } from './FlatBurgerWordmark';
import { useLanguage } from '../contexts/LanguageContext';

export const PrettyPattyStyleHero: React.FC = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-flat-cream">
      {/* Clean background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-flat-blue animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-flat-blue animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/6 w-16 h-16 rounded-full bg-flat-blue animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Logo with Pretty Patty-style entrance */}
        <div className={`transform transition-all duration-1500 ease-out ${
          isLoaded 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-12 scale-95'
        }`}>
          <FlatBurgerWordmark className="mx-auto mb-8 max-w-sm md:max-w-md lg:max-w-lg" />
        </div>

        {/* Tagline with staggered animation */}
        <div className={`transform transition-all duration-1500 ease-out delay-300 ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-flat-blue mb-4 leading-tight tracking-tight">
            {t('hero.tagline')}
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`transform transition-all duration-1500 ease-out delay-500 ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          <p className="text-lg md:text-xl lg:text-2xl text-flat-dark/80 mb-8 font-medium">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* CTA Button */}
        <div className={`transform transition-all duration-1500 ease-out delay-700 ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          <button className="bg-flat-blue text-flat-cream px-8 py-4 rounded-full text-xl font-black tracking-wider uppercase hover:bg-flat-dark transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
            {t('hero.cta')}
          </button>
        </div>
      </div>


      {/* Scroll indicator like Pretty Patty */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="text-flat-blue text-center">
          <div className="text-xs font-bold mb-2 tracking-wider uppercase">{t('hero.scrollDown')}</div>
          <div className="w-px h-8 bg-flat-blue mx-auto"></div>
        </div>
      </div>
    </section>
  );
};
