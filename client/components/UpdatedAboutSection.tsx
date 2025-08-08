import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const UpdatedAboutSection: React.FC = () => {
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
      data-section="about"
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-flat-blue relative overflow-hidden"
    >
      {/* Clean background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/6 w-40 h-40 border-4 border-flat-beige rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/6 w-24 h-24 border-4 border-flat-beige rounded-full"></div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Title */}
        <div className={`transform transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-flat-beige mb-12 leading-tight tracking-tight" style={{fontFamily: 'Bricolage Grotesque'}}>
            {t('about.title')}
          </h2>
        </div>

        {/* Description */}
        <div className={`transform transition-all duration-1000 ease-out delay-300 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          <p className="text-xl md:text-2xl lg:text-3xl text-flat-beige/95 leading-relaxed font-medium max-w-4xl mx-auto" style={{fontFamily: 'Bricolage Grotesque', fontWeight: '400'}}>
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
            <div className="w-20 h-1 bg-flat-beige"></div>
            <div className="w-4 h-4 bg-flat-beige rounded-full"></div>
            <div className="w-20 h-1 bg-flat-beige"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
