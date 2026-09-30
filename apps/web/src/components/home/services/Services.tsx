"use client";

import React from "react";
import { motion } from "framer-motion";

const EXTENDED_SERVICES = [
  {
    id: "01",
    category: "Brand Strategy",
    desc: "We shape clear brand positioning, voice, and identity to help brands stand out and grow consistently.",
    list: ["Discovery & Strategic Insights", "Distinctive Differentiators", "Brand Purpose, Mission & Vision", "Core Value Offering", "Brand Naming Strategy"],
    bgColor: "bg-[#E5EDF4]", // Soft Blue
    textColor: "text-[#1E1E1E]",
    descColor: "text-gray-700",
    border: "border border-[#D1E0EE]"
  },
  {
    id: "02",
    category: "Content Creation",
    desc: "We create strategic, engaging content - visuals, videos, and copy - that reflects your brand's personality and speaks directly to your audience.",
    list: ["Content Strategy & Planning", "Brand Storytelling", "Copywriting & Messaging", "Visual Content Production", "Social & Campaign Content"],
    bgColor: "bg-white",
    textColor: "text-[#1E1E1E]",
    descColor: "text-gray-500",
    shadow: "shadow-[0_10px_50px_rgba(0,0,0,0.06)] border border-gray-100"
  },
  {
    id: "03",
    category: "Website Design",
    desc: "We design high-performing, user-focused websites that balance aesthetics and functionality.",
    list: ["User Experience & Structure", "Interface & Visual Design", "Responsive Layouts", "Design Systems & Components", "Accessibility & Usability"],
    bgColor: "bg-[#1E1E1E]", // Eerie Black
    textColor: "text-white",
    descColor: "text-gray-300",
    border: "border border-gray-800"
  },
  {
    id: "04",
    category: "Performance & Growth",
    desc: "Data-driven marketing, conversion optimization, and measurable growth engineered to dominate competitive markets.",
    list: ["Performance Marketing", "SEO & Search Strategy", "Conversion Rate Optimization", "Data Analytics & Reporting", "Growth Hacking"],
    bgColor: "bg-[#FE4059]", // Vibrant Pink-Red
    textColor: "text-white",
    descColor: "text-white opacity-90",
    border: "border border-[#E03046]"
  },
  {
    id: "05",
    category: "Production",
    desc: "Photography, videography, and motion design crafted for modern formats and high-end visual storytelling.",
    list: ["Commercial Photography", "Video Production", "Motion Graphics & 3D", "Art Direction", "Post-Production"],
    bgColor: "bg-[#F3F4F6]", // Soft Gray
    textColor: "text-[#1E1E1E]",
    descColor: "text-gray-600",
    border: "border border-[#E5E7EB]"
  },
  {
    id: "06",
    category: "Creative Technology",
    desc: "Interactive WebGL, dynamic motion design, and bespoke immersive storytelling pushing digital boundaries.",
    list: ["WebGL & Three.js", "Immersive Web Experiences", "Creative Coding", "Interactive Installations", "Prototyping"],
    bgColor: "bg-[#9B1C22]", // Creatiancy Ruby Red
    textColor: "text-white",
    descColor: "text-white opacity-90",
    border: "border border-[#85161C]"
  }
];

export const Services = () => {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 lg:px-12 w-full bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          
whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <span className="text-[12px] font-medium tracking-[0.2em] text-[#9B1C22] uppercase block mb-4">What We Do</span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-medium tracking-tight text-[#1E1E1E] leading-[1.1] max-w-2xl">
            A multidisciplinary approach to modern challenges.
          </h2>
        </motion.div>

        <div className="relative w-full flex flex-col gap-8 lg:gap-10">
          {EXTENDED_SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              
whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`
                relative w-full rounded-[24px] md:rounded-[40px] p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col 
                lg:sticky origin-top transition-all duration-500 will-change-transform
                lg:top-[var(--card-top)]
                ${service.bgColor} ${service.textColor} ${service.shadow || service.border}
              `}
              style={{ 
                '--card-top': `calc(120px + ${idx * 28}px)`,
                zIndex: idx + 1
              } as React.CSSProperties}
            >
              
              <h3 className="text-[32px] md:text-[56px] lg:text-[72px] font-medium tracking-tight mb-8 md:mb-16 leading-[1.1] w-full">
                <span className="opacity-40 mr-3 md:mr-6 font-normal">
                  {service.id}
                </span> 
                {service.category}
              </h3>

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 w-full">
                
                <div className="flex-1 lg:max-w-lg">
                   <p className={`text-[16px] md:text-[20px] lg:text-[24px] font-light leading-[1.5] ${service.descColor}`}>
                     {service.desc}
                   </p>
                </div>
                
                <div className="flex-1 flex flex-col justify-center gap-4 mt-4 lg:mt-0 lg:pl-12">
                  {service.list.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 text-[15px] md:text-[18px] lg:text-[20px] font-normal tracking-wide">
                      <div className={`mt-[10px] w-[5px] h-[5px] rounded-full shrink-0 ${service.textColor === 'text-white' ? 'bg-white' : 'bg-[#9B1C22]'}`} />
                      <span className={service.textColor === 'text-white' ? 'opacity-90' : 'opacity-80'}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
