import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FlatBurgerIcon } from "./FlatBurgerIcon";
import { FlatBurgerWordmark } from "./FlatBurgerWordmark";
import { useLanguage } from "../contexts/LanguageContext";
import { Menu, X, Globe } from "lucide-react";

export const UpdatedNavigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "sr" : "en");
  };

  const scrollToSection = (sectionId: string) => {
    // Close mobile menu first
    setIsMenuOpen(false);

    // If we're not on the home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation and page load before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    } else {
      // Small delay to allow menu animation to complete
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMenuOpen &&
        !target.closest("nav") &&
        !target.closest('[role="menu"]')
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside, { passive: true });
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-flat-beige/95 backdrop-blur-md shadow-xl py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <FlatBurgerIcon
              size={isScrolled ? "sm" : "md"}
              className="transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10"
            />
            <div
              className={`transition-all duration-300 ${
                isScrolled ? "scale-90" : "scale-100"
              }`}
            >
              <FlatBurgerWordmark
                width={isScrolled ? 80 : 100}
                className="hidden sm:block"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="font-bold tracking-wide uppercase transition-all duration-300 text-sm text-flat-blue hover:text-flat-dark"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {t("nav.aboutUs")}
            </button>
            <button
              onClick={() => scrollToSection("menu")}
              className="font-bold tracking-wide uppercase transition-all duration-300 text-sm text-flat-blue hover:text-flat-dark"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {t("nav.menu")}
            </button>
            <Link
              to="/locations"
              onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}
              className="font-bold tracking-wide uppercase transition-all duration-300 text-sm text-flat-blue hover:text-flat-dark"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {t("nav.locations")}
            </Link>
            <Link
              to="/our-story"
              onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}
              className="font-bold tracking-wide uppercase transition-all duration-300 text-sm text-flat-blue hover:text-flat-dark"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {t("nav.ourStory")}
            </Link>

            {/* Order Button */}
            <a
              href="https://wolt.com/sr/srb/belgrade/restaurant/flat-burger11?srsltid=AfmBOop99ec-lBKnlyj1yDoIojJHB9b4a9IxwRhF7eKxQLCmfo_Gb0Ui"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full font-bold transition-all duration-300 text-sm bg-flat-blue text-flat-beige hover:bg-flat-dark border-2 border-flat-blue hover:border-flat-dark"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {t("order.now")}
            </a>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-4 py-2 rounded-full font-bold transition-all duration-300 text-sm bg-flat-blue text-flat-beige hover:bg-flat-dark"
              style={{ fontFamily: "Bricolage Grotesque" }}
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
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              <Globe size={14} />
              <span>{language.toUpperCase()}</span>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className={`text-flat-blue p-3 touch-manipulation rounded-lg transition-all duration-200 relative z-50 ${
                isMenuOpen
                  ? "bg-flat-blue/20 text-flat-dark"
                  : "hover:bg-flat-blue/10 active:bg-flat-blue/20"
              }`}
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
              type="button"
            >
              {isMenuOpen ? (
                <X size={24} strokeWidth={2.5} />
              ) : (
                <Menu size={24} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          role="menu"
          className={`md:hidden bg-flat-beige/98 backdrop-blur-lg shadow-xl border-t border-flat-blue/10 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          style={{ zIndex: 40 }}
        >
          <div className="pt-4 pb-6 px-4">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection("about")}
                className="text-flat-blue font-bold tracking-wide uppercase text-lg text-left hover:text-flat-dark transition-colors py-4 px-4 touch-manipulation active:bg-flat-blue/20 hover:bg-flat-blue/10 rounded-xl w-full border border-transparent hover:border-flat-blue/20"
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                {t("nav.aboutUs")}
              </button>
              <button
                onClick={() => scrollToSection("menu")}
                className="text-flat-blue font-bold tracking-wide uppercase text-lg text-left hover:text-flat-dark transition-colors py-4 px-4 touch-manipulation active:bg-flat-blue/20 hover:bg-flat-blue/10 rounded-xl w-full border border-transparent hover:border-flat-blue/20"
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                {t("nav.menu")}
              </button>
              <Link
                to="/locations"
                onClick={() => {
                  setIsMenuOpen(false);
                  setTimeout(() => window.scrollTo(0, 0), 100);
                }}
                className="text-flat-blue font-bold tracking-wide uppercase text-lg hover:text-flat-dark transition-colors py-4 px-4 touch-manipulation active:bg-flat-blue/20 hover:bg-flat-blue/10 rounded-xl block border border-transparent hover:border-flat-blue/20"
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                {t("nav.locations")}
              </Link>
              <Link
                to="/our-story"
                onClick={() => {
                  setIsMenuOpen(false);
                  setTimeout(() => window.scrollTo(0, 0), 100);
                }}
                className="text-flat-blue font-bold tracking-wide uppercase text-lg hover:text-flat-dark transition-colors py-4 px-4 touch-manipulation active:bg-flat-blue/20 hover:bg-flat-blue/10 rounded-xl block border border-transparent hover:border-flat-blue/20"
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                {t("nav.ourStory")}
              </Link>

              {/* Mobile Order Button */}
              <a
                href="https://wolt.com/sr/srb/belgrade/restaurant/flat-burger11?srsltid=AfmBOop99ec-lBKnlyj1yDoIojJHB9b4a9IxwRhF7eKxQLCmfo_Gb0Ui"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="bg-flat-blue text-flat-beige py-4 px-6 rounded-xl font-bold tracking-wider uppercase transition-all duration-300 transform hover:scale-105 text-center touch-manipulation block mt-2 shadow-lg"
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                {t("order.now")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
