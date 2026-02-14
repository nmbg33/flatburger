"use client";

import React from "react";
import { motion } from "framer-motion";
import { revealContainer, revealItem } from "../lib/motion";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/flatburger",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@flatburger",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
      </svg>
    ),
  },
];

export const FooterReveal: React.FC = () => {
  const reveal = revealContainer(0.08);
  const item = revealItem(8);
  const currentYear = new Date().getFullYear();

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
          {/* Main Content */}
          <div className="grid gap-12 md:grid-cols-2">
            {/* Left Side - Branding */}
            <div>
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.9]"
                variants={item}
              >
                Flat Burger.
                <br />
                <span className="text-orange">Always loud.</span>
              </motion.h2>
              <motion.p
                className="mt-6 text-base font-mono text-ink/70"
                variants={item}
              >
                Real burgers for real people.
                <br />
                Made with love in Belgrade.
              </motion.p>

              {/* Social Links */}
              <motion.div className="mt-8 flex gap-4" variants={item}>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 border-2 border-border bg-cream hover:bg-ink hover:text-cream transition-colors duration-200"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Right Side - Links */}
            <div className="flex flex-col justify-between">
              <motion.div className="space-y-3" variants={item}>
                <a
                  href="#menu"
                  className="block text-lg font-black uppercase tracking-wider hover:text-orange transition-colors"
                >
                  Menu
                </a>
                <a
                  href="#gallery"
                  className="block text-lg font-black uppercase tracking-wider hover:text-orange transition-colors"
                >
                  Gallery
                </a>
                <a
                  href="#locations"
                  className="block text-lg font-black uppercase tracking-wider hover:text-orange transition-colors"
                >
                  Location
                </a>
                <a
                  href="#story"
                  className="block text-lg font-black uppercase tracking-wider hover:text-orange transition-colors"
                >
                  Our Story
                </a>
              </motion.div>

              <motion.div className="mt-8" variants={item}>
                <p className="text-sm font-mono text-ink/60">
                  Dečanska 4, Stari Grad
                  <br />
                  11000 Belgrade, Serbia
                </p>
                <a
                  href="tel:+381668096326"
                  className="block mt-2 text-sm font-mono text-ink/60 hover:text-orange transition-colors"
                >
                  +381 66 809 6326
                </a>
              </motion.div>
            </div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            className="mt-16 pt-8 border-t-2 border-border flex flex-col sm:flex-row justify-between items-center gap-4"
            variants={item}
          >
            <p className="text-xs font-mono text-ink/50 uppercase tracking-wider">
              © {currentYear} Flat Burger. All rights reserved.
            </p>
            <a
              href="#hero"
              className="text-xs font-black uppercase tracking-[0.3em] hover:text-orange transition-colors flex items-center gap-2"
            >
              Back to Top
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.footer>
    </section>
  );
};
