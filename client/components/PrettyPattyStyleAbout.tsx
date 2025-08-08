import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const PrettyPattyStyleAbout: React.FC = () => {
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
      { threshold: 0.3 }
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
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-flat-blue relative overflow-hidden"
    >
      {/* Pretty Patty-style background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-[20vw] font-black text-flat-cream/5 whitespace-nowrap animate-scroll-right-slow">
          BELGRADE BELGRADE BELGRADE
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Title */}
        <div className={`transform transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-flat-cream mb-12 leading-tight tracking-tight">
            {t('about.title')}
          </h2>
        </div>

        {/* Description */}
        <div className={`transform transition-all duration-1000 ease-out delay-300 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          <p className="text-xl md:text-2xl lg:text-3xl text-flat-cream/95 leading-relaxed font-medium max-w-4xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        {/* Decorative element */}
        <div className={`mt-16 transform transition-all duration-1000 ease-out delay-600 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          <div className="flex justify-center items-center space-x-8">
            <div className="w-20 h-1 bg-flat-cream"></div>
            <div className="w-4 h-4 bg-flat-cream rounded-full"></div>
            <div className="w-20 h-1 bg-flat-cream"></div>
          </div>
        </div>
      </div>

      {/* Pretty Patty-style sticker */}
      <div className="absolute bottom-12 right-8 md:bottom-16 md:right-12 z-20">
        <div className="bg-flat-cream text-flat-blue px-4 py-2 rounded-full transform rotate-6 shadow-lg">
          <span className="text-sm font-black tracking-wider uppercase">REAL</span>
        </div>
      </div>
    </section>
  );
};
