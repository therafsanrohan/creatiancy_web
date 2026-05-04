"use client";

import { useRef } from "react";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { Sparkles, Target, Zap, Rocket, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative">
      {/* Liquid Creative Backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
            borderRadius: ["40% 60% 70% 30%", "30% 80% 40% 70%", "40% 60% 70% 30%"]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[var(--ruby-red)] blur-[100px] -z-10"
          style={{ willChange: "transform, border-radius, opacity" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.2, 0.1],
            borderRadius: ["60% 40% 30% 70%", "40% 60% 80% 20%", "60% 40% 30% 70%"]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[var(--text)] blur-[120px] -z-10"
          style={{ willChange: "transform, border-radius, opacity" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--ruby-red)]/10 text-[var(--ruby-red)] text-sm font-bold tracking-widest uppercase mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Intentional By Design</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter mb-8 leading-tight">
            We are the architects of your digital legacy.
          </h1>
          <p className="text-xl md:text-2xl text-[var(--muted-fg)] text-balance font-light max-w-3xl">
            Creatiancy isn't just another flashy agency. We are a precise, confident, high-end digital studio. We build bold strategies and immersive platforms that transform audiences into loyal brand advocates.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          {/* Philosophy Section */}
          <motion.div variants={itemVariants} className="space-y-12 bg-[var(--bg)]/50 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-[var(--muted)] shadow-xl shadow-black/5 hover:border-[var(--ruby-red)]/50 transition-colors duration-500">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[var(--text)] text-[var(--bg)] flex items-center justify-center shadow-lg mb-8">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-heading font-bold tracking-tight">Radical Philosophy</h2>
              <div className="space-y-6 text-[var(--muted-fg)] leading-relaxed text-lg">
                <p>
                  At Creatiancy, we operate with controlled boldness. Every interaction, visual decision, and message is designed with intent and clarity.
                </p>
                <p>
                  We build brand systems where performance leads and design supports. The focus is not decoration, but communication, usability, and long-term brand recall.
                </p>
                <p>
                  Through structured thinking and disciplined execution, we create digital experiences that feel seamless, precise, and built to stand out.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Methodology Section */}
          <motion.div variants={itemVariants} className="space-y-12">
            <div className="mb-0">
              <h2 className="text-4xl font-heading font-bold tracking-tight mb-8">Our Methodology</h2>
              <p className="text-[var(--muted-fg)] text-lg mb-8">
                We remove guesswork and build with clarity from the start.
              </p>
            </div>

            <div ref={containerRef} className="space-y-8 relative">
              {/* Static background line */}
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[var(--text)]/20 to-transparent" />
              {/* Animated scroll line */}
              <motion.div 
                className="absolute left-6 top-4 bottom-4 w-0.5 bg-[var(--ruby-red)] origin-top z-0"
                style={{ scaleY: lineHeight }}
              />
              {[{
                icon: <Zap className="w-5 h-5 transition-colors duration-300" />,
                title: "1. Precision Strategy",
                desc: "Defined positioning based on real market insight and clear differentiation."
              }, {
                icon: <Rocket className="w-5 h-5 transition-colors duration-300" />,
                title: "2. Fluid Structure",
                desc: "Connected brand and digital systems designed for clarity, usability, and consistency."
              }, {
                icon: <CheckCircle2 className="w-5 h-5 transition-colors duration-300" />,
                title: "3. Focused Execution",
                desc: "Careful implementation with attention to performance, visibility, and measurable outcomes."
              }].map((step, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="relative pl-16 group cursor-pointer"
                  whileHover="hover"
                  whileInView="inView"
                  viewport={{ once: false, margin: "-50% 0px -40% 0px" }}
                >
                  <motion.div 
                    className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center shadow-lg shadow-black/10 z-10 rounded-full bg-[var(--text)] transition-colors duration-300"
                    variants={{
                      hover: { backgroundColor: "var(--ruby-red)" },
                      inView: { backgroundColor: "var(--ruby-red)" }
                    }}
                  >
                    <motion.div
                      variants={{
                        hover: { color: "#ffffff" },
                        inView: { color: "#ffffff" }
                      }}
                      className="text-[var(--bg)]"
                    >
                      {step.icon}
                    </motion.div>
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-bold font-heading mb-3 pt-1 transition-colors"
                    variants={{
                      hover: { color: "var(--ruby-red)" },
                      inView: { color: "var(--ruby-red)" }
                    }}
                  >
                    {step.title}
                  </motion.h3>
                  <p className="text-[var(--muted-fg)] text-lg">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* Marketing Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto mt-24 md:mt-32 px-4"
      >
        <div className="relative rounded-3xl overflow-hidden bg-[var(--text)] text-[var(--bg)] px-6 sm:px-10 py-16 sm:py-20 md:py-32 flex items-center justify-center text-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ruby-red)]/20 to-transparent mix-blend-overlay" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-6 md:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tighter text-balance">
              Ready to dominate your market?
            </h2>
            <p className="text-lg sm:text-xl opacity-80 font-light max-w-xl mx-auto text-balance">
              Stop settling for average digital experiences. Let's engineer a solution that positions your brand as the undisputed leader.
            </p>
            <div className="pt-6 md:pt-8 flex flex-col items-center">
              <Link
                href="/contact"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-3 bg-[var(--ruby-red)] text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 shadow-xl shadow-[var(--ruby-red)]/30"
              >
                Start a Conversation
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
