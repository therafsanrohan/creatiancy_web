"use client";

import { motion } from "framer-motion";

const sections = [
  { id: "1", title: "Services", content: "Creatiancy deploys elite branding, high-performance web architecture, and digital intelligence solutions. The exact scope, timeline, and execution vectors for each operation are strictly defined within isolated project agreements or official proposals." },
  { id: "2", title: "Use of Website", content: "You agree to utilize our digital ecosystem lawfully. You are strictly prohibited from attempting unauthorized access, distributing malicious payloads, or executing automated scrapers that degrade our edge-network performance." },
  { id: "3", title: "Intellectual Property", content: "All core architecture on this environment—including proprietary SVGs, motion configurations, text strings, and layout matrices—is the exclusive intellectual property of Creatiancy. Client deliverables become the explicit property of the client only upon 100% financial clearance." },
  { id: "4", title: "Payments & Agreements", content: "Financial parameters are locked within specific contracts. Failure to execute scheduled capital transfers will result in the immediate suspension or termination of all active development pipelines and hosting environments." },
  { id: "5", title: "Revisions & Delivery", content: "Iterative cycles are mapped out prior to launch. Expansion of scope beyond the agreed parameters requires independent invoicing and timeline adjustments. We do not engage in indefinite scope creep." },
  { id: "6", title: "Limitation of Liability", content: "Creatiancy operates as a high-tier service provider but assumes zero liability for indirect or consequential losses, third-party API deprecations, server outages, or market fluctuations impacting deployed strategies." },
  { id: "7", title: "Confidentiality", content: "Intelligence flows both ways. We execute strict internal secrecy protocols regarding client blueprints. Correspondingly, clients are forbidden from sharing Creatiancy's proprietary strategic frameworks with competing entities." },
  { id: "8", title: "Termination", content: "We maintain the absolute right to terminate all engagements and revoke access if legal or ethical terms are breached, capital flows are interrupted, or communication toxicity degrades the collaborative environment." },
  { id: "9", title: "Governing Law", content: "These terms are anchored by the jurisdictional laws of our operating base. Specific legal battlegrounds may be negotiated per-contract." },
  { id: "10", title: "Updates", content: "The digital landscape shifts rapidly. We update these operational terms seamlessly. Continued interaction with our systems equates to your active consent." },
];

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          
          <p className="text-[16px] md:text-[18px] text-[#666666] font-light leading-relaxed max-w-2xl">
            The operational framework, agreements, and legal guidelines governing your interaction with the Creatiancy digital studio.
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
               Contact & Legal Inquiries
             </h2>
             <p className="text-[16px] md:text-[18px] text-[#444444] font-light leading-[1.8] mb-6">
               For contract adjustments, clarifications, or legal inquiries regarding these terms, please contact our legal team directly.
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
