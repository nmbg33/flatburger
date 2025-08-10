import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "sr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translations = {
  en: {
    // Navigation
    "nav.aboutUs": "About Us",
    "nav.menu": "Menu",
    "nav.locations": "Locations",
    "nav.ourStory": "Our Story",

    // Homepage
    "hero.tagline": "Burger. But flatter.",
    "hero.taglineSecond": "Made in Belgrade streets.",
    "hero.cta": "Order Now",
    "hero.scrollDown": "Scroll",

    // About Us
    "about.title": "FLAT BURGER",
    "about.description":
      "Flat Burger isn't your average burger joint. We smash, we sear, we keep it real. No fluff—just bold flavor and clean design. Born in Belgrade, built for the streets. Come see what flat really means.",

    // Menu
    "menu.title": "MENU",
    "menu.subtitle": "Burgers",
    "menu.addOns": "Add-ons",
    "menu.seeMenu": "See Menu",

    // Burgers
    "burger.classic.name": "Classic",
    "burger.classic.description": "Beef, cheddar, pickles, Flat sauce",
    "burger.fancy.name": "Fancy",
    "burger.fancy.description": "Double beef patty, truffle mayo, arugula, cheddar",
    "burger.pyro.name": "Pyro",
    "burger.pyro.description": "Spicy beef, jalapeños, chipotle sauce",
    "burger.baconJam.name": "Bacon Jam",
    "burger.baconJam.description": "Crispy bacon, onion jam, cheddar",
    "burger.chicken.name": "Chicken Flat",
    "burger.chicken.description":
      "Crispy chicken breast, special chicken sauce, iceberg lettuce, tomato, red onion",
    "burger.alabama.name": "Crispy Alabama",
    "burger.alabama.description":
      "2x60g beef patty, crispy fried chicken, Alabama white sauce, pickles, coleslaw",

    // Add-ons
    "addon.pomfrit": "Pomfrit",
    "addon.batat": "Batat",
    "addon.onionRings": "Onion Rings",

    // Locations
    "locations.title": "PULL UP",
    "locations.orderNow": "GET IT NOW",
    "locations.dorcol": "Dorćol",
    "locations.vracar": "Vračar",

    // Footer
    "footer.backToTop": "Back to Top",
    "footer.contact": "Contact",
    "footer.terms": "Terms",
    "footer.careers": "Careers",

    // Our Story
    "story.title": "OUR STORY",
    "story.subtitle":
      "From Belgrade streets to your plate. The journey of making burgers better, flatter, and more authentic.",
    "story.backToHome": "Back to Home",
    "story.allPosts": "All Posts",
    "story.story": "Story",
    "story.news": "News",
    "story.readFullStory": "Read Full Story",
    "story.ctaTitle": "Taste Our Story",
    "story.ctaSubtitle":
      "Every burger tells our story. Come experience the flavors that made us who we are.",
    "story.orderNow": "Order Now",

    // Order buttons
    "order.wolt": "Order on Wolt",
    "order.now": "ORDER NOW",

    // Locations page
    "locations.backToHome": "Back to Home",
    "locations.address": "Address",
    "locations.hours": "Working Hours",
    "locations.phone": "Phone",
    "locations.orderButton": "ORDER NOW",

    // General
    "price.currency": "RSD",
  },
  sr: {
    // Navigation
    "nav.aboutUs": "O Nama",
    "nav.menu": "Meni",
    "nav.locations": "Lokacije",
    "nav.ourStory": "Naša Priča",

    // Homepage
    "hero.tagline": "Burger. Ali ravni.",
    "hero.taglineSecond": "Pravljeno na beogradskim ulicama.",
    "hero.subtitle": "Bez blajve. Samo vatra u lepinj.",
    "hero.cta": "OKUSI VATRU",
    "hero.scrollDown": "Skroluj",

    // About Us
    "about.title": "ROĐENI U BEOGRADU",
    "about.description":
      "Mi sploštimo, mi slagečimo, mi držimo pravo. Nema blajve, nema dosadnih kombinacija — samo čista vatra u lepinj. Rođeni u Beogradu, pravljeni za ulice. Sirova energija, nula sranja.",

    // Menu
    "menu.title": "VATRA",
    "menu.subtitle": "Svaki udara drugačije",
    "menu.addOns": "PRILOZI KOJI UDARAJU",

    // Burgers
    "burger.classic.name": "Classic",
    "burger.classic.description":
      "Splaškana govedina, stari čedar, domaće kiselice, Flat sos koji ubija",
    "burger.fancy.name": "Fancy",
    "burger.fancy.description":
      "Dupli splask, tartufo majonez, sveža rukola — skupo al vredi",
    "burger.pyro.name": "Pyro",
    "burger.pyro.description":
      "Ljuto ko đavo — govedina, halapeño, čipotle koji će te znojiti",
    "burger.baconJam.name": "Bacon Jam",
    "burger.baconJam.description":
      "Hrskava slanina, slatki džem od luka, topljeni čedar — čist užitak",
    "burger.chicken.name": "Chicken Flat",
    "burger.chicken.description":
      "Hrskava piletina, poseban chicken sos, svežа salata, paradajz, crveni luk",
    "burger.alabama.name": "Crispy Alabama",
    "burger.alabama.description":
      "Dupli splask, hrskava pržena piletina, Alabama beli sos, kiselice, coleslaw",

    // Add-ons
    "addon.pomfrit": "Pomfrit",
    "addon.batat": "Batat",
    "addon.onionRings": "Kolutići luka",

    // Locations
    "locations.title": "DOĐI KOD NAS",
    "locations.orderNow": "UZMI ODMAH",
    "locations.dorcol": "Dorćol",
    "locations.vracar": "Vračar",

    // Our Story
    "story.title": "NAŠA PRIČA",
    "story.subtitle":
      "Od beogradskih ulica do vašeg tanjira. Putovanje stvaranja boljih, ravnijih i autentičnijih burgera.",
    "story.backToHome": "Nazad na Početnu",
    "story.allPosts": "Sve Objave",
    "story.story": "Priča",
    "story.news": "Vesti",
    "story.readFullStory": "Pročitaj Celu Priču",
    "story.ctaTitle": "Okusi Našu Priču",
    "story.ctaSubtitle":
      "Svaki burger priča našu priču. Dođi i iskusi ukuse koji su nas učinili ono što jesmo.",
    "story.orderNow": "Poruči Odmah",

    // Order buttons
    "order.wolt": "Poruči na Wolt",
    "order.now": "PORUČI ODMAH",

    // Locations page
    "locations.backToHome": "Nazad na Početnu",
    "locations.address": "Adresa",
    "locations.hours": "Radno Vreme",
    "locations.phone": "Telefon",
    "locations.orderButton": "PORUČI ODMAH",

    // Footer
    "footer.backToTop": "Nazad na Vrh",
    "footer.contact": "Kontakt",
    "footer.terms": "Uslovi",
    "footer.careers": "Karijera",

    // General
    "price.currency": "RSD",
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
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
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
