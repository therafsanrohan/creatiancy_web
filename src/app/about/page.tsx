"use client";

import { useRef } from "react";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { Sparkles, Target, Zap, Rocket, CheckCircle2, ArrowRight, ShieldCheck, Heart, Cpu, Palette } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { activePresence } from "@/constants/globalPresence";
import LiveTime from "@/components/LiveTime";
import Breadcrumb from "@/components/Breadcrumb";

const Testimonials = dynamic(() => import("@/components/Testimonials"));

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  const studioValues = [
    {
      icon: <Cpu className="w-6 h-6 text-[var(--ruby-red)]" />,
      title: "Precision over noise",
      description: "We focus on clean, high-performance execution instead of flashing buzzwords and empty designs."
    },
    {
      icon: <Heart className="w-6 h-6 text-[var(--ruby-red)]" />,
      title: "Relationships first",
      description: "We treat our partners like family, building deep, long-term collaborations rooted in mutual respect."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[var(--ruby-red)]" />,
      title: "Extreme performance",
      description: "Every platform we design is engineered from the ground up for unshakeable speed and scalability."
    },
    {
      icon: <Palette className="w-6 h-6 text-[var(--ruby-red)]" />,
      title: "Uncompromising design",
      description: "We build bold, immersive visual systems that perform flawlessly and leave a lasting brand recall."
    }
  ];

  return (
    <>
    <Breadcrumb currentPageName="About" currentPagePath="/about" />
    <div className="min-h-screen pt-8 pb-24 overflow-hidden relative selection:bg-[var(--ruby-red)] selection:text-white">
      {/* Liquid Creative Backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
            borderRadius: ["40% 60% 70% 30%", "30% 80% 40% 70%", "40% 60% 70% 30%"]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[var(--ruby-red)] blur-[100px] -z-10"
          style={{ willChange: "transform, border-radius, opacity" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.2, 0.1],
            borderRadius: ["60% 40% 30% 70%", "40% 60% 80% 20%", "60% 40% 30% 70%"]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[var(--text)] blur-[120px] -z-10"
          style={{ willChange: "transform, border-radius, opacity" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--ruby-red)]/10 text-[var(--ruby-red)] text-sm font-bold tracking-widest uppercase mb-6 border border-[var(--ruby-red)]/20">
            <Sparkles className="w-4 h-4" />
            <span>Studio Heritage</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter mb-8 leading-tight">
            We are the architects of your digital legacy.
          </h1>
          <p className="text-xl md:text-2xl text-[var(--muted-fg)] text-balance font-light max-w-3xl">
            Creatiancy isn't just another flashy agency. We are a precise, confident, high-end digital studio. We build bold strategies and immersive platforms that transform audiences into loyal brand advocates.
          </p>
        </motion.div>

        {/* 1. The Studio Story Section */}
        <section className="mb-32">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[var(--text)] tracking-tight">
                Our Story & Mission
              </h2>
              <div className="h-1 w-12 bg-[var(--ruby-red)] mt-4"></div>
            </div>
            <div className="md:col-span-8 space-y-6 text-[var(--muted-fg)] text-lg leading-relaxed font-light">
              <p>
                Founded on the intersection of deep visual strategy and <Link href="/services#technical-excellence" className="hover:text-[var(--ruby-red)] underline decoration-[var(--ruby-red)]/30 transition-colors">rigorous software engineering</Link>, Creatiancy was born out of a simple frustration: the digital world was getting crowded, but it wasn't getting any better. Generic templates and buzzword-fueled campaigns were failing ambitious companies. We set out to build a boutique powerhouse designed exclusively for brands that refuse to be ignored.
              </p>
              <p>
                What makes us different is our uncompromising focus on precision. We don't believe in guess-work or aesthetic decoration. Every line of code we write and every <Link href="/services#brand-identity" className="hover:text-[var(--ruby-red)] underline decoration-[var(--ruby-red)]/30 transition-colors">brand system</Link> we craft is engineered with clear mathematical intent, pixel perfection, and high-performance metrics. We act as your specialized technical and creative partner, helping your business capture permanent market authority.
              </p>
              <p>
                Today, we work with a highly selective roster of global clients, building <Link href="/work" className="hover:text-[var(--ruby-red)] underline decoration-[var(--ruby-red)]/30 transition-colors">digital legacies</Link> that scale infinitely. We keep our team focused, our lines of communication direct, and our standards absolute. From state-of-the-art corporate identities to bleeding-edge web infrastructures, we build what moves people.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Founder Section */}
        <section className="mb-32">
          {/* Mobile-only Title Section */}
          <div className="block md:hidden mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--ruby-red)]/10 text-[var(--ruby-red)] text-xs font-bold tracking-widest uppercase mb-3 border border-[var(--ruby-red)]/20">
              Leadership
            </div>
            <h3 className="text-4xl font-heading font-extrabold text-[var(--text)] mb-2">
              <a 
                href="https://www.rafsanrohan.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[var(--ruby-red)] transition-colors duration-300"
              >
                Rafsan Rohan
              </a>
            </h3>
            <p className="text-base text-[var(--ruby-red)] font-semibold">Founder & Visual Strategist</p>
          </div>

          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Image Column */}
            <div className="md:col-span-5">
              <div className="relative w-full max-w-md ml-0 mr-auto md:max-w-none aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[var(--muted)]/20 border border-[var(--muted)]/40 shadow-2xl group">
                <Image 
                  src="/images/founder_v2.png" 
                  alt="Rafsan Rohan — Founder & Creative Director of Creatiancy digital studio"
                  fill
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </div>
            
            {/* Text Column */}
            <div className="md:col-span-7 space-y-6">
              {/* Desktop-only Title Section */}
              <div className="hidden md:block">
                <div className="inline-block px-4 py-2 rounded-full bg-[var(--ruby-red)]/10 text-[var(--ruby-red)] text-xs font-bold tracking-widest uppercase mb-2">
                  Leadership
                </div>
                <h3 className="text-4xl font-heading font-extrabold text-[var(--text)]">
                  <a 
                    href="https://www.rafsanrohan.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[var(--ruby-red)] transition-colors duration-300"
                  >
                    Rafsan Rohan
                  </a>
                </h3>
                <p className="text-lg text-[var(--ruby-red)] font-semibold mt-2">Founder & Visual Strategist</p>
              </div>
              
              <div className="text-[var(--muted-fg)] text-lg leading-relaxed font-light space-y-4">
                <p>
                  Rafsan Rohan founded Creatiancy with a vision to merge structured design, deep storytelling, and systems thinking into a unified creative methodology. As a visual strategist and creative visualizer, Rafsan helps brands and agencies transform complex, abstract concepts into high-impact visual communication systems, brand identities, and motion graphics.
                </p>
                <p>
                  He believes that truly remarkable creative work is born when visual storytelling is engineered with technical rigour and strategic purpose.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Core Values Section */}
        <section className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight mb-4">
              Our Core Philosophy
            </h2>
            <p className="text-lg text-[var(--muted-fg)] font-light">
              We govern every action, line of code, and design layout by four core values that define the Creatiancy caliber.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studioValues.map((value, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-[var(--muted)]/5 border border-[var(--muted)]/30 hover:bg-[var(--muted)]/15 hover:border-[var(--ruby-red)]/50 transition-all duration-500 hover:shadow-2xl flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg)] border border-[var(--muted)]/50 flex items-center justify-center shadow-md group-hover:bg-[var(--ruby-red)]/10 group-hover:border-[var(--ruby-red)]/35 transition-colors duration-500">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold font-heading text-[var(--text)] group-hover:text-[var(--ruby-red)] transition-colors duration-300">
                  {value.title}
                </h4>
                <p className="text-sm text-[var(--muted-fg)] leading-relaxed font-light">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Global Footprint Section */}
        <section className="mb-32 border-t border-[var(--muted)]/30 pt-16">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--ruby-red)]/10 text-[var(--ruby-red)] text-xs font-bold tracking-widest uppercase mb-2">
                Presence
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
                Our Global Footprint
              </h2>
              <p className="text-[var(--muted-fg)] text-lg font-light leading-relaxed">
                We operate across boundaries. With offices and localized teams in six major cities worldwide, we guarantee round-the-clock availability, rapid turnaround, and deep localized market intelligence.
              </p>
            </div>
            
            <div className="lg:col-span-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {activePresence.map((loc, i) => (
                <div key={i} className="group flex items-center p-4 rounded-2xl transition-all duration-500 gap-4 overflow-hidden border bg-gradient-to-br from-[var(--ruby-red)]/5 to-[var(--bg)] border-[var(--ruby-red)]/30 shadow-[0_0_20px_rgba(155,28,34,0.06)] hover:border-[var(--ruby-red)] hover:shadow-[0_0_30px_rgba(155,28,34,0.15)] hover:-translate-y-0.5 relative cursor-default">
                  {/* Flag Container */}
                  <div className="relative overflow-hidden rounded-[3px] shadow-sm shrink-0 bg-[var(--muted)]/20">
                    <img
                      src={`https://flagcdn.com/${loc.flag}.svg`}
                      alt={`${loc.country} Flag`}
                      className="w-10 h-7 object-cover transition-transform duration-700 scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Data Container */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3 mb-0.5">
                      <span className="text-[14px] md:text-[15px] font-bold truncate text-[var(--text)] transition-colors duration-300">
                        {loc.city}
                      </span>
                      
                      {/* Pulse Indicator */}
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-80 bg-[var(--ruby-red)]"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ruby-red)]"></span>
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-semibold text-[var(--muted-fg)] uppercase tracking-wider truncate">
                        {loc.country}
                      </span>
                      <div className="text-[10px] shrink-0 font-medium text-[var(--ruby-red)]">
                        <LiveTime timeZone={loc.tz} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Studio Methodology Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start mb-32"
        >
          {/* Philosophy Section */}
          <motion.div variants={itemVariants} className="space-y-12 bg-[var(--bg)]/50 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-[var(--muted)] shadow-xl shadow-black/5 hover:border-[var(--ruby-red)]/50 transition-colors duration-500">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[var(--text)] text-[var(--bg)] flex items-center justify-center shadow-lg mb-8">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-heading font-bold tracking-tight">Radical Philosophy</h2>
              <div className="space-y-6 text-[var(--muted-fg)] leading-relaxed text-lg font-light">
                <p>
                  At Creatiancy, we operate with controlled boldness. Every interaction, visual decision, and message is designed with intent and clarity.
                </p>
                <p>
                  We build brand systems where performance leads and design supports. The focus is not decoration, but communication, usability, and long-term brand recall.
                </p>
                <p>
                  Through structured thinking and disciplined execution, we create digital experiences that feel seamless, precise, and built to stand out.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Methodology Section */}
          <motion.div variants={itemVariants} className="space-y-12">
            <div className="mb-0">
              <h2 className="text-4xl font-heading font-bold tracking-tight mb-8">Our Methodology</h2>
              <p className="text-[var(--muted-fg)] text-lg mb-8 font-light">
                We remove guesswork and build with clarity from the start.
              </p>
            </div>

            <div ref={containerRef} className="space-y-8 relative">
              {/* Static background line */}
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[var(--text)]/20 to-transparent" />
              {/* Animated scroll line */}
              <motion.div 
                className="absolute left-6 top-4 bottom-4 w-0.5 bg-[var(--ruby-red)] origin-top z-0"
                style={{ scaleY: lineHeight }}
              />
              {[{
                icon: <Zap className="w-5 h-5 transition-colors duration-300" />,
                title: "1. Precision Strategy",
                desc: "Defined positioning based on real market insight and clear differentiation."
              }, {
                icon: <Rocket className="w-5 h-5 transition-colors duration-300" />,
                title: "2. Fluid Structure",
                desc: "Connected brand and digital systems designed for clarity, usability, and consistency."
              }, {
                icon: <CheckCircle2 className="w-5 h-5 transition-colors duration-300" />,
                title: "3. Focused Execution",
                desc: "Careful implementation with attention to performance, visibility, and measurable outcomes."
              }].map((step, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="relative pl-16 group cursor-pointer"
                  whileHover="hover"
                  whileInView="inView"
                  viewport={{ once: false, margin: "-50% 0px -40% 0px" }}
                >
                  <motion.div 
                    className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center shadow-lg shadow-black/10 z-10 rounded-full bg-[var(--text)] transition-colors duration-300"
                    variants={{
                      hover: { backgroundColor: "var(--ruby-red)" },
                      inView: { backgroundColor: "var(--ruby-red)" }
                    }}
                  >
                    <motion.div
                      variants={{
                        hover: { color: "#ffffff" },
                        inView: { color: "#ffffff" }
                      }}
                      className="text-[var(--bg)]"
                    >
                      {step.icon}
                    </motion.div>
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-bold font-heading mb-3 pt-1 transition-colors"
                    variants={{
                      hover: { color: "var(--ruby-red)" },
                      inView: { color: "var(--ruby-red)" }
                    }}
                  >
                    {step.title}
                  </motion.h3>
                  <p className="text-[var(--muted-fg)] text-lg font-light">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* AEO: Common Questions block — Group 4B */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Creatiancy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Creatiancy is a boutique digital design and development studio specializing in precision brand identity systems, high-performance web applications, and integrated creative strategy. The studio operates globally across six cities: Dhaka, Wyoming, Cape Town, Johannesburg, Nicosia, and Nairobi."
                }
              },
              {
                "@type": "Question",
                "name": "Where is Creatiancy based?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Creatiancy is headquartered in Dhaka, Bangladesh, with active operational offices in Wyoming (United States), Cape Town and Johannesburg (South Africa), Nicosia (Cyprus), and Nairobi (Kenya) — enabling round-the-clock availability for clients worldwide."
                }
              },
              {
                "@type": "Question",
                "name": "Who does Creatiancy work with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Creatiancy works with a selective roster of founders, CMOs, and marketing leaders at growth-stage companies and established businesses seeking premium brand identity, web development, and digital strategy services globally."
                }
              }
            ]
          })
        }}
      />
      <section
        id="common-questions"
        aria-labelledby="common-questions-heading"
        className="container mx-auto px-4 mt-16 mb-8"
      >
        <h2
          id="common-questions-heading"
          className="text-lg font-bold tracking-widest uppercase text-[var(--muted-fg)]/60 mb-8 border-b border-[var(--muted)]/20 pb-4"
        >
          Common Questions
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              q: "What is Creatiancy?",
              a: "Creatiancy is a boutique digital design and development studio specializing in precision brand identity systems, high-performance web applications, and integrated creative strategy. The studio operates globally across six cities: Dhaka, Wyoming, Cape Town, Johannesburg, Nicosia, and Nairobi."
            },
            {
              q: "Where is Creatiancy based?",
              a: "Creatiancy is headquartered in Dhaka, Bangladesh, with active operational offices in Wyoming (United States), Cape Town and Johannesburg (South Africa), Nicosia (Cyprus), and Nairobi (Kenya) — enabling round-the-clock availability for clients worldwide."
            },
            {
              q: "Who does Creatiancy work with?",
              a: "Creatiancy works with a selective roster of founders, CMOs, and marketing leaders at growth-stage companies and established businesses seeking premium brand identity, web development, and digital strategy services globally."
            }
          ].map(({ q, a }, i) => (
            <div key={i} className="space-y-3">
              <h3 className="text-sm font-bold text-[var(--text)]/80">{q}</h3>
              <p className="text-sm text-[var(--muted-fg)] leading-relaxed font-light">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA Section: Work with us */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto mt-24 md:mt-32 px-4"
      >
        <div className="relative rounded-3xl overflow-hidden bg-[var(--text)] text-[var(--bg)] px-6 sm:px-10 py-16 sm:py-20 md:py-32 flex items-center justify-center text-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ruby-red)]/20 to-transparent mix-blend-overlay" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-6 md:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tighter text-balance">
              Ready to construct your legacy?
            </h2>
            <p className="text-lg sm:text-xl opacity-80 font-light max-w-xl mx-auto text-balance">
              Let's craft precision design systems and high-end software solutions built to endure. Stop settling for averages.
            </p>
            <div className="pt-6 md:pt-8 flex flex-col items-center">
              <Link
                href="/contact"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-3 bg-[var(--ruby-red)] text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 shadow-xl shadow-[var(--ruby-red)]/30"
              >
                Work with us
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    </>
  );
}
