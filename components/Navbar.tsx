"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "World Live", href: "/world-live" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150 && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 inset-x-0 z-[60] flex justify-center w-full pt-4 md:pt-6 px-4 pointer-events-none"
      >
        <div 
          className={cn(
            "pointer-events-auto flex items-center justify-between transition-all duration-500 ease-out origin-center",
            isScrolled 
              ? "w-full max-w-5xl bg-[var(--bg)]/70 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--bg)]/50 border border-[var(--muted)]/50 shadow-xl shadow-black/5 rounded-full px-4 lg:px-6 py-2 lg:py-3"
              : "w-full container mx-auto px-4 py-4 bg-transparent border-transparent shadow-none"
          )}
        >
          <Link href="/" className="flex items-center group outline-none z-50" onClick={() => setMobileMenuOpen(false)} aria-label="Creatiancy Homepage">
            <div className={cn("relative transition-all duration-500 ease-out group-hover:scale-105 flex items-center justify-start", isScrolled ? "w-20 h-5 lg:w-24 lg:h-6" : "w-28 h-7 lg:w-32 lg:h-8")}>
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
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-1 lg:gap-2 bg-[var(--bg)]/50 p-1.5 rounded-full border border-[var(--muted)]/50 shadow-sm backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn("relative rounded-full font-medium transition-all duration-500 ease-out outline-none group", isScrolled ? "px-3 py-1.5 lg:px-4 text-[11px] lg:text-xs" : "px-4 py-2 lg:px-6 text-xs lg:text-sm")}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-[var(--text)] rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={cn(
                    "relative z-10 transition-colors duration-200",
                    isActive ? "text-[var(--bg)]" : "text-[var(--text)]/80 group-hover:text-[var(--text)]"
                  )}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 lg:gap-3 z-50">
            <Link 
              href="/contact" 
              className={cn(
                "hidden lg:flex items-center gap-2 font-medium bg-[var(--text)] text-[var(--bg)] rounded-full hover:bg-[var(--ruby-red)] hover:text-white transition-all duration-500 ease-out shadow-sm active:scale-95",
                isScrolled ? "text-[11px] lg:text-xs px-4 py-1.5 lg:px-5 lg:py-2" : "text-xs lg:text-sm px-5 py-2 lg:px-6 lg:py-2.5"
              )}
            >
              Start Project
            </Link>

            {/* Mobile menu toggle */}
            <button 
              className={cn(
                "lg:hidden flex items-center justify-center rounded-full bg-[var(--bg)]/50 border border-[var(--muted)]/50 text-[var(--text)] active:bg-[var(--muted)]/50 transition-all duration-500 ease-out pointer-events-auto backdrop-blur-md",
                isScrolled ? "w-9 h-9" : "w-11 h-11",
                mobileMenuOpen && "bg-[var(--text)] text-[var(--bg)] border-transparent"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 transition-all duration-500" /> : <Menu className="w-5 h-5 transition-all duration-500" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[55] bg-[var(--bg)]/95 backdrop-blur-3xl lg:hidden pt-32 px-6 sm:px-12 flex flex-col overflow-y-auto pb-12 shadow-2xl"
          >
            {/* Ambient Background Glow inside menu */}
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[var(--ruby-red)]/10 blur-[120px] rounded-full pointer-events-none" />

            <nav className="flex flex-col gap-2 mt-4 relative z-10">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "group flex items-center justify-between text-4xl sm:text-6xl font-heading font-extrabold py-4 border-b border-[var(--muted)]/30 transition-all duration-300",
                        isActive ? "text-[var(--ruby-red)]" : "text-[var(--text)] hover:text-[var(--ruby-red)]"
                      )}
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className={cn(
                        "w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-500 ease-out",
                        isActive ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-y-4 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                      )} />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-auto pt-12 relative z-10 flex flex-col gap-8"
            >
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted-fg)]">Say Hello</span>
                <a href="mailto:contact@creatiancy.com" className="text-xl font-medium text-[var(--text)] hover:text-[var(--ruby-red)] transition-colors">
                  contact@creatiancy.com
                </a>
              </div>
              
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-3 w-full text-lg sm:text-xl font-bold bg-[var(--ruby-red)] text-white px-8 py-5 rounded-full active:scale-95 transition-all duration-300 shadow-xl shadow-[var(--ruby-red)]/20"
              >
                Start a Project
                <ArrowRight className="w-6 h-6" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
