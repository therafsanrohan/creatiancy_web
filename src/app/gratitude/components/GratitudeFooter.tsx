"use client";

import Link from "next/link";

export default function GratitudeFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="campaign-footer border-t border-white/5 bg-[#1E1E1E] py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1000px] flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
        {/* Left Side: Campaign Branding */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
            The Gratitude Project
          </span>
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
            A Campaign by Creatiancy
          </span>
        </div>

        {/* Center: Creatiancy Brand Logo */}
        <a
          href="https://www.creatiancy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-32 h-8 transition-transform hover:scale-105 duration-300 outline-none"
          aria-label="Creatiancy Website"
        >
          <div
            className="w-full h-full bg-white"
            style={{
              WebkitMaskImage: 'url("/logos/Creatiancy logo.svg")',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              WebkitMaskSize: 'contain',
              maskImage: 'url("/logos/Creatiancy logo.svg")',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              maskSize: 'contain'
            }}
          />
        </a>

        {/* Right Side: Social Links & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-3 text-xs text-neutral-500">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/creatiancy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Twitter / X */}
            <a
              href="https://x.com/creatiancy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors duration-300"
              aria-label="X (Twitter)"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
          
          <p>© {year} The Gratitude Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}