import React, { useEffect, useRef, useState } from 'react';

export const UrbanStickerWall: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Urban sticker elements
  const urbanStickers = [
    { text: 'FRESH', size: 'text-2xl', rotation: '-rotate-12', delay: '0ms' },
    { text: 'FLAT', size: 'text-3xl', rotation: 'rotate-6', delay: '200ms' },
    { text: 'FIRE', size: 'text-xl', rotation: '-rotate-3', delay: '400ms' },
    { text: 'URBAN', size: 'text-2xl', rotation: 'rotate-12', delay: '600ms' },
    { text: 'STYLE', size: 'text-xl', rotation: '-rotate-6', delay: '800ms' },
    { text: 'STREET', size: 'text-2xl', rotation: 'rotate-3', delay: '1000ms' },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 bg-flat-beige overflow-hidden"
    >
      {/* Graffiti background texture */}
      <div className="absolute inset-0 urban-graffiti-bg opacity-40"></div>
      
      {/* Floating urban stickers */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
          {urbanStickers.map((sticker, index) => (
            <div
              key={index}
              className={`
                transform transition-all duration-1000 ease-out
                ${isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
                }
                ${sticker.rotation}
                animate-street-float
                urban-sticker
              `}
              style={{ 
                transitionDelay: sticker.delay,
                animationDelay: `${index * 0.5}s`
              }}
            >
              <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg border-2 border-flat-blue/20 shadow-lg">
                <span 
                  className={`${sticker.size} font-black text-flat-blue tracking-wider`}
                  style={{ fontFamily: 'Bricolage Grotesque' }}
                >
                  {sticker.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle sauce splatter effects */}
        <div className="absolute top-1/4 left-1/6 w-12 h-8 sauce-drip opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/4 w-8 h-6 sauce-drip opacity-15"></div>
        <div className="absolute top-2/3 left-1/3 w-6 h-4 sauce-drip opacity-25"></div>
      </div>
    </section>
  );
};
