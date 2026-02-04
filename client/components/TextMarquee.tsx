import React from "react";
import { useReducedMotion } from "framer-motion";

interface TextMarqueeProps {
  text: string;
  className?: string;
}

export const TextMarquee: React.FC<TextMarqueeProps> = ({
  text,
  className,
}) => {
  const reduceMotion = useReducedMotion();
  const items = Array.from({ length: 6 }, () => text);

  if (reduceMotion) {
    return (
      <div className={`flex flex-wrap justify-center gap-2 ${className || ""}`}>
        {items.slice(0, 3).map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-[10px] sm:text-xs font-bold tracking-[0.35em] uppercase text-flat-blue/35"
            style={{ fontFamily: "Bricolage Grotesque" }}
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden border-y border-flat-blue/10 ${className || ""}`}
      aria-label={text}
    >
      <div className="flex whitespace-nowrap animate-infinite-scroll">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="px-6 py-2 text-[10px] sm:text-xs font-bold tracking-[0.35em] uppercase text-flat-blue/35"
            style={{ fontFamily: "Bricolage Grotesque" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
