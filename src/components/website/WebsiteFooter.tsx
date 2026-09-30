import React from "react";
import Link from "next/link";

export default function WebsiteFooter() {
  return (
    <footer className="bg-[#1E1E1E] text-[#FBFDF9] pt-20 pb-12 px-6 md:px-12 border-t border-[#1E1E1E]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-[#FBFDF9]/10">
          <div className="md:col-span-2">
            <span className="text-2xl font-bold tracking-tight text-[#FBFDF9] block mb-4">
              CREATIANCY<span className="text-[#9B1C22]">.</span>
            </span>
            <p className="text-sm font-light text-[#FBFDF9]/70 max-w-sm leading-relaxed">
              We Build Legacies. Transforming technology, strategy, and aesthetics into permanent market authority.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#9B1C22] font-semibold mb-4">Index</p>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider font-light text-[#FBFDF9]/80">
              <li><Link href="/about" className="hover:text-[#9B1C22]">About Agency</Link></li>
              <li><Link href="/services" className="hover:text-[#9B1C22]">Services</Link></li>
              <li><Link href="/work" className="hover:text-[#9B1C22]">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-[#9B1C22]">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#9B1C22] font-semibold mb-4">Inquiries</p>
            <p className="text-sm font-light text-[#FBFDF9]/70 leading-relaxed">
              Global Inquiries:<br />
              <a href="mailto:hello@creatiancy.com" className="text-[#FBFDF9] hover:text-[#9B1C22]">
                hello@creatiancy.com
              </a>
            </p>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-light text-[#FBFDF9]/50 gap-4">
          <p>&copy; {new Date().getFullYear()} Creatiancy. All rights reserved.</p>
          <p className="uppercase tracking-widest text-[10px]">Performance over decoration</p>
        </div>
      </div>
    </footer>
  );
}
