"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Selected Work", href: "/work" },
  { label: "Capabilities", href: "/services" },
  { label: "About", href: "/about" },
];

export default function WebsiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const checkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Find what section is currently under the navbar (around y = 60px)
      const navY = 60;
      const elementUnderNav = document.elementFromPoint(window.innerWidth / 2, navY);
      
      if (elementUnderNav) {
        // Traverse up to find closest section or container with a known background color
        const section = elementUnderNav.closest("section, footer, div[id]");
        if (section) {
          const bg = window.getComputedStyle(section).backgroundColor;
          // If section has dark background or is a known dark section
          const isDark = 
            section.id === "hero-section" ||
            section.id === "testimonials" ||
            section.tagName.toLowerCase() === "footer" ||
            section.classList.contains("bg-[#0C0708]") ||
            section.classList.contains("bg-[#161616]") ||
            section.classList.contains("bg-[#111111]");

          if (isDark) {
            setIsLightSection(false);
            return;
          }

          // If RGB components of background are low (< 100), it's dark
          const rgbMatch = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (rgbMatch) {
            const [, r, g, b] = rgbMatch.map(Number);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
            setIsLightSection(luminance > 140);
            return;
          }
        }
      }

      // Fallback: check light element position on homepage
      if (isHomePage) {
        const lightEl = document.getElementById("trust-marquee-light");
        if (lightEl) {
          const rect = lightEl.getBoundingClientRect();
          setIsLightSection(rect.top <= 70);
          return;
        }
      }

      setIsLightSection(false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Apple-grade Adaptive Full-width Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-out ${
          isLightSection
            ? "bg-[#F5F5F7]/75 backdrop-blur-2xl backdrop-saturate-150 border-b border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.03)] py-3.5 sm:py-4 text-[#1D1D1F]"
            : "bg-[#0C0708]/65 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.4)] py-3.5 sm:py-4 text-white"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo with intelligent contrast */}
          <Link
            href="/"
            className="relative flex items-center shrink-0 w-[115px] sm:w-[135px] h-[26px] sm:h-[30px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B1C22] rounded-sm transition-opacity hover:opacity-85"
            onClick={() => setMenuOpen(false)}
            aria-label="Creatiancy — Strategic Creative & Production Studio"
          >
            <Image
              src={isLightSection ? "/logos/Creatiancy%20logo.svg" : "/logos/Creatiancy%20logo%20white.svg"}
              alt="Creatiancy"
              fill
              className={`object-contain object-left transition-all duration-300 ${
                isLightSection ? "drop-shadow-none" : "drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
              }`}
              priority
            />
          </Link>

          {/* Desktop Navigation Links: Theme-Adaptive Apple Style */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-2">
            {NAV_ITEMS.map((item) => {
              const isActive = checkActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[13px] font-medium tracking-wide px-4 py-2 rounded-full transition-all duration-200 min-h-[44px] flex items-center ${
                    isLightSection
                      ? isActive
                        ? "text-[#9B1C22] bg-[#9B1C22]/[0.08] font-semibold"
                        : "text-[#1D1D1F]/75 hover:text-[#1D1D1F] hover:bg-black/[0.04]"
                      : isActive
                        ? "text-white bg-white/[0.12] shadow-inner font-semibold"
                        : "text-white/75 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Cluster: Unified CTA & Adaptive Hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop Start a Project CTA */}
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center px-6 h-11 rounded-full text-[13px] font-medium tracking-wide bg-gradient-to-b from-[#A8242A] to-[#9B1C22] hover:from-[#9B1C22] hover:to-[#82151B] text-white transition-all duration-200 border border-[#9B1C22]/30 shadow-[0_2px_14px_rgba(155,28,34,0.3)] hover:shadow-[0_4px_22px_rgba(155,28,34,0.45)] min-h-[44px] active:scale-[0.98]"
            >
              <span>Start a project</span>
            </Link>

            {/* Mobile / Tablet Menu Button with Theme-Adaptive Border and Lines */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={`md:hidden flex items-center justify-center w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B1C22] ${
                isLightSection
                  ? "border-black/10 bg-black/[0.04] hover:bg-black/[0.08] text-[#1D1D1F]"
                  : "border-white/15 bg-white/[0.08] hover:bg-white/[0.14] text-white"
              }`}
            >
              <div className="relative w-4 h-[12px] flex flex-col justify-between">
                <span className={`block h-[1.5px] w-full bg-current transform transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
                <span className={`block h-[1.5px] w-full bg-current transform transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-[1.5px] w-full bg-current transform transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* Smart Adaptive Full-screen Mobile Drawer: Seamless with Current Theme */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`fixed inset-0 z-40 md:hidden flex flex-col pt-28 pb-10 px-6 overflow-y-auto backdrop-blur-3xl transition-colors ${
              isLightSection 
                ? "bg-[#F5F5F7]/95 text-[#1D1D1F]" 
                : "bg-[#0C0708]/95 text-white"
            }`}
          >
            <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full">
              <nav className="pt-4">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#9B1C22] uppercase block mb-6">
                  Navigation
                </span>
                <ul className="flex flex-col space-y-3">
                  {NAV_ITEMS.map((item) => {
                    const isActive = checkActive(item.href);
                    return (
                      <li 
                        key={item.label} 
                        className={`border-b pb-3 ${isLightSection ? "border-black/[0.08]" : "border-white/[0.08]"}`}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={`text-[24px] font-medium tracking-tight block py-1.5 min-h-[48px] flex items-center transition-colors ${
                            isLightSection
                              ? isActive ? "text-[#9B1C22] font-semibold" : "text-[#1D1D1F]/80 hover:text-[#9B1C22]"
                              : isActive ? "text-white font-semibold" : "text-white/70 hover:text-white"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="pt-10 flex flex-col gap-4">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="group inline-flex items-center justify-center w-full h-13 rounded-full text-[13px] font-medium tracking-wide bg-gradient-to-b from-[#A8242A] to-[#9B1C22] hover:from-[#9B1C22] hover:to-[#82151B] text-white transition-all duration-200 border border-[#9B1C22]/30 shadow-[0_4px_24px_rgba(155,28,34,0.35)] min-h-[48px] active:scale-[0.98] text-center"
                >
                  <span>Start a project</span>
                </Link>
                <div className={`text-center text-[11px] font-mono pt-2 ${isLightSection ? "text-neutral-400" : "text-white/40"}`}>
                  DHAKA &bull; GLOBAL STUDIO
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
