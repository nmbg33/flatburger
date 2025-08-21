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
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F9e602f8c0b5247bf861442f769eb163e?format=webp&width=800",
  },
  {
    id: "pyro",
    nameKey: "burger.pyro.name",
    descriptionKey: "burger.pyro.description",
    price: 990,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2Fc3cec27234be4f51ab1d3d79f7aee388?format=webp&width=800",
  },
  {
    id: "baconJam",
    nameKey: "burger.baconJam.name",
    descriptionKey: "burger.baconJam.description",
    price: 1190,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F291b0f2c508c466d927c3acf2d4dea65?format=webp&width=800",
  },
  {
    id: "fancy",
    nameKey: "burger.fancy.name",
    descriptionKey: "burger.fancy.description",
    price: 1290,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F52177a65630b49e2ba78eb585e9e8817?format=webp&width=800",
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

export const CleanMenu: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="menu"
      className="py-24 bg-flat-beige relative"
      style={{ fontFamily: "Bricolage Grotesque" }}
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-12"
          }`}
        >
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-black text-flat-blue mb-4 leading-tight tracking-tight"
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

        {/* Burger Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {burgers.map((burger, index) => (
            <div
              key={burger.id}
              className={`group transition-all duration-1000 ease-out ${
                isVisible
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Burger Card */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500">
                {/* Burger Photo */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={burger.imageUrl}
                    alt={t(burger.nameKey)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Burger Name */}
                  <h3
                    className="text-xl md:text-2xl lg:text-3xl font-black text-flat-blue mb-3 tracking-tight"
                    style={{ fontFamily: "Bricolage Grotesque" }}
                  >
                    {t(burger.nameKey)}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-flat-blue/80 text-sm md:text-base lg:text-lg mb-6 leading-relaxed"
                    style={{ fontFamily: "Bricolage Grotesque" }}
                  >
                    {t(burger.descriptionKey)}
                  </p>

                  {/* Price and Button */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <span
                      className="text-xl md:text-2xl lg:text-3xl font-black text-flat-blue"
                      style={{ fontFamily: "Bricolage Grotesque" }}
                    >
                      {burger.price} {t("price.currency")}
                    </span>
                    <button
                      className="w-full sm:w-auto bg-flat-blue text-flat-beige px-4 md:px-6 py-2 md:py-3 rounded-full font-bold tracking-wider uppercase hover:bg-flat-dark transition-all duration-300 transform hover:scale-105"
                      style={{ fontFamily: "Bricolage Grotesque" }}
                    >
                      {t("cta.orderNow")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div
          className={`text-center transition-all duration-1000 ease-out delay-700 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-12"
          }`}
        >
          <h3
            className="text-3xl md:text-4xl lg:text-5xl font-black text-flat-blue mb-8 tracking-tight"
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
