import Link from "next/link";
import Image from "next/image";
import { footerConfig } from "@/config/footerConfig";
import { MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--muted)] bg-[var(--bg)] py-16 mt-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 w-full max-w-[1000px]">
        {/* Top Section Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">
          {/* Logo & About */}
          <div className="flex flex-col gap-6 items-start lg:col-span-4">
            <Link href="/" className="relative w-40 h-10 transition-transform hover:scale-105 duration-300 outline-none" aria-label="Creatiancy Homepage">
              <div 
                className="w-full h-full bg-[#9B1C22] dark:bg-white transition-colors duration-300"
                style={{
                  WebkitMaskImage: 'url("/logos/Creatiancy logo.svg")',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'left center',
                  WebkitMaskSize: 'contain',
                  maskImage: 'url("/logos/Creatiancy logo.svg")',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'left center',
                  maskSize: 'contain'
                }}
              />
            </Link>
            <p className="text-[15px] leading-relaxed md:text-base text-[var(--muted-fg)] w-full max-w-sm text-balance">
              Precision-driven brand experiences and creative intelligence. We are a focused digital studio building clear, high-impact brand systems that perform and scale.
            </p>
            <div className="mt-2">
              <a 
                href={footerConfig.contact.chat.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full font-bold shadow-lg shadow-[#25D366]/20 hover:scale-105 hover:bg-[#1fae54] transition-all text-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Connect on WhatsApp
              </a>
            </div>
          </div>
          
          {/* Main Navigation Alignment */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 md:gap-8 text-left w-full">

            <div className="flex flex-col gap-4 w-full">
              <span className="font-bold text-[var(--text)] text-xs uppercase tracking-widest opacity-50 border-b border-[var(--muted)] pb-2 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> Global Footprint
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-1">
                {/* Bangladesh */}
                <div className="group relative flex flex-row lg:flex-col items-center lg:items-start justify-between p-5 rounded-2xl bg-[var(--muted)]/10 border border-[var(--muted)]/30 hover:bg-[var(--muted)]/20 transition-all duration-500 ease-out overflow-hidden gap-0 lg:gap-4">
                  <div className="flex flex-col z-10 relative lg:order-2">
                    <span className="text-lg font-bold font-heading text-[var(--text)] flex items-center gap-2 mb-1 group-hover:text-[var(--ruby-red)] transition-colors">
                      Dhaka
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ruby-red)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ruby-red)]"></span>
                      </span>
                    </span>
                    <span className="text-xs font-bold text-[var(--muted-fg)] uppercase tracking-widest">Bangladesh</span>
                  </div>
                  <div className="relative z-10 overflow-hidden rounded-[4px] shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 lg:order-1">
                    <img src="https://flagcdn.com/bd.svg" alt="Bangladesh Flag" className="w-12 h-8 lg:w-16 lg:h-10 object-cover" loading="lazy" />
                  </div>
                </div>

                {/* United States */}
                <div className="group relative flex flex-row lg:flex-col items-center lg:items-start justify-between p-5 rounded-2xl bg-[var(--muted)]/10 border border-[var(--muted)]/30 hover:bg-[var(--muted)]/20 transition-all duration-500 ease-out overflow-hidden gap-0 lg:gap-4">
                  <div className="flex flex-col z-10 relative lg:order-2">
                    <span className="text-lg font-bold font-heading text-[var(--text)] flex items-center gap-2 mb-1 group-hover:text-[var(--ruby-red)] transition-colors">
                      Wyoming
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ruby-red)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ruby-red)]"></span>
                      </span>
                    </span>
                    <span className="text-xs font-bold text-[var(--muted-fg)] uppercase tracking-widest">United States</span>
                  </div>
                  <div className="relative z-10 overflow-hidden rounded-[4px] shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 lg:order-1">
                    <img src="https://flagcdn.com/us.svg" alt="United States Flag" className="w-12 h-8 lg:w-16 lg:h-10 object-cover" loading="lazy" />
                  </div>
                </div>

                {/* South Africa 1 */}
                <div className="group relative flex flex-row lg:flex-col items-center lg:items-start justify-between p-5 rounded-2xl bg-[var(--muted)]/10 border border-[var(--muted)]/30 hover:bg-[var(--muted)]/20 transition-all duration-500 ease-out overflow-hidden gap-0 lg:gap-4">
                  <div className="flex flex-col z-10 relative lg:order-2">
                    <span className="text-lg font-bold font-heading text-[var(--text)] flex items-center gap-2 mb-1 group-hover:text-[var(--ruby-red)] transition-colors">
                      Cape Town
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ruby-red)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ruby-red)]"></span>
                      </span>
                    </span>
                    <span className="text-xs font-bold text-[var(--muted-fg)] uppercase tracking-widest">South Africa</span>
                  </div>
                  <div className="relative z-10 overflow-hidden rounded-[4px] shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 lg:order-1">
                    <img src="https://flagcdn.com/za.svg" alt="South Africa Flag" className="w-12 h-8 lg:w-16 lg:h-10 object-cover" loading="lazy" />
                  </div>
                </div>

                {/* Cyprus */}
                <div className="group relative flex flex-row lg:flex-col items-center lg:items-start justify-between p-5 rounded-2xl bg-[var(--muted)]/10 border border-[var(--muted)]/30 hover:bg-[var(--muted)]/20 transition-all duration-500 ease-out overflow-hidden gap-0 lg:gap-4">
                  <div className="flex flex-col z-10 relative lg:order-2">
                    <span className="text-lg font-bold font-heading text-[var(--text)] flex items-center gap-2 mb-1 group-hover:text-[var(--ruby-red)] transition-colors">
                      Nicosia
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ruby-red)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ruby-red)]"></span>
                      </span>
                    </span>
                    <span className="text-xs font-bold text-[var(--muted-fg)] uppercase tracking-widest">Cyprus</span>
                  </div>
                  <div className="relative z-10 overflow-hidden rounded-[4px] shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 lg:order-1">
                    <img src="https://flagcdn.com/cy.svg" alt="Cyprus Flag" className="w-12 h-8 lg:w-16 lg:h-10 object-cover" loading="lazy" />
                  </div>
                </div>

                {/* South Africa 2 */}
                <div className="group relative flex flex-row lg:flex-col items-center lg:items-start justify-between p-5 rounded-2xl bg-[var(--muted)]/10 border border-[var(--muted)]/30 hover:bg-[var(--muted)]/20 transition-all duration-500 ease-out overflow-hidden gap-0 lg:gap-4">
                  <div className="flex flex-col z-10 relative lg:order-2">
                    <span className="text-lg font-bold font-heading text-[var(--text)] flex items-center gap-2 mb-1 group-hover:text-[var(--ruby-red)] transition-colors">
                      Johannesburg
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ruby-red)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ruby-red)]"></span>
                      </span>
                    </span>
                    <span className="text-xs font-bold text-[var(--muted-fg)] uppercase tracking-widest">South Africa</span>
                  </div>
                  <div className="relative z-10 overflow-hidden rounded-[4px] shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 lg:order-1">
                    <img src="https://flagcdn.com/za.svg" alt="South Africa Flag" className="w-12 h-8 lg:w-16 lg:h-10 object-cover" loading="lazy" />
                  </div>
                </div>

                {/* Kenya */}
                <div className="group relative flex flex-row lg:flex-col items-center lg:items-start justify-between p-5 rounded-2xl bg-[var(--muted)]/10 border border-[var(--muted)]/30 hover:bg-[var(--muted)]/20 transition-all duration-500 ease-out overflow-hidden gap-0 lg:gap-4">
                  <div className="flex flex-col z-10 relative lg:order-2">
                    <span className="text-lg font-bold font-heading text-[var(--text)] flex items-center gap-2 mb-1 group-hover:text-[var(--ruby-red)] transition-colors">
                      Nairobi
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ruby-red)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ruby-red)]"></span>
                      </span>
                    </span>
                    <span className="text-xs font-bold text-[var(--muted-fg)] uppercase tracking-widest">Kenya</span>
                  </div>
                  <div className="relative z-10 overflow-hidden rounded-[4px] shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 lg:order-1">
                    <img src="https://flagcdn.com/ke.svg" alt="Kenya Flag" className="w-12 h-8 lg:w-16 lg:h-10 object-cover" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="font-bold text-[var(--text)] text-xs uppercase tracking-widest opacity-50 border-b border-[var(--muted)] pb-2">Legal</span>
              <Link href="/privacy" className="text-sm font-medium text-[var(--muted-fg)] hover:text-[var(--ruby-red)] transition-colors inline-block w-fit">Privacy Policy</Link>
              <Link href="/terms" className="text-sm font-medium text-[var(--muted-fg)] hover:text-[var(--ruby-red)] transition-colors inline-block w-fit">Terms of Service</Link>
            </div>
          </div>
        </div>
        
        {/* Deep Bottom Border Container */}
        <div className="border-t border-[var(--muted)] pt-8 flex items-center justify-between text-xs font-semibold text-[var(--muted-fg)]/60 uppercase tracking-widest flex-col md:flex-row gap-6">
          <p className="text-center md:text-left w-full md:w-auto">© {year} Creatiancy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
