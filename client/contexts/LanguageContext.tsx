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
    'hero.cta': 'Check the Menu',
    'hero.scrollDown': 'Scroll Down',
    
    // About Us
    'about.title': 'About Us',
    'about.description': "Flat Burger isn't your typical burger spot. We smash, we stack, we flatten — and we keep it real. No fluff, no boring combos — just pure fire in a bun. Born in Belgrade, made for the streets.",
    
    // Menu
    'menu.title': 'Our Burgers',
    'menu.addOns': 'Add-ons',
    
    // Burgers
    'burger.classic.name': 'Classic',
    'burger.classic.description': 'Beef, cheddar, pickles, Flat sauce',
    'burger.fancy.name': 'Fancy',
    'burger.fancy.description': 'Double beef, truffle mayo, arugula',
    'burger.pyro.name': 'Pyro',
    'burger.pyro.description': 'Spicy beef, jalapeños, chipotle drip',
    'burger.baconJam.name': 'Bacon Jam',
    'burger.baconJam.description': 'Bacon, onion jam, cheddar melt',
    'burger.alabama.name': 'Crispy Alabama',
    'burger.alabama.description': 'Fried chicken, slaw, white BBQ sauce',
    'burger.chickenFlat.name': 'Chicken Flat',
    'burger.chickenFlat.description': 'Grilled chicken, lettuce, tomato, flat kick',
    
    // Add-ons
    'addon.sweetPotato': 'Sweet Potato Fries',
    'addon.fries': 'Fries',
    'addon.onionRings': 'Onion Rings',
    
    // Locations
    'locations.title': 'Find Us',
    'locations.orderNow': 'Order Now',
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
    'hero.cta': 'Pogledaj Meni',
    'hero.scrollDown': 'Skroluj Dole',
    
    // About Us
    'about.title': 'O Nama',
    'about.description': 'Flat Burger nije običan burger joint. Mi spljoštimo, zapečemo i serviramo bez suvišnih priča. Nema blefiranja, samo ozbiljno dobar ukus. Rođeni u Beogradu, pravljeni za grad.',
    
    // Menu
    'menu.title': 'Naši Burgeri',
    'menu.addOns': 'Dodaci',
    
    // Burgers
    'burger.classic.name': 'Klasik',
    'burger.classic.description': 'Govedina, čedar, kiselice, Flat sos',
    'burger.fancy.name': 'Fensi',
    'burger.fancy.description': 'Dupla govedina, tartufo majonez, rukola',
    'burger.pyro.name': 'Piro',
    'burger.pyro.description': 'Ljuta govedina, halapeño, čipotle preliv',
    'burger.baconJam.name': 'Slanina Džem',
    'burger.baconJam.description': 'Slanina, džem od luka, topljeni čedar',
    'burger.alabama.name': 'Hrskava Alabama',
    'burger.alabama.description': 'Pohovana piletina, kupus salata, beli BBQ sos',
    'burger.chickenFlat.name': 'Piletina Flat',
    'burger.chickenFlat.description': 'Piletina sa roštilja, salata, paradajz, flat kick',
    
    // Add-ons
    'addon.sweetPotato': 'Batat Pomfrit',
    'addon.fries': 'Pomfrit',
    'addon.onionRings': 'Kolutići Luka',
    
    // Locations
    'locations.title': 'Pronađi Nas',
    'locations.orderNow': 'Poruči Odmah',
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
