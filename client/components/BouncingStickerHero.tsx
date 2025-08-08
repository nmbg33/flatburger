import React, { useEffect, useState } from 'react';
import { FlatBurgerIcon } from './FlatBurgerIcon';
import { useLanguage } from '../contexts/LanguageContext';

export const BouncingStickerHero: React.FC = () => {
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-flat-beige urban-graffiti-bg">
      {/* Urban background elements */}
      <div className="absolute inset-0">
        {/* Subtle graffiti texture overlay */}
        <div className="absolute inset-0 grunge-overlay opacity-30"></div>

        {/* Urban floating elements */}
        <div className="absolute top-1/4 left-1/4 w-8 h-12 sauce-drip animate-street-float" style={{animationDelay: '0s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-6 h-8 sauce-drip animate-street-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/6 w-4 h-6 sauce-drip animate-street-float" style={{animationDelay: '4s'}}></div>

        {/* Minimal urban doodles */}
        <div className="absolute top-1/5 right-1/6 text-flat-blue/20 animate-street-float" style={{animationDelay: '1s'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="2" />
            <path d="M12 2C12 2 15 5 15 9C15 11 13.5 12 12 12C10.5 12 9 11 9 9C9 5 12 2 12 2Z" />
          </svg>
        </div>

        <div className="absolute bottom-1/5 left-1/5 text-flat-blue/15 animate-street-float" style={{animationDelay: '3s'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
          </svg>
        </div>

        {/* Street arrow */}
        <div className="absolute top-2/3 right-1/5 text-flat-blue/10 animate-street-float" style={{animationDelay: '5s'}}>
          <svg width="32" height="16" viewBox="0 0 32 16" fill="currentColor">
            <path d="M24 0L32 8L24 16V12H0V4H24V0Z" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        
        {/* Bouncing Sticker - Main focal point */}
        <div className={`transform transition-all duration-1500 ease-out ${
          isLoaded
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-95'
        }`}>
          <div className="relative inline-block mb-12">
            {/* Transparent sticker with smooth bounce */}
            <div className="relative urban-sticker animate-smooth-bounce hover:scale-105 transition-transform duration-500">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F6c2f790110dc42debce12f883ec2e2af?format=webp&width=800"
                alt="Flat Burger Logo"
                className="w-40 h-40 mx-auto"
                style={{
                  filter: 'drop-shadow(0 8px 16px rgba(28, 51, 195, 0.2))'
                }}
              />
            </div>
          </div>
        </div>

        {/* Tagline with spray-style underline */}
        <div className={`transform transition-all duration-1500 ease-out delay-300 ${
          isLoaded
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-flat-blue mb-6 leading-tight tracking-tight spray-underline" style={{fontFamily: 'Bricolage Grotesque', color: '#1C33C3'}}>
            Burger. But flatter.
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`transform transition-all duration-1500 ease-out delay-500 ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-xl md:text-2xl text-flat-blue/80 mb-12 font-normal" style={{fontFamily: 'Bricolage Grotesque', color: '#1C33C3'}}>
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
            className="px-12 py-4 rounded-full text-xl md:text-2xl font-black tracking-wider uppercase hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            style={{
              fontFamily: 'Bricolage Grotesque',
              backgroundColor: '#1C33C3',
              color: '#FEEBCB'
            }}
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
          <div className="text-sm font-semibold mb-2 tracking-wider uppercase" style={{fontFamily: 'Bricolage Grotesque', color: '#1C33C3'}}>
            {t('hero.scrollDown')}
          </div>
          <div className="w-px h-16 mx-auto group-hover:h-20 transition-all duration-300" style={{backgroundColor: '#1C33C3'}}></div>
        </button>
      </div>
    </section>
  );
};
