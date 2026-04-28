"use client";

import { motion, Variants, Transition } from "framer-motion";
import { ArrowRight, Mail, Briefcase } from "lucide-react";

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
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* LEFT CONTENT */}
          <div className="max-w-2xl flex flex-col justify-center">

            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl md:text-8xl font-heading font-extrabold tracking-tighter mb-6 relative"
            >
              <span className="relative z-10">
                Let's build<br />something<br />remarkable.
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
                    href="mailto:hello@creatiancy.com"
                    className="text-xl font-semibold hover:text-[var(--ruby-red)] transition-colors"
                  >
                    hello@creatiancy.com
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
          </div>

          {/* RIGHT FORM */}
          <motion.div variants={item} className="flex justify-end">
            <div className="w-full max-w-lg bg-[var(--bg)]/50 backdrop-blur-3xl p-8 rounded-3xl border border-[var(--muted)]">

              <h2 className="text-3xl font-bold mb-8">Send a message</h2>

              <form className="space-y-6">

                <input
                  className="w-full p-4 rounded-xl border bg-[var(--muted)]/20"
                  placeholder="Your Name"
                />

                <input
                  className="w-full p-4 rounded-xl border bg-[var(--muted)]/20"
                  placeholder="Email"
                />

                <textarea
                  rows={5}
                  className="w-full p-4 rounded-xl border bg-[var(--muted)]/20"
                  placeholder="Your message"
                />

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 bg-black text-white p-4 rounded-xl hover:scale-[1.02] transition"
                >
                  Submit <ArrowRight className="w-5 h-5" />
                </button>

              </form>

            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}