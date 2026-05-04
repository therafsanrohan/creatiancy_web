"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Link from "next/link";

const sections = [
  { id: "info", title: "1. Information We Collect" },
  { id: "usage", title: "2. How We Use Your Information" },
  { id: "sharing", title: "3. Data Sharing" },
  { id: "security", title: "4. Data Security" },
  { id: "cookies", title: "5. Cookies" },
  { id: "rights", title: "6. Your Rights" },
  { id: "links", title: "7. Third-Party Links" },
  { id: "updates", title: "8. Updates" },
  { id: "contact", title: "9. Contact" },
];

export default function PrivacyPolicyPage() {
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
              <Shield className="w-5 h-5 text-[var(--ruby-red)]" />
            </div>
            <span className="text-sm font-bold tracking-widest uppercase text-[var(--ruby-red)]">Legal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-8 text-[var(--text)]">
            Privacy Policy.
          </h1>
          <p className="text-xl md:text-2xl text-[var(--muted-fg)] leading-relaxed max-w-2xl font-light">
            We respect your privacy and are committed to protecting your personal data with enterprise-grade security.
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
                <strong className="text-[var(--text)] font-medium">Creatiancy</strong> (“we”, “our”, “us”) respects your privacy and is committed to protecting your personal data. This policy explains how we collect, use, and safeguard information when you interact with our website and services.
              </p>
            </div>

            <div id="info" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">1. Information We Collect</h2>
              <p>We collect only what is strictly necessary to operate effectively and deliver premium experiences:</p>
              <ul className="list-disc pl-6 space-y-3 marker:text-[var(--ruby-red)]">
                <li>Personal details such as name, email address, phone number</li>
                <li>Project-related intelligence and assets you choose to share</li>
                <li>Usage data such as interaction paths, time spent, and device architecture</li>
                <li>Cookies and tracking data strictly for analytics and optimization</li>
              </ul>
            </div>

            <div id="usage" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">2. How We Use Your Information</h2>
              <p>Your intelligence is utilized exclusively to:</p>
              <ul className="list-disc pl-6 space-y-3 marker:text-[var(--ruby-red)]">
                <li>Respond to high-level inquiries and establish communication</li>
                <li>Architect and deliver complex digital services</li>
                <li>Optimize website performance and user interaction models</li>
                <li>Analyze traffic patterns to refine our digital presence</li>
                <li>Maintain absolute security and prevent unauthorized access</li>
              </ul>
              <p className="font-medium text-[var(--text)] pt-4 border-l-2 border-[var(--ruby-red)] pl-4">
                We absolutely do not sell or trade your personal data to third parties.
              </p>
            </div>

            <div id="sharing" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">3. Data Sharing</h2>
              <p>We may deploy data externally only under strict necessity:</p>
              <ul className="list-disc pl-6 space-y-3 marker:text-[var(--ruby-red)]">
                <li>With highly trusted enterprise service providers (Vercel, Analytics, Communications)</li>
                <li>When explicitly required by international law or legal obligation</li>
              </ul>
            </div>

            <div id="security" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">4. Data Security</h2>
              <p>We apply military-grade routing, Next.js native security layers, and organizational measures to protect your data. However, no internet-facing architecture is completely impenetrable, and absolute protection cannot be technically guaranteed.</p>
            </div>

            <div id="cookies" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">5. Cookies</h2>
              <p>We use encrypted cookies to enhance interface functionality and map user behavior. You maintain the right to disable cookies via browser parameters, though dynamic features may degrade.</p>
            </div>

            <div id="rights" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">6. Your Rights</h2>
              <p>Operating on a global scale, you possess the right to:</p>
              <ul className="list-disc pl-6 space-y-3 marker:text-[var(--ruby-red)]">
                <li>Extract and audit your stored data</li>
                <li>Demand immediate cryptographic deletion</li>
                <li>Withdraw operational consent</li>
              </ul>
            </div>

            <div id="links" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">7. Third-Party Links</h2>
              <p>Our application may bridge to external ecosystems. We hold no architectural responsibility for external privacy algorithms.</p>
            </div>

            <div id="updates" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-heading font-bold text-[var(--text)]">8. Updates</h2>
              <p>We may deploy updates to this policy dynamically. Structural changes will be reflected natively on this route with a revised timestamp.</p>
            </div>

            <div id="contact" className="scroll-mt-32 p-8 rounded-2xl bg-[var(--text)] text-[var(--bg)]">
              <h2 className="text-3xl font-heading font-bold mb-4">9. Contact Protocol</h2>
              <p className="mb-6 opacity-80">For absolute privacy-related escalations or data audits:</p>
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
