"use client";

import { useState } from "react";
import { motion, Variants, Transition } from "framer-motion";
import { ArrowRight, Mail, Briefcase, MapPin, Phone, Send, Loader2, CheckCircle2 } from "lucide-react";
import { footerConfig } from "@/constants/footerConfig";
import LiveTime from "@/components/LiveTime";
import { activePresence } from "@/constants/globalPresence";

const spring: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 15,
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { ...spring, type: "spring" as const } },
};

/**
 * Contact Page
 * ------------
 * This is the gateway for new project inquiries. We've designed it to feel
 * premium, high-impact, and accessible. No complex forms—just direct connections.
 */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Brand Identity",
    budget: "$5k - $15k",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }
    setStatus("submitting");
    try {
      // Simulate premium submission loader
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        projectType: "Brand Identity",
        budget: "$5k - $15k",
        message: ""
      });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative bg-[var(--bg)] selection:bg-[var(--ruby-red)] selection:text-white">
      {/* 
          Background Ambience 
          Adds that high-end 'Creatiancy' glow to the page corners.
      */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[var(--ruby-red)]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40vw] h-[40vw] bg-[var(--text)]/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 md:px-8 relative z-10"
      >
        <div className="max-w-[1200px] mx-auto w-full">

          <div className="flex flex-col justify-center">
            
            <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--ruby-red)]/10 text-[var(--ruby-red)] text-xs font-bold tracking-widest uppercase mb-8 border border-[var(--ruby-red)]/20 w-fit">
              <Mail className="w-3 h-3" />
              <span>Initiate Contact</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter mb-8 relative text-balance leading-[1.1]"
            >
              Let's build something<br />
              <span className="text-[var(--ruby-red)]">remarkable.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-xl md:text-2xl text-[var(--muted-fg)] font-light mb-16 max-w-2xl leading-relaxed"
            >
              Ready to elevate your digital presence? Reach out. We keep things direct, strategic, and hyper-actionable. No fluff, just execution.
            </motion.p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 items-start">
              {/* Left Column: Direct channels (Email, WhatsApp, global offices) */}
              <motion.div variants={item} className="lg:col-span-5 flex flex-col gap-6 w-full">
                {/* General Inquiries Card */}
                <a href="mailto:contact@creatiancy.com" className="group flex flex-col p-6 rounded-3xl bg-[var(--muted)]/5 border border-[var(--muted)]/20 hover:bg-[var(--muted)]/15 hover:border-[var(--ruby-red)]/40 transition-all duration-500 overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 -translate-y-1.5 transition-all duration-500">
                    <ArrowRight className="w-5 h-5 text-[var(--ruby-red)]" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--text)] text-[var(--bg)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-md">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-fg)] mb-1">General Inquiries</h3>
                  <span className="text-lg font-bold font-heading text-[var(--text)] group-hover:text-[var(--ruby-red)] transition-colors truncate">contact@creatiancy.com</span>
                </a>

                {/* WhatsApp Card */}
                <a href={footerConfig.contact.chat.link} target="_blank" rel="noopener noreferrer" className="group flex flex-col p-6 rounded-3xl bg-[var(--muted)]/5 border border-[var(--muted)]/20 hover:bg-[var(--muted)]/15 hover:border-[var(--ruby-red)]/40 transition-all duration-500 overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 -translate-y-1.5 transition-all duration-500">
                    <ArrowRight className="w-5 h-5 text-[var(--ruby-red)]" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-md shadow-[#25D366]/10">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-fg)] mb-1">Direct Chat</h3>
                  <span className="text-lg font-bold font-heading text-[var(--text)] group-hover:text-[var(--ruby-red)] transition-colors">{footerConfig.contact.chat.whatsapp}</span>
                </a>

                {/* Careers Card */}
                <div className="group flex flex-col p-6 rounded-3xl bg-[var(--muted)]/5 border border-[var(--muted)]/20 hover:bg-[var(--muted)]/10 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-[var(--muted)]/50 text-[var(--text)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 border border-[var(--muted)]/20">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-fg)] mb-2">Careers & Operations</h3>
                  <div className="flex flex-col gap-1.5">
                    <a href="mailto:hr@creatiancy.com" className="text-sm font-semibold text-[var(--text)] hover:text-[var(--ruby-red)] transition-colors inline-flex items-center gap-1.5 truncate">hr@creatiancy.com</a>
                    <a href="mailto:business@creatiancy.com" className="text-sm font-semibold text-[var(--text)] hover:text-[var(--ruby-red)] transition-colors inline-flex items-center gap-1.5 truncate">business@creatiancy.com</a>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Premium Inquiry Form */}
              <motion.div 
                variants={item} 
                className="lg:col-span-7 bg-[var(--muted)]/10 border border-[var(--muted)]/30 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden backdrop-blur-md shadow-2xl hover:border-[var(--ruby-red)]/20 transition-colors duration-500 w-full"
              >
                {/* Form Background Deco */}
                <div className="absolute top-[-20%] right-[-20%] w-[200px] h-[200px] bg-[var(--ruby-red)]/5 rounded-full blur-[50px] pointer-events-none" />
                
                {status === "success" ? (
                  <div className="py-12 flex flex-col items-center text-center justify-center h-full space-y-6">
                    <div className="w-20 h-20 rounded-full bg-[var(--ruby-red)]/10 text-[var(--ruby-red)] flex items-center justify-center shadow-lg border border-[var(--ruby-red)]/20 animate-pulse">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold font-heading">Proposal Transmitted!</h3>
                      <p className="text-[var(--muted-fg)] max-w-sm text-balance font-light leading-relaxed">
                        We have received your parameters. Rafsan and the engineering team will review your scope and follow up within 24 hours.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-xl font-bold font-heading mb-6 tracking-tight text-[var(--text)]">
                      Initiate Project Scope
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name input */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-fg)]">Your Name</label>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="Rafsan Rohan"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-[var(--muted)]/10 focus:bg-[var(--bg)] border border-[var(--muted)]/20 focus:border-[var(--ruby-red)]/40 rounded-2xl py-3.5 px-5 outline-none transition-all duration-300 placeholder-[var(--muted-fg)]/30 font-medium text-sm text-[var(--text)] focus:ring-4 focus:ring-[var(--ruby-red)]/5"
                        />
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-fg)]">Your Email</label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="partner@creatiancy.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-[var(--muted)]/10 focus:bg-[var(--bg)] border border-[var(--muted)]/20 focus:border-[var(--ruby-red)]/40 rounded-2xl py-3.5 px-5 outline-none transition-all duration-300 placeholder-[var(--muted-fg)]/30 font-medium text-sm text-[var(--text)] focus:ring-4 focus:ring-[var(--ruby-red)]/5"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Project Type selection */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="projectType" className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-fg)]">Project Category</label>
                        <select
                          id="projectType"
                          value={formData.projectType}
                          onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                          className="w-full bg-[var(--muted)]/10 border border-[var(--muted)]/20 focus:border-[var(--ruby-red)]/40 focus:bg-[var(--bg)] rounded-2xl py-3.5 px-5 outline-none transition-all duration-300 font-medium text-sm text-[var(--text)] focus:ring-4 focus:ring-[var(--ruby-red)]/5 cursor-pointer appearance-none"
                        >
                          <option value="Brand Identity" className="bg-[var(--bg)] text-[var(--text)]">Brand Identity Systems</option>
                          <option value="Web Development" className="bg-[var(--bg)] text-[var(--text)]">Web Design & Engineering</option>
                          <option value="Creative Campaigns" className="bg-[var(--bg)] text-[var(--text)]">Creative Marketing Campaign</option>
                          <option value="Other" className="bg-[var(--bg)] text-[var(--text)]">Other Digital Legacy</option>
                        </select>
                      </div>

                      {/* Budget selector */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="budget" className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-fg)]">Estimated Budget</label>
                        <select
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => setFormData({...formData, budget: e.target.value})}
                          className="w-full bg-[var(--muted)]/10 border border-[var(--muted)]/20 focus:border-[var(--ruby-red)]/40 focus:bg-[var(--bg)] rounded-2xl py-3.5 px-5 outline-none transition-all duration-300 font-medium text-sm text-[var(--text)] focus:ring-4 focus:ring-[var(--ruby-red)]/5 cursor-pointer appearance-none"
                        >
                          <option value="<$5k" className="bg-[var(--bg)] text-[var(--text)]">Below $5,000</option>
                          <option value="$5k - $15k" className="bg-[var(--bg)] text-[var(--text)]">$5,000 – $15,000</option>
                          <option value="$15k - $50k" className="bg-[var(--bg)] text-[var(--text)]">$15,000 – $50,000</option>
                          <option value="$50k+" className="bg-[var(--bg)] text-[var(--text)]">$50,000+ (Enterprise)</option>
                        </select>
                      </div>
                    </div>

                    {/* Message textarea */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-fg)]">Project Scope Details</label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        placeholder="Tell us about your brand vision, target timeline, and key requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-[var(--muted)]/10 focus:bg-[var(--bg)] border border-[var(--muted)]/20 focus:border-[var(--ruby-red)]/40 rounded-2xl py-3.5 px-5 outline-none transition-all duration-300 placeholder-[var(--muted-fg)]/30 font-medium text-sm text-[var(--text)] focus:ring-4 focus:ring-[var(--ruby-red)]/5 resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-xs font-bold text-[var(--ruby-red)]">Please complete all required fields before submission.</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full inline-flex justify-center items-center gap-3 bg-[var(--text)] text-[var(--bg)] hover:bg-[var(--ruby-red)] hover:text-white px-6 py-4 rounded-full font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting Proposal...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Proposal</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
            
            {/* Global Presence */}
            <motion.div variants={item} className="pt-12 border-t border-[var(--muted)]/30">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-fg)] mb-8 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Global Footprint
              </h3>
              
              <div className="flex flex-wrap gap-3 md:gap-4 mt-1">
                {activePresence.map((loc, i) => (
                  <div key={i} className="group flex items-center p-3 md:p-4 rounded-2xl transition-all duration-500 gap-4 overflow-hidden border w-fit shrink-0 bg-gradient-to-br from-[var(--ruby-red)]/5 to-[var(--bg)] border-[var(--ruby-red)]/30 shadow-[0_0_20px_rgba(155,28,34,0.06)] hover:border-[var(--ruby-red)] hover:shadow-[0_0_30px_rgba(155,28,34,0.15)] hover:-translate-y-0.5 z-10 relative cursor-default">
                    {/* Flag Container */}
                    <div className="relative overflow-hidden rounded-[3px] shadow-sm shrink-0 bg-[var(--muted)]/20">
                      <img
                        src={`https://flagcdn.com/${loc.flag}.svg`}
                        alt={`${loc.country} Flag`}
                        className="w-8 h-5.5 md:w-10 md:h-7 object-cover transition-transform duration-700 scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Data Container */}
                    <div className="flex flex-col min-w-0 pr-2">
                      <div className="flex items-center justify-between gap-4 mb-0.5">
                        <span className="text-[14px] md:text-[15px] font-bold truncate text-[var(--text)] transition-colors duration-300">
                          {loc.city}
                        </span>
                        
                        {/* Pulse Indicator */}
                        <span className="relative flex h-2.5 w-2.5 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-80 bg-[var(--ruby-red)]"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--ruby-red)]"></span>
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[10px] md:text-[11px] font-semibold text-[var(--muted-fg)] uppercase tracking-wider truncate">
                          {loc.country}
                        </span>
                        <div className="text-[10px] md:text-[11px] shrink-0 font-medium text-[var(--ruby-red)]">
                          <LiveTime timeZone={loc.tz} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}