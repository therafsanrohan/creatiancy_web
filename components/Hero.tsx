"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedText from "./AnimatedText";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

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
      className="relative h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden"
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
        className="container mx-auto px-4 z-10 flex flex-col items-center text-center mt-24 sm:mt-16 md:mt-[-2vh]"
      >
        <AnimatedText
          text="We build precision brand experiences."
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] leading-[1.05] font-heading font-extrabold max-w-[90vw] sm:max-w-4xl lg:max-w-6xl tracking-tighter text-balance bg-clip-text text-transparent bg-gradient-to-b from-[var(--text)] to-[var(--muted-fg)] drop-shadow-sm"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-8 text-lg md:text-2xl text-[var(--muted-fg)] max-w-3xl text-balance font-light"
        >
          Creative intelligence and controlled boldness for ambitious brands. We transform your vision into an undeniable digital reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full px-4"
        >
          <Link
            href="/work"
            className="group flex w-full sm:w-auto items-center justify-center gap-3 bg-[var(--text)] text-[var(--bg)] px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-[var(--accent)] hover:text-white transition-all duration-300 shadow-xl shadow-black/5 hover:shadow-[var(--accent)]/20 active:scale-95 active:bg-[var(--accent)] active:text-white"
          >
            <span>View Selected Work</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="group flex w-full sm:w-auto items-center justify-center gap-3 bg-[var(--bg)]/50 backdrop-blur-md border border-[var(--muted)] text-[var(--text)] px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-[var(--muted)] transition-all duration-300 active:scale-95 active:bg-[var(--muted)]"
          >
            <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform text-[var(--accent)]" />
            <span>Our Approach</span>
          </Link>
        </motion.div>
      </motion.div>


    </section>
  );
}
