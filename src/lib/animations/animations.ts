import type { Transition, Variants } from "framer-motion";

/* Reusable spring config */
export const spring: Transition = {
    type: "spring",
    stiffness: 100,
    damping: 15,
};

/* Standard fade + slide animation */
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