import React, { useEffect, useState } from 'react';
import { FlatBurgerIcon } from './FlatBurgerIcon';
import { useLanguage } from '../contexts/LanguageContext';

export const NewHeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector('[data-section="about"]');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-flat-beige">
      {/* Clean background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-flat-blue animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-flat-blue animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/6 w-16 h-16 rounded-full bg-flat-blue animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Bouncing Icon */}
        <div className={`transform transition-all duration-1500 ease-out ${
          isLoaded 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-95'
        }`}>
          <div className="mb-8 animate-bounce">
            <FlatBurgerIcon size="xl" className="mx-auto" />
          </div>
        </div>

        {/* Tagline around the icon */}
        <div className={`transform transition-all duration-1500 ease-out delay-300 ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-flat-blue mb-6 leading-tight tracking-tight" style={{fontFamily: 'Bricolage Grotesque'}}>
            Burgers. But flatter.
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`transform transition-all duration-1500 ease-out delay-500 ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-xl md:text-2xl lg:text-3xl text-flat-blue/80 mb-12 font-medium" style={{fontFamily: 'Bricolage Grotesque'}}>
            {t('hero.subtitle')}
          </p>
        </div>

        {/* CTA Button */}
        <div className={`transform transition-all duration-1500 ease-out delay-700 ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <button 
            onClick={scrollToNext}
            className="bg-flat-blue text-flat-beige px-12 py-4 rounded-full text-xl md:text-2xl font-black tracking-wider uppercase hover:bg-flat-dark transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            style={{fontFamily: 'Bricolage Grotesque'}}
          >
            {t('hero.cta')}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1500 ease-out delay-1000 ${
        isLoaded 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}>
        <button
          onClick={scrollToNext}
          className="text-flat-blue hover:text-flat-dark transition-colors duration-300 group"
        >
          <div className="text-sm font-semibold mb-2 tracking-wider uppercase" style={{fontFamily: 'Bricolage Grotesque'}}>
            {t('hero.scrollDown')}
          </div>
          <div className="w-px h-16 bg-flat-blue mx-auto group-hover:h-20 transition-all duration-300"></div>
        </button>
      </div>
    </section>
  );
};
