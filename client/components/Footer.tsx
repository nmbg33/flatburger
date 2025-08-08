import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FlatBurgerLogo } from './FlatBurgerLogo';
import { Instagram, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-flat-dark text-flat-cream py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-8 h-8 bg-flat-cream rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-6 h-6 bg-flat-cream rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-10 left-1/4 w-4 h-4 bg-flat-cream rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-10 h-10 bg-flat-cream rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <FlatBurgerLogo size="sm" />
              <span className="font-black text-xl tracking-wider uppercase">
                FLAT BURGER
              </span>
            </div>
            <p className="text-flat-cream/80 text-sm">
              Born in Belgrade, made for the streets.
            </p>
          </div>

          {/* Links */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="#" 
                className="text-flat-cream/80 hover:text-flat-cream transition-colors duration-300 text-sm tracking-wider uppercase font-semibold"
              >
                {t('footer.contact')}
              </a>
              <a 
                href="#" 
                className="text-flat-cream/80 hover:text-flat-cream transition-colors duration-300 text-sm tracking-wider uppercase font-semibold"
              >
                {t('footer.terms')}
              </a>
              <a 
                href="#" 
                className="text-flat-cream/80 hover:text-flat-cream transition-colors duration-300 text-sm tracking-wider uppercase font-semibold"
              >
                {t('footer.careers')}
              </a>
            </div>
          </div>

          {/* Social and Back to Top */}
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end space-x-4">
              {/* Social Links */}
              <a 
                href="#" 
                className="bg-flat-cream text-flat-dark p-2 rounded-full hover:bg-flat-blue hover:text-flat-cream transition-all duration-300 transform hover:scale-110"
              >
                <Instagram size={20} />
              </a>
              
              {/* TikTok Icon (using a custom SVG since Lucide doesn't have TikTok) */}
              <a 
                href="#" 
                className="bg-flat-cream text-flat-dark p-2 rounded-full hover:bg-flat-blue hover:text-flat-cream transition-all duration-300 transform hover:scale-110"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="bg-flat-blue text-flat-cream p-2 rounded-full hover:bg-flat-cream hover:text-flat-dark transition-all duration-300 transform hover:scale-110 ml-4"
                title={t('footer.backToTop')}
              >
                <ArrowUp size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-flat-cream/20 mt-8 pt-6 text-center">
          <p className="text-flat-cream/60 text-sm">
            © 2024 Flat Burger. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
