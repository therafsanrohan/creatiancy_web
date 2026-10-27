"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icon";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Selected Work", href: "/work" },
  { label: "Capabilities", href: "/services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
];

export default function WebsiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const checkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  React.useEffect(() => {
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
      {/* Floating Centered Capsule Dock Header */}
      <header className="fixed top-4 left-0 right-0 z-50 w-full flex justify-center px-4 sm:px-6 pointer-events-none">
        <div 
          className="pointer-events-auto w-full max-w-fit flex items-center justify-between gap-3 sm:gap-6 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 border border-white/10 backdrop-blur-2xl bg-[#0E1114]/85 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
        >
          {/* Logo */}
          <Link
            href="/"
            className="relative flex items-center shrink-0 w-[110px] sm:w-[130px] h-[26px] sm:h-[30px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2B43] rounded-sm transition-opacity hover:opacity-85"
            onClick={() => setMenuOpen(false)}
            aria-label="Creatiancy — Strategic Creative & Production Studio"
          >
            <Image
              src="/logos/Creatiancy%20logo%20white.svg"
              alt="Creatiancy"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 sm:space-x-2">
            {NAV_ITEMS.map((item) => {
              const isActive = checkActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[12px] font-mono tracking-wider px-3.5 py-2 rounded-full transition-all duration-200 min-h-[48px] flex items-center ${
                    isActive 
                      ? "text-[#FF2B43] bg-white/[0.05]" 
                      : "text-neutral-300 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster: Start a Project CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Primary Action CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-[12px] font-semibold tracking-wider uppercase bg-[#FF2B43] hover:bg-[#E01E37] text-white transition-all shadow-[0_2px_14px_rgba(255,43,67,0.35)] min-h-[48px]"
            >
              <span>Start Project</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden flex items-center justify-center w-11 h-11 min-h-[48px] min-w-[48px] rounded-full border border-white/10 bg-white/[0.04] text-[#F4F5F7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2B43]"
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

      {/* Accessible Mobile Drawer Modal */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#070809]/95 backdrop-blur-2xl lg:hidden flex flex-col pt-24 pb-10 px-6 overflow-y-auto"
          >
            <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full">
              <nav className="pt-6">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#FF2B43] uppercase block mb-4">
                  Navigation
                </span>
                <ul className="flex flex-col space-y-2">
                  {NAV_ITEMS.map((item) => {
                    const isActive = checkActive(item.href);
                    return (
                      <li key={item.label} className="border-b border-white/5 pb-2">
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={`text-[22px] font-medium tracking-tight block py-2 min-h-[48px] flex items-center ${
                            isActive ? "text-[#FF2B43]" : "text-[#F4F5F7] hover:text-[#FF2B43]"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="pt-8 flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="w-full h-12 min-h-[48px] rounded-full bg-[#FF2B43] text-[#070809] font-semibold text-[13px] tracking-wider uppercase flex items-center justify-center"
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
