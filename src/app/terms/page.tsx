"use client";

import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import Link from "next/link";

const sections = [
  { id: "services", title: "1. Services" },
  { id: "usage", title: "2. Use of Website" },
  { id: "ip", title: "3. Intellectual Property" },
  { id: "payments", title: "4. Payments & Agreements" },
  { id: "delivery", title: "5. Revisions & Delivery" },
  { id: "liability", title: "6. Limitation of Liability" },
  { id: "confidentiality", title: "7. Confidentiality" },
  { id: "termination", title: "8. Termination" },
  { id: "law", title: "9. Governing Law" },
  { id: "updates", title: "10. Updates" },
  { id: "contact", title: "11. Contact" },
];

export default function TermsOfServicePage() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] selection:bg-[var(--ruby-red)] selection:text-white">
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[var(--ruby-red)]/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-[var(--ruby-red)]" />
            </div>
            <span className="text-sm font-bold tracking-widest uppercase text-[var(--ruby-red)]">Legal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-8 text-[var(--text)]">
            Terms of Service.
          </h1>
          <p className="text-xl md:text-2xl text-[var(--muted-fg)] leading-relaxed max-w-2xl font-light">
            The operational framework, agreements, and legal guidelines governing your interaction with the Creatiancy digital studio.
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pb-32">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Sticky Sidebar (Table of Contents) */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hidden lg:block w-72 sticky top-32 shrink-0"
          >
            <div className="p-6 rounded-2xl bg-[var(--muted)]/20 border border-[var(--muted)]/50 backdrop-blur-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-fg)] mb-6">Contents</h3>
              <nav className="flex flex-col gap-3">
                {sections.map((section) => (
                  <button 
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className="text-left text-sm font-medium text-[var(--text)]/70 hover:text-[var(--ruby-red)] transition-colors duration-300"
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Main Document */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex-1 space-y-16 text-[var(--muted-fg)] text-lg md:text-xl leading-relaxed font-light"
          >
            <div className="pb-8 border-b border-[var(--muted)]/50">
              <p className="font-medium text-[var(--text)]">Effective Date: April 2026</p>
              <p className="mt-4">
                By accessing or utilizing Creatiancy’s digital infrastructure, agency services, or proprietary systems, you establish an operational agreement with the following parameters.
              </p>
            </div>

            <div id="services" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">1. Services</h2>
              <p>Creatiancy deploys elite branding, high-performance web architecture, and digital intelligence solutions. The exact scope, timeline, and execution vectors for each operation are strictly defined within isolated project agreements or official proposals.</p>
            </div>

            <div id="usage" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">2. Use of Website</h2>
              <p>You agree to utilize our digital ecosystem lawfully. You are strictly prohibited from:</p>
              <ul className="list-disc pl-6 space-y-3 marker:text-[var(--ruby-red)]">
                <li>Attempting unauthorized access or probing the system architecture</li>
                <li>Distributing malicious payloads or exploiting frontend logic</li>
                <li>Executing automated scrapers that degrade our edge-network performance</li>
              </ul>
            </div>

            <div id="ip" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">3. Intellectual Property</h2>
              <p>All core architecture on this environment—including proprietary SVGs, motion configurations, text strings, and layout matrices—is the exclusive intellectual property of Creatiancy.</p>
              <p className="font-medium text-[var(--text)] pt-4 border-l-2 border-[var(--ruby-red)] pl-4">
                Client deliverables become the explicit property of the client only upon 100% financial clearance.
              </p>
              <p>We maintain the global right to display shipped code and design in our portfolio matrices unless protected by a strict NDA.</p>
            </div>

            <div id="payments" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">4. Payments and Agreements</h2>
              <p>Financial parameters are locked within specific contracts. Failure to execute scheduled capital transfers will result in the immediate suspension or termination of all active development pipelines and hosting environments.</p>
            </div>

            <div id="delivery" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">5. Revisions and Delivery</h2>
              <p>Iterative cycles are mapped out prior to launch. Expansion of scope beyond the agreed parameters requires independent invoicing and timeline adjustments. We do not engage in indefinite scope creep.</p>
            </div>

            <div id="liability" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">6. Limitation of Liability</h2>
              <p>Creatiancy operates as a high-tier service provider but assumes zero liability for:</p>
              <ul className="list-disc pl-6 space-y-3 marker:text-[var(--ruby-red)]">
                <li>Indirect, consequential, or unforeseen corporate losses</li>
                <li>Third-party API deprecations or server outages</li>
                <li>Market fluctuations impacting deployed strategies</li>
              </ul>
            </div>

            <div id="confidentiality" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">7. Confidentiality</h2>
              <p>Intelligence flows both ways. We execute strict internal secrecy protocols regarding client blueprints. Correspondingly, clients are forbidden from sharing Creatiancy’s proprietary strategic frameworks with competing entities.</p>
            </div>

            <div id="termination" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">8. Termination</h2>
              <p>We maintain the absolute right to terminate all engagements and revoke access if:</p>
              <ul className="list-disc pl-6 space-y-3 marker:text-[var(--ruby-red)]">
                <li>Legal or ethical terms are breached</li>
                <li>Capital flows are interrupted</li>
                <li>Communication toxicity degrades the collaborative environment</li>
              </ul>
            </div>

            <div id="law" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">9. Governing Law</h2>
              <p>These terms are anchored by the jurisdictional laws of our operating base. Specific legal battlegrounds may be negotiated per-contract.</p>
            </div>

            <div id="updates" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">10. Updates</h2>
              <p>The digital landscape shifts rapidly. We update these operational terms seamlessly. Continued interaction with our systems equates to your active consent.</p>
            </div>

            <div id="contact" className="scroll-mt-32 p-8 rounded-2xl bg-[var(--text)] text-[var(--bg)]">
              <h2 className="text-3xl font-heading font-bold mb-4">11. Legal Communication</h2>
              <p className="mb-6 opacity-80">For contract adjustments or legal inquiries:</p>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-bold uppercase tracking-widest opacity-50">Direct Email</span>
                <a href="mailto:Contact@creatiancy.com" className="text-2xl font-medium hover:text-[var(--ruby-red)] transition-colors">Contact@creatiancy.com</a>
              </div>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}
