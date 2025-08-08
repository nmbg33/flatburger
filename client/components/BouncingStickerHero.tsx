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
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-flat-beige">
      {/* Simple urban design elements - positioned away from text */}
      <div className="absolute inset-0">
        {/* Urban corner accents - safe areas */}
        <div className="absolute top-8 left-8 w-12 h-px bg-flat-blue/15"></div>
        <div className="absolute top-8 left-8 w-px h-12 bg-flat-blue/15"></div>

        <div className="absolute bottom-8 right-8 w-10 h-px bg-flat-blue/10"></div>
        <div className="absolute bottom-8 right-8 w-px h-10 bg-flat-blue/10"></div>

        {/* Small accents in safe corners */}
        <div className="absolute top-16 right-16 w-2 h-2 bg-flat-blue/15 rounded-full animate-street-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-16 left-16 w-1 h-1 bg-flat-blue/10 rounded-full animate-street-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        
        {/* Clean Bouncing Sticker - Main focal point */}
        <div className={`transform transition-all duration-1500 ease-out ${
          isLoaded
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-95'
        }`}>
          <div className="relative inline-block mb-12">
            {/* Clean transparent sticker with smooth bounce */}
            <div className="relative animate-smooth-bounce hover:scale-105 transition-transform duration-500">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F6c2f790110dc42debce12f883ec2e2af?format=webp&width=800"
                alt="Flat Burger Logo"
                className="w-40 h-40 mx-auto"
              />
            </div>
          </div>
        </div>

        {/* Main tagline */}
        <div className={`transform transition-all duration-1500 ease-out delay-300 ${
          isLoaded
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-flat-blue mb-2 leading-tight tracking-tight" style={{fontFamily: 'Bricolage Grotesque', color: '#1C33C3'}}>
            {t('hero.tagline')}
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-flat-blue mb-8 leading-tight tracking-tight" style={{fontFamily: 'Bricolage Grotesque', color: '#1C33C3'}}>
            {t('hero.taglineSecond')}
          </h2>
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
