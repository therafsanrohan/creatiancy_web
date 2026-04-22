import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--muted)] bg-[var(--bg)] py-16 mt-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 w-full max-w-[1000px]">
        {/* Top Section Layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-start mb-16">
          {/* Logo & About */}
          <div className="flex flex-col gap-6 items-start">
            <Link href="/" className="relative w-40 h-10 transition-transform hover:scale-105 duration-300 outline-none" aria-label="Creatiancy Homepage">
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
            </Link>
            <p className="text-[15px] leading-relaxed md:text-base text-[var(--muted-fg)] w-full max-w-sm text-balance">
              Precision-driven brand experiences and creative intelligence. We are a focused digital studio building clear, high-impact brand systems that perform and scale.
            </p>
          </div>
          
          {/* Main Navigation Alignment */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:justify-end text-left w-full">
            <div className="flex flex-col gap-4">
              <span className="font-bold text-[var(--text)] text-xs uppercase tracking-widest opacity-50 border-b border-[var(--muted)] pb-2">Menu</span>
              <Link href="/work" className="text-sm font-medium text-[var(--muted-fg)] hover:text-[var(--text)] transition-colors inline-block w-fit">Work</Link>
              <Link href="/services" className="text-sm font-medium text-[var(--muted-fg)] hover:text-[var(--text)] transition-colors inline-block w-fit">Services</Link>
              <Link href="/about" className="text-sm font-medium text-[var(--muted-fg)] hover:text-[var(--text)] transition-colors inline-block w-fit">About</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="font-bold text-[var(--text)] text-xs uppercase tracking-widest opacity-50 border-b border-[var(--muted)] pb-2">Studio</span>
              <Link href="/contact" className="text-sm font-medium text-[var(--muted-fg)] hover:text-[var(--text)] transition-colors inline-block w-fit">Contact</Link>
            </div>
            
            <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
              <span className="font-bold text-[var(--text)] text-xs uppercase tracking-widest opacity-50 border-b border-[var(--muted)] pb-2">Legal</span>
              <Link href="/privacy" className="text-sm font-medium text-[var(--muted-fg)] hover:text-[var(--text)] transition-colors inline-block w-fit">Privacy Policy</Link>
              <Link href="/terms" className="text-sm font-medium text-[var(--muted-fg)] hover:text-[var(--text)] transition-colors inline-block w-fit">Terms of Service</Link>
            </div>
          </div>
        </div>
        
        {/* Deep Bottom Border Container */}
        <div className="border-t border-[var(--muted)] pt-8 flex items-center justify-between text-xs font-semibold text-[var(--muted-fg)]/60 uppercase tracking-widest flex-col md:flex-row gap-6">
          <p className="text-center md:text-left w-full md:w-auto">© {year} Creatiancy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
