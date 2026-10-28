"use client";

import React, { useEffect } from "react";
import { 
  ArrowUpRight, 
  Mail, 
  Clock, 
  MapPin, 
  Users, 
  ShieldCheck 
} from "lucide-react";

export function ContactSection() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashOrQuery = () => {
        const params = new URLSearchParams(window.location.search);
        const hasContactQuery = params.get("section") === "contact";
        const hasContactHash = window.location.hash === "#contact";

        if (hasContactQuery || hasContactHash) {
          const element = document.getElementById("contact");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      };

      handleHashOrQuery();
      window.addEventListener("hashchange", handleHashOrQuery);
      return () => window.removeEventListener("hashchange", handleHashOrQuery);
    }
  }, []);

  return (
    <section
      id="contact"
      className="relative w-full bg-[#0C0708] text-white pt-24 sm:pt-32 pb-20 sm:pb-28 px-6 md:px-12 border-t border-white/[0.08] overflow-hidden select-none"
    >
      {/* Soft Ambient Crimson Glow behind card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#9B1C22]/12 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Minimalist Editorial Card Container */}
        <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#120E0F]/80 border border-white/10 backdrop-blur-2xl p-8 sm:p-12 md:p-16 overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.6)]">
          
          {/* Subtle Corner Light Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5C6C]/[0.06] blur-[90px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Authentic Invitation — Conversational, Zero Hard Selling */}
            <div className="lg:col-span-7">
              {/* Subtle Live Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-white/70">
                  Available for H1 Engagements
                </span>
              </div>

              {/* Title matching signature studio style */}
              <h2 className="text-[36px] sm:text-[50px] md:text-[62px] font-medium tracking-[-0.035em] text-white leading-[1.0] text-balance mb-5">
                Let&apos;s build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D5E] via-[#D32F38] to-[#9B1C22] font-normal">
                  what endures
                </span>
              </h2>

              <p className="text-[15px] sm:text-[17px] text-white/70 font-normal leading-relaxed max-w-lg mb-8">
                Got a vision, product launch, or rebrand on your mind? We love discussing ambitious ideas with founders. No pitch pressure — just direct practitioner dialogue.
              </p>

              {/* Minimal Trust Micro-Row */}
              <div className="flex flex-wrap items-center gap-6 text-[12px] font-mono text-white/60 pt-4 border-t border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#FF5C6C]" />
                  <span>24–48h Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5C6C]" />
                  <span>Dhaka &bull; Global Studio</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#FF5C6C]" />
                  <span>Direct Partner Access</span>
                </div>
              </div>
            </div>

            {/* Right Column: Creative, Intuitive Action Cluster */}
            <div className="lg:col-span-5 flex flex-col gap-3.5">
              
              {/* Primary Dispatch CTA */}
              <a
                href="mailto:hello@creatiancy.com?subject=Project%20Inquiry%20from%20Creatiancy%20Web"
                className="group relative flex items-center justify-between p-5 rounded-[20px] bg-gradient-to-b from-[#1C1517] to-[#140F10] hover:from-[#241A1C] hover:to-[#181113] border border-white/10 hover:border-[#FF5C6C]/50 transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-b from-[#A8242A] to-[#9B1C22] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868B] block">
                      Send an Email
                    </span>
                    <span className="text-[14px] font-semibold text-white tracking-wide">
                      hello@creatiancy.com
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/[0.06] text-white flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                </div>
              </a>

              {/* Secondary Instant WhatsApp CTA with Official WhatsApp Brand Logo */}
              <a
                href="https://wa.me/8801325078941"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-5 rounded-[20px] bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 border border-[#25D366]/25 group-hover:scale-105 transition-transform">
                    {/* Official WhatsApp Vector Logo */}
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868B] block">
                      Direct WhatsApp
                    </span>
                    <span className="text-[14px] font-medium text-white/90 tracking-wide">
                      Studio Messaging Line
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/[0.06] text-white flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                </div>
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
