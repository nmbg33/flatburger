"use client";

import React from "react";
import { motion } from "framer-motion";
import { revealContainer, revealItem } from "../lib/motion";

export const FooterReveal: React.FC = () => {
  const reveal = revealContainer(0.08);
  const item = revealItem(8);

  return (
    <section className="relative bg-cream">
      <div className="h-[60vh]" />
      <motion.footer
        className="sticky bottom-0 border-t-4 border-border bg-cream"
        variants={reveal}
        initial="hidden"
        whileInView="show"
      >
        <div className="mx-auto max-w-6xl px-4 py-16">
          <motion.h2
            className="text-4xl sm:text-6xl font-black uppercase"
            variants={item}
          >
            Flat Burger. Always loud.
          </motion.h2>
          <motion.p
            className="mt-4 text-base font-mono text-ink/70"
            variants={item}
          >
            Dečanska 4 — Belgrade
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap gap-4" variants={item}>
            <a
              href="#menu"
              className="border-2 border-border px-5 py-2 text-xs font-black uppercase tracking-[0.3em]"
            >
              Menu
            </a>
            <a
              href="#locations"
              className="border-2 border-border px-5 py-2 text-xs font-black uppercase tracking-[0.3em]"
            >
              Locations
            </a>
            <a
              href="#hero"
              className="border-2 border-border px-5 py-2 text-xs font-black uppercase tracking-[0.3em]"
            >
              Back to Top
            </a>
          </motion.div>
        </div>
      </motion.footer>
    </section>
  );
};
