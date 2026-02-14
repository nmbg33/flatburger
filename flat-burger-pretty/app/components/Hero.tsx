"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { revealContainer, revealItem, hoverLift } from "../lib/motion";
import { TextMarquee } from "./TextMarquee";
import { StackedSlogan } from "./StackedSlogan";

export const Hero: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const x = useSpring(mvX, { stiffness: 80, damping: 20 });
  const y = useSpring(mvY, { stiffness: 80, damping: 20 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -120]);
  const reveal = revealContainer(0.12);
  const item = revealItem(12);
  const ctaMotion = hoverLift;

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = event.clientX - rect.left - rect.width / 2;
    const dy = event.clientY - rect.top - rect.height / 2;
    mvX.set(dx * 0.05);
    mvY.set(dy * 0.05);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMove}
      className="relative min-h-screen overflow-hidden bg-cream pt-28"
    >
      <div className="absolute inset-0 border-b-4 border-border" />
      <div className="absolute top-10 left-6">
        <StackedSlogan text="BURGER • BUT • FLATTER" repeats={7} />
      </div>
      <motion.div
        className="mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-4 text-center"
        variants={reveal}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black uppercase leading-[0.82] tracking-tight"
          variants={item}
          style={{ y: titleY }}
        >
          Flat Burger
        </motion.h1>
        <motion.p
          className="mt-4 max-w-2xl text-xs sm:text-sm font-mono uppercase tracking-[0.35em] text-ink/70"
          variants={item}
        >
          Real burgers for real people
        </motion.p>
        <motion.div className="mt-8 w-full max-w-3xl" variants={item}>
          <TextMarquee
            text="SMASHED • SAUCED • SERVED FAST"
            className="border-border"
            textClassName="text-ink"
          />
        </motion.div>
        <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-4" variants={item}>
          <motion.a
            href="#menu"
            className="border-2 border-border bg-orange px-8 py-3 text-xs font-black uppercase tracking-[0.3em] text-cream"
            {...ctaMotion}
          >
            Explore Menu
          </motion.a>
          <motion.a
            href="#locations"
            className="border-2 border-border bg-cream px-8 py-3 text-xs font-black uppercase tracking-[0.3em] text-ink"
            {...ctaMotion}
          >
            Find Us
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Double Marquee Section - Pretty Patty style */}
      <div className="absolute bottom-0 left-0 right-0">
        <TextMarquee
          text="REAL BURGERS FOR REAL PEOPLE"
          direction="left"
          speed={25}
          size="lg"
          separator="•"
          className="bg-cream border-t-4 border-b-0 border-border"
          textClassName="text-ink"
          noBorder
        />
        <TextMarquee
          text="STARI GRAD • BEOGRAD • FLAT BURGER"
          direction="right"
          speed={30}
          size="md"
          separator="✦"
          className="bg-cream/80 border-b-4 border-border"
          textClassName="text-ink/60"
          noBorder
        />
      </div>

      <motion.div
        className="absolute right-[8%] top-[25%] h-24 w-24 rounded-full border-4 border-border bg-cream flex items-center justify-center text-[10px] font-black uppercase tracking-[0.2em]"
        style={{ x, y }}
      >
        Smash
      </motion.div>
      <motion.div
        className="absolute left-[10%] bottom-[18%] h-28 w-28 rounded-[999px] border-4 border-border bg-orange text-cream flex items-center justify-center text-[10px] font-black uppercase tracking-[0.2em]"
        style={{ x, y }}
      >
        Flat
      </motion.div>
    </section>
  );
};
