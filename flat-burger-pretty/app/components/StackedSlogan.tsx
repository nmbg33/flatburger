import React from "react";

interface StackedSloganProps {
  text: string;
  repeats?: number;
}

export const StackedSlogan: React.FC<StackedSloganProps> = ({
  text,
  repeats = 8,
}) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: repeats }).map((_, index) => (
        <div
          key={`${text}-${index}`}
          className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-ink/15"
        >
          {text}
        </div>
      ))}
    </div>
  );
};
