"use client";

import { motion, Variants, Transition } from "framer-motion";
import { ArrowRight, Mail, Briefcase, MapPin } from "lucide-react";

/* Safe spring config */
const spring: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 15,
};

/* Container animation */
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

/* FIXED item animation */
const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ...spring,
      type: "spring" as const,
    },
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative">
      {/* Background */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[var(--ruby-red)]/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 relative z-10"
      >
        <div className="max-w-3xl mx-auto w-full">

          {/* CONTENT */}
          <div className="flex flex-col justify-center">

            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl md:text-8xl font-heading font-extrabold tracking-tighter mb-6 relative"
            >
              <span className="relative z-10 text-balance block max-w-[90vw]">
                Let's build something<br />remarkable.
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-xl md:text-2xl text-[var(--muted-fg)] font-light mb-16 max-w-xl"
            >
              Ready to elevate your digital presence? Reach out. We keep things direct, strategic, and actionable.
            </motion.p>

            <motion.div variants={item} className="flex flex-col gap-10">

              {/* Email */}
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-[var(--muted)]/40 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase text-[var(--ruby-red)] mb-2">
                    General Inquiries
                  </h3>
                  <a
                    href="mailto:contact@creatiancy.com"
                    className="text-xl font-semibold hover:text-[var(--ruby-red)] transition-colors"
                  >
                    contact@creatiancy.com
                  </a>
                </div>
              </div>

              {/* Careers */}
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-[var(--muted)]/40 flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase text-[var(--ruby-red)] mb-2">
                    Careers
                  </h3>
                  <a href="mailto:hr@creatiancy.com" className="block hover:text-[var(--ruby-red)]">
                    hr@creatiancy.com
                  </a>
                  <a href="mailto:business@creatiancy.com" className="block hover:text-[var(--ruby-red)]">
                    business@creatiancy.com
                  </a>
                </div>
              </div>

            </motion.div>
            
            {/* Global Presence */}
            <motion.div variants={item} className="mt-10 pt-10 border-t border-[var(--muted)]/50">
              <h3 className="text-sm font-bold uppercase text-[var(--ruby-red)] mb-6 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Global Presence
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold mb-1 flex items-center gap-3">
                    Bangladesh
                    <img src="https://flagcdn.com/bd.svg" alt="Bangladesh" className="w-7 h-5 object-cover rounded-sm shadow-sm" loading="lazy" />
                  </h4>
                  <p className="text-[var(--muted-fg)] font-medium">Dhaka</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1 flex items-center gap-3">
                    United States
                    <img src="https://flagcdn.com/us.svg" alt="United States" className="w-7 h-5 object-cover rounded-sm shadow-sm" loading="lazy" />
                  </h4>
                  <p className="text-[var(--muted-fg)] font-medium">Wyoming</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}