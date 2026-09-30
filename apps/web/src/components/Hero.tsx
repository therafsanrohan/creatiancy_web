"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedText from "./AnimatedText";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, PlayCircle } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100vh] py-32 flex items-center justify-center overflow-hidden"
    >
      {/* Gentle & Optimized Motion Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20 dark:opacity-[0.15] flex items-center justify-center">
          <motion.div
            animate={{
              x: ["-5%", "5%", "-5%"],
              y: ["-5%", "10%", "-5%"],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-[var(--accent)] to-transparent rounded-full blur-[100px] mix-blend-screen"
            style={{ willChange: "transform" }}
          />
          <motion.div
            animate={{
              x: ["5%", "-5%", "5%"],
              y: ["5%", "-10%", "5%"],
              scale: [1, 0.95, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute right-[-10vw] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-gradient-to-bl from-[var(--text)] to-[var(--accent)] rounded-full blur-[120px] mix-blend-screen opacity-60"
            style={{ willChange: "transform" }}
          />
        </div>
      </div>

      <motion.div
        style={{ y, opacity, scale, willChange: "transform, opacity" }}
        className="container mx-auto px-4 z-10 flex flex-col items-center text-center mt-[-8vh] sm:mt-[-6vh] md:mt-[-4vh]"
      >
        {/* Responsive, single H1 element for perfect SEO & accessibility */}
        <AnimatedText
          text="We Build Legacies."
          el="h1"
          className="text-[clamp(2.75rem,7vw,7.5rem)] leading-[1.02] font-heading font-extrabold w-full tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-[var(--text)] to-[var(--muted-fg)] drop-shadow-sm justify-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.15, ease: "easeOut" }}
          className="mt-8 text-lg md:text-2xl text-[var(--muted-fg)] max-w-3xl text-balance font-light leading-relaxed"
        >
          A strategic creative studio shaping world-class brands through design, storytelling, and high-performance technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.28, ease: "easeOut" }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full px-4"
        >
          <Link
            href="/work"
            className="group flex w-full sm:w-auto items-center justify-center gap-3 bg-[var(--text)] text-[var(--bg)] px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-[var(--ruby-red)] hover:text-white transition-all duration-300 shadow-xl shadow-black/5 hover:shadow-[var(--ruby-red)]/20 active:scale-95"
          >
            <span>Selected Work</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="group flex w-full sm:w-auto items-center justify-center gap-3 bg-[var(--bg)]/50 backdrop-blur-md border border-[var(--muted)]/60 text-[var(--text)] px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-[var(--muted)]/50 transition-all duration-300 active:scale-95"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform text-[var(--ruby-red)]" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
