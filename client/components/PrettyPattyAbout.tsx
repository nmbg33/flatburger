import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const PrettyPattyAbout: React.FC = () => {
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
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-flat-blue relative overflow-hidden"
    >
      {/* Background Moving Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <div className="text-[12vw] font-black text-flat-cream whitespace-nowrap animate-slide-right">
          BORN IN BELGRADE BORN IN BELGRADE
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Large Text Animation */}
        <div className={`transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-12'
        }`}>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-flat-cream mb-8 leading-tight">
            {t('about.title')}
          </h2>
        </div>

        {/* Description with staggered animation */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ease-out delay-300 ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-12'
        }`}>
          <p className="text-2xl md:text-3xl lg:text-4xl text-flat-cream/90 leading-relaxed font-medium">
            {t('about.description')}
          </p>
        </div>

        {/* Floating Elements */}
        <div className={`mt-16 flex justify-center items-center space-x-12 transition-all duration-1000 ease-out delay-600 ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-12'
        }`}>
          <div className="w-24 h-1 bg-flat-cream animate-float"></div>
          <div className="text-6xl animate-bounce">🍔</div>
          <div className="w-24 h-1 bg-flat-cream animate-float" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </section>
  );
};
