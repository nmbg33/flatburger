"use client";

import React from "react";
import { TextMarquee } from "./TextMarquee";

export const OrderMarquee: React.FC = () => {
  return (
    <section className="bg-orange border-y-4 border-border">
      <a
        href="https://wolt.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:opacity-90 transition-opacity"
      >
        <TextMarquee
          text="PORUČI ODMAH"
          direction="left"
          speed={12}
          size="xl"
          separator="→"
          className="bg-orange"
          textClassName="text-cream"
          noBorder
        />
      </a>
    </section>
  );
};
