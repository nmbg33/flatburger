"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { revealContainer, revealItem } from "../lib/motion";
import { WordReveal } from "./WordReveal";

export const Statement: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const reveal = revealContainer(0.1);
  const item = revealItem(12);

  return (
    <section id="about" className="bg-cream py-24">
      <motion.div
        className="mx-auto max-w-5xl px-4 text-center"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20%" }}
      >
        <motion.p
          className="text-xs font-black uppercase tracking-[0.4em] text-ink/60"
          variants={item}
        >
          Flat Burger
        </motion.p>
        <motion.div
          className="mt-6 text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-tight"
          variants={item}
        >
          <WordReveal text="Simple done loud. Built for the block." />
        </motion.div>
        <motion.p
          className="mt-6 text-base sm:text-lg font-mono text-ink/70"
          variants={item}
        >
          Hot plancha, quality beef, and sauces that punch. We keep it honest,
          fast, and bold—just how a neighborhood burger should feel.
        </motion.p>
        {!reduceMotion && (
          <motion.div
            className="mx-auto mt-10 h-1 w-24 bg-border"
            variants={item}
          />
        )}
      </motion.div>
    </section>
  );
};
