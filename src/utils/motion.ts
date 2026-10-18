export const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const LUXURY_EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const LUXURY_EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const transitionFast = { duration: 0.35, ease: LUXURY_EASE };
export const transitionMedium = { duration: 0.6, ease: LUXURY_EASE };
export const transitionSlow = { duration: 0.9, ease: LUXURY_EASE };
export const transitionEditorial = { duration: 1.1, ease: LUXURY_EASE };

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: LUXURY_EASE },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const clippedTextVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: LUXURY_EASE,
    },
  },
};

export const imageRevealVariants = {
  hidden: { scale: 1.12, opacity: 0.4 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: LUXURY_EASE,
    },
  },
};
