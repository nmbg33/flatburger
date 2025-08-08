import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'sr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.aboutUs': 'About Us',
    'nav.menu': 'Menu',
    'nav.locations': 'Locations',
    
    // Homepage
    'hero.tagline': 'Burgers. But flatter.',
    'hero.subtitle': 'Nothing fake. Just fire in a bun.',
    'hero.cta': 'TASTE THE FIRE',
    'hero.scrollDown': 'Scroll',
    
    // About Us
    'about.title': 'MADE IN BELGRADE',
    'about.description': 'Made in Belgrade. Built for the street. We smash, we stack, we flatten — and we keep it real. No fluff, no boring combos — just pure fire in a bun. Raw energy, maximum taste.',
    
    // Menu
    'menu.title': 'THE LINEUP',
    'menu.subtitle': 'Each one hits different',
    'menu.addOns': 'SIDES',
    
    // Burgers
    'burger.classic.name': 'Classic',
    'burger.classic.description': 'Smashed beef, aged cheddar, house pickles, Flat sauce that slaps',
    'burger.fancy.name': 'Fancy',
    'burger.fancy.description': 'Double smash, truffle mayo, fresh arugula — bougie but worth it',
    'burger.pyro.name': 'Pyro',
    'burger.pyro.description': 'Spicy AF — beef, jalapenos, chipotle that will make you sweat',
    'burger.baconJam.name': 'Bacon Jam',
    'burger.baconJam.description': 'Crispy bacon, sweet onion jam, melted cheddar — pure vibes',
    
    // Add-ons
    'addon.pomfrit': 'Pomfrit',
    'addon.batat': 'Batat',
    'addon.onionRings': 'Onion Rings',
    
    // Locations
    'locations.title': 'PULL UP',
    'locations.orderNow': 'GET IT NOW',
    'locations.dorcol': 'Dorćol',
    'locations.vracar': 'Vračar',
    
    // Footer
    'footer.backToTop': 'Back to Top',
    'footer.contact': 'Contact',
    'footer.terms': 'Terms',
    'footer.careers': 'Careers',
    
    // General
    'price.currency': 'RSD',
  },
  sr: {
    // Navigation
    'nav.aboutUs': 'O Nama',
    'nav.menu': 'Meni',
    'nav.locations': 'Lokacije',
    
    // Homepage
    'hero.tagline': 'Burgeri. Ali ravni.',
    'hero.subtitle': 'Bez glume. Samo vatra u lepinj.',
    'hero.cta': 'OKUSI VATRU',
    'hero.scrollDown': 'Skroluj',
    
    // About Us
    'about.title': 'PRAVLJENO U BEOGRADU',
    'about.description': 'Pravljeno u Beogradu. Napravljeno za ulicu. Mi meljemo, mi slagamo, mi spljoštujemo — i držimo se realnosti. Bez glume, bez dosadnih kombinacija — samo čista vatra u lepinj. Sirova energija, maksimalan ukus.',
    
    // Menu
    'menu.title': 'POSTAVA',
    'menu.subtitle': 'Svaki pogađa drugačije',
    'menu.addOns': 'DODACI',
    
    // Burgers
    'burger.classic.name': 'Classic',
    'burger.classic.description': 'Spljoštena govedina, odležali čedar, domaće kiselice, Flat sos koji rešava',
    'burger.fancy.name': 'Fancy',
    'burger.fancy.description': 'Duplo meso, tartufo majonez, sveža rukola — skupo ali vredi',
    'burger.pyro.name': 'Pyro',
    'burger.pyro.description': 'Ljuto do bola — govedina, halapeño, čipotle koji će te znojiti',
    'burger.baconJam.name': 'Bacon Jam',
    'burger.baconJam.description': 'Hrskava slanina, slatki džem od luka, topljeni čedar — čist užitak',
    
    // Add-ons
    'addon.pomfrit': 'Pomfrit',
    'addon.batat': 'Batat',
    'addon.onionRings': 'Kolutići luka',
    
    // Locations
    'locations.title': 'DOĐI KOD NAS',
    'locations.orderNow': 'UZMI ODMAH',
    'locations.dorcol': 'Dorćol',
    'locations.vracar': 'Vračar',
    
    // Footer
    'footer.backToTop': 'Nazad na Vrh',
    'footer.contact': 'Kontakt',
    'footer.terms': 'Uslovi',
    'footer.careers': 'Karijera',
    
    // General
    'price.currency': 'RSD',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
