import React, { useEffect, useRef, useState } from "react";

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
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Urban sticker elements
  const urbanStickers = [
    { text: "FRESH", size: "text-2xl", rotation: "-rotate-12", delay: "0ms" },
    { text: "HEAT", size: "text-3xl", rotation: "rotate-6", delay: "200ms" },
    { text: "REAL", size: "text-xl", rotation: "-rotate-3", delay: "400ms" },
    { text: "VIBES", size: "text-2xl", rotation: "rotate-12", delay: "600ms" },
    { text: "FLAT", size: "text-2xl", rotation: "rotate-3", delay: "1000ms" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-flat-beige overflow-hidden"
    >
      {/* Floating urban stickers */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
          {urbanStickers.map((sticker, index) => (
            <div
              key={index}
              className={`
                transform transition-all duration-1000 ease-out
                ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }
                ${sticker.rotation}
                animate-street-float
              `}
              style={{
                transitionDelay: sticker.delay,
                animationDelay: `${index * 0.5}s`,
              }}
            >
              <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg border-2 border-flat-blue/20">
                <span
                  className={`${sticker.size} font-black text-flat-blue tracking-wider`}
                  style={{ fontFamily: "Bricolage Grotesque" }}
                >
                  {sticker.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Clean geometric accents */}
        <div className="absolute top-1/4 left-1/6 w-3 h-3 bg-flat-blue/10 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-flat-blue/15 rounded-full"></div>
        <div className="absolute top-2/3 left-1/3 w-4 h-4 bg-flat-blue/10 rotate-45"></div>
      </div>
    </section>
  );
};
