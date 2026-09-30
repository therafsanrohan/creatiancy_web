"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import WebsiteHeader from "@/components/website/WebsiteHeader";
import WebsiteFooter from "@/components/website/WebsiteFooter";
import "@/app/website.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2 } }
};

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityOffset = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="creatiancy-scope bg-[#FBFDF9]" ref={containerRef}>
      <WebsiteHeader />
      <main className="flex-1 w-full relative overflow-hidden">
        
        {/* Apple-style Contact Hero */}
        <section className="relative min-h-[40vh] md:min-h-[50vh] flex flex-col justify-center items-center text-center pt-40 pb-12 px-6 md:px-12 w-full z-10 bg-[#FBFDF9]">
          <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-[16px] md:text-[20px] font-semibold tracking-wide text-[#9B1C22] mb-2"
            >
              Start a Project
            </motion.div>

            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[48px] sm:text-[64px] md:text-[80px] font-semibold tracking-[-0.015em] text-[#1E1E1E] leading-[1.05]"
            >
              Let&apos;s build a <span className="text-[#9B1C22]">legacy.</span>
            </motion.h1>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="pb-32 px-6 md:px-12 max-w-3xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="bg-white rounded-3xl p-8 md:p-16 shadow-xl shadow-black/5 border border-[#1E1E1E]/5"
          >
            <form action="mailto:hello@creatiancy.com" method="post" encType="text/plain" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#A3A3A3] mb-3">Name</label>
                  <input 
                    type="text" 
                    name="Name" 
                    className="w-full bg-transparent border-b border-[#EAEAEA] p-3 pl-0 text-[16px] text-[#1E1E1E] focus:outline-none focus:border-[#9B1C22] transition-colors placeholder-[#D0D0D0]" 
                    placeholder="Jane Doe" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#A3A3A3] mb-3">Email</label>
                  <input 
                    type="email" 
                    name="Email" 
                    className="w-full bg-transparent border-b border-[#EAEAEA] p-3 pl-0 text-[16px] text-[#1E1E1E] focus:outline-none focus:border-[#9B1C22] transition-colors placeholder-[#D0D0D0]" 
                    placeholder="jane@company.com" 
                    required 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#A3A3A3] mb-3">Project Scope</label>
                <textarea 
                  name="Project Scope" 
                  rows={4} 
                  className="w-full bg-transparent border-b border-[#EAEAEA] p-3 pl-0 text-[16px] text-[#1E1E1E] focus:outline-none focus:border-[#9B1C22] transition-colors placeholder-[#D0D0D0] resize-none" 
                  placeholder="Tell us about your ambition, timeline, and goals..." 
                  required
                ></textarea>
              </div>
              
              <div className="pt-6">
                <button 
                  type="submit" 
                  className="flex items-center justify-center px-6 py-3 bg-[#9B1C22] text-white rounded-full text-[15px] font-semibold transition-all duration-300 hover:bg-[#7A151A] w-full shadow-md focus:outline-none"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
          </motion.div>
        </section>
      </main>
      <WebsiteFooter />
    </div>
  );
}