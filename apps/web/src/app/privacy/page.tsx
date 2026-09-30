"use client";

import { motion } from "framer-motion";

const sections = [
  { id: "1", title: "Information We Collect", content: "We collect only what is strictly necessary to operate effectively and deliver premium experiences. This includes personal details (name, email), project-related intelligence, interaction data, and essential cookies for optimization." },
  { id: "2", title: "How We Use Data", content: "Your intelligence is utilized exclusively to respond to inquiries, architect complex digital services, and optimize website performance. We absolutely do not sell or trade your personal data to third parties." },
  { id: "3", title: "Data Sharing", content: "We may deploy data externally only under strict necessity: with highly trusted enterprise service providers (Vercel, Analytics, Communications), or when explicitly required by international law." },
  { id: "4", title: "Data Security", content: "We apply military-grade routing, native security layers, and organizational measures to protect your data. However, no internet-facing architecture is completely impenetrable." },
  { id: "5", title: "Cookies & Tracking", content: "We use encrypted cookies to enhance interface functionality and map user behavior. You maintain the right to disable cookies via browser parameters, though dynamic features may degrade." },
  { id: "6", title: "Your Rights", content: "Operating on a global scale, you possess the right to extract and audit your stored data, demand immediate cryptographic deletion, and withdraw operational consent at any time." },
  { id: "7", title: "Third-Party Links", content: "Our application may bridge to external ecosystems. We hold no architectural responsibility for external privacy algorithms or data collection policies." },
  { id: "8", title: "Policy Updates", content: "We may deploy updates to this policy dynamically. Structural changes will be reflected natively on this route with a revised timestamp." },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FBFDF9] selection:bg-[#9B1C22] selection:text-white pb-32">
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-4xl mx-auto text-center relative z-10 border-b border-[#1E1E1E]/10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <h1 className="text-[40px] md:text-[56px] font-semibold tracking-tight text-[#1E1E1E] leading-tight">
            Privacy Policy
          </h1>
          
          <p className="text-[16px] md:text-[18px] text-[#666666] font-light leading-relaxed max-w-2xl">
            We respect your privacy and are committed to protecting your personal data with enterprise-grade security and transparency.
          </p>
          <p className="text-[13px] font-medium text-[#1E1E1E] uppercase tracking-widest mt-2 px-4 py-2 bg-black/5 rounded-full">
            Effective Date: April 2026
          </p>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 max-w-3xl mx-auto pt-16">
        <div className="flex flex-col gap-12">
          {sections.map((section, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              
whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              key={section.id}
              className="flex flex-col gap-3"
            >
              <h2 className="text-[22px] md:text-[26px] font-semibold text-[#1E1E1E] flex items-baseline gap-3">
                <span className="text-[16px] text-[#9B1C22] font-mono">{section.id}.</span> 
                {section.title}
              </h2>
              <p className="text-[16px] md:text-[18px] text-[#444444] font-light leading-[1.8]">
                {section.content}
              </p>
            </motion.div>
          ))}
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            
whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 pt-12 border-t border-[#1E1E1E]/10"
          >
             <h2 className="text-[22px] md:text-[26px] font-semibold text-[#1E1E1E] mb-4">
               Contact & Privacy Audits
             </h2>
             <p className="text-[16px] md:text-[18px] text-[#444444] font-light leading-[1.8] mb-6">
               For absolute privacy-related escalations, data audits, or requests regarding this policy, please contact our team directly.
             </p>
             <a href="mailto:creatiancy@gmail.com" className="inline-flex items-center justify-center bg-[#1E1E1E] text-white px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#9B1C22] hover:-translate-y-1 hover:shadow-lg transition-all w-fit">
               creatiancy@gmail.com
             </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
