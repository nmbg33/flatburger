import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FlatBurgerIcon } from './FlatBurgerIcon';
import { FlatBurgerWordmark } from './FlatBurgerWordmark';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sr' : 'en');
  };

  const navItems = [
    { key: 'nav.aboutUs', href: '#about' },
    { key: 'nav.menu', href: '#menu' },
    { key: 'nav.locations', href: '/locations' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-flat-cream/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <FlatBurgerIcon size="sm" />
            <div className="hidden sm:block">
              <FlatBurgerWordmark width={120} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-flat-blue font-semibold hover:text-flat-dark transition-colors duration-200 text-sm tracking-wide uppercase"
              >
                {t(item.key)}
              </a>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 bg-flat-blue text-flat-cream px-3 py-2 rounded-full hover:bg-flat-dark transition-colors duration-200 text-sm font-semibold"
            >
              <Globe size={16} />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 bg-flat-blue text-flat-cream px-2 py-1 rounded-full text-xs"
            >
              <Globe size={14} />
              <span>{language.toUpperCase()}</span>
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-flat-blue p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-flat-blue/20">
            <div className="flex flex-col space-y-3 pt-4">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-flat-blue font-semibold hover:text-flat-dark transition-colors duration-200 text-sm tracking-wide uppercase"
                >
                  {t(item.key)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
