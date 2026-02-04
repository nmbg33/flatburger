"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { revealContainer, revealItem, hoverLift } from "../lib/motion";

const burgers = [
  {
    name: "Classic Flat",
    desc: "Double smash, cheddar, pickles, house sauce.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F9a69f3c9bc3f45d19c138cd92513bc9a?format=webp&width=800",
  },
  {
    name: "Fancy Flat",
    desc: "Onion jam, pancetta, truffle mayo, crisp lettuce.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F6ca917f26ecc4ce1b727caaec7cdae45?format=webp&width=800",
  },
  {
    name: "Pyro Flat",
    desc: "Sriracha mayo, caramelized onion, jalapeños.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F81bcb01b6c9745d295052a1bc1a2d873?format=webp&width=800",
  },
  {
    name: "Bacon Jam Flat",
    desc: "Bacon jam, BBQ, tomato, extra crunch.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F98e3e09a00c342408e142764c9afb57d?format=webp&width=800",
  },
  {
    name: "Chicken Flat",
    desc: "Grilled chicken, honey-sriracha, gouda.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F60065f0b142349638ce5191622432261?format=webp&width=800",
  },
  {
    name: "Crispy Alabama",
    desc: "Fried pickles, Alabama white BBQ, bacon mayo.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fa819516bbe9e41ec81132ec0652faf4d%2F291b0f2c508c466d927c3acf2d4dea65?format=webp&width=800",
  },
];

export const BentoMenu: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const reveal = revealContainer(0.08);
  const item = revealItem(12);
  const lift = hoverLift;

  return (
    <section id="menu" className="border-y-4 border-border bg-cream py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-10"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20%" }}
        >
          <motion.p
            className="text-xs font-black uppercase tracking-[0.4em] text-ink/60"
            variants={item}
          >
            Menu
          </motion.p>
          <motion.h2
            className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black uppercase"
            variants={item}
          >
            Comfort food. Clean smash.
          </motion.h2>
          <motion.p
            className="mt-3 max-w-2xl text-base font-mono text-ink/70"
            variants={item}
          >
            Soft bun, crisp edges, and sauces built for the neighborhood.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          {burgers.map((burger, index) => (
            <motion.div
              key={burger.name}
              className="group flex min-h-[260px] flex-col justify-between border-4 border-border bg-cream p-6 transition-colors duration-200 hover:bg-orange"
              variants={item}
              transition={{ delay: reduceMotion ? 0 : index * 0.02 }}
              whileHover={!reduceMotion ? lift.whileHover : undefined}
              whileTap={!reduceMotion ? lift.whileTap : undefined}
            >
              <div>
                <div className="mb-4 h-24 w-full overflow-hidden border-2 border-border bg-cream">
                  <motion.img
                    src={burger.image}
                    alt={burger.name}
                    className="h-full w-full object-cover"
                    initial={{ y: 20 }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                  />
                </div>
                <div className="text-xs font-black uppercase tracking-[0.35em] text-ink/50 group-hover:text-cream/80">
                  Flat Burger
                </div>
                <h3 className="mt-3 text-2xl font-black uppercase tracking-tight group-hover:text-cream">
                  {burger.name}
                </h3>
                <p className="mt-2 text-sm font-mono text-ink/70 group-hover:text-cream/80">
                  {burger.desc}
                </p>
              </div>
              <button className="mt-6 border-2 border-border px-4 py-2 text-[11px] font-black uppercase tracking-[0.3em] transition-colors duration-200 group-hover:bg-cream group-hover:text-orange">
                Order
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
