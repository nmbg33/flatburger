"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const navItems = ["Menu", "About", "Locations", "Story", "Order"];

export const SiteHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 border-b-2 border-border bg-cream/95 backdrop-blur-sm transition-all ${
          isScrolled ? "py-2" : "py-4"
        }`}
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full border-2 border-border bg-orange text-cream flex items-center justify-center text-xs font-black uppercase">
              FB
            </div>
            <div className="text-xs font-black uppercase tracking-[0.35em]">
              Flat Burger
            </div>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[11px] font-black uppercase tracking-[0.3em] text-ink/70 hover:text-ink transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          <button
            className="border-2 border-border px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] bg-cream"
            onClick={() => setIsOpen(true)}
          >
            Menu
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-cream"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
          >
            <div className="flex h-full flex-col justify-between border-l-4 border-border px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="text-xs font-black uppercase tracking-[0.35em]">
                  Flat Burger
                </div>
                <button
                  className="border-2 border-border px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em]"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
              <div className="space-y-6">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-4xl sm:text-6xl font-black uppercase tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : index * 0.05 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-ink/60">
                Dečanska 4 — Belgrade
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
