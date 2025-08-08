import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-flat-blue relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-10 left-10 w-20 h-20 border-4 border-flat-cream rounded-full animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-16 h-16 border-4 border-flat-cream rounded-full animate-spin"
          style={{ animationDuration: "15s", animationDirection: "reverse" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-12 h-12 border-4 border-flat-cream rounded-full animate-spin"
          style={{ animationDuration: "25s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-flat-cream mb-8 tracking-wider uppercase">
              {t("about.title")}
            </h2>
          </div>

          {/* Description */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-flat-cream/90 leading-relaxed font-medium">
              {t("about.description")}
            </p>
          </div>

          {/* Decorative Elements */}
          <div
            className={`mt-12 flex justify-center space-x-8 transform transition-all duration-1000 delay-600 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="w-16 h-1 bg-flat-cream rounded-full"></div>
            <div className="w-8 h-8 bg-flat-cream rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-flat-blue rounded-full"></div>
            </div>
            <div className="w-16 h-1 bg-flat-cream rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
