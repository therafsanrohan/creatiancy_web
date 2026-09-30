"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

      <main className="relative min-h-[50vh] md:min-h-[60vh] flex flex-col justify-center pt-40 pb-24 px-6 md:px-12 w-full z-10 bg-[#FBFDF9] overflow-hidden">

        <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-[#9B1C22]/5 rounded-full blur-[100px] md:blur-[150px]"
          />
        </div>

        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[64px] sm:text-[80px] md:text-[110px] font-semibold tracking-tighter text-[#1E1E1E] leading-[0.95] mb-8"
          >
            What we do.
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "64px" }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="h-[2px] bg-[#9B1C22] mb-8"
          />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <p className="text-[20px] md:text-[28px] text-[#555555] font-light leading-[1.5] max-w-3xl">
              We engineer visual systems, digital platforms, and immersive experiences designed for absolute clarity and commercial authority.
            </p>
          </motion.div>
        </div>
      </main>

      <section className="relative z-10 pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          {servicesData.map((category, idx) => (
            <motion.div 
              key={category.id} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:flex-row gap-12 lg:gap-24 py-24 md:py-32 border-t border-[#1E1E1E]/5 relative"
            >
              
              <div className="lg:w-1/3 shrink-0 lg:sticky lg:top-32 h-fit">
                <span className="text-[14px] font-mono font-semibold text-[#9B1C22] block mb-4">{category.id}</span>
                <h2 className="text-[40px] md:text-[56px] font-bold tracking-tight text-[#1E1E1E] leading-[1.1] mb-6">
                  {category.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-[#555] font-light leading-[1.6]">
                  {category.desc}
                </p>
              </div>

              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {category.items.map((item, itemIdx) => (
                  <div 
                    key={item.name} 
                    className="bg-white border border-[#1E1E1E]/5 p-8 md:p-10 rounded-[32px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 flex flex-col group"
                  >
                    <span className="text-[#1E1E1E]/10 font-bold text-[56px] leading-none mb-8 group-hover:text-[#9B1C22]/10 transition-colors duration-500">
                      0{itemIdx + 1}
                    </span>
                    <h3 className="text-[24px] md:text-[28px] font-medium text-[#1E1E1E] tracking-tight mb-4">
                      {item.name}
                    </h3>
                    <p className="text-[16px] text-[#666] font-light leading-relaxed mb-10 flex-1">
                      {item.detail}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {item.deliverables.map(del => (
                        <span 
                          key={del} 
                          className="px-4 py-2 bg-[#FAFAFA] text-[#1E1E1E] text-[13px] rounded-full font-medium border border-[#1E1E1E]/5"
                        >
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative py-40 md:py-64 px-4 md:px-8 lg:px-12 w-full bg-[#050505] overflow-hidden mt-12">
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#9B1C22] rounded-full blur-[120px] md:blur-[180px]"
          />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[48px] md:text-[80px] lg:text-[110px] font-medium tracking-tighter text-white leading-[0.9] mb-12"
          >
            Let&apos;s turn the idea into <br className="hidden md:block" />
            <span className="italic text-[#9B1C22] font-serif">something unforgettable.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link 
              href="/contact" 
              className="w-full sm:w-auto h-14 md:h-16 flex items-center justify-center px-8 md:px-12 bg-[#9B1C22] !text-white text-[16px] md:text-[18px] font-medium rounded-full shadow-[0_0_40px_rgba(155,28,34,0.4)] hover:shadow-[0_0_60px_rgba(155,28,34,0.6)] hover:-translate-y-1 transition-all"
            >
              Start Project
            </Link>
            <Link 
              href="/work" 
              className="w-full sm:w-auto h-14 md:h-16 flex items-center justify-center px-8 md:px-12 bg-white !text-black text-[16px] md:text-[18px] font-medium rounded-full hover:bg-gray-200 hover:-translate-y-1 transition-all"
            >
              View Selected Work
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
