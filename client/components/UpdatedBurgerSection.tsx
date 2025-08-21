import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BurgerItem {
  id: string;
  nameKey: string;
  descriptionKey: string;
  price: number;
  imageUrl: string;
}

const burgers: BurgerItem[] = [
  {
    id: "classic",
    nameKey: "burger.classic.name",
    descriptionKey: "burger.classic.description",
    price: 890,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F9a69f3c9bc3f45d19c138cd92513bc9a?format=webp&width=800",
  },
  {
    id: "pyro",
    nameKey: "burger.pyro.name",
    descriptionKey: "burger.pyro.description",
    price: 990,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F81bcb01b6c9745d295052a1bc1a2d873?format=webp&width=800",
  },
  {
    id: "baconJam",
    nameKey: "burger.baconJam.name",
    descriptionKey: "burger.baconJam.description",
    price: 1190,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F98e3e09a00c342408e142764c9afb57d?format=webp&width=800",
  },
  {
    id: "fancy",
    nameKey: "burger.fancy.name",
    descriptionKey: "burger.fancy.description",
    price: 1290,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F6ca917f26ecc4ce1b727caaec7cdae45?format=webp&width=800",
  },
  {
    id: "chicken",
    nameKey: "burger.chicken.name",
    descriptionKey: "burger.chicken.description",
    price: 990,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F60065f0b142349638ce5191622432261?format=webp&width=800",
  },
  {
    id: "alabama",
    nameKey: "burger.alabama.name",
    descriptionKey: "burger.alabama.description",
    price: 1090,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F291b0f2c508c466d927c3acf2d4dea65?format=webp&width=800",
  },
];

export const UpdatedBurgerSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Slider navigation functions
  const nextSlide = () => {
    if (currentSlide < burgers.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  // Auto-scroll to current slide
  useEffect(() => {
    if (sliderRef.current) {
      const cardElement = sliderRef.current.querySelector('.slider-item') as HTMLElement;
      if (cardElement) {
        const cardWidth = cardElement.offsetWidth + 24; // card width + gap
        sliderRef.current.scrollTo({
          left: currentSlide * cardWidth,
          behavior: "smooth",
        });
      }
    }
  }, [currentSlide]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Minimal corner accents in safe areas */}
      <div className="absolute top-8 left-8 w-8 h-px bg-flat-blue/8"></div>
      <div className="absolute top-8 left-8 w-px h-8 bg-flat-blue/8"></div>

      <div className="absolute bottom-8 right-8 w-6 h-px bg-flat-blue/8"></div>
      <div className="absolute bottom-8 right-8 w-px h-6 bg-flat-blue/8"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <div
            className={`transform transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <h2
              className="text-6xl md:text-8xl lg:text-9xl font-black text-flat-blue mb-4 leading-tight tracking-tight"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {t("menu.title")}
            </h2>
            <p
              className="text-xl md:text-2xl text-flat-blue/70 font-medium"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {t("menu.subtitle")}
            </p>
          </div>
        </div>

        {/* Horizontal Slider */}
        <div className="relative mb-20" onKeyDown={handleKeyDown} tabIndex={0}>
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            aria-label="Previous burger"
            className={`absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-flat-blue text-flat-beige p-3 md:p-4 rounded-full transition-all duration-300 ${
              currentSlide === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-flat-dark hover:scale-110"
            }`}
            style={{ fontFamily: "Bricolage Grotesque" }}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === burgers.length - 1}
            aria-label="Next burger"
            className={`absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-flat-blue text-flat-beige p-3 md:p-4 rounded-full transition-all duration-300 ${
              currentSlide === burgers.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-flat-dark hover:scale-110"
            }`}
            style={{ fontFamily: "Bricolage Grotesque" }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="flex gap-6 px-8 md:px-16 py-4 slider-container scrollbar-hide cursor-grab prevent-select"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {burgers.map((burger, index) => (
              <div
                key={burger.id}
                className={`flex-shrink-0 w-80 md:w-96 slider-item transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Burger Card */}
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 group hover:-translate-y-2 transition-all duration-500 h-full">
                  {/* Image */}
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={burger.imageUrl}
                      alt={t(burger.nameKey)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading={index < 3 ? "eager" : "lazy"}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Name */}
                    <h3
                      className="text-2xl md:text-3xl font-black text-flat-blue mb-3 tracking-tight"
                      style={{ fontFamily: "Bricolage Grotesque" }}
                    >
                      {t(burger.nameKey)}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-flat-blue/80 text-base leading-relaxed mb-6"
                      style={{
                        fontFamily: "Bricolage Grotesque",
                        fontWeight: "400",
                      }}
                    >
                      {t(burger.descriptionKey)}
                    </p>

                    {/* Price and Button */}
                    <div className="flex flex-col gap-4">
                      <span
                        className="text-2xl md:text-3xl font-black text-flat-blue"
                        style={{ fontFamily: "Bricolage Grotesque" }}
                      >
                        {burger.price} {t("price.currency")}
                      </span>
                      <a
                        href="https://wolt.com/sr/srb/belgrade/restaurant/flat-burger11"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-flat-blue text-flat-beige px-6 py-3 rounded-full font-bold tracking-wider uppercase hover:bg-flat-dark transition-all duration-300 transform hover:scale-105 touch-manipulation text-center"
                        style={{ fontFamily: "Bricolage Grotesque" }}
                      >
                        {t("cta.orderNow")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {burgers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-flat-blue scale-125"
                    : "bg-flat-blue/30 hover:bg-flat-blue/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Add-ons Section */}
        <div
          className={`text-center transform transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <h3
            className="text-4xl md:text-5xl font-black text-flat-blue mb-8 tracking-tight"
            style={{ fontFamily: "Bricolage Grotesque" }}
          >
            {t("menu.addOns")}
          </h3>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto mb-12">
            {[
              { key: "addon.pomfrit", price: 290 },
              { key: "addon.batat", price: 390 },
              { key: "addon.onionRings", price: 350 },
            ].map((addon, index) => (
              <div
                key={addon.key}
                className="bg-flat-blue text-flat-beige px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-flat-dark transition-all duration-300 cursor-pointer transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span
                  className="font-bold text-base md:text-lg tracking-wider"
                  style={{ fontFamily: "Bricolage Grotesque" }}
                >
                  {t(addon.key)} — {addon.price} {t("price.currency")}
                </span>
              </div>
            ))}
          </div>

          {/* Menu CTA */}
          <div className="mt-16">
            <a
              href="https://wolt.com/sr/srb/belgrade/restaurant/flat-burger11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-flat-blue text-flat-beige px-8 md:px-12 py-4 md:py-6 rounded-full text-xl md:text-2xl font-black tracking-wider uppercase hover:bg-flat-dark transition-all duration-300 transform hover:scale-105"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {t("menu.seeMenu")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
