import React, { useEffect, useState } from "react";
import { FlatBurgerWordmark } from "./FlatBurgerWordmark";
import { useLanguage } from "../contexts/LanguageContext";

export const CleanHero: React.FC = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector('[data-section="about"]');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-flat-cream relative overflow-hidden px-4">
      {/* Clean background pattern - no overlapping text */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-flat-blue animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-flat-blue animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/6 w-16 h-16 rounded-full bg-flat-blue animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Floating Sticker Element */}
      <div className="absolute top-20 right-8 md:top-24 md:right-12 z-20">
        <div className="bg-flat-blue text-flat-cream px-4 py-2 rounded-full transform rotate-12 shadow-lg animate-gentle-float">
          <span className="text-sm font-black tracking-wider uppercase">
            FIRE!
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center relative z-10 max-w-5xl mx-auto">
        {/* Logo */}
        <div
          className={`transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <FlatBurgerWordmark className="mx-auto mb-12 max-w-md md:max-w-lg lg:max-w-xl" />
        </div>

        {/* Main Tagline */}
        <div
          className={`transition-all duration-1000 ease-out delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-flat-blue mb-4 leading-tight tracking-tight">
            {t("hero.tagline")}
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className={`transition-all duration-1000 ease-out delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-flat-dark/80 mb-12 font-medium">
            {t("hero.subtitle")}
          </p>
        </div>

        {/* CTA Button */}
        <div
          className={`transition-all duration-1000 ease-out delay-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={scrollToNext}
            className="bg-flat-blue text-flat-cream px-12 py-4 rounded-full text-xl md:text-2xl font-black tracking-wider uppercase hover:bg-flat-dark transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            {t("hero.cta")}
          </button>
        </div>
      </div>

      {/* Clean scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out delay-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <button
          onClick={scrollToNext}
          className="text-flat-blue hover:text-flat-dark transition-colors duration-300 group"
        >
          <div className="text-sm font-semibold mb-2 tracking-wider uppercase">
            {t("hero.scrollDown")}
          </div>
          <div className="w-px h-16 bg-flat-blue mx-auto group-hover:h-20 transition-all duration-300"></div>
        </button>
      </div>
    </section>
  );
};
