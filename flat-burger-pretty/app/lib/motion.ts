export const easeOut = [0.22, 1, 0.36, 1] as const;

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

export const hoverLift = {
  whileHover: { y: -3, scale: 1.015 },
  whileTap: { scale: 0.99 },
};
