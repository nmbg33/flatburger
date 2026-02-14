export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export const revealContainer = (stagger = 0.1) => ({
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.06,
      ease: easeOut,
    },
  },
});

export const revealItem = (distance = 10) => ({
  hidden: { opacity: 0, y: distance },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
});

// Enhanced hover lift for cards
export const hoverLift = {
  whileHover: {
    y: -4,
    scale: 1.02,
    transition: { duration: 0.2, ease: easeOut }
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  },
};

// Subtle hover for buttons
export const hoverButton = {
  whileHover: {
    y: -2,
    scale: 1.01,
    transition: { duration: 0.15, ease: easeOut }
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  },
};

// Scale up for images
export const hoverScale = {
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.4, ease: easeOut }
  },
};

// Fade in from below
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut }
  },
};

// Fade in from right (for stickers)
export const fadeInRight = {
  initial: { opacity: 0, x: 20, rotate: 20 },
  animate: {
    opacity: 1,
    x: 0,
    rotate: 12,
    transition: { duration: 0.4, ease: easeOut }
  },
};
