"use client";

import React from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/data/home";

const RHYTHM = [
  { 
    span: "col-span-12", 
    height: "h-[60vh] md:h-[85vh]", 
    isFeatured: true 
  },
  { 
    span: "col-span-12 md:col-span-5 md:mt-20", 
    height: "h-[50vh] md:h-[75vh]", 
    isFeatured: false 
  },
  { 
    span: "col-span-12 md:col-span-6 md:col-start-7 md:-mt-32", 
    height: "h-[60vh] md:h-[90vh]", 
    isFeatured: false 
  },
  { 
    span: "col-span-12", 
    height: "h-[50vh] md:h-[70vh]", 
    isFeatured: false 
  },
];

export const Projects = () => {
  return (
    <section className="py-24 md:py-40 px-6 md:px-12 bg-[#F5F5F7] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Intro */}
        <div className="mb-20 md:mb-32 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[50px] md:text-[80px] lg:text-[110px] font-bold tracking-tighter text-[#1E1E1E] leading-[0.85] uppercase mb-8"
          >
            SELECTED<br/>WORK
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18px] md:text-[24px] text-[#1E1E1E]/70 font-light leading-[1.4] max-w-xl"
          >
            A selection of ideas, identities, campaigns and digital experiences we&apos;ve built.
          </motion.p>
        </div>

        {/* Curated Exhibition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-20 md:gap-y-32 gap-x-8">
          {PROJECTS.slice(0, 4).map((project, idx) => {
            const layout = RHYTHM[idx] || { span: "col-span-12", height: "h-[50vh]", isFeatured: false };
            
            return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`${layout.span} flex flex-col group`}
              >
                {layout.isFeatured && (
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[#9B1C22] uppercase block mb-6">
                    Featured Work
                  </span>
                )}
                
                <Link href={`/work/${project.id}`} className="relative block overflow-hidden rounded-2xl md:rounded-[32px] w-full bg-[#EAEAEA]">
                  <div className={`w-full ${layout.height} relative overflow-hidden`}>
                    {/* Placeholder Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D0D0D0] to-[#E0E0E0] transform transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Absolute Desktop Hover CTA */}
                  <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20 pointer-events-none">
                    <div className="pointer-events-auto">
                      <div className="inline-flex items-center justify-center font-medium transition-all duration-300 ease-out rounded-full active:scale-[0.98] text-center bg-[#9B1C22] text-[#FFFFFF] shadow-xl shadow-black/10 hover:bg-[#1E1E1E] hover:shadow-black/20 px-8 py-4 text-[14px]">
                        View Case Study
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Metadata */}
                <div className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div>
                    <h3 className="text-[28px] md:text-[36px] font-medium tracking-tight text-[#1E1E1E] leading-none mb-2">
                      {project.client}
                    </h3>
                    <p className="text-[15px] md:text-[16px] text-[#1E1E1E]/60 font-medium tracking-wide">
                      {project.discipline}
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-4 sm:gap-2">
                    <span className="text-[14px] md:text-[15px] text-[#1E1E1E]/40 font-medium">
                      {project.year}
                    </span>
                    {/* Mobile CTA (Visible on small screens, hidden on desktop where hover handles it) */}
                    <div className="md:hidden">
                      <ButtonLink href={`/work/${project.id}`} variant="primary" size="sm">
                        View Case Study
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Section Footer / CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mt-32 pt-20 border-t border-[#1E1E1E]/10 flex flex-col items-center"
        >
          <ButtonLink href="/work" variant="primary" size="lg">
            VIEW ALL WORK
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 transform group-hover:translate-x-1 transition-transform">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ButtonLink>
        </motion.div>

      </div>
    </section>
  );
};
