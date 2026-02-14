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
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          className="mb-12"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20%" }}
        >
          <motion.p
            className="text-xs font-black uppercase tracking-[0.4em] text-ink/60"
            variants={item}
          >
            Gde smo
          </motion.p>
          <motion.h2
            className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black uppercase"
            variants={item}
          >
            Find Us
          </motion.h2>
        </motion.div>

        {/* Location Card - Image + Info */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 border-4 border-border overflow-hidden"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          {/* Image Side */}
          <motion.div
            className="relative aspect-[4/3] md:aspect-auto overflow-hidden img-hover"
            variants={item}
          >
            <img
              src="https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800&h=600&fit=crop"
              alt="Flat Burger restaurant exterior"
              className="h-full w-full object-cover"
            />
            {/* Location Badge */}
            <div className="absolute bottom-4 left-4 bg-orange text-cream px-4 py-2 text-xs font-black uppercase tracking-wider border-2 border-border">
              Stari Grad
            </div>
          </motion.div>

          {/* Info Side */}
          <div className="p-8 flex flex-col justify-center">
            <motion.h3
              className="text-2xl sm:text-3xl font-black uppercase"
              variants={item}
            >
              Belgrade, Dečanska 4
            </motion.h3>
            <motion.p
              className="mt-2 text-sm font-mono text-ink/70"
              variants={item}
            >
              Open daily. Walk in loud, leave happy.
            </motion.p>

            <motion.div className="mt-8 space-y-6" variants={reveal}>
              {/* Address */}
              <motion.div variants={item}>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-ink/50 mb-2">
                  Adresa
                </p>
                <p className="text-base font-black uppercase">
                  Dečanska 4, Stari Grad
                </p>
                <p className="text-base font-black uppercase text-ink/70">
                  11000 Beograd, Srbija
                </p>
              </motion.div>

              {/* Hours */}
              <motion.div variants={item}>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-ink/50 mb-2">
                  Radno vreme
                </p>
                <p className="text-base font-black uppercase">
                  Pon–Pet: 12:00–23:00
                </p>
                <p className="text-base font-black uppercase">
                  Sub–Ned: 15:00–23:00
                </p>
              </motion.div>

              {/* Contact */}
              <motion.div variants={item}>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-ink/50 mb-2">
                  Kontakt
                </p>
                <a
                  href="tel:+381668096326"
                  className="block text-base font-black uppercase hover:text-orange transition-colors"
                >
                  +381 66 809 6326
                </a>
                <a
                  href="mailto:flatburgerbg@gmail.com"
                  className="block text-base font-black uppercase hover:text-orange transition-colors"
                >
                  flatburgerbg@gmail.com
                </a>
              </motion.div>
            </motion.div>

            {/* CTA */}
            <motion.a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 border-2 border-border bg-ink text-cream px-6 py-3 text-xs font-black uppercase tracking-[0.3em] transition-all duration-200 hover:bg-orange w-fit"
              variants={item}
              whileHover={!reduceMotion ? lift.whileHover : undefined}
              whileTap={!reduceMotion ? lift.whileTap : undefined}
            >
              <span>Get Directions</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
