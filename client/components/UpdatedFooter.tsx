import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FlatBurgerIcon } from './FlatBurgerIcon';
import { FlatBurgerWordmark } from './FlatBurgerWordmark';
import { Instagram, ArrowUp } from 'lucide-react';

export const UpdatedFooter: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-flat-blue text-flat-beige py-20 relative overflow-hidden">
      {/* Large FLAT BURGER background text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2Ff81ef62140324a2a9578686b9deb5d88?format=webp&width=800"
          alt="Flat Burger Background"
          className="w-full h-auto max-w-4xl object-contain"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          {/* Logo Section */}
          <div className="mb-12">
            <FlatBurgerIcon size="xl" className="mx-auto mb-6" style={{filter: 'brightness(0) saturate(100%) invert(94%) sepia(12%) saturate(1825%) hue-rotate(318deg) brightness(100%) contrast(95%)'}} />
            <div className="mb-4">
              <FlatBurgerWordmark
                className="mx-auto max-w-xs"
                style={{filter: 'brightness(0) saturate(100%) invert(94%) sepia(12%) saturate(1825%) hue-rotate(318deg) brightness(100%) contrast(95%)'}}
              />
            </div>
            <p className="text-lg font-medium" style={{fontFamily: 'Bricolage Grotesque', color: '#FEEBCB'}}>
              Made in Belgrade. Built for the street.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <a 
              href="#" 
              className="text-flat-beige/80 hover:text-flat-beige transition-all duration-300 text-lg font-bold tracking-wider uppercase transform hover:scale-105"
              style={{fontFamily: 'Bricolage Grotesque'}}
            >
              {t('footer.contact')}
            </a>
            <a 
              href="#" 
              className="text-flat-beige/80 hover:text-flat-beige transition-all duration-300 text-lg font-bold tracking-wider uppercase transform hover:scale-105"
              style={{fontFamily: 'Bricolage Grotesque'}}
            >
              {t('footer.terms')}
            </a>
            <a 
              href="#" 
              className="text-flat-beige/80 hover:text-flat-beige transition-all duration-300 text-lg font-bold tracking-wider uppercase transform hover:scale-105"
              style={{fontFamily: 'Bricolage Grotesque'}}
            >
              {t('footer.careers')}
            </a>
          </div>

          {/* Social and Actions */}
          <div className="flex justify-center items-center space-x-6 mb-8">
            {/* Social Links */}
            <a 
              href="#" 
              className="bg-flat-beige text-flat-dark p-4 rounded-full hover:bg-flat-blue hover:text-flat-beige transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <Instagram size={24} />
            </a>
            
            {/* TikTok Icon */}
            <a 
              href="#" 
              className="bg-flat-beige text-flat-dark p-4 rounded-full hover:bg-flat-blue hover:text-flat-beige transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="bg-flat-beige text-flat-blue p-4 rounded-full hover:bg-white hover:text-flat-blue transition-all duration-300 transform hover:scale-110"
              title={t('footer.backToTop')}
            >
              <ArrowUp size={24} />
            </button>
          </div>

          {/* Copyright */}
          <div className="border-t border-flat-beige/20 pt-8">
            <p className="text-sm" style={{fontFamily: 'Bricolage Grotesque', color: '#FEEBCB'}}>
              © 2024 Flat Burger. Made in Belgrade for the streets.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
