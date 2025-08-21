import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

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
  const [visibleItems, setVisibleItems] = useState<Set<number>>(
    new Set([0, 1, 2, 3, 4, 5]),
  ); // Ensure all content is visible for Builder.io interface

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0",
            );
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 },
    );

    const elements = sectionRef.current?.querySelectorAll("[data-index]");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
        <div className="text-center mb-16" data-index="0">
          <div
            className={`transform transition-all duration-1000 ease-out ${
              visibleItems.has(0)
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

        {/* Burger Grid - Pretty Patty style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto mb-20">
          {burgers.map((burger, index) => (
            <div
              key={burger.id}
              data-index={index + 1}
              className={`group transform transition-all duration-1000 ease-out ${
                visibleItems.has(index + 1)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Burger Card with hover animations */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-gray-100">
                {/* Image with hover effects */}
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={burger.imageUrl}
                    alt={t(burger.nameKey)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Subtle overlay effect on hover */}
                  <div className="absolute inset-0 bg-flat-blue/0 group-hover:bg-flat-blue/5 transition-colors duration-700"></div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  {/* Name */}
                  <h3
                    className="text-xl md:text-2xl lg:text-3xl font-black text-flat-blue mb-3 tracking-tight"
                    style={{ fontFamily: "Bricolage Grotesque" }}
                  >
                    {t(burger.nameKey)}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-flat-blue/80 text-sm md:text-base lg:text-lg mb-4 lg:mb-6 leading-relaxed"
                    style={{
                      fontFamily: "Bricolage Grotesque",
                      fontWeight: "400",
                    }}
                  >
                    {t(burger.descriptionKey)}
                  </p>

                  {/* Price and Button */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <span
                      className="text-xl md:text-2xl lg:text-3xl font-black text-flat-blue"
                      style={{ fontFamily: "Bricolage Grotesque" }}
                    >
                      {burger.price} {t("price.currency")}
                    </span>
                    <a
                      href="https://wolt.com/sr/srb/belgrade/restaurant/flat-burger11"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-flat-blue text-flat-beige px-4 md:px-6 py-2 md:py-3 rounded-full font-bold tracking-wider uppercase hover:bg-flat-dark transition-all duration-300 transform hover:scale-105 touch-manipulation text-center text-sm md:text-base"
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

        {/* Add-ons Section */}
        <div
          data-index={burgers.length + 1}
          className={`text-center transform transition-all duration-1000 ease-out ${
            visibleItems.has(burgers.length + 1)
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
                className="bg-flat-blue text-flat-beige px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-flat-dark transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-xl"
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
              className="inline-block bg-flat-blue text-flat-beige px-8 md:px-12 py-4 md:py-6 rounded-full text-xl md:text-2xl font-black tracking-wider uppercase hover:bg-flat-dark transition-all duration-300 transform hover:scale-105 shadow-xl"
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
