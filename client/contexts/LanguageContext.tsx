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
    'hero.tagline': 'FLAT HITS DIFFERENT',
    'hero.subtitle': 'Real burgers for real people',
    'hero.cta': 'SEE THE GOODS',
    'hero.scrollDown': 'Keep going',
    
    // About Us
    'about.title': 'WE KEEP IT REAL',
    'about.description': "No cap — we're not like those other spots. We smash our patties flat, stack em high, and serve nothing but heat. Started in Belgrade's streets, still got that same energy. Fresh ingredients, zero BS, maximum flavor.",
    
    // Menu
    'menu.title': 'THE LINEUP',
    'menu.subtitle': 'Every single one hits',
    'menu.addOns': 'LEVEL UP',
    
    // Burgers
    'burger.classic.name': 'THE CLASSIC',
    'burger.classic.description': 'Smashed beef, aged cheddar, house pickles, Flat sauce that slaps',
    'burger.fancy.name': 'FANCY ONE',
    'burger.fancy.description': 'Double smash, truffle mayo, fresh arugula — bougie but worth it',
    'burger.pyro.name': 'PYRO',
    'burger.pyro.description': 'Spicy AF — beef, jalapenos, chipotle that will make you sweat',
    'burger.baconJam.name': 'BACON JAM',
    'burger.baconJam.description': 'Crispy bacon, sweet onion jam, melted cheddar — pure vibes',
    'burger.alabama.name': 'ALABAMA CRISPY',
    'burger.alabama.description': 'Fried chicken, fresh slaw, white BBQ sauce — Southern heat',
    'burger.chickenFlat.name': 'CHICKEN FLAT',
    'burger.chickenFlat.description': 'Grilled chicken, crisp lettuce, tomato, our signature flat kick',
    
    // Add-ons
    'addon.sweetPotato': 'Sweet Potato Fries',
    'addon.fries': 'Classic Fries',
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
    'hero.tagline': 'FLAT JE DRUGAČIJI',
    'hero.subtitle': 'Pravi burgeri za prave ljude',
    'hero.cta': 'VIDI PONUDU',
    'hero.scrollDown': 'Nastavi',
    
    // About Us
    'about.title': 'DRŽIMO REALNO',
    'about.description': 'Nema zajebancije — nismo kao ostali. Spljoštime patty, naložimo visoko, serviramo samo vatru. Počeli na beogradskim ulicama, još uvek imamo tu energiju. Sveži sastojci, nula gluposti, maksimalan ukus.',
    
    // Menu
    'menu.title': 'POSTAVA',
    'menu.subtitle': 'Svaki pojedinačno odličan',
    'menu.addOns': 'POJAČAJ',
    
    // Burgers
    'burger.classic.name': 'KLASIK',
    'burger.classic.description': 'Splaškana govedina, stari čedar, domaće kiselice, Flat sos koji ubija',
    'burger.fancy.name': 'FENSI',
    'burger.fancy.description': 'Dupli splask, tartufo majonez, sveža rukola — skupo al vredi',
    'burger.pyro.name': 'PIRO',
    'burger.pyro.description': 'Ljuto ko đavo — govedina, halapeño, čipotle koji će te znojiti',
    'burger.baconJam.name': 'SLANINA DŽEM',
    'burger.baconJam.description': 'Hrskava slanina, slatki džem od luka, topljeni čedar — čist užitak',
    'burger.alabama.name': 'ALABAMA HRSKAVA',
    'burger.alabama.description': 'Pohovana piletina, sveži kupus, beli BBQ sos — južnjačka vatra',
    'burger.chickenFlat.name': 'PILETINA FLAT',
    'burger.chickenFlat.description': 'Piletina sa roštilja, hrskava salata, paradajz, naš flat kick',
    
    // Add-ons
    'addon.sweetPotato': 'Batat Pomfrit',
    'addon.fries': 'Pomfrit',
    'addon.onionRings': 'Kolutići Luka',
    
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
