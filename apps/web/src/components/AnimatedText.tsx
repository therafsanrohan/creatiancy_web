"use client";

import { motion, Variants, Transition } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  el?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p" | "span";
  "aria-hidden"?: boolean;
}

/* Safe spring config */
const spring: Transition = {
  type: "spring",
  damping: 12,
  stiffness: 100,
};

export default function AnimatedText({
  text,
  className,
  staggerDelay = 0.05,
  el: Tag = "h1",
  "aria-hidden": ariaHidden,
}: AnimatedTextProps) {
  // Split by whitespace but keep newlines as separate tokens
  const words = text.split(/(\n| )/).filter(w => w !== "" && w !== " ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1 * i,
      },
    }),
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.28,
        ease: "easeOut"
      },
    },
  };

  const MotionTag = (motion as any)[Tag] || motion.div;

  return (
    <MotionTag
      className={cn("flex flex-wrap justify-center overflow-hidden", className)}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-hidden={ariaHidden}
    >
      {words.map((word, index) => {
        if (word === "\n") {
          return <div key={index} className="basis-full h-0" />;
        }
        return (
          <span key={index} className="inline-flex whitespace-nowrap">
            <motion.span
              variants={child}
              className="inline-block"
            >
              {word}
            </motion.span>
            {/* Real space in the DOM flow so crawlers extract separate words */}
            {index < words.length - 1 && <span className="inline-block w-[0.22em]" aria-hidden="true">&nbsp;</span>}
          </span>
        );
      })}
    </MotionTag>
  );
}