"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
      <main className="flex-1 w-full relative overflow-hidden bg-[#FBFDF9]">

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9B1C22]/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2" />

        <section className="relative min-h-screen pt-40 pb-32 px-6 md:px-12 w-full z-10">
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-24 relative z-10">

            <div className="lg:w-1/2 lg:sticky lg:top-40 pt-4 md:pt-10">
              <motion.h1 
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-[56px] sm:text-[72px] md:text-[90px] lg:text-[120px] font-semibold tracking-tighter text-[#1E1E1E] leading-[0.95] mb-8"
              >
                Let&apos;s build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E1E1E] to-[#666666] pb-2 pr-2 inline-block">a legacy</span><span className="text-[#9B1C22]">.</span>
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="flex flex-col gap-6 text-[#555555] font-light text-[18px] md:text-[24px] max-w-lg border-l-2 border-[#1E1E1E]/10 pl-6 md:pl-8"
              >
                <p>We partner with ambitious organizations to architect absolute clarity and commercial authority.</p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <a href="mailto:creatiancy@gmail.com" className="inline-flex items-center justify-center bg-[#9B1C22] !text-white px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#7A151A] hover:!text-white hover:-translate-y-1 hover:shadow-lg transition-all w-full sm:w-fit">
                    Mail Us
                  </a>
                  <a href="https://wa.me/8801325078941" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-transparent border border-[#1E1E1E]/20 text-[#1E1E1E] px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#25D366] hover:border-[#25D366] hover:!text-white hover:-translate-y-1 hover:shadow-lg transition-all w-full sm:w-fit">
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="lg:w-1/2 w-full max-w-2xl mt-8 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="bg-white rounded-[40px] p-8 md:p-12 lg:p-16 shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-[#1E1E1E]/5 relative overflow-hidden"
              >
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#9B1C22]/10 to-transparent rounded-bl-full pointer-events-none" />

                <form action="mailto:creatiancy@gmail.com" method="post" encType="text/plain" className="space-y-12 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="relative group">
                      <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#A3A3A3] mb-2 transition-colors group-focus-within:text-[#9B1C22]">Name</label>
                      <input 
                        type="text" 
                        name="Name" 
                        className="w-full bg-transparent border-b-2 border-[#EAEAEA] py-3 text-[18px] text-[#1E1E1E] focus:outline-none focus:border-[#9B1C22] transition-colors placeholder-[#D0D0D0]" 
                        placeholder="Jane Doe" 
                        required 
                      />
                    </div>
                    <div className="relative group">
                      <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#A3A3A3] mb-2 transition-colors group-focus-within:text-[#9B1C22]">Email</label>
                      <input 
                        type="email" 
                        name="Email" 
                        className="w-full bg-transparent border-b-2 border-[#EAEAEA] py-3 text-[18px] text-[#1E1E1E] focus:outline-none focus:border-[#9B1C22] transition-colors placeholder-[#D0D0D0]" 
                        placeholder="jane@company.com" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#A3A3A3] mb-2 transition-colors group-focus-within:text-[#9B1C22]">Project Scope</label>
                    <textarea 
                      name="Project Scope" 
                      rows={5} 
                      className="w-full bg-transparent border-b-2 border-[#EAEAEA] py-3 text-[18px] text-[#1E1E1E] focus:outline-none focus:border-[#9B1C22] transition-colors placeholder-[#D0D0D0] resize-none leading-relaxed" 
                      placeholder="Tell us about your ambition, timeline, and goals..." 
                      required
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      className="inline-flex items-center justify-center px-10 py-4 md:py-5 bg-[#9B1C22] text-white rounded-full text-[15px] font-semibold transition-all duration-500 hover:bg-[#7A151A] hover:shadow-[0_8px_30px_rgba(155,28,34,0.3)] hover:-translate-y-1 w-full md:w-auto focus:outline-none"
                    >
                      Submit Inquiry <span className="ml-3 text-lg leading-none">→</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
            
          </div>
        </section>
      </main>
    </div>
  );
}