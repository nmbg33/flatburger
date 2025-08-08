import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FlatBurgerIcon } from './FlatBurgerIcon';
import { FlatBurgerWordmark } from './FlatBurgerWordmark';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';

export const UpdatedNavigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sr' : 'en');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
      isScrolled 
        ? 'bg-flat-beige/95 backdrop-blur-md shadow-xl py-3' 
        : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <FlatBurgerIcon 
              size={isScrolled ? 'sm' : 'md'} 
              className="transition-all duration-300" 
            />
            <div className={`transition-all duration-300 ${
              isScrolled ? 'scale-90' : 'scale-100'
            }`}>
              <FlatBurgerWordmark 
                width={isScrolled ? 100 : 120} 
                className="hidden sm:block" 
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="font-bold tracking-wide uppercase transition-all duration-300 text-sm text-flat-blue hover:text-flat-dark"
              style={{fontFamily: 'Bricolage Grotesque'}}
            >
              {t('nav.aboutUs')}
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="font-bold tracking-wide uppercase transition-all duration-300 text-sm text-flat-blue hover:text-flat-dark"
              style={{fontFamily: 'Bricolage Grotesque'}}
            >
              {t('nav.menu')}
            </button>
            <Link
              to="/locations"
              className="font-bold tracking-wide uppercase transition-all duration-300 text-sm text-flat-blue hover:text-flat-dark"
              style={{fontFamily: 'Bricolage Grotesque'}}
            >
              {t('nav.locations')}
            </Link>
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-4 py-2 rounded-full font-bold transition-all duration-300 text-sm bg-flat-blue text-flat-beige hover:bg-flat-dark"
              style={{fontFamily: 'Bricolage Grotesque'}}
            >
              <Globe size={16} />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 bg-flat-blue text-flat-beige px-3 py-2 rounded-full text-xs font-bold"
              style={{fontFamily: 'Bricolage Grotesque'}}
            >
              <Globe size={14} />
              <span>{language.toUpperCase()}</span>
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-flat-blue p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-6 pb-4 border-t border-flat-blue/20 mt-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('about')}
                className="text-flat-blue font-bold tracking-wide uppercase text-sm text-left hover:text-flat-dark transition-colors"
                style={{fontFamily: 'Bricolage Grotesque'}}
              >
                {t('nav.aboutUs')}
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="text-flat-blue font-bold tracking-wide uppercase text-sm text-left hover:text-flat-dark transition-colors"
                style={{fontFamily: 'Bricolage Grotesque'}}
              >
                {t('nav.menu')}
              </button>
              <Link
                to="/locations"
                onClick={() => setIsMenuOpen(false)}
                className="text-flat-blue font-bold tracking-wide uppercase text-sm hover:text-flat-dark transition-colors"
                style={{fontFamily: 'Bricolage Grotesque'}}
              >
                {t('nav.locations')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
