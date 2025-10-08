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

    // Common taglines
    "tagline.madeInBelgrade": "Made in Belgrade. Built for the street.",
    "tagline.visitUsToday": "Visit Us Today",
    "tagline.visitDescription":
      "Experience authentic Belgrade street food culture. Fresh burgers made daily with local ingredients and street attitude.",

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
    "burger.classic.description":
      "2x60g beef patties, cheddar cheese, Flat sauce, pickles, red onion, mustard, ketchup",
    "burger.fancy.name": "Fancy",
    "burger.fancy.description":
      "2x60g beef patties, cheddar cheese, onion jam, iceberg lettuce, pancetta, truffle mayo",
    "burger.pyro.name": "Pyro",
    "burger.pyro.description":
      "2x60g beef patties, cheddar cheese, Sriracha mayo, iceberg lettuce, caramelized onion, pancetta, jalapeños",
    "burger.baconJam.name": "Bacon Jam Flat",
    "burger.baconJam.description":
      "2x60g beef patties, cheddar cheese, bacon jam, iceberg lettuce, tomato, BBQ sauce",
    "burger.chicken.name": "Chicken Flat",
    "burger.chicken.description":
      "Grilled chicken, Sriracha-honey mayo, iceberg lettuce, cheddar cheese, gouda cheese, garlic-parmesan mayo, grilled onion",
    "burger.alabama.name": "Crispy Alabama",
    "burger.alabama.description":
      "2x60g beef patties, Emmentaler cheese, bacon mayo, crispy onion, fried pickles, homemade white Alabama BBQ sauce",

    // Add-ons
    "addon.pomfrit": "Pomfrit",
    "addon.batat": "Batat",
    "addon.onionRings": "Onion Rings",

    // Locations
    "locations.title": "Locations",
    "locations.name": "Flat Burger 1",
    "locations.locationAddress": "Dečanska 4, Belgrade",
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

    // Franchise
    "nav.franchise": "Franchise",

    "franchise.hero.title": "Flat Burger Franchise",
    "franchise.hero.subtitle": "Apply to learn the requirements to open a Flat Burger franchise in your city.",
    "franchise.hero.cta": "Apply for Franchise",

    "franchise.cards.support.title": "Support",
    "franchise.cards.support.desc": "Operational playbooks, training, and supply-chain guidance.",
    // Brand & Marketing
    "franchise.cards.brand.title": "Brand & Marketing",
    "franchise.cards.brand.desc": "Full branding, standards, and campaigns.",
    // Quality & Standards
    "franchise.cards.quality.title": "Quality & Standards",
    "franchise.cards.quality.desc": "Clear processes for product and service.",
    // Scaling
    "franchise.cards.scaling.title": "Scaling",
    "franchise.cards.scaling.desc": "Growth model and cost control.",

    // Requirements strip
    "franchise.requirements": "Basic requirements: initial investment, high-footfall location, commitment to operational standards.",

    // Form labels
    "franchise.form.fullName": "Full Name",
    "franchise.form.email": "Email",
    "franchise.form.phone": "Phone",
    "franchise.form.cityCountry": "City & Country",
    "franchise.form.locationDetails": "Proposed Location Details",
    "franchise.form.experience": "Relevant Experience",
    "franchise.form.budget": "Investment Budget (EUR)",
    "franchise.form.timeline": "Target Opening Timeline",
    "franchise.form.timeline.0_3": "0–3 months",
    "franchise.form.timeline.3_6": "3–6 months",
    "franchise.form.timeline.6_12": "6–12 months",
    "franchise.form.timeline.12_plus": "12+ months",
    "franchise.form.referral": "How did you hear about us? (optional)",
    "franchise.form.message": "Message",
    "franchise.form.consent": "I agree to data processing",
    "franchise.form.submit": "Submit Application",

    // Form feedback
    "franchise.success": "Success! Our team will get back to you shortly.",
    "franchise.error": "Something went wrong. Please try again.",

    // Validation messages
    "franchise.errors.fullName": "Please enter your full name.",
    "franchise.errors.email": "Please enter a valid email address.",
    "franchise.errors.phone": "Please enter a valid phone number.",
    "franchise.errors.cityCountry": "Please enter your city and country.",
    "franchise.errors.locationDetails": "Please describe your proposed location.",
    "franchise.errors.experience": "Please enter your relevant experience.",
    "franchise.errors.budget": "Budget must be a number greater than or equal to 0.",
    "franchise.errors.timeline": "Please select a target opening timeline.",
    "franchise.errors.consent": "You must agree to data processing to continue.",

    // FAQ
    "franchise.faq.q1": "What is the initial investment?",
    "franchise.faq.a1": "Depends on location and size; we’ll share ranges after your application.",
    "franchise.faq.q2": "Do you provide training?",
    "franchise.faq.a2": "Yes, for owner and key roles.",
    "franchise.faq.q3": "Who handles sourcing?",
    "franchise.faq.a3": "Standardized supply; details after NDA.",
    "franchise.faq.q4": "How long does it take to open?",
    "franchise.faq.a4": "Typically 3–6 months after approval, depending on buildout.",
    "franchise.faq.q5": "Is there territory exclusivity?",
    "franchise.faq.a5": "We consider exclusivity based on market potential and performance.",

    // SEO
    "seo.franchise.title": "Flat Burger Franchise | Become a Partner",
    "seo.franchise.meta": "Apply for a Flat Burger franchise: support, standards, brand, and operating model.",
  },
  sr: {
    // Navigation
    "nav.aboutUs": "O Nama",
    "nav.menu": "Meni",
    "nav.locations": "Lokacije",
    "nav.ourStory": "Naša Priča",

    // Homepage
    "hero.tagline": "Burger. Ali ravniji.",
    "hero.taglineSecond": "Pravi ukus beogradskih ulica.",
    "hero.cta": "Poruči Odmah",
    "hero.scrollDown": "Skroluj",

    // Common taglines
    "tagline.madeInBelgrade": "Rođen u Beogradu. Stvoren za ulicu.",
    "tagline.visitUsToday": "Posetite Nas Danas",
    "tagline.visitDescription":
      "Doživite autentičnu kulturu beogradske ulične hrane. Sveži burgeri pravljeni sa lokalnim sastojcima i uličnim stavom.",

    // About Us
    "about.title": "FLAT BURGER",
    "about.description":
      "Flat Burger nije samo još jedan burger restoran. Mi stvaramo, eksperimentišemo, držimo se autentičnosti. Bez foliranja—samo smeli ukusi i čist pristup. Rođeni u Beogradu, napravljeni za naše ulice. Dođi i vidi šta znači biti stvarno ravan.",

    // Menu
    "menu.title": "MENI",
    "menu.subtitle": "Burgeri",
    "menu.addOns": "Dodaci",
    "menu.seeMenu": "Pogledaj Meni",

    // Burgers
    "burger.classic.name": "Classic",
    "burger.classic.description":
      "2x60g junećeg mesa, čedar sir, Flat sos, kiseli krastavac, crveni luk, senf, kečap",
    "burger.fancy.name": "Fancy",
    "burger.fancy.description":
      "2x60g junećeg mesa, čedar sir, džem od luka, iceberg, pančeta, tartuf mayo",
    "burger.pyro.name": "Pyro",
    "burger.pyro.description":
      "2x60g junećeg mesa, čedar sir, Sriracha mayo, iceberg, karamelizovani luk, pančeta, jalapeño papričice",
    "burger.baconJam.name": "Bacon Jam Flat",
    "burger.baconJam.description":
      "2x60g junećeg mesa, čedar sir, džem od slanine, iceberg, paradajz, BBQ sos",
    "burger.chicken.name": "Chicken Flat",
    "burger.chicken.description":
      "Pileće meso, Sriracha-honey mayo, iceberg, čedar sir, gouda sir, garlic-parmezan mayo, grilovani luk",
    "burger.alabama.name": "Crispy Alabama",
    "burger.alabama.description":
      "2x60g junećeg mesa, Emmentaler sir, bacon mayo, hrskavi luk, pohovani kiseli krastavičići, domaći beli BBQ sos (Alabama)",

    // Add-ons
    "addon.pomfrit": "Pomfrit",
    "addon.batat": "Batat",
    "addon.onionRings": "Onion Rings",

    // Locations
    "locations.title": "Lokacije",
    "locations.name": "Flat Burger 1",
    "locations.locationAddress": "Dečanska 4, Beograd",
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

    // Franchise
    "nav.franchise": "Franšiza",

    "franchise.hero.title": "Flat Burger franšiza",
    "franchise.hero.subtitle": "Prijavi se i saznaj sve uslove za otvaranje Flat Burger franšize u tvom gradu.",
    "franchise.hero.cta": "Prijava za franšizu",

    "franchise.cards.support.title": "Podrška",
    "franchise.cards.support.desc": "Dobijaš operativne priručnike, trening i supply-chain smernice.",
    // Brand & Marketing
    "franchise.cards.brand.title": "Brend & marketing",
    "franchise.cards.brand.desc": "Kompletan branding, standardi i kampanje.",
    // Quality & Standards
    "franchise.cards.quality.title": "Kvalitet & standardi",
    "franchise.cards.quality.desc": "Jasni procesi za proizvodnju i uslugu.",
    // Scaling
    "franchise.cards.scaling.title": "Skaliranje",
    "franchise.cards.scaling.desc": "Model za rast i kontrolu troškova.",

    // Requirements strip
    "franchise.requirements": "Osnovni uslovi: početni kapital, lokacija s pešačkim prometom, posvećenost operativnom standardu.",

    // Form labels
    "franchise.form.fullName": "Ime i prezime",
    "franchise.form.email": "Email",
    "franchise.form.phone": "Telefon",
    "franchise.form.cityCountry": "Grad i država",
    "franchise.form.locationDetails": "Opis lokacije",
    "franchise.form.experience": "Iskustvo",
    "franchise.form.budget": "Budžet (EUR)",
    "franchise.form.timeline": "Planirani datum otvaranja",
    "franchise.form.timeline.0_3": "0–3 meseca",
    "franchise.form.timeline.3_6": "3–6 meseci",
    "franchise.form.timeline.6_12": "6–12 meseci",
    "franchise.form.timeline.12_plus": "12+ meseci",
    "franchise.form.referral": "Kako si čuo/la za nas? (opciono)",
    "franchise.form.message": "Poruka",
    "franchise.form.consent": "Slažem se sa obradom podataka",
    "franchise.form.submit": "Pošalji prijavu",

    // Form feedback
    "franchise.success": "Uspešno! Naš tim će ti se javiti u najkraćem roku.",
    "franchise.error": "Došlo je do greške. Pokušaj ponovo.",

    // Validation messages
    "franchise.errors.fullName": "Unesite ime i prezime.",
    "franchise.errors.email": "Unesite ispravan email.",
    "franchise.errors.phone": "Unesite ispravan broj telefona.",
    "franchise.errors.cityCountry": "Unesite grad i državu.",
    "franchise.errors.locationDetails": "Unesite opis lokacije.",
    "franchise.errors.experience": "Unesite relevantno iskustvo.",
    "franchise.errors.budget": "Budžet mora biti broj veći ili jednak 0.",
    "franchise.errors.timeline": "Izaberi planirani datum otvaranja.",
    "franchise.errors.consent": "Morate se složiti sa obradom podataka.",

    // FAQ
    "franchise.faq.q1": "Kolika je početna investicija?",
    "franchise.faq.a1": "Zavisi od lokacije i veličine; podelićemo ti okvirne cifre nakon prijave.",
    "franchise.faq.q2": "Da li obezbeđujete obuku?",
    "franchise.faq.a2": "Da, za vlasnika i ključne uloge.",
    "franchise.faq.q3": "Ko nabavlja sirovine?",
    "franchise.faq.a3": "Radimo standardizovano snabdevanje; detalji nakon NDA.",
    "franchise.faq.q4": "Koliko traje otvaranje?",
    "franchise.faq.a4": "Najčešće 3–6 meseci nakon odobrenja, u zavisnosti od uređenja prostora.",
    "franchise.faq.q5": "Da li postoji teritorijalna ekskluziva?",
    "franchise.faq.a5": "Razmatramo ekskluzivu na osnovu potencijala tržišta i performansi.",

    // SEO
    "seo.franchise.title": "Flat Burger franšiza | Postani partner",
    "seo.franchise.meta": "Prijavi se za Flat Burger franšizu: podrška, standardi, brend i operativni model.",
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get language from localStorage, fallback to "en"
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem(
        "flat-burger-language",
      ) as Language;
      return savedLanguage && (savedLanguage === "en" || savedLanguage === "sr")
        ? savedLanguage
        : "en";
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
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context) return context;
  const fallbackT = (key: string): string => {
    return translations["en"][key as keyof (typeof translations)["en"]] || key;
  };
  return {
    language: "en" as Language,
    setLanguage: () => {},
    t: fallbackT,
  } as LanguageContextType;
};
