"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function WebsiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  const navItems = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-nav py-4 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight text-[#1E1E1E]">
          CREATIANCY<span className="text-[#9B1C22]">.</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs uppercase tracking-widest transition-colors ${
                pathname === item.href ? "text-[#9B1C22] font-semibold" : "text-[#1E1E1E]/80 hover:text-[#9B1C22]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact#start"
            className="px-6 py-2.5 bg-[#9B1C22] text-[#FBFDF9] text-xs uppercase tracking-widest font-semibold hover:bg-[#1E1E1E] transition-colors duration-200"
          >
            Start a Project
          </Link>
        </nav>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-[#1E1E1E] focus:outline-none"
          aria-label="Toggle navigation"
        >
          <span className={`block w-6 h-0.5 bg-[#1E1E1E] transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#1E1E1E] my-1.5 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#1E1E1E] transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {menuOpen && (
        <div className="fixed inset-0 top-[70px] bg-[#FBFDF9] z-40 md:hidden flex flex-col justify-between px-8 py-10">
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-light text-[#1E1E1E] hover:text-[#9B1C22]"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/contact#start"
            onClick={() => setMenuOpen(false)}
            className="block w-full py-4 text-center bg-[#9B1C22] text-[#FBFDF9] uppercase tracking-widest text-xs font-semibold"
          >
            Start a Project
          </Link>
        </div>
      )}
    </header>
  );
}
