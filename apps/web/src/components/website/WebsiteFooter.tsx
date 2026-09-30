"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function WebsiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] text-[#FAFAFA] pt-24 md:pt-32 pb-8 px-6 md:px-12 w-full mt-auto overflow-hidden font-sans">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-white opacity-[0.15] blur-3xl rounded-[100%] pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-white opacity-[0.03] blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col h-full">
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-12 lg:gap-6 mb-24 md:mb-32">
          
          <div className="flex flex-col gap-6 lg:col-span-2">
            <span className="text-[11px] md:text-[12px] uppercase tracking-widest text-white/50 font-medium">General</span>
            <ul className="flex flex-col gap-3">
              <li><Link href="/" className="text-[16px] md:text-[18px] hover:opacity-70 transition-opacity">Home</Link></li>
              <li><Link href="/about" className="text-[16px] md:text-[18px] hover:opacity-70 transition-opacity">About</Link></li>
              <li><Link href="/services" className="text-[16px] md:text-[18px] hover:opacity-70 transition-opacity">Services</Link></li>
              <li><Link href="/projects" className="text-[16px] md:text-[18px] hover:opacity-70 transition-opacity">Portfolio</Link></li>
              <li><Link href="/contact" className="text-[16px] md:text-[18px] hover:opacity-70 transition-opacity">Testimonial</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-2 lg:col-start-4">
            <span className="text-[11px] md:text-[12px] uppercase tracking-widest text-white/50 font-medium">Services</span>
            <ul className="flex flex-col gap-3">
              <li><Link href="/services" className="text-[16px] md:text-[18px] hover:opacity-70 transition-opacity">Brand Strategy</Link></li>
              <li><Link href="/services" className="text-[16px] md:text-[18px] hover:opacity-70 transition-opacity">Content Creation</Link></li>
              <li><Link href="/services" className="text-[16px] md:text-[18px] hover:opacity-70 transition-opacity">Website Design</Link></li>
              <li><Link href="/services" className="text-[16px] md:text-[18px] hover:opacity-70 transition-opacity">Performance</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-2 lg:col-start-7">
            <span className="text-[11px] md:text-[12px] uppercase tracking-widest text-white/50 font-medium">Social Media</span>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-[16px] md:text-[18px] hover:opacity-70 transition-opacity">Instagram</a></li>
              <li><a href="#" className="text-[16px] md:text-[18px] hover:opacity-70 transition-opacity">Whatsapp</a></li>
              <li><a href="#" className="text-[16px] md:text-[18px] hover:opacity-70 transition-opacity">Linkedin</a></li>
              <li><a href="#" className="text-[16px] md:text-[18px] hover:opacity-70 transition-opacity">Facebook</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9 col-span-2">
            <span className="text-[11px] md:text-[12px] uppercase tracking-widest text-white/50 font-medium">Let&apos;s Bring Your Vision To Life</span>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a href="mailto:creatiancy@gmail.com" className="inline-flex items-center justify-center bg-[#9B1C22] text-white px-6 py-3 rounded-full text-[14px] font-medium hover:bg-[#7A151A] transition-colors w-fit">
                Mail Us
              </a>
              <a href="https://wa.me/8801325078941" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white text-[#1E1E1E] px-6 py-3 rounded-full text-[14px] font-medium hover:bg-[#25D366] hover:text-white transition-colors w-fit">
                WhatsApp
              </a>
            </div>
          </div>

        </div>

        <div className="w-full h-px bg-white/10 mb-16" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-12">
          
          <div className="relative w-[280px] md:w-[350px] lg:w-[450px] h-[50px] md:h-[60px] lg:h-[80px] brightness-0 invert opacity-90">
            <Image 
              src="/logos/Creatiancy%20logo.svg" 
              alt="Creatiancy" 
              fill
              className="object-contain object-left-bottom"
            />
          </div>

          <div className="flex flex-col sm:flex-row w-full lg:w-auto justify-between lg:justify-end gap-8 lg:gap-24 items-start sm:items-end">

            <div className="flex items-end gap-8 lg:gap-16">
              <div className="flex flex-col text-[12px] md:text-[13px] leading-[1.8] text-white uppercase font-medium">
                <span>SUNDAY - THURSDAY</span>
                <span>09.00 AM - 05.00 PM</span>
              </div>
              
              <button 
                onClick={scrollToTop}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 flex items-center justify-center transition-colors shrink-0 backdrop-blur-md mb-1 lg:mb-0"
                aria-label="Scroll to top"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] text-white/60 pt-6 border-t border-white/10">
          <p>&copy; {new Date().getFullYear()} creatiancy, All rights reserved</p>
          <div className="flex gap-6 font-medium">
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Condition</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
