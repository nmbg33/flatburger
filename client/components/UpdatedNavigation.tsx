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

  // Prevent body scroll when menu is open (iOS optimization)
  useEffect(() => {
    if (isMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.height = "100%";

      // Prevent iOS bounce scroll
      document.body.style.touchAction = "none";
      document.body.style.webkitOverflowScrolling = "touch";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
      document.body.style.webkitOverflowScrolling = "";

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
      document.body.style.webkitOverflowScrolling = "";
    };
  }, [isMenuOpen]);

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

  // Close mobile menu when clicking outside - optimized for iOS
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.closest("nav")) {
        setIsMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    // Use a timeout to avoid immediate close on iOS
    const timeoutId = setTimeout(() => {
      document.addEventListener("touchstart", handleClickOutside, {
        passive: true,
      });
      document.addEventListener("click", handleClickOutside, { passive: true });
      document.addEventListener("keydown", handleEscapeKey, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
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
              <span>SRB/ENG</span>
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
              <span>SRB/ENG</span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`text-flat-blue p-4 touch-manipulation rounded-lg relative z-50 transition-colors duration-150 smooth-transition ${
                isMenuOpen
                  ? "bg-flat-blue/20 text-flat-dark"
                  : "active:bg-flat-blue/15"
              }`}
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
              type="button"
              style={{
                WebkitTapHighlightColor: "transparent",
                willChange: "background-color, color"
              }}
            >
              {isMenuOpen ? (
                <X size={24} strokeWidth={2} />
              ) : (
                <Menu size={24} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          role="menu"
          className={`md:hidden bg-flat-beige shadow-xl border-t border-flat-blue/10 transition-all duration-300 ${
            isMenuOpen ? "block opacity-100 translate-y-0" : "hidden opacity-0 -translate-y-4"
          }`}
          style={{
            zIndex: 40,
            WebkitTransform: "translate3d(0,0,0)",
            transform: "translate3d(0,0,0)",
            willChange: "opacity, transform",
            touchAction: "manipulation"
          }}
        >
          <div className="pt-4 pb-6 px-4">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToSection("about");
                }}
                className="text-flat-blue font-bold tracking-wide uppercase text-lg text-left py-4 px-4 touch-manipulation active:bg-flat-blue/20 rounded-xl w-full smooth-transition"
                style={{
                  fontFamily: "Bricolage Grotesque",
                  WebkitTapHighlightColor: "transparent",
                  willChange: "background-color"
                }}
              >
                {t("nav.aboutUs")}
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToSection("menu");
                }}
                className="text-flat-blue font-bold tracking-wide uppercase text-lg text-left py-4 px-4 touch-manipulation active:bg-flat-blue/20 rounded-xl w-full smooth-transition"
                style={{
                  fontFamily: "Bricolage Grotesque",
                  WebkitTapHighlightColor: "transparent",
                  willChange: "background-color"
                }}
              >
                {t("nav.menu")}
              </button>
              <Link
                to="/locations"
                onClick={() => {
                  setIsMenuOpen(false);
                  setTimeout(() => window.scrollTo(0, 0), 50);
                }}
                className="text-flat-blue font-bold tracking-wide uppercase text-lg py-4 px-4 touch-manipulation active:bg-flat-blue/20 rounded-xl block smooth-transition"
                style={{
                  fontFamily: "Bricolage Grotesque",
                  WebkitTapHighlightColor: "transparent",
                  willChange: "background-color"
                }}
              >
                {t("nav.locations")}
              </Link>
              <Link
                to="/our-story"
                onClick={() => {
                  setIsMenuOpen(false);
                  setTimeout(() => window.scrollTo(0, 0), 50);
                }}
                className="text-flat-blue font-bold tracking-wide uppercase text-lg py-4 px-4 touch-manipulation active:bg-flat-blue/20 rounded-xl block smooth-transition"
                style={{
                  fontFamily: "Bricolage Grotesque",
                  WebkitTapHighlightColor: "transparent",
                  willChange: "background-color"
                }}
              >
                {t("nav.ourStory")}
              </Link>

              {/* Mobile Order Button */}
              <a
                href="https://wolt.com/sr/srb/belgrade/restaurant/flat-burger11?srsltid=AfmBOop99ec-lBKnlyj1yDoIojJHB9b4a9IxwRhF7eKxQLCmfo_Gb0Ui"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="bg-flat-blue text-flat-beige py-4 px-6 rounded-xl font-bold tracking-wider uppercase text-center touch-manipulation block mt-3 shadow-lg active:opacity-80 smooth-transition"
                style={{
                  fontFamily: "Bricolage Grotesque",
                  WebkitTapHighlightColor: "transparent",
                  willChange: "opacity, transform"
                }}
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
