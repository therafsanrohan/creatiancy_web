"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Selected Work", href: "/" },
  { label: "Capabilities", href: "/" },
  { label: "About", href: "/about" },
];

export default function WebsiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const checkActive = (item: NavItem) => {
    if (item.href === "/about") return pathname === "/about";
    if (item.href === "/work") return pathname === "/work" || pathname.startsWith("/work/");
    return false;
  };

  const evaluateThemeAtNav = useCallback(() => {
    if (typeof window === "undefined") return;

    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 20);

    // Specific route defaults for routes that are predominantly light
    if (pathname.startsWith("/insights") || pathname.startsWith("/privacy") || pathname.startsWith("/terms")) {
      setIsLightSection(true);
      return;
    }

    // Measure right under the navbar header center line (y ~ 50px)
    const navY = 50;
    const samplePoints = [
      window.innerWidth * 0.25,
      window.innerWidth * 0.5,
      window.innerWidth * 0.75,
    ];

    let detectedLight = false;

    for (const x of samplePoints) {
      const el = document.elementFromPoint(x, navY);
      if (!el) continue;

      // Look up through parent hierarchy
      let curr: HTMLElement | null = el as HTMLElement;
      while (curr && curr !== document.body && curr !== document.documentElement) {
        // Explicit dark indicators
        if (
          curr.id === "hero-section" ||
          curr.id === "testimonials" ||
          curr.id === "contact" ||
          curr.id === "legacy-metrics" ||
          curr.tagName.toLowerCase() === "footer" ||
          curr.classList.contains("bg-[#0C0708]") ||
          curr.classList.contains("bg-[#111111]") ||
          curr.classList.contains("bg-[#120E0F]") ||
          curr.classList.contains("bg-[#161616]")
        ) {
          detectedLight = false;
          setIsLightSection(false);
          return;
        }

        // Explicit light indicators
        if (
          curr.id === "services" ||
          curr.id === "process" ||
          curr.id === "selected-work" ||
          curr.id === "trust-marquee-light" ||
          curr.id === "studio-info-surface" ||
          curr.id === "selected-works-surface" ||
          curr.classList.contains("bg-[#F5F5F7]") ||
          curr.classList.contains("bg-[#FBFBFD]") ||
          curr.classList.contains("bg-white")
        ) {
          detectedLight = true;
          break;
        }

        // Check computed background color
        const style = window.getComputedStyle(curr);
        const bg = style.backgroundColor;
        if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (match) {
            const [, rStr, gStr, bStr, aStr] = match;
            const alpha = aStr !== undefined ? parseFloat(aStr) : 1;
            if (alpha > 0.4) {
              const r = parseInt(rStr, 10);
              const g = parseInt(gStr, 10);
              const b = parseInt(bStr, 10);
              const lum = 0.299 * r + 0.587 * g + 0.114 * b;
              if (lum > 145) {
                detectedLight = true;
                break;
              } else if (lum < 95) {
                detectedLight = false;
                break;
              }
            }
          }
        }

        curr = curr.parentElement;
      }

      if (detectedLight) break;
    }

    setIsLightSection(detectedLight);
  }, [pathname]);

  useEffect(() => {
    evaluateThemeAtNav();
    window.addEventListener("scroll", evaluateThemeAtNav, { passive: true });
    window.addEventListener("resize", evaluateThemeAtNav, { passive: true });
    return () => {
      window.removeEventListener("scroll", evaluateThemeAtNav);
      window.removeEventListener("resize", evaluateThemeAtNav);
    };
  }, [evaluateThemeAtNav]);

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

  const handleContactClick = (e: React.MouseEvent) => {
    setMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", "/#contact");
      }
    }
  };

  return (
    <>
      {/* Smart Theme-Adaptive Apple-grade Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isLightSection
            ? isScrolled
              ? "bg-[#F5F5F7]/85 backdrop-blur-2xl backdrop-saturate-180 border-b border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] py-3 sm:py-3.5 text-[#1D1D1F]"
              : "bg-[#F5F5F7]/50 backdrop-blur-xl border-b border-black/[0.04] py-3.5 sm:py-4 text-[#1D1D1F]"
            : isScrolled
              ? "bg-[#0C0708]/80 backdrop-blur-2xl backdrop-saturate-180 border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-3 sm:py-3.5 text-white"
              : "bg-transparent border-b border-white/[0.06] py-3.5 sm:py-4 text-white"
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

          {/* Desktop Navigation Links: Theme-Adaptive Pill Style */}
          <nav 
            className={`hidden md:flex items-center space-x-1 sm:space-x-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${
              isLightSection
                ? "bg-black/[0.03] border border-black/[0.05]"
                : "bg-white/[0.05] border border-white/[0.08] backdrop-blur-md"
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = checkActive(item);
              const isCapabilities = item.label === "Capabilities";

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    const isSelectedWork = item.label === "Selected Work";
                    if (isSelectedWork) {
                      if (pathname === "/") {
                        e.preventDefault();
                        const el = document.getElementById("selected-work");
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      } else {
                        sessionStorage.setItem("scroll_to_section", "selected-work");
                      }
                    } else if (isCapabilities) {
                      if (pathname === "/") {
                        e.preventDefault();
                        const el = document.getElementById("creative-lab") || document.getElementById("services");
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      } else {
                        // When on other pages, store target in sessionStorage so landing page scrolls smoothly without URL hash
                        sessionStorage.setItem("scroll_to_section", "creative-lab");
                      }
                    }
                  }}
                  className={`text-[13.5px] font-normal tracking-normal px-4 py-1.5 rounded-full transition-all duration-200 min-h-[36px] flex items-center ${
                    isLightSection
                      ? isActive
                        ? "text-[#9B1C22] bg-[#9B1C22]/[0.09] font-medium shadow-xs"
                        : "text-[#1D1D1F]/75 hover:text-[#1D1D1F] hover:bg-black/[0.05]"
                      : isActive
                        ? "text-white bg-white/[0.14] shadow-inner font-medium"
                        : "text-white/75 hover:text-white hover:bg-white/[0.09]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Cluster: Start a Project CTA & Adaptive Hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop Start a Project CTA */}
            <Link
              href="/#contact"
              onClick={handleContactClick}
              className={`hidden md:inline-flex items-center justify-center px-6 h-10 sm:h-11 rounded-full text-[13.5px] font-normal tracking-normal transition-all duration-200 min-h-[42px] active:scale-[0.98] ${
                isLightSection
                  ? "bg-gradient-to-b from-[#A8242A] to-[#9B1C22] hover:from-[#9B1C22] hover:to-[#82151B] text-white border border-[#9B1C22]/40 shadow-[0_2px_14px_rgba(155,28,34,0.35)] hover:shadow-[0_4px_22px_rgba(155,28,34,0.5)]"
                  : "bg-gradient-to-b from-[#A8242A] to-[#9B1C22] hover:from-[#9B1C22] hover:to-[#82151B] text-white border border-white/20 shadow-[0_2px_16px_rgba(155,28,34,0.4)] hover:shadow-[0_4px_24px_rgba(155,28,34,0.6)]"
              }`}
            >
              <span>Start a project</span>
            </Link>

            {/* Mobile / Tablet Menu Button with Theme-Adaptive Border and Lines */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={`md:hidden flex items-center justify-center w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B1C22] ${
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
              <nav className="pt-2">
                <ul className="flex flex-col space-y-3">
                  {NAV_ITEMS.map((item) => {
                    const isActive = checkActive(item);
                    return (
                      <li 
                        key={item.label} 
                        className={`border-b pb-3 ${isLightSection ? "border-black/[0.08]" : "border-white/[0.08]"}`}
                      >
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            setMenuOpen(false);
                            if (item.label === "Selected Work") {
                              if (pathname === "/") {
                                e.preventDefault();
                                const el = document.getElementById("selected-work");
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                                }
                              } else {
                                sessionStorage.setItem("scroll_to_section", "selected-work");
                              }
                            } else if (item.label === "Capabilities") {
                              if (pathname === "/") {
                                e.preventDefault();
                                const el = document.getElementById("creative-lab") || document.getElementById("services");
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                                }
                              } else {
                                sessionStorage.setItem("scroll_to_section", "creative-lab");
                              }
                            }
                          }}
                          className={`text-[22px] font-normal tracking-normal block py-1.5 min-h-[48px] flex items-center transition-colors ${
                            isLightSection
                              ? isActive ? "text-[#9B1C22] font-medium" : "text-[#1D1D1F]/80 hover:text-[#9B1C22]"
                              : isActive ? "text-white font-medium" : "text-white/70 hover:text-white"
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
                  href="/#contact"
                  onClick={handleContactClick}
                  className="group inline-flex items-center justify-center w-full h-13 rounded-full text-[14px] font-normal tracking-normal bg-gradient-to-b from-[#A8242A] to-[#9B1C22] hover:from-[#9B1C22] hover:to-[#82151B] text-white transition-all duration-200 border border-[#9B1C22]/30 shadow-[0_4px_24px_rgba(155,28,34,0.35)] min-h-[48px] active:scale-[0.98] text-center"
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
