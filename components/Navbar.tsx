"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              ? "w-full max-w-5xl bg-[var(--bg)]/70 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--bg)]/50 border border-[var(--muted)]/50 shadow-xl shadow-black/5 rounded-full px-4 md:px-6 py-3"
              : "w-full container mx-auto px-4 py-4 bg-transparent border-transparent shadow-none"
          )}
        >
          <Link href="/" className="flex items-center group outline-none" aria-label="Creatiancy Homepage">
            <div className="relative w-32 h-8 transition-transform duration-300 group-hover:scale-105 flex items-center justify-start">
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
          
          <nav className="hidden md:flex items-center gap-2 bg-[var(--bg)]/50 p-1.5 rounded-full border border-[var(--muted)]/50 shadow-sm backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-6 py-2 rounded-full text-sm font-medium transition-colors outline-none group"
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

          <div className="flex items-center gap-2 md:gap-3">
            <Link 
              href="/contact" 
              className="hidden lg:flex items-center gap-2 text-sm font-medium bg-[var(--text)] text-[var(--bg)] px-6 py-2.5 rounded-full hover:bg-[var(--accent)] hover:text-white transition-all duration-300 shadow-sm active:scale-95"
            >
              Start Project
            </Link>

            {/* Mobile menu toggle */}
            <button 
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[var(--bg)]/50 border border-[var(--muted)]/50 text-[var(--text)] active:bg-[var(--muted)]/50 transition-colors pointer-events-auto backdrop-blur-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[var(--bg)] md:hidden pt-32 px-6 flex flex-col"
          >
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center text-4xl font-heading font-medium pb-6 border-b border-[var(--muted)]/50 transition-colors",
                        isActive ? "text-[var(--accent)]" : "text-[var(--text)] hover:text-[var(--accent)]"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full text-lg font-medium bg-[var(--accent)] text-white px-6 py-4 rounded-full active:bg-[var(--text)] active:text-[var(--bg)] transition-all duration-300"
              >
                Start Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
