"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Briefcase } from "lucide-react";

export default function ContactPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative">
      {/* Dynamic Background Flare */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[var(--ruby-red)]/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="container mx-auto px-4 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          <div className="max-w-2xl flex flex-col justify-center">
            <motion.h1 variants={item} className="text-5xl sm:text-6xl md:text-8xl font-heading font-extrabold tracking-tighter mb-6 relative">
              <span className="relative z-10">Let's build<br/>something<br/>remarkable.</span>
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-16 sm:h-24 bg-gradient-to-b from-[var(--ruby-red)] to-transparent rounded-full" />
            </motion.h1>
            <motion.p variants={item} className="text-xl md:text-2xl text-[var(--muted-fg)] font-light text-balance mb-16 max-w-xl">
              Ready to elevate your digital presence? Reach out. We keep things direct, deeply strategic, and highly actionable.
            </motion.p>

            <motion.div variants={item} className="flex flex-col gap-10">
              
              <div className="group flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-[var(--muted)]/40 flex items-center justify-center shrink-0 group-hover:bg-[var(--ruby-red)]/20 transition-colors duration-500">
                  <Mail className="w-6 h-6 text-[var(--muted-fg)] group-hover:text-[var(--ruby-red)] transition-colors duration-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-[var(--ruby-red)] mb-3">General & Inquiries</h3>
                  <a href="mailto:hello@creatiancy.com" className="text-xl sm:text-2xl font-semibold hover:text-[var(--ruby-red)] relative inline-block group/link break-all transition-colors">
                    hello@creatiancy.com
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--ruby-red)] transition-all duration-300 group-hover/link:w-full" />
                  </a>
                </div>
              </div>

              <div className="group flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-[var(--muted)]/40 flex items-center justify-center shrink-0 group-hover:bg-[var(--ruby-red)]/20 transition-colors duration-500">
                  <Briefcase className="w-6 h-6 text-[var(--muted-fg)] group-hover:text-[var(--ruby-red)] transition-colors duration-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-[var(--ruby-red)] mb-3">Careers & Collaborations</h3>
                  <div className="flex flex-col gap-2">
                    <a href="mailto:hr@creatiancy.com" className="hover:text-[var(--ruby-red)] font-medium transition-colors">
                      hr@creatiancy.com (Talent)
                    </a>
                    <a href="mailto:business@creatiancy.com" className="hover:text-[var(--ruby-red)] font-medium transition-colors">
                      business@creatiancy.com (Partnerships)
                    </a>
                  </div>
                </div>
              </div>

              <div className="group flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-[var(--muted)]/40 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/20 transition-colors duration-500">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[var(--muted-fg)] group-hover:text-[#25D366] transition-colors">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="flex flex-col justify-center h-14">
                  <h3 className="text-sm font-bold tracking-widest uppercase text-[#25D366] mb-1">Direct Chat</h3>
                  <a href="https://wa.me/8801760178245" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-[#25D366] transition-colors duration-300">
                    WhatsApp (+880) 1760-178245
                  </a>
                </div>
              </div>
              
              <div className="pt-6 mt-4 border-t border-[var(--muted)]/50">
                <h3 className="text-xs font-bold tracking-widest uppercase text-[var(--ruby-red)] mb-4">Connect Digitally</h3>
                <div className="flex flex-wrap gap-4">
                  {[
                    { 
                      name: 'In', 
                      url: 'https://www.linkedin.com/company/creatiancy',
                      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> 
                    },
                    { 
                      name: 'Ig', 
                      url: 'https://www.instagram.com/creatiancy/',
                      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    },
                    { 
                      name: 'Pi', 
                      url: 'https://www.pinterest.com/creatiancy/',
                      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z"/></svg> 
                    },
                    { 
                      name: 'Be', 
                      url: 'https://www.behance.net/creatiancyglobal',
                      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.918 2.338-5.675 5.253-5.675 3.028 0 4.835 1.73 4.835 4.566 0 .311-.022.715-.045.925h-7.202c.169 1.571 1.233 2.894 2.973 2.894 1.272 0 2.235-.558 2.585-1.035h2.266zm-5.176-5.467c-1.353 0-2.112.91-2.334 1.932h4.521c-.139-.968-.909-1.932-2.187-1.932zm-10.638 3.86l2.399.043c1.554.025 2.404-.766 2.404-1.897 0-1.127-.92-1.758-2.348-1.758h-2.455v3.612zm0-6.195l2.091.037c1.472.025 2.327-.478 2.327-1.637 0-1.096-.867-1.468-2.062-1.468h-2.356v3.068zm-3.031-4.22h5.5c2.316 0 4.148.665 4.148 2.84 0 1.222-.852 2.182-1.854 2.569 1.488.396 2.355 1.348 2.355 2.822 0 2.338-2.001 3.232-4.468 3.232h-5.681v-11.463z"/></svg> 
                    },
                    { 
                      name: 'Fb', 
                      url: 'https://www.facebook.com/creatiancy',
                      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> 
                    }
                  ].map((x, i) => (
                    <a key={i} href={x.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-[var(--ruby-red)]/20 flex items-center justify-center font-bold text-sm text-[var(--ruby-red)] hover:bg-[var(--ruby-red)] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg shadow-[var(--ruby-red)]/20" aria-label={x.name}>
                      {x.icon}
                    </a>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>

          <motion.div variants={item} className="flex justify-end mt-12 lg:mt-0">
            <div className="w-full max-w-lg bg-[var(--bg)]/50 backdrop-blur-3xl p-8 sm:p-12 rounded-[2.5rem] border border-[var(--muted)] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--ruby-red)]/5 blur-3xl" />
              <h2 className="text-3xl font-heading font-bold mb-8">Send a dispatch.</h2>
              <form className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">Full Name</label>
                  <input 
                    id="name" 
                    type="text" 
                    className="w-full bg-[var(--muted)]/20 border border-[var(--muted)] rounded-xl px-5 py-4 outline-none focus:border-[var(--ruby-red)] focus:ring-1 focus:ring-[var(--ruby-red)] focus:bg-[var(--bg)] transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">Email Address</label>
                  <input 
                    id="email" 
                    type="email" 
                    className="w-full bg-[var(--muted)]/20 border border-[var(--muted)] rounded-xl px-5 py-4 outline-none focus:border-[var(--ruby-red)] focus:ring-1 focus:ring-[var(--ruby-red)] focus:bg-[var(--bg)] transition-all duration-300"
                    placeholder="hello@domain.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-[var(--muted-fg)]">Project Details</label>
                  <textarea 
                    id="message" 
                    rows={6}
                    className="w-full bg-[var(--muted)]/20 border border-[var(--muted)] rounded-xl px-5 py-4 outline-none focus:border-[var(--ruby-red)] focus:ring-1 focus:ring-[var(--ruby-red)] focus:bg-[var(--bg)] transition-all duration-300 resize-none"
                    placeholder="Tell us what you're trying to build..."
                  />
                </div>
                <button 
                  type="button"
                  className="group w-full flex items-center justify-center gap-3 bg-[var(--text)] text-[var(--bg)] px-8 py-5 rounded-xl font-bold hover:bg-[var(--ruby-red)] hover:text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-[var(--ruby-red)]/30"
                >
                  <span>Submit Inquiry</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
