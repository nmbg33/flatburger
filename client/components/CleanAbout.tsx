import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const CleanAbout: React.FC = () => {
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
      ref={sectionRef}
      data-section="about"
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-flat-blue relative"
    >
      {/* Clean geometric background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/6 w-40 h-40 border-4 border-flat-cream rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/6 w-24 h-24 border-4 border-flat-cream rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-flat-cream rounded-full"></div>
      </div>

      {/* Floating Sticker */}
      <div className="absolute bottom-12 left-8 md:bottom-16 md:left-12 z-20">
        <div className="bg-flat-cream text-flat-blue px-3 py-2 rounded-full transform -rotate-6 shadow-lg animate-gentle-float">
          <span className="text-xs font-black tracking-wider uppercase">RAW</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Title */}
        <div className={`transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-12'
        }`}>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-flat-cream mb-12 leading-tight tracking-tight">
            {t('about.title')}
          </h2>
        </div>

        {/* Description */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ease-out delay-300 ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-12'
        }`}>
          <p className="text-xl md:text-2xl lg:text-3xl text-flat-cream/95 leading-relaxed font-medium">
            {t('about.description')}
          </p>
        </div>

        {/* Clean decorative element */}
        <div className={`mt-16 transition-all duration-1000 ease-out delay-600 ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-12'
        }`}>
          <div className="flex justify-center items-center space-x-8">
            <div className="w-20 h-1 bg-flat-cream"></div>
            <div className="w-4 h-4 bg-flat-cream rounded-full"></div>
            <div className="w-20 h-1 bg-flat-cream"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
