import React from "react";

interface TextMarqueeProps {
  text: string;
  direction?: "left" | "right";
  speed?: number; // seconds for one cycle
  size?: "sm" | "md" | "lg" | "xl";
  separator?: string;
  className?: string;
  textClassName?: string;
  noBorder?: boolean;
}

const sizeClasses = {
  sm: "text-xs sm:text-sm py-2 px-4",
  md: "text-sm sm:text-base py-3 px-6",
  lg: "text-lg sm:text-2xl md:text-3xl py-4 px-8",
  xl: "text-2xl sm:text-4xl md:text-5xl py-5 px-10",
};

export const TextMarquee: React.FC<TextMarqueeProps> = ({
  text,
  direction = "left",
  speed = 18,
  size = "sm",
  separator = "✦",
  className = "",
  textClassName = "",
  noBorder = false,
}) => {
  const repeated = Array.from({ length: 10 }, () => text);
  const trackClass = direction === "left" ? "marquee-track" : "marquee-track-right";
  const borderClass = noBorder ? "" : "border-2 border-border";

  return (
    <div
      className={`relative overflow-hidden ${borderClass} ${className}`}
    >
      <div
        className={`${trackClass} flex w-[200%] whitespace-nowrap`}
        style={{ animationDuration: `${speed}s` }}
      >
        {repeated.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={`font-black uppercase tracking-[0.25em] ${sizeClasses[size]} ${textClassName || "text-ink"}`}
          >
            {item}
            <span className="mx-4 opacity-40">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
