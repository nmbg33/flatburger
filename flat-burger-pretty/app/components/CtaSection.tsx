"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { revealContainer, revealItem, hoverLift } from "../lib/motion";

export const CtaSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const reveal = revealContainer(0.08);
  const item = revealItem(10);
  const lift = hoverLift;

  return (
    <section id="order" className="border-t-4 border-border bg-primary py-20">
      <motion.div
        className="mx-auto max-w-5xl px-4 text-center text-cream"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20%" }}
      >
        <motion.h2
          className="text-4xl sm:text-6xl font-black uppercase"
          variants={item}
        >
          Order loud. Eat proud.
        </motion.h2>
        <motion.p
          className="mt-4 text-sm font-mono uppercase tracking-[0.3em] text-cream/80"
          variants={item}
        >
          Fast pickup. Fast delivery.
        </motion.p>
        <motion.a
          href="#menu"
          className="mt-8 inline-flex border-2 border-cream px-8 py-3 text-xs font-black uppercase tracking-[0.3em]"
          variants={item}
          whileHover={!reduceMotion ? lift.whileHover : undefined}
          whileTap={!reduceMotion ? lift.whileTap : undefined}
        >
          See Menu
        </motion.a>
      </motion.div>
    </section>
  );
};
