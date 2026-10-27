"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import "@/app/website.css";

const PROJECT_TYPES = [
  "Brand Strategy & Architecture",
  "Digital UI/UX & Web Platform",
  "Content Lab & 3D Film",
  "Creative Technology / WebGL",
  "Comprehensive Overhaul",
];

const BUDGET_TIERS = [
  "Standard Scope",
  "Comprehensive System",
  "Enterprise Architecture",
  "Advisory Retainer",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: PROJECT_TYPES[0],
    budgetTier: BUDGET_TIERS[0],
    scope: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successResponse, setSuccessResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        scope: `[Type: ${formData.projectType}] [Tier: ${formData.budgetTier}]\n${formData.scope}`,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Submission could not be completed. Please use direct dispatch options.");
      } else {
        setStatus("success");
        setSuccessResponse(data);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Network error. Please try again or use direct dispatch options below.");
    }
  };

  return (
    <div className="creatiancy-scope bg-[#070809]">
      <main className="w-full relative min-h-screen pt-36 md:pt-48 pb-32 px-6 md:px-12 border-b border-white/[0.08]">
        <div className="max-w-[1440px] mx-auto">

          {/* Section Indicator */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 md:pb-12 border-b border-white/[0.08] text-[11px] font-mono tracking-[0.16em] uppercase text-neutral-400 mb-16">
            <div>
              <span className="text-[#FF2B43] mr-2">01</span>
              <span>CLIENT INQUIRIES</span>
            </div>
            <div>
              <span className="text-[#FF2B43] mr-2">02</span>
              <span>STUDIO SELECTION Q4</span>
            </div>
            <div className="hidden md:block">
              <span className="text-[#FF2B43] mr-2">03</span>
              <span>CONFIDENTIAL PROPOSALS</span>
            </div>
            <div className="text-right">
              <span className="text-[#FF2B43] mr-2">04</span>
              <span>RESPONSE: 24-48H</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

            {/* Left Column: Creative Invitation & Direct CTAs */}
            <div className="lg:col-span-5 lg:sticky lg:top-40">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#FF2B43] uppercase block mb-4">
                INITIATE A BRIEF
              </span>
              <h1 className="text-[40px] sm:text-[56px] md:text-[72px] font-bold tracking-[-0.035em] text-[#F4F5F7] leading-[0.98] mb-8 uppercase">
                Let&apos;s build <br />
                <span className="text-[#FF2B43]">what endures.</span>
              </h1>

              <div className="text-[16px] md:text-[19px] text-neutral-400 font-light leading-relaxed space-y-6 mb-12">
                <p>
                  We collaborate with ambitious brand leaders and founders to architect market clarity and commercial distinction.
                </p>
                <p className="text-[14px] text-neutral-500">
                  Every inquiry is evaluated directly by our senior creative directors. We take on a limited number of studio engagements each quarter.
                </p>
              </div>

              {/* Direct Action Triggers */}
              <div className="p-8 bg-[#0E1114] border border-white/[0.08] rounded-[20px] space-y-6">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#FF2B43] block mb-2">
                    ALTERNATIVE DIRECT DISPATCH
                  </span>
                  <p className="text-[14px] text-neutral-400 font-light">
                    Prefer direct dispatch? Transmit your brief or message our studio line directly:
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="mailto:hello@creatiancy.com?subject=Studio%20Inquiry%20from%20Creatiancy%20Web"
                    aria-label="Send project brief via email"
                    className="flex-1 inline-flex items-center justify-center h-12 px-7 bg-gradient-to-b from-[#A8242A] to-[#9B1C22] text-white text-[13px] font-medium rounded-full shadow-[0_2px_12px_rgba(155,28,34,0.25)] hover:from-[#9B1C22] hover:to-[#82151B] transition-all min-h-[48px]"
                  >
                    Send Email Brief
                  </a>
                  <a
                    href="https://wa.me/8801325078941"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Message studio director on WhatsApp"
                    className="flex-1 inline-flex items-center justify-center h-12 px-7 bg-white/[0.04] text-[#F4F5F7] border border-white/10 text-[13px] font-medium rounded-full hover:border-[#9B1C22]/50 hover:bg-white/[0.08] transition-all min-h-[48px]"
                  >
                    WhatsApp Direct
                  </a>
                </div>

                <div className="pt-2 text-[11px] font-mono text-neutral-500 flex items-center justify-between border-t border-white/[0.06]">
                  <span>LOCATION: DHAKA, BD</span>
                  <span>HOURS: SUN &ndash; THU 09:00 &ndash; 17:00</span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Brief Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#0E1114] border border-white/[0.08] rounded-[24px] p-8 md:p-12 lg:p-14 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">

                {status === "success" ? (
                  <div className="py-12 flex flex-col items-start gap-6">
                    <span className="w-12 h-12 rounded-full bg-[#FF2B43] text-[#070809] flex items-center justify-center font-mono text-xl font-bold">
                      ✓
                    </span>
                    <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight text-[#F4F5F7] uppercase">
                      Brief Successfully Transmitted
                    </h2>
                    <p className="text-[16px] text-neutral-400 font-light leading-relaxed">
                      {successResponse?.message || "Thank you. Your project brief has been recorded. Our creative directors will review your parameters and follow up within 24 to 48 hours."}
                    </p>
                    <div className="p-4 bg-white/[0.03] border border-white/10 rounded-[12px] text-[13px] font-mono text-neutral-300 w-full">
                      Next Step: A senior creative partner will review your scope and provide initial feedback or schedule an introductory alignment call.
                    </div>
                    <button
                      onClick={() => {
                        setStatus("idle");
                        setFormData({
                          name: "",
                          email: "",
                          projectType: PROJECT_TYPES[0],
                          budgetTier: BUDGET_TIERS[0],
                          scope: "",
                        });
                      }}
                      className="mt-4 text-[12px] font-medium tracking-wide text-[#9B1C22] hover:underline"
                    >
                      Submit Another Studio Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <h2 className="text-[24px] sm:text-[30px] font-bold tracking-tight text-[#F4F5F7] uppercase mb-2">
                        Project Brief Form
                      </h2>
                      <p className="text-[14px] text-neutral-400 font-light">
                        Outline your ambitions, requirements, and targeted launch date.
                      </p>
                    </div>

                    {status === "error" && (
                      <div className="p-4 bg-red-950/40 border border-red-500/40 text-red-200 rounded-[8px] text-[13px] leading-relaxed">
                        {errorMessage}
                      </div>
                    )}

                    {/* Discipline Focus Chips */}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-[0.16em] text-neutral-400 mb-3">
                        Discipline Focus
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {PROJECT_TYPES.map((type) => {
                          const isSelected = formData.projectType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData({ ...formData, projectType: type })}
                              className={`h-10 px-4 rounded-full text-[12px] font-mono tracking-wider transition-all min-h-[48px] ${
                                isSelected
                                  ? "bg-[#FF2B43] text-[#070809] font-bold"
                                  : "bg-white/[0.03] text-neutral-300 border border-white/[0.08] hover:border-[#FF2B43]/40"
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-[11px] font-mono uppercase tracking-[0.16em] text-neutral-400 mb-2">
                          Your Name &bull; Organization <span className="text-[#FF2B43]">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-[12px] px-4 text-[15px] text-[#F4F5F7] focus:outline-none focus:border-[#FF2B43] transition-colors"
                          placeholder="e.g. Sarah Jenkins, Head of Brand"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-[11px] font-mono uppercase tracking-[0.16em] text-neutral-400 mb-2">
                          Work Email <span className="text-[#9B1C22]">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-[12px] px-4 text-[15px] text-[#F4F5F7] focus:outline-none focus:border-[#9B1C22] transition-colors"
                          placeholder="sarah@organization.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="scope" className="block text-[11px] font-mono uppercase tracking-[0.16em] text-neutral-400 mb-2">
                        Project Scope &amp; Ambitions <span className="text-[#9B1C22]">*</span>
                      </label>
                      <textarea
                        id="scope"
                        rows={5}
                        required
                        value={formData.scope}
                        onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-[12px] p-4 text-[15px] text-[#F4F5F7] focus:outline-none focus:border-[#9B1C22] transition-colors resize-none leading-relaxed"
                        placeholder="Tell us about your brand challenge, key milestones, and what success looks like..."
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        disabled={status === "submitting"}
                      >
                        {status === "submitting" ? "Transmitting..." : "Submit Project Brief"}
                      </Button>
                      <span className="text-[11px] font-mono text-neutral-500">
                        Protected under studio non-disclosure standards
                      </span>
                    </div>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}