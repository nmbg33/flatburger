import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FlatBurgerIcon } from "./FlatBurgerIcon";
import { FlatBurgerWordmark } from "./FlatBurgerWordmark";
import { useLanguage } from "../contexts/LanguageContext";
import { Menu, X, Globe } from "lucide-react";

export const UpdatedNavigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [swipeStartX, setSwipeStartX] = useState(0);
  const [swipeCurrentX, setSwipeCurrentX] = useState(0);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
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

  // Swipe gesture handlers
  const handleSwipeStart = (clientX: number) => {
    if (clientX < 20) { // Only start swipe from left edge
      setSwipeStartX(clientX);
      setSwipeCurrentX(clientX);
      setIsSwipeActive(true);
    }
  };

  const handleSwipeMove = (clientX: number) => {
    if (isSwipeActive) {
      setSwipeCurrentX(clientX);
      const swipeDistance = clientX - swipeStartX;
      if (swipeDistance > 80 && !isMenuOpen) {
        setIsMenuOpen(true);
        setIsSwipeActive(false);
      } else if (swipeDistance < -80 && isMenuOpen) {
        setIsMenuOpen(false);
        setIsSwipeActive(false);
      }
    }
  };

  const handleSwipeEnd = () => {
    setIsSwipeActive(false);
  };

  // Global swipe event listeners
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      handleSwipeStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      handleSwipeMove(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      handleSwipeEnd();
    };

    const handleMouseDown = (e: MouseEvent) => {
      handleSwipeStart(e.clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.buttons === 1) { // Only if mouse is pressed
        handleSwipeMove(e.clientX);
      }
    };

    const handleMouseUp = () => {
      handleSwipeEnd();
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSwipeActive, swipeStartX, isMenuOpen]);

  // Close mobile menu when clicking outside or escape key
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-menu') && !target.closest('button[aria-label="Toggle mobile menu"]')) {
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`text-flat-blue p-4 touch-manipulation rounded-lg relative z-50 transition-all duration-200 smooth-transition ${
                isMenuOpen
                  ? "bg-flat-blue/20 text-flat-dark scale-95"
                  : "active:bg-flat-blue/15 hover:scale-105"
              }`}
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
              type="button"
              style={{
                WebkitTapHighlightColor: "transparent",
                willChange: "background-color, color, transform"
              }}
            >
              {isMenuOpen ? (
                <X size={24} strokeWidth={2} className="transition-transform duration-200" />
              ) : (
                <Menu size={24} strokeWidth={2} className="transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-out"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity: isMenuOpen ? 1 : 0,
            }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Swipe Menu */}
        <div
          role="menu"
          className={`mobile-menu md:hidden fixed top-0 left-0 h-full w-80 bg-flat-beige shadow-2xl transform transition-transform duration-300 ease-out z-50 ${
            isMenuOpen ? "translate-x-0 menu-bounce" : "-translate-x-full"
          }`}
          style={{
            willChange: "transform",
            touchAction: "manipulation"
          }}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-flat-blue/10">
            <div className="flex items-center space-x-3">
              <FlatBurgerIcon size="sm" className="w-8 h-8" />
              <FlatBurgerWordmark width={80} />
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-flat-blue p-2 rounded-lg hover:bg-flat-blue/10 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={2} />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex flex-col h-full pt-8 pb-6 px-6">
            <div className="flex flex-col space-y-2 flex-grow">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToSection("about");
                }}
                className="menu-item text-flat-blue font-bold tracking-wide uppercase text-xl text-left py-6 px-4 touch-manipulation hover:bg-flat-blue/10 active:bg-flat-blue/20 rounded-xl w-full smooth-transition transform hover:translate-x-2 touch-feedback"
                style={{
                  fontFamily: "Bricolage Grotesque",
                  WebkitTapHighlightColor: "transparent",
                  willChange: "background-color, transform"
                }}
              >
                {t("nav.aboutUs")}
              </button>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToSection("menu");
                }}
                className="menu-item text-flat-blue font-bold tracking-wide uppercase text-xl text-left py-6 px-4 touch-manipulation hover:bg-flat-blue/10 active:bg-flat-blue/20 rounded-xl w-full smooth-transition transform hover:translate-x-2 touch-feedback"
                style={{
                  fontFamily: "Bricolage Grotesque",
                  WebkitTapHighlightColor: "transparent",
                  willChange: "background-color, transform"
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
                className="menu-item text-flat-blue font-bold tracking-wide uppercase text-xl py-6 px-4 touch-manipulation hover:bg-flat-blue/10 active:bg-flat-blue/20 rounded-xl block smooth-transition transform hover:translate-x-2 touch-feedback"
                style={{
                  fontFamily: "Bricolage Grotesque",
                  WebkitTapHighlightColor: "transparent",
                  willChange: "background-color, transform"
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
                className="menu-item text-flat-blue font-bold tracking-wide uppercase text-xl py-6 px-4 touch-manipulation hover:bg-flat-blue/10 active:bg-flat-blue/20 rounded-xl block smooth-transition transform hover:translate-x-2 touch-feedback"
                style={{
                  fontFamily: "Bricolage Grotesque",
                  WebkitTapHighlightColor: "transparent",
                  willChange: "background-color, transform"
                }}
              >
                {t("nav.ourStory")}
              </Link>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-flat-blue/10 pt-6 mt-auto">
              {/* Language Toggle */}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center space-x-2 w-full mb-4 px-4 py-3 rounded-xl font-bold transition-all duration-300 text-lg bg-flat-blue/10 text-flat-blue hover:bg-flat-blue hover:text-flat-beige smooth-transition"
                style={{ fontFamily: "Bricolage Grotesque" }}
              >
                <Globe size={20} />
                <span>SRB/ENG</span>
              </button>

              {/* Mobile Order Button */}
              <a
                href="https://wolt.com/sr/srb/belgrade/restaurant/flat-burger11?srsltid=AfmBOop99ec-lBKnlyj1yDoIojJHB9b4a9IxwRhF7eKxQLCmfo_Gb0Ui"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="bg-flat-blue text-flat-beige py-4 px-6 rounded-xl font-bold tracking-wider uppercase text-center touch-manipulation block w-full shadow-lg hover:bg-flat-dark active:scale-95 smooth-transition transform"
                style={{
                  fontFamily: "Bricolage Grotesque",
                  WebkitTapHighlightColor: "transparent",
                  willChange: "background-color, transform"
                }}
              >
                {t("order.now")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Indicator - only show when menu is closed and on mobile */}
      {!isMenuOpen && (
        <div className="md:hidden swipe-indicator" />
      )}
    </nav>
  );
};
