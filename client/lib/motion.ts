export const easeOut = [0.22, 1, 0.36, 1] as const;

export const revealContainer = (reduceMotion: boolean, stagger = 0.08) => ({
  hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: reduceMotion ? 0 : stagger,
      delayChildren: reduceMotion ? 0 : 0.06,
      ease: easeOut,
    },
  },
});

export const revealItem = (reduceMotion: boolean, distance = 10) => ({
  hidden: { opacity: 0, y: reduceMotion ? 0 : distance },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
});

export const hoverLift = (reduceMotion: boolean) =>
  reduceMotion
    ? {}
    : {
        whileHover: { scale: 1.015, y: -3 },
        whileTap: { scale: 0.99 },
      };
