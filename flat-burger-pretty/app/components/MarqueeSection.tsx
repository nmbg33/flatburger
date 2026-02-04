import React from "react";
import { TextMarquee } from "./TextMarquee";

export const MarqueeSection: React.FC = () => {
  return (
    <section className="border-y-4 border-border bg-primary py-6">
      <div className="mx-auto max-w-6xl px-4">
        <TextMarquee
          text="BEST BURGER IN TOWN — FRESH INGREDIENTS"
          className="bg-primary border-cream"
          textClassName="text-cream"
        />
      </div>
    </section>
  );
};
