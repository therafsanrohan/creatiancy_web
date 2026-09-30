"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Container } from "@/components/ui/Layout";
import { Heading, Text } from "@/components/ui/Typography";

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
    <div className="min-h-screen pt-32 pb-24 bg-[var(--bg)] text-[var(--text)]">
      <Container className="mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--ruby-red)]/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[var(--ruby-red)]" />
            </div>
            <Text variant="small" className="font-bold tracking-widest uppercase text-[var(--ruby-red)]">Legal</Text>
          </div>
          <Heading level={1} className="text-5xl md:text-7xl font-bold tracking-tight">
            Privacy Policy.
          </Heading>
          <Text variant="lead" className="max-w-2xl text-[var(--muted-fg)]">
            We respect your privacy and are committed to protecting your personal data with enterprise-grade security.
          </Text>
        </motion.div>
      </Container>

      <Container>
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Sticky Sidebar (Table of Contents) */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hidden lg:block w-72 sticky top-32 shrink-0"
          >
            <div className="p-6 rounded-2xl bg-[var(--muted)]/10 border border-[var(--border)]">
              <Text variant="small" className="uppercase font-bold tracking-widest text-[var(--muted-fg)] mb-6">Contents</Text>
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
            className="flex-1 space-y-16"
          >
            <div className="pb-8 border-b border-[var(--border)]">
              <Text className="font-medium">Effective Date: April 2026</Text>
              <Text className="mt-4 text-[var(--muted-fg)]">
                <strong className="text-[var(--text)] font-medium">Creatiancy</strong> (“we”, “our”, “us”) respects your privacy and is committed to protecting your personal data. This policy explains how we collect, use, and safeguard information when you interact with our website and services.
              </Text>
            </div>

            <div id="info" className="scroll-mt-32 space-y-6">
              <Heading level={2}>1. Information We Collect</Heading>
              <Text className="text-[var(--muted-fg)]">We collect only what is strictly necessary to operate effectively and deliver premium experiences:</Text>
              <ul className="list-disc pl-6 space-y-3 marker:text-[var(--ruby-red)] text-[var(--muted-fg)]">
                <li>Personal details such as name, email address, phone number</li>
                <li>Project-related intelligence and assets you choose to share</li>
                <li>Usage data such as interaction paths, time spent, and device architecture</li>
                <li>Cookies and tracking data strictly for analytics and optimization</li>
              </ul>
            </div>

            <div id="usage" className="scroll-mt-32 space-y-6">
              <Heading level={2}>2. How We Use Your Information</Heading>
              <Text className="text-[var(--muted-fg)]">Your intelligence is utilized exclusively to:</Text>
              <ul className="list-disc pl-6 space-y-3 marker:text-[var(--ruby-red)] text-[var(--muted-fg)]">
                <li>Respond to high-level inquiries and establish communication</li>
                <li>Architect and deliver complex digital services</li>
                <li>Optimize website performance and user interaction models</li>
                <li>Analyze traffic patterns to refine our digital presence</li>
                <li>Maintain absolute security and prevent unauthorized access</li>
              </ul>
              <div className="pt-4 border-l-2 border-[var(--ruby-red)] pl-4">
                <Text className="font-medium text-[var(--text)]">We absolutely do not sell or trade your personal data to third parties.</Text>
              </div>
            </div>

            <div id="sharing" className="scroll-mt-32 space-y-6">
              <Heading level={2}>3. Data Sharing</Heading>
              <Text className="text-[var(--muted-fg)]">We may deploy data externally only under strict necessity:</Text>
              <ul className="list-disc pl-6 space-y-3 marker:text-[var(--ruby-red)] text-[var(--muted-fg)]">
                <li>With highly trusted enterprise service providers (Vercel, Analytics, Communications)</li>
                <li>When explicitly required by international law or legal obligation</li>
              </ul>
            </div>

            <div id="security" className="scroll-mt-32 space-y-6">
              <Heading level={2}>4. Data Security</Heading>
              <Text className="text-[var(--muted-fg)]">We apply military-grade routing, Next.js native security layers, and organizational measures to protect your data. However, no internet-facing architecture is completely impenetrable, and absolute protection cannot be technically guaranteed.</Text>
            </div>

            <div id="cookies" className="scroll-mt-32 space-y-6">
              <Heading level={2}>5. Cookies</Heading>
              <Text className="text-[var(--muted-fg)]">We use encrypted cookies to enhance interface functionality and map user behavior. You maintain the right to disable cookies via browser parameters, though dynamic features may degrade.</Text>
            </div>

            <div id="rights" className="scroll-mt-32 space-y-6">
              <Heading level={2}>6. Your Rights</Heading>
              <Text className="text-[var(--muted-fg)]">Operating on a global scale, you possess the right to:</Text>
              <ul className="list-disc pl-6 space-y-3 marker:text-[var(--ruby-red)] text-[var(--muted-fg)]">
                <li>Extract and audit your stored data</li>
                <li>Demand immediate cryptographic deletion</li>
                <li>Withdraw operational consent</li>
              </ul>
            </div>

            <div id="links" className="scroll-mt-32 space-y-6">
              <Heading level={2}>7. Third-Party Links</Heading>
              <Text className="text-[var(--muted-fg)]">Our application may bridge to external ecosystems. We hold no architectural responsibility for external privacy algorithms.</Text>
            </div>

            <div id="updates" className="scroll-mt-32 space-y-6">
              <Heading level={2}>8. Updates</Heading>
              <Text className="text-[var(--muted-fg)]">We may deploy updates to this policy dynamically. Structural changes will be reflected natively on this route with a revised timestamp.</Text>
            </div>

            <div id="contact" className="scroll-mt-32 p-8 rounded-2xl bg-[var(--text)] text-[var(--bg)]">
              <Heading level={2} className="mb-4">9. Contact Protocol</Heading>
              <Text className="mb-6 opacity-80">For absolute privacy-related escalations or data audits:</Text>
              <div className="flex flex-col gap-2">
                <Text variant="small" className="uppercase font-bold tracking-widest opacity-50">Direct Email</Text>
                <a href="mailto:Contact@creatiancy.com" className="text-2xl font-medium hover:text-[var(--ruby-red)] transition-colors">Contact@creatiancy.com</a>
              </div>
            </div>

          </motion.div>
        </div>
      </Container>
    </div>
  );
}
