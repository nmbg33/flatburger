import React, { useEffect, useState } from "react";
import { FlatBurgerLogo } from "./FlatBurgerLogo";
import { useLanguage } from "../contexts/LanguageContext";
import { ChevronDown } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-flat-cream via-flat-cream to-[#F0E68C] relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating burger elements */}
        <div
          className="absolute top-20 left-10 w-8 h-8 bg-flat-blue/20 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-6 h-6 bg-flat-blue/20 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-10 h-10 bg-flat-blue/20 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-4 h-4 bg-flat-blue/20 rounded-full animate-bounce"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Wavy sauce drips */}
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 Q25,10 50,20 T100,20 L100,0 L0,0 Z"
            fill="#1B35EF"
            className="animate-pulse"
          />
          <path
            d="M0,80 Q25,90 50,80 T100,80 L100,100 L0,100 Z"
            fill="#1B35EF"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Animated Logo */}
        <div
          className={`transform transition-all duration-1000 ${
            isVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-10 opacity-0 scale-95"
          }`}
        >
          <FlatBurgerLogo size="xl" animated className="mx-auto mb-8" />
        </div>

        {/* Tagline */}
        <div
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-flat-blue mb-6 tracking-wider uppercase">
            {t("hero.tagline")}
          </h1>
        </div>

        {/* CTA Button */}
        <div
          className={`transform transition-all duration-1000 delay-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <button
            onClick={scrollToMenu}
            className="bg-flat-blue text-flat-cream px-8 py-4 rounded-full text-xl font-bold tracking-wider uppercase hover:bg-flat-dark transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {t("hero.cta")}
          </button>
        </div>

        {/* Scroll Down Arrow */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <button
            onClick={scrollToMenu}
            className="text-flat-blue hover:text-flat-dark transition-colors duration-300 animate-bounce"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};
