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
    "burger.classic.description": "2x60g beef patties, cheddar cheese, Flat sauce, pickles, red onion, mustard, ketchup",
    "burger.fancy.name": "Fancy",
    "burger.fancy.description": "2x60g beef patties, cheddar cheese, onion jam, iceberg lettuce, pancetta, truffle mayo",
    "burger.pyro.name": "Pyro",
    "burger.pyro.description": "2x60g beef patties, cheddar cheese, Sriracha mayo, iceberg lettuce, caramelized onion, pancetta, jalapeños",
    "burger.baconJam.name": "Bacon Jam Flat",
    "burger.baconJam.description": "2x60g beef patties, cheddar cheese, bacon jam, iceberg lettuce, tomato, BBQ sauce",
    "burger.chicken.name": "Chicken Flat",
    "burger.chicken.description": "Grilled chicken, Sriracha-honey mayo, iceberg lettuce, cheddar cheese, gouda cheese, garlic-parmesan mayo, grilled onion",
    "burger.alabama.name": "Crispy Alabama",
    "burger.alabama.description": "2x60g beef patties, Emmentaler cheese, bacon mayo, crispy onion, fried pickles, homemade white Alabama BBQ sauce",

    // Add-ons
    "addon.pomfrit": "Pomfrit",
    "addon.batat": "Batat",
    "addon.onionRings": "Onion Rings",

    // Locations
    "locations.title": "Locations",
    "locations.name": "Flat Burger 1",
    "locations.locationAddress": "Dobračina 4, Belgrade",
    "locations.hours": "Hours",
    "locations.weekdays": "Weekdays: 12:00–23:00",
    "locations.weekends": "Weekends: 15:00–23:00 (or until sold out)",

    // Contact
    "contact.title": "Contact",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.emailAddress": "flatburgerbg@gmail.com",
    "contact.phoneNumber": "066 809 6326",

    // Buttons/CTAs
    "cta.orderNow": "Order Now",
    "cta.findUs": "Find Us",

    // Footer
    "footer.backToTop": "Back to Top",
    "footer.contact": "Contact",
    "footer.terms": "Terms",
    "footer.careers": "Careers",
    "footer.copyright": "Flat Burger — © All rights reserved.",

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
    "story.allStoriesText": "All Stories",
    "story.ourStoryText": "Our Story",
    "story.latestNewsText": "Latest News",
    "story.swipeInstruction":
      "👈 Swipe left or right to explore • Tap dots to jump 👉",
    "story.videoContent": "Video Content",
    "story.clickToWatch": "Click to watch",

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
    "hero.tagline": "Burger. Ali ravniji.",
    "hero.taglineSecond": "Napravljen na beogradskim ulicama.",
    "hero.cta": "Poruči Odmah",
    "hero.scrollDown": "Skroluj",

    // About Us
    "about.title": "FLAT BURGER",
    "about.description":
      "Flat Burger nije običan burger restoran. Mi gnječimo, pečemo, držimo se stvari. Bez gluposti—samo hrabar ukus i čist dizajn. Rođeni u Beogradu, napravljeni za ulice. Dođi da vidiš šta ravno stvarno znači.",

    // Menu
    "menu.title": "MENI",
    "menu.subtitle": "Burgeri",
    "menu.addOns": "Dodaci",
    "menu.seeMenu": "Pogledaj Meni",

    // Burgers
    "burger.classic.name": "Classic",
    "burger.classic.description": "2x60g junećeg mesa, čedar sir, Flat sos, kiseli krastavac, crveni luk, senf, kečap",
    "burger.fancy.name": "Fancy",
    "burger.fancy.description": "2x60g junećeg mesa, čedar sir, džem od luka, iceberg, pančeta, tartuf mayo",
    "burger.pyro.name": "Pyro",
    "burger.pyro.description": "2x60g junećeg mesa, čedar sir, Sriracha mayo, iceberg, karamelizovani luk, pančeta, jalapeño papričice",
    "burger.baconJam.name": "Bacon Jam Flat",
    "burger.baconJam.description": "2x60g junećeg mesa, čedar sir, džem od slanine, iceberg, paradajz, BBQ sos",
    "burger.chicken.name": "Chicken Flat",
    "burger.chicken.description": "Pileće meso, Sriracha-honey mayo, iceberg, čedar sir, gouda sir, garlic-parmezan mayo, grilovani luk",
    "burger.alabama.name": "Crispy Alabama",
    "burger.alabama.description": "2x60g junećeg mesa, Emmentaler sir, bacon mayo, hrskavi luk, pohovani kiseli krastavičići, domaći beli BBQ sos (Alabama)",

    // Add-ons
    "addon.pomfrit": "Pomfrit",
    "addon.batat": "Batat",
    "addon.onionRings": "Onion Rings",

    // Locations
    "locations.title": "Lokacije",
    "locations.name": "Flat Burger 1",
    "locations.locationAddress": "Dobračina 4, Beograd",
    "locations.hours": "Radno Vreme",
    "locations.weekdays": "Radni dani: 12:00–23:00",
    "locations.weekends": "Vikendi: 15:00–23:00 (ili dok ne ostanemo bez)",

    // Contact
    "contact.title": "Kontakt",
    "contact.email": "Email",
    "contact.phone": "Telefon",
    "contact.emailAddress": "flatburgerbg@gmail.com",
    "contact.phoneNumber": "066 809 6326",

    // Buttons/CTAs
    "cta.orderNow": "Poruči Odmah",
    "cta.findUs": "Pronađi Nas",

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
    "story.allStoriesText": "Sve Priče",
    "story.ourStoryText": "Naša Priča",
    "story.latestNewsText": "Najnovije Vesti",
    "story.swipeInstruction":
      "👈 Prevuci levo ili desno za istraživanje • Klikni tačke za skok 👉",
    "story.videoContent": "Video Sadržaj",
    "story.clickToWatch": "Klikni da gledaš",

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
    "footer.copyright": "Flat Burger — © Sva prava zadržana.",

    // General
    "price.currency": "RSD",
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get language from localStorage, fallback to "en"
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("flat-burger-language") as Language;
      return savedLanguage && (savedLanguage === "en" || savedLanguage === "sr") ? savedLanguage : "en";
    }
    return "en";
  });

  // Save language to localStorage whenever it changes
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("flat-burger-language", lang);
    }
  };

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
