import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FlatBurgerLogo } from './FlatBurgerLogo';
import { Instagram, ArrowUp } from 'lucide-react';

export const PrettyPattyFooter: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-flat-dark text-flat-cream py-20 relative overflow-hidden">
      {/* Background Moving Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <div className="text-[10vw] font-black text-flat-cream whitespace-nowrap animate-slide-right">
          FLAT BURGER FLAT BURGER FLAT BURGER
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-12">
            <FlatBurgerLogo size="lg" className="mx-auto mb-4" />
            <h3 className="text-3xl font-black tracking-wider uppercase">
              FLAT BURGER
            </h3>
            <p className="text-flat-cream/70 text-lg mt-2">
              Born in Belgrade, made for the streets.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <a 
              href="#" 
              className="text-flat-cream/80 hover:text-flat-cream transition-colors duration-300 text-lg font-semibold tracking-wider uppercase transform hover:scale-105"
            >
              {t('footer.contact')}
            </a>
            <a 
              href="#" 
              className="text-flat-cream/80 hover:text-flat-cream transition-colors duration-300 text-lg font-semibold tracking-wider uppercase transform hover:scale-105"
            >
              {t('footer.terms')}
            </a>
            <a 
              href="#" 
              className="text-flat-cream/80 hover:text-flat-cream transition-colors duration-300 text-lg font-semibold tracking-wider uppercase transform hover:scale-105"
            >
              {t('footer.careers')}
            </a>
          </div>

          {/* Social and Back to Top */}
          <div className="flex justify-center items-center space-x-6 mb-8">
            {/* Social Links */}
            <a 
              href="#" 
              className="bg-flat-cream text-flat-dark p-4 rounded-full hover:bg-flat-blue hover:text-flat-cream transition-all duration-300 transform hover:scale-110"
            >
              <Instagram size={24} />
            </a>
            
            {/* TikTok Icon */}
            <a 
              href="#" 
              className="bg-flat-cream text-flat-dark p-4 rounded-full hover:bg-flat-blue hover:text-flat-cream transition-all duration-300 transform hover:scale-110"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="bg-flat-blue text-flat-cream p-4 rounded-full hover:bg-flat-cream hover:text-flat-dark transition-all duration-300 transform hover:scale-110"
              title={t('footer.backToTop')}
            >
              <ArrowUp size={24} />
            </button>
          </div>

          {/* Copyright */}
          <div className="border-t border-flat-cream/20 pt-8">
            <p className="text-flat-cream/60 text-sm">
              © 2024 Flat Burger. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
