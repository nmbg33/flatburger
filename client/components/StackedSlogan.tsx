import React from "react";
import { useReducedMotion } from "framer-motion";

interface StackedSloganProps {
  text: string;
  repeats?: number;
  className?: string;
}

export const StackedSlogan: React.FC<StackedSloganProps> = ({
  text,
  repeats = 7,
  className,
}) => {
  const reduceMotion = useReducedMotion();
  const lines = Array.from({ length: repeats }, (_, i) => `${text}-${i}`);

  return (
    <div
      className={`pointer-events-none select-none ${className || ""}`}
      aria-hidden="true"
    >
      {lines.map((key, i) => (
        <div
          key={key}
          className="text-[12px] sm:text-sm md:text-base font-black uppercase tracking-[0.4em] text-flat-blue/10"
          style={{
            fontFamily: "Bricolage Grotesque",
            opacity: reduceMotion ? 0.12 : 0.1 + i * 0.01,
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
};
