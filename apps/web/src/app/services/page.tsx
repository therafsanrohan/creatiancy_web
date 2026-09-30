"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import WebsiteHeader from "@/components/website/WebsiteHeader";
import WebsiteFooter from "@/components/website/WebsiteFooter";
import "@/app/website.css";

const servicesData = [
  {
    id: "01",
    title: "Brand Architecture",
    desc: "We define absolute clarity for ambitious organizations. From corporate positioning to full editorial identity, we craft rigorous brand systems designed for longevity and commercial authority.",
    items: [
      {
        name: "Brand Strategy & Positioning",
        detail: "Aligning organizational truth with market opportunity. We build foundational strategies that dictate how your brand sounds, acts, and scales.",
        deliverables: ["Market Positioning", "Brand Narrative", "Tone of Voice", "Competitive Analysis"]
      },
      {
        name: "Corporate Identity",
        detail: "Visual systems built for enterprise scale. We design rigorous, distinctive corporate identities that command authority across every touchpoint.",
        deliverables: ["Logo & Mark", "Typography System", "Color Architecture", "Brand Guidelines"]
      },
      {
        name: "Editorial Guidelines",
        detail: "Comprehensive rules for visual and verbal expression, ensuring total consistency as your organization grows.",
        deliverables: ["Brand Books", "Writing Guidelines", "Asset Libraries", "Implementation Strategy"]
      }
    ]
  },
  {
    id: "02",
    title: "Digital Platforms",
    desc: "We engineer ultra-fast, enterprise-standard web architectures. Utilizing high-precision frontend stacks, we build scalable design systems and bespoke headless infrastructure.",
    items: [
      {
        name: "Enterprise Web Apps",
        detail: "High-performance, complex web applications designed for scale, speed, and uncompromising user experience.",
        deliverables: ["React / Next.js Development", "Complex State Management", "Performance Optimization", "Secure Architecture"]
      },
      {
        name: "Headless Architecture",
        detail: "Decoupled frontend systems that deliver content anywhere, blazingly fast, without backend constraints.",
        deliverables: ["CMS Integration", "API Development", "Microservices", "Global CDN Deployment"]
      },
      {
        name: "Design Systems",
        detail: "Modular, reusable component libraries that bridge the gap between design and engineering, ensuring perfect consistency.",
        deliverables: ["Component Libraries", "Storybook", "Design Tokens", "Figma to Code"]
      }
    ]
  },
  {
    id: "03",
    title: "Creative Technology",
    desc: "Bridging avant-garde technology and interactive motion. We create sensory interaction designs, dynamic 3D web presentations, and bespoke immersive storytelling.",
    items: [
      {
        name: "Interactive WebGL",
        detail: "Browser-based 3D experiences that elevate your digital presence from a standard website to a memorable interactive journey.",
        deliverables: ["Three.js Development", "Custom Shaders", "Performance Tuning", "Interactive 3D Models"]
      },
      {
        name: "Motion Design",
        detail: "Purposeful animation that guides the eye, explains complex concepts, and adds a layer of premium polish to every interaction.",
        deliverables: ["UI Animation", "Micro-interactions", "Scroll Reveals", "SVG Animation"]
      },
      {
        name: "Immersive Storytelling",
        detail: "Combining narrative, motion, and code to tell your brand's story in a way that captivates and converts.",
        deliverables: ["Interactive Narratives", "Scrollytelling", "Data Visualization", "Creative Direction"]
      }
    ]
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

export default function ServicesPage() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleItem = (name: string) => {
    setActiveItem(activeItem === name ? null : name);
  };

  return (
    <div className="creatiancy-scope bg-[#FBFDF9] selection:bg-[#9B1C22] selection:text-white">
      <WebsiteHeader />
      
      {/* Apple-style Services Hero */}
      <main className="relative min-h-[60vh] md:min-h-[75vh] flex flex-col justify-center pt-32 pb-20 px-6 md:px-12 w-full z-10 bg-[#FBFDF9]">
        
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center gap-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[16px] md:text-[20px] font-semibold tracking-wide text-[#9B1C22] mb-2"
          >
            Services
          </motion.div>

          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[100px] font-semibold tracking-[-0.015em] text-[#1E1E1E] leading-[1.05] mb-4"
          >
            Build brands that <br className="hidden md:block" />
            move people.
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-4"
          >
            <p className="text-[18px] md:text-[22px] text-[#444444] font-normal leading-[1.4] max-w-2xl">
              We operate across three core disciplines: Brand Architecture, Digital Platforms, and Creative Technology. We execute at a world-class standard.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Services Sections */}
      <section className="relative z-10 pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          {servicesData.map((category, idx) => (
            <motion.div 
              key={category.id} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`pt-24 pb-24 border-t border-[#1E1E1E]/10 ${idx === 1 ? 'md:bg-[#F4F5F2] md:-mx-12 md:px-12 rounded-sm' : ''}`}
            >
              <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-16">
                <div className="md:w-1/3 shrink-0">
                  <span className="text-[14px] font-mono font-semibold text-[#9B1C22] block mb-4">{category.id}</span>
                  <h2 className="text-[36px] md:text-[48px] font-bold tracking-tight text-[#1E1E1E] leading-[1.1]">
                    {category.title}
                  </h2>
                </div>
                <div className="md:w-2/3">
                  <p className="text-[20px] md:text-[24px] text-[#444444] font-light leading-[1.5] max-w-2xl">
                    {category.desc}
                  </p>
                </div>
              </div>

              {/* Expandable Service Rows */}
              <div className="flex flex-col border-t border-[#1E1E1E]/10">
                {category.items.map((item, itemIdx) => {
                  const isActive = activeItem === item.name;
                  return (
                    <div key={item.name} className="border-b border-[#1E1E1E]/10">
                      <button 
                        onClick={() => toggleItem(item.name)}
                        className="w-full text-left py-8 md:py-10 flex items-center justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9B1C22]"
                        aria-expanded={isActive}
                      >
                        <div className="flex items-center gap-6 md:gap-16 w-3/4">
                          <span className="text-[12px] font-mono text-[#A3A3A3] group-hover:text-[#1E1E1E] transition-colors shrink-0">
                            0{itemIdx + 1}
                          </span>
                          <h3 className={`text-[20px] md:text-[32px] font-light tracking-tight transition-all duration-500 ${isActive ? 'text-[#9B1C22] md:translate-x-4' : 'text-[#1E1E1E] group-hover:md:translate-x-4'}`}>
                            {item.name}
                          </h3>
                        </div>
                        <div className={`shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#1E1E1E]/20 flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-[#1E1E1E] border-[#1E1E1E] rotate-45' : 'group-hover:border-[#1E1E1E]'}`}>
                          <span className={`text-lg md:text-xl leading-none transition-colors duration-500 ${isActive ? 'text-white' : 'text-[#1E1E1E]'}`}>+</span>
                        </div>
                      </button>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pb-12 pt-4 pl-0 md:pl-28 flex flex-col md:flex-row gap-8 md:gap-16">
                              <div className="md:w-1/2">
                                <p className="text-[16px] md:text-[18px] text-[#555555] font-light leading-[1.6]">
                                  {item.detail}
                                </p>
                              </div>
                              <div className="md:w-1/2">
                                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#1E1E1E] mb-6">Core Deliverables</p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {item.deliverables.map(del => (
                                    <li key={del} className="flex items-start gap-3">
                                      <span className="text-[#9B1C22] mt-[6px] text-[8px]">■</span>
                                      <span className="text-[14px] text-[#444444] font-medium">{del}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white border-t border-[#EAEAEA] py-32 md:py-48 px-6 md:px-12 text-center relative overflow-hidden">
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <p className="text-[#9B1C22] text-[12px] font-bold tracking-[0.2em] uppercase mb-6">Have something worth building?</p>
          <h2 className="text-[40px] sm:text-[56px] md:text-[80px] font-semibold tracking-[-0.04em] text-[#1E1E1E] leading-[1.05] mb-12">
            Let&apos;s turn the idea into <br className="hidden sm:block" /> something people remember.
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
            <Link
              href="/contact"
              className="flex items-center justify-center px-6 py-3 bg-[#9B1C22] text-white rounded-full text-[15px] font-semibold transition-all duration-300 hover:bg-[#7A151A] shadow-md focus:outline-none"
            >
              Start Project
            </Link>
            
            <Link
              href="/work"
              className="flex items-center justify-center px-6 py-3 bg-transparent text-[#2997FF] rounded-full text-[15px] font-semibold transition-all duration-300 hover:underline focus:outline-none"
            >
              View Selected Work <span className="ml-1 text-[12px]">›</span>
            </Link>
          </div>
        </div>
      </section>

      <WebsiteFooter />
    </div>
  );
}
