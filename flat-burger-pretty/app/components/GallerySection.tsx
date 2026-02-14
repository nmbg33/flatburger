"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { revealContainer, revealItem } from "../lib/motion";

// Placeholder images - replace with actual restaurant/food photos
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop",
    alt: "Smash burger close-up",
    span: "col-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=600&fit=crop",
    alt: "Burger with fries",
    span: "col-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=600&fit=crop",
    alt: "Restaurant interior",
    span: "col-span-1 md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=600&fit=crop",
    alt: "Cheese dripping from burger",
    span: "col-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&h=600&fit=crop",
    alt: "Stacked burgers",
    span: "col-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&h=600&fit=crop",
    alt: "Burger being prepared",
    span: "col-span-1",
  },
];

export const GallerySection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const reveal = revealContainer(0.1);
  const item = revealItem(15);

  return (
    <section id="gallery" className="border-t-4 border-border bg-cream py-20">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-10 text-center"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20%" }}
        >
          <motion.p
            className="text-xs font-black uppercase tracking-[0.4em] text-ink/60"
            variants={item}
          >
            Atmosfera
          </motion.p>
          <motion.h2
            className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black uppercase"
            variants={item}
          >
            The vibe is real
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className={`${image.span} relative overflow-hidden border-4 border-border bg-ink/5 img-hover`}
              style={{ aspectRatio: image.span.includes("row-span-2") ? "1/1" : "1/1" }}
              variants={item}
              transition={{ delay: reduceMotion ? 0 : index * 0.08 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-orange/0 transition-colors duration-300 group-hover:bg-orange/20" />
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          className="mt-10 text-center"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.a
            href="https://instagram.com/flatburger"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-border px-6 py-3 text-xs font-black uppercase tracking-[0.3em] transition-all duration-200 hover:bg-ink hover:text-cream"
            variants={item}
          >
            <span>Follow @flatburger</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
