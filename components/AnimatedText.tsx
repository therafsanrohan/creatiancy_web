"use client";

import { motion, Variants, Transition } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  staggerDelay?: number;
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
        ...spring,
        type: "spring" as const,
      },
    },
  };

  return (
    <motion.h1
      className={cn("flex flex-wrap justify-center overflow-hidden", className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => {
        if (word === "\n") {
          return <div key={index} className="basis-full h-0" />;
        }
        return (
          <motion.span
            key={index}
            variants={child}
            style={{ marginRight: "0.25em" }}
            className="inline-block"
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}