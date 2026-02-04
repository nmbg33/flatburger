import React from "react";

interface TextMarqueeProps {
  text: string;
  className?: string;
  textClassName?: string;
}

export const TextMarquee: React.FC<TextMarqueeProps> = ({
  text,
  className,
  textClassName,
}) => {
  const repeated = Array.from({ length: 8 }, () => text);
  return (
    <div
      className={`relative overflow-hidden border-2 border-border bg-cream ${
        className || ""
      }`}
    >
      <div className="marquee-track flex w-[200%] whitespace-nowrap">
        {repeated.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={`px-6 py-2 text-xs sm:text-sm font-black uppercase tracking-[0.35em] ${
              textClassName || "text-ink"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
