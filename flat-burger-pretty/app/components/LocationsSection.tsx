"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { revealContainer, revealItem, hoverLift } from "../lib/motion";

export const LocationsSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const reveal = revealContainer(0.08);
  const item = revealItem(10);
  const lift = hoverLift;

  return (
    <section id="locations" className="border-t-4 border-border bg-cream py-24">
      <motion.div
        className="mx-auto max-w-6xl px-4"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20%" }}
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-black uppercase"
          variants={item}
        >
          Belgrade, Decanska 4
        </motion.h2>
        <motion.p
          className="mt-3 text-base font-mono text-ink/70"
          variants={item}
        >
          Open daily. Walk in loud, leave happy.
        </motion.p>
        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-2"
          variants={reveal}
        >
          <motion.div
            className="border-4 border-border bg-cream p-6"
            variants={item}
            whileHover={!reduceMotion ? lift.whileHover : undefined}
            whileTap={!reduceMotion ? lift.whileTap : undefined}
          >
            <p className="text-xs font-black uppercase tracking-[0.35em] text-ink/50">
              Hours
            </p>
            <p className="mt-4 text-lg font-black uppercase">
              Mon–Fri: 12:00–23:00
            </p>
            <p className="text-lg font-black uppercase">
              Sat–Sun: 15:00–23:00
            </p>
          </motion.div>
          <motion.div
            className="border-4 border-border bg-cream p-6"
            variants={item}
            whileHover={!reduceMotion ? lift.whileHover : undefined}
            whileTap={!reduceMotion ? lift.whileTap : undefined}
          >
            <p className="text-xs font-black uppercase tracking-[0.35em] text-ink/50">
              Contact
            </p>
            <p className="mt-4 text-lg font-black uppercase">
              +381 66 809 6326
            </p>
            <p className="text-lg font-black uppercase">
              flatburgerbg@gmail.com
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
