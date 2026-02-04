"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { revealContainer, revealItem } from "../lib/motion";

export const StorySection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const reveal = revealContainer(0.08);
  const item = revealItem(10);

  return (
    <section id="story" className="border-t-4 border-border bg-cream py-24">
      <motion.div
        className="mx-auto max-w-6xl px-4"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20%" }}
      >
        <motion.p
          className="text-xs font-black uppercase tracking-[0.4em] text-ink/60"
          variants={item}
        >
          Our Story
        </motion.p>
        <motion.h2
          className="mt-4 text-3xl sm:text-5xl font-black uppercase"
          variants={item}
        >
          Born in Belgrade. Built for the block.
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl text-base font-mono text-ink/70"
          variants={item}
        >
          We started with a hot plancha, a clean recipe, and a promise: keep it
          bold, keep it honest, keep it fast. Everything else is extra.
        </motion.p>
        {!reduceMotion && (
          <motion.div
            className="mt-10 h-1 w-24 bg-border"
            variants={item}
          />
        )}
      </motion.div>
    </section>
  );
};
