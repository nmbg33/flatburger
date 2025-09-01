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
  const [startY, setStartY] = useState(0);
  const [isVerticalScroll, setIsVerticalScroll] = useState(false);
  const [slidePositions, setSlidePositions] = useState<number[]>([]);

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

  // Compute precise x positions of each slide (accounting for gap/padding)
  const computeSlidePositions = () => {
    if (!sliderRef.current) return [] as number[];
    const container = sliderRef.current;
    const children = Array.from(container.children) as HTMLElement[];
    const styles = getComputedStyle(container);
    const paddingLeft = parseFloat(styles.paddingLeft || "0");
    const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
    const isMobile = window.innerWidth < 768;

    return children.map((el) => {
      const left = el.offsetLeft - paddingLeft;
      if (isMobile) {
        // Align slides to start on mobile to avoid peeking
        return Math.max(0, Math.min(Math.round(left), Math.round(maxScroll)));
      }
      const centered = left - (container.clientWidth - el.clientWidth) / 2;
      return Math.max(0, Math.min(Math.round(centered), Math.round(maxScroll)));
    });
  };

  useEffect(() => {
    const update = () => setSlidePositions(computeSlidePositions());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Slider navigation functions
  const nextSlide = () => {
    setCurrentSlide((s) => Math.min(s + 1, burgers.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((s) => Math.max(s - 1, 0));
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    sliderRef.current.style.scrollBehavior = "auto";
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = "";
    if (sliderRef.current) {
      sliderRef.current.style.scrollBehavior = "smooth";
      const scrollPosition = sliderRef.current.scrollLeft;
      if (slidePositions.length) {
        let nearestIdx = 0;
        let minDist = Infinity;
        slidePositions.forEach((pos, i) => {
          const d = Math.abs(pos - scrollPosition);
          if (d < minDist) {
            minDist = d;
            nearestIdx = i;
          }
        });
        setCurrentSlide(nearestIdx);
      }
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setIsVerticalScroll(false);
    setStartX(touch.pageX - sliderRef.current.offsetLeft);
    setStartY(touch.pageY);
    setScrollLeft(sliderRef.current.scrollLeft);
    sliderRef.current.style.scrollBehavior = "auto";
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.pageX - startX);
    const deltaY = Math.abs(touch.pageY - startY);

    // Determine if this is vertical or horizontal scrolling
    if (!isVerticalScroll && deltaY > deltaX && deltaY > 10) {
      setIsVerticalScroll(true);
      setIsDragging(false);
      return;
    }

    // If it's horizontal scrolling, prevent default and handle the drag
    if (!isVerticalScroll && deltaX > 5) {
      e.preventDefault();
      const x = touch.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX) * 1.1;
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsVerticalScroll(false);
    if (sliderRef.current && !isVerticalScroll) {
      sliderRef.current.style.scrollBehavior = "smooth";
      const scrollPosition = sliderRef.current.scrollLeft;
      if (slidePositions.length) {
        let nearestIdx = 0;
        let minDist = Infinity;
        slidePositions.forEach((pos, i) => {
          const d = Math.abs(pos - scrollPosition);
          if (d < minDist) {
            minDist = d;
            nearestIdx = i;
          }
        });
        setCurrentSlide(nearestIdx);
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  // Auto-scroll to current slide using measured positions
  useEffect(() => {
    if (sliderRef.current && !isDragging && slidePositions.length) {
      const targetScroll = slidePositions[Math.max(0, Math.min(currentSlide, slidePositions.length - 1))];
      sliderRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  }, [currentSlide, isDragging, slidePositions]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="py-20 bg-flat-beige relative overflow-hidden"
      style={{ fontFamily: "Bricolage Grotesque" }}
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
          className={`transform transition-all duration-1000 ease-out smooth-transform ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
          style={{ willChange: "opacity, transform" }}
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
            className={`hidden md:flex absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 bg-flat-blue text-flat-beige p-2 md:p-3 rounded-full transition-all duration-300 shadow-lg smooth-transition ${
              currentSlide === 0
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-flat-dark hover:scale-110 opacity-90 hover:opacity-100"
            }`}
            style={{ willChange: "transform, opacity, background-color", fontFamily: "Bricolage Grotesque" }}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === burgers.length - 1}
            aria-label="Next burger"
            className={`hidden md:flex absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 bg-flat-blue text-flat-beige p-2 md:p-3 rounded-full transition-all duration-300 shadow-lg smooth-transition ${
              currentSlide === burgers.length - 1
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-flat-dark hover:scale-110 opacity-90 hover:opacity-100"
            }`}
            style={{ willChange: "transform, opacity, background-color", fontFamily: "Bricolage Grotesque" }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="flex gap-0 md:gap-6 px-4 md:px-12 py-4 slider-container scrollbar-hide cursor-grab prevent-select overflow-x-auto snap-x snap-mandatory"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              WebkitOverflowScrolling: "touch",
              overscrollBehaviorX: "contain",
              touchAction: "pan-x pan-y"
            }}
          >
            {burgers.map((burger, index) => (
              <div
                key={burger.id}
                className={`flex-shrink-0 snap-start slider-item transition-all duration-700 smooth-transform w-[92vw] md:w-80 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  willChange: "opacity, transform",
                  transform: "translate3d(0, 0, 0)"
                }}
              >
                {/* Burger Card with Fixed Height */}
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 group hover:-translate-y-2 transition-all duration-500 burger-card flex flex-col smooth-transform" style={{ willChange: "transform" }}>
                  {/* Image Container - Fixed Height */}
                  <div className="h-64 md:h-72 overflow-hidden relative flex-shrink-0">
                    <img
                      src={burger.imageUrl}
                      alt={t(burger.nameKey)}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 smooth-transform"
                      loading={index < 3 ? "eager" : "lazy"}
                      style={{ willChange: "transform" }}
                    />
                  </div>

                  {/* Content Container - Flex Grow */}
                  <div className="p-5 md:p-6 flex flex-col flex-grow">
                    {/* Name - Fixed Height */}
                    <h3
                      className="text-xl md:text-2xl font-black text-flat-blue mb-3 tracking-tight leading-tight h-12 md:h-14 flex items-start"
                      style={{ fontFamily: "Bricolage Grotesque" }}
                    >
                      {t(burger.nameKey)}
                    </h3>

                    {/* Description - Fixed Height */}
                    <p
                      className="text-flat-blue/80 text-sm md:text-base leading-relaxed mb-4 flex-grow"
                      style={{
                        fontFamily: "Bricolage Grotesque",
                        fontWeight: "400",
                        minHeight: "120px",
                        display: "-webkit-box",
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {t(burger.descriptionKey)}
                    </p>

                    {/* Price and Button - Fixed Position at Bottom */}
                    <div className="flex flex-col gap-3 mt-auto">
                      <span
                        className="text-xl md:text-2xl font-black text-flat-blue"
                        style={{ fontFamily: "Bricolage Grotesque" }}
                      >
                        {burger.price} {t("price.currency")}
                      </span>
                      <a
                        href="https://wolt.com/sr/srb/belgrade/restaurant/flat-burger11"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-flat-blue text-flat-beige px-4 py-3 rounded-full font-bold tracking-wider uppercase hover:bg-flat-dark transition-all duration-300 transform hover:scale-105 touch-manipulation text-center text-sm md:text-base smooth-transition"
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
          <div className="flex justify-center mt-6 gap-2">
            {burgers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-flat-blue scale-125 shadow-md"
                    : "bg-flat-blue/30 hover:bg-flat-blue/60"
                }`}
                aria-label={`Go to burger ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Add-ons Section */}
        <div
          className={`text-center transform transition-all duration-1000 ease-out smooth-transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ willChange: "opacity, transform" }}
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
                className="bg-flat-blue text-flat-beige px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-flat-dark transition-all duration-300 cursor-pointer transform hover:scale-105 smooth-transition"
                style={{
                  animationDelay: `${index * 100}ms`,
                  willChange: "transform, background-color"
                }}
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
              className="inline-block bg-flat-blue text-flat-beige px-8 md:px-12 py-4 md:py-6 rounded-full text-xl md:text-2xl font-black tracking-wider uppercase hover:bg-flat-dark transition-all duration-300 transform hover:scale-105 smooth-transition"
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
