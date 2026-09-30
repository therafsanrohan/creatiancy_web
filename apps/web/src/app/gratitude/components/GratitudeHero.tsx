"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedText from "@/components/AnimatedText";
import { ArrowDown, Heart } from "lucide-react";

export default function GratitudeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("campaign-intro");
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
      {/* Motion Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20 dark:opacity-25 flex items-center justify-center">
          <motion.div
            animate={{
              x: ["-5%", "5%", "-5%"],
              y: ["-5%", "8%", "-5%"],
              scale: [1, 1.12, 1],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-[#9B1C22]/30 via-[#9B1C22]/10 to-transparent rounded-full blur-[120px]"
            style={{ willChange: "transform" }}
          />
          <motion.div
            animate={{
              x: ["5%", "-5%", "5%"],
              y: ["5%", "-8%", "5%"],
              scale: [1, 0.92, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute right-[-10vw] w-[55vw] h-[55vw] max-w-[600px] max-h-[600px] bg-gradient-to-bl from-purple-950/20 via-[#9B1C22]/20 to-transparent rounded-full blur-[100px]"
            style={{ willChange: "transform" }}
          />
        </div>
      </div>

      <motion.div
        style={{ y, opacity, scale, willChange: "transform, opacity" }}
        className="container mx-auto px-4 z-10 flex flex-col items-center text-center max-w-[1000px]"
      >
        {/* Heart Icon Reveal */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 p-4 bg-[#9B1C22]/10 rounded-full border border-[#9B1C22]/20 shadow-[0_0_30px_rgba(155,28,34,0.15)]"
        >
          <Heart className="w-8 h-8 text-[#9B1C22]" strokeWidth={1.5} />
        </motion.div>

        <AnimatedText
          text={"Some experiences deserve\nmore than five stars."}
          el="h1"
          className="text-[clamp(2.5rem,5.5vw,6rem)] leading-[1.08] font-heading font-extrabold w-full tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60 justify-center text-balance"
        />

        <AnimatedText
          text="They deserve gratitude."
          el="span"
          staggerDelay={0.08}
          className="mt-2 text-[clamp(2.5rem,5.5vw,6rem)] leading-[1.08] font-heading font-extrabold w-full tracking-tighter text-[#9B1C22] justify-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
          className="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl text-balance font-light leading-relaxed"
        >
          A campaign dedicated to celebrating the service, craftsmanship, and human kindness that define memorable local businesses.
        </motion.p>

        {/* Explore Button */}
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
            <span>Explore the Project</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}