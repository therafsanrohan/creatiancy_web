"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";

type NavItem = {
  label: string;
  href: string;
};

const LEFT_NAV: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "ABOUT US", href: "/about" },
];

const RIGHT_NAV: NavItem[] = [
  { label: "CASE STUDIES", href: "/work" },
  { label: "CAREER", href: "#" },
  { label: "CONTACT US", href: "/contact" },
];

const ALL_NAV = [...LEFT_NAV, ...RIGHT_NAV];

export default function WebsiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Handle Scroll State
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 60);
  });

  // Body Scroll Lock for Mobile Menu
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

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const checkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "#") return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isLightMode = isScrolled || menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1200px] font-sans"
      >
        <div 
          className={`h-[70px] px-6 lg:px-10 flex items-center justify-between rounded-2xl transition-all duration-500 ${
            isScrolled 
              ? "bg-white/70 backdrop-blur-[20px] saturate-[1.8] border border-black/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.04)]" 
              : "bg-transparent"
          }`}
        >
          
          {/* Left Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-12 flex-1">
            {LEFT_NAV.map((item) => {
              const isActive = checkActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[12px] font-medium tracking-[0.1em] transition-colors focus:outline-none focus-visible:text-[#9B1C22] ${
                    isActive 
                      ? "text-[#9B1C22]" 
                      : "text-[#1E1E1E] hover:text-[#9B1C22]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Spacer (Balances the hamburger icon to keep logo perfectly centered on mobile) */}
          <div className="lg:hidden w-12 flex-shrink-0" />

          {/* Center Logo */}
          <Link
            href="/"
            className="relative flex items-center justify-center shrink-0 w-[120px] md:w-[140px] h-[30px] z-[60] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B1C22] rounded-sm transition-opacity opacity-90 hover:opacity-100"
            onClick={() => setMenuOpen(false)}
            aria-label="Creatiancy Homepage"
          >
            <Image
              src="/logos/Creatiancy%20logo.svg"
              alt="Creatiancy"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Right Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center justify-end space-x-12 flex-1">
            {RIGHT_NAV.map((item) => {
              const isActive = checkActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[12px] font-medium tracking-[0.1em] transition-colors focus:outline-none focus-visible:text-[#9B1C22] ${
                    isActive 
                      ? "text-[#9B1C22]" 
                      : "text-[#1E1E1E] hover:text-[#9B1C22]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden flex items-center justify-center w-12 h-12 relative z-[60] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B1C22] rounded-full shrink-0 transition-colors text-[#1E1E1E]"
          >
            <div className="relative w-6 h-[12px] flex flex-col justify-between">
              <span className={`block h-[1.5px] w-full bg-current transform transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
              <span className={`block h-[1.5px] w-full bg-current transform transition-all duration-300 ${menuOpen ? "opacity-0 translate-x-2" : ""}`} />
              <span className={`block h-[1.5px] w-full bg-current transform transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[5.5px]" : ""}`} />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile/Tablet Fullscreen Overlay Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl lg:hidden flex flex-col pt-28 pb-12 overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex-1 flex flex-col">
              <nav className="flex-1 flex flex-col pt-12">
                <ul className="flex flex-col space-y-8">
                  {ALL_NAV.map((item, i) => {
                    const isActive = checkActive(item.href);

                    return (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="border-b border-[#1E1E1E]/5 pb-4"
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={`text-[32px] md:text-[42px] font-medium tracking-tight transition-colors focus:outline-none focus-visible:text-[#9B1C22] ${
                            isActive ? "text-[#9B1C22]" : "text-[#1E1E1E] hover:text-[#1E1E1E]/70"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 w-full pt-8"
              >
                <div className="flex flex-col space-y-2 text-left">
                  <a href="mailto:hello@creatiancy.com" className="text-[16px] font-medium text-[#1E1E1E] hover:text-[#9B1C22] transition-colors">
                    hello@creatiancy.com
                  </a>
                  <span className="text-[14px] text-[#1E1E1E]/50">Dhaka, Bangladesh</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
