"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedText from "@/components/AnimatedText";
import { ArrowDown, Sparkles } from "lucide-react";

export default function QRHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("qr-story");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1E1E1E]"
      aria-labelledby="hero-heading"
    >
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20 flex items-center justify-center">
          <motion.div
            animate={{
              x: ["-8%", "8%", "-8%"],
              y: ["-8%", "10%", "-8%"],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[65vw] h-[65vw] max-w-[900px] max-h-[900px] bg-gradient-to-tr from-[#9B1C22]/30 via-purple-950/10 to-transparent rounded-full blur-[130px]"
            style={{ willChange: "transform" }}
          />
          <motion.div
            animate={{
              x: ["8%", "-8%", "8%"],
              y: ["8%", "-10%", "8%"],
              scale: [1, 0.9, 1],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute right-[-10vw] bottom-[-10vw] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-gradient-to-bl from-[#9B1C22]/20 via-neutral-900/10 to-transparent rounded-full blur-[110px]"
            style={{ willChange: "transform" }}
          />
        </div>
      </div>

      <motion.div
        style={{ y, opacity, scale, willChange: "transform, opacity" }}
        className="container mx-auto px-4 z-10 flex flex-col items-center text-center max-w-[1000px] mt-[-4vh]"
      >
        {/* Subtle Micro badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-2 text-xs font-semibold tracking-[0.15em] text-neutral-400 uppercase"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#9B1C22]" />
          <span>Physical to Digital Bridge</span>
        </motion.div>

        {/* Dynamic Display Title */}
        <AnimatedText
          text={"The physical touchpoint.\nThe digital horizon."}
          el="h1"
          className="text-[clamp(2.5rem,5.5vw,6rem)] leading-[1.08] font-heading font-extrabold w-full tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60 justify-center text-balance"
        />

        <AnimatedText
          text="Seamlessly connected."
          el="span"
          staggerDelay={0.06}
          className="mt-2 text-[clamp(2.5rem,5.5vw,6rem)] leading-[1.08] font-heading font-extrabold w-full tracking-tighter text-[#9B1C22] justify-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
          className="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl text-balance font-light leading-relaxed"
        >
          Signature QR-integrated ecosystems designed to transform print collateral, physical environments, and brand assets into high-performance digital spaces.
        </motion.p>

        {/* Scroll Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
          className="mt-12"
        >
          <button
            onClick={handleScrollDown}
            className="group flex items-center gap-3 bg-white text-black hover:bg-[#9B1C22] hover:text-white px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 active:scale-95 shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_30px_rgba(155,28,34,0.2)]"
          >
            <span>Scan the Experience</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
