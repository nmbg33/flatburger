"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "../lib/motion";

interface WordRevealProps {
  text: string;
  className?: string;
}

export const WordReveal: React.FC<WordRevealProps> = ({ text, className }) => {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <div className={`flex flex-wrap justify-center gap-x-3 ${className || ""}`}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.5, delay: index * 0.04, ease: easeOut }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};
