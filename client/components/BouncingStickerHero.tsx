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
      {/* Cool background design details */}
      <div className="absolute inset-0">
        {/* Animated gradient circles */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-flat-blue/10 to-flat-blue/20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-flat-blue/15 to-flat-blue/25 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/6 w-16 h-16 rounded-full bg-gradient-to-br from-flat-blue/5 to-flat-blue/15 animate-pulse" style={{animationDelay: '2s'}}></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-flat-blue/10 rotate-45 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-flat-blue/15 rotate-12 animate-bounce" style={{animationDelay: '1.5s'}}></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, #1C33C3 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
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
            {/* Cool floating effect behind sticker */}
            <div className="absolute inset-0 bg-gradient-to-br from-flat-blue/20 to-flat-blue/10 rounded-full blur-xl scale-150 animate-pulse"></div>

            {/* Main sticker without white background */}
            <div className="relative animate-bounce hover:scale-110 transition-transform duration-300">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F6c2f790110dc42debce12f883ec2e2af?format=webp&width=800"
                alt="Flat Burger Logo"
                className="w-32 h-32 mx-auto drop-shadow-2xl"
              />
            </div>

            {/* Subtle rotating ring around sticker */}
            <div className="absolute inset-0 border-2 border-flat-blue/30 rounded-full animate-spin" style={{animationDuration: '8s'}}></div>
          </div>
        </div>

        {/* Tagline - Clean and centered below sticker */}
        <div className={`transform transition-all duration-1500 ease-out delay-300 ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-flat-blue mb-6 leading-tight tracking-tight" style={{fontFamily: 'Bricolage Grotesque', color: '#1C33C3'}}>
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
