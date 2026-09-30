import type { Transition, Variants } from "framer-motion";

/**
 * Global Animation Presets
 * ------------------------
 * This file centralizes our Framer Motion variants and transitions.
 * Using standardized animations ensures visual consistency across the site.
 */

/* Reusable spring config for snappy, organic movement */
export const spring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
};

/* Standard elegant easing */
export const elegantEase = [0.16, 1, 0.3, 1] as const;

/* Generic item variant for list reveals */
export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring,
  },
};

/* Fade & Slide Up - Perfect for text sections */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

/* Simple Fade In */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

/* Scroll Reveal - For larger sections as the user scrolls down */
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: elegantEase
    }
  }
};

/* Staggered Container - Use this as a wrapper for child animations */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};
