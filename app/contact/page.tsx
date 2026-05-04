"use client";

import { motion, Variants, Transition } from "framer-motion";
import { ArrowRight, Mail, Briefcase, MapPin } from "lucide-react";

const spring: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 15,
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { ...spring, type: "spring" as const } },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative bg-[var(--bg)] selection:bg-[var(--ruby-red)] selection:text-white">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[var(--ruby-red)]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40vw] h-[40vw] bg-[var(--text)]/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 md:px-8 relative z-10"
      >
        <div className="max-w-4xl mx-auto w-full">

          <div className="flex flex-col justify-center">
            
            <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--ruby-red)]/10 text-[var(--ruby-red)] text-xs font-bold tracking-widest uppercase mb-8 border border-[var(--ruby-red)]/20">
              <Mail className="w-3 h-3" />
              <span>Initiate Contact</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter mb-8 relative text-balance leading-[1.1]"
            >
              Let's build something<br />
              <span className="text-[var(--ruby-red)]">remarkable.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-xl md:text-2xl text-[var(--muted-fg)] font-light mb-16 max-w-2xl leading-relaxed"
            >
              Ready to elevate your digital presence? Reach out. We keep things direct, strategic, and hyper-actionable. No fluff, just execution.
            </motion.p>

            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
              {/* General Inquiries Card */}
              <a href="mailto:contact@creatiancy.com" className="group flex flex-col p-8 rounded-3xl bg-[var(--muted)]/10 border border-[var(--muted)]/30 hover:bg-[var(--muted)]/20 hover:border-[var(--ruby-red)]/50 transition-all duration-500 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 -translate-y-2 transition-all duration-500">
                  <ArrowRight className="w-6 h-6 text-[var(--ruby-red)]" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[var(--text)] text-[var(--bg)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--muted-fg)] mb-2">General Inquiries</h3>
                <span className="text-2xl font-bold font-heading text-[var(--text)] group-hover:text-[var(--ruby-red)] transition-colors">contact@creatiancy.com</span>
              </a>

              {/* Careers Card */}
              <div className="group flex flex-col p-8 rounded-3xl bg-[var(--muted)]/10 border border-[var(--muted)]/30 hover:bg-[var(--muted)]/20 hover:border-[var(--muted)]/80 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-[var(--muted)] text-[var(--text)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--muted-fg)] mb-2">Careers & Operations</h3>
                <div className="flex flex-col gap-1 mt-1">
                  <a href="mailto:hr@creatiancy.com" className="text-lg font-medium text-[var(--text)] hover:text-[var(--ruby-red)] transition-colors inline-flex items-center gap-2">hr@creatiancy.com</a>
                  <a href="mailto:business@creatiancy.com" className="text-lg font-medium text-[var(--text)] hover:text-[var(--ruby-red)] transition-colors inline-flex items-center gap-2">business@creatiancy.com</a>
                </div>
              </div>
            </motion.div>
            
            {/* Global Presence */}
            <motion.div variants={item} className="pt-12 border-t border-[var(--muted)]/30">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-fg)] mb-8 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Global Footprint
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Bangladesh */}
                <div className="group relative flex flex-row lg:flex-col items-center lg:items-start justify-between p-5 rounded-2xl bg-[var(--muted)]/10 border border-[var(--muted)]/30 hover:bg-[var(--muted)]/20 transition-all duration-500 ease-out overflow-hidden gap-0 lg:gap-4">
                  <div className="flex flex-col z-10 relative lg:order-2">
                    <span className="text-lg font-bold font-heading text-[var(--text)] flex items-center gap-2 mb-1 group-hover:text-[var(--ruby-red)] transition-colors">
                      Dhaka
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ruby-red)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ruby-red)]"></span>
                      </span>
                    </span>
                    <span className="text-xs font-bold text-[var(--muted-fg)] uppercase tracking-widest">Bangladesh</span>
                  </div>
                  <div className="relative z-10 overflow-hidden rounded-[4px] shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 lg:order-1">
                    <img src="https://flagcdn.com/bd.svg" alt="Bangladesh Flag" className="w-12 h-8 lg:w-16 lg:h-10 object-cover" loading="lazy" />
                  </div>
                </div>

                {/* United States */}
                <div className="group relative flex flex-row lg:flex-col items-center lg:items-start justify-between p-5 rounded-2xl bg-[var(--muted)]/10 border border-[var(--muted)]/30 hover:bg-[var(--muted)]/20 transition-all duration-500 ease-out overflow-hidden gap-0 lg:gap-4">
                  <div className="flex flex-col z-10 relative lg:order-2">
                    <span className="text-lg font-bold font-heading text-[var(--text)] flex items-center gap-2 mb-1 group-hover:text-[var(--ruby-red)] transition-colors">
                      Wyoming
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ruby-red)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ruby-red)]"></span>
                      </span>
                    </span>
                    <span className="text-xs font-bold text-[var(--muted-fg)] uppercase tracking-widest">United States</span>
                  </div>
                  <div className="relative z-10 overflow-hidden rounded-[4px] shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 lg:order-1">
                    <img src="https://flagcdn.com/us.svg" alt="United States Flag" className="w-12 h-8 lg:w-16 lg:h-10 object-cover" loading="lazy" />
                  </div>
                </div>

                {/* South Africa 1 */}
                <div className="group relative flex flex-row lg:flex-col items-center lg:items-start justify-between p-5 rounded-2xl bg-[var(--muted)]/10 border border-[var(--muted)]/30 hover:bg-[var(--muted)]/20 transition-all duration-500 ease-out overflow-hidden gap-0 lg:gap-4">
                  <div className="flex flex-col z-10 relative lg:order-2">
                    <span className="text-lg font-bold font-heading text-[var(--text)] flex items-center gap-2 mb-1 group-hover:text-[var(--ruby-red)] transition-colors">
                      Cape Town
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ruby-red)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ruby-red)]"></span>
                      </span>
                    </span>
                    <span className="text-xs font-bold text-[var(--muted-fg)] uppercase tracking-widest">South Africa</span>
                  </div>
                  <div className="relative z-10 overflow-hidden rounded-[4px] shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 lg:order-1">
                    <img src="https://flagcdn.com/za.svg" alt="South Africa Flag" className="w-12 h-8 lg:w-16 lg:h-10 object-cover" loading="lazy" />
                  </div>
                </div>

                {/* Cyprus */}
                <div className="group relative flex flex-row lg:flex-col items-center lg:items-start justify-between p-5 rounded-2xl bg-[var(--muted)]/10 border border-[var(--muted)]/30 hover:bg-[var(--muted)]/20 transition-all duration-500 ease-out overflow-hidden gap-0 lg:gap-4">
                  <div className="flex flex-col z-10 relative lg:order-2">
                    <span className="text-lg font-bold font-heading text-[var(--text)] flex items-center gap-2 mb-1 group-hover:text-[var(--ruby-red)] transition-colors">
                      Nicosia
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ruby-red)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ruby-red)]"></span>
                      </span>
                    </span>
                    <span className="text-xs font-bold text-[var(--muted-fg)] uppercase tracking-widest">Cyprus</span>
                  </div>
                  <div className="relative z-10 overflow-hidden rounded-[4px] shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 lg:order-1">
                    <img src="https://flagcdn.com/cy.svg" alt="Cyprus Flag" className="w-12 h-8 lg:w-16 lg:h-10 object-cover" loading="lazy" />
                  </div>
                </div>

                {/* South Africa 2 */}
                <div className="group relative flex flex-row lg:flex-col items-center lg:items-start justify-between p-5 rounded-2xl bg-[var(--muted)]/10 border border-[var(--muted)]/30 hover:bg-[var(--muted)]/20 transition-all duration-500 ease-out overflow-hidden gap-0 lg:gap-4">
                  <div className="flex flex-col z-10 relative lg:order-2">
                    <span className="text-lg font-bold font-heading text-[var(--text)] flex items-center gap-2 mb-1 group-hover:text-[var(--ruby-red)] transition-colors">
                      Johannesburg
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ruby-red)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ruby-red)]"></span>
                      </span>
                    </span>
                    <span className="text-xs font-bold text-[var(--muted-fg)] uppercase tracking-widest">South Africa</span>
                  </div>
                  <div className="relative z-10 overflow-hidden rounded-[4px] shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 lg:order-1">
                    <img src="https://flagcdn.com/za.svg" alt="South Africa Flag" className="w-12 h-8 lg:w-16 lg:h-10 object-cover" loading="lazy" />
                  </div>
                </div>

                {/* Kenya */}
                <div className="group relative flex flex-row lg:flex-col items-center lg:items-start justify-between p-5 rounded-2xl bg-[var(--muted)]/10 border border-[var(--muted)]/30 hover:bg-[var(--muted)]/20 transition-all duration-500 ease-out overflow-hidden gap-0 lg:gap-4">
                  <div className="flex flex-col z-10 relative lg:order-2">
                    <span className="text-lg font-bold font-heading text-[var(--text)] flex items-center gap-2 mb-1 group-hover:text-[var(--ruby-red)] transition-colors">
                      Nairobi
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ruby-red)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ruby-red)]"></span>
                      </span>
                    </span>
                    <span className="text-xs font-bold text-[var(--muted-fg)] uppercase tracking-widest">Kenya</span>
                  </div>
                  <div className="relative z-10 overflow-hidden rounded-[4px] shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 lg:order-1">
                    <img src="https://flagcdn.com/ke.svg" alt="Kenya Flag" className="w-12 h-8 lg:w-16 lg:h-10 object-cover" loading="lazy" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}