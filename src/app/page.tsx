import type { Metadata } from 'next';
import Hero from "@/components/Hero";
import AnimatedText from "@/components/AnimatedText";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: 'Digital Design & Development Studio',
};

// Configuration & Data
import { recentProjects } from "@/constants/projects";
import { agencyServices } from "@/constants/services";
const BrandsMarquee = dynamic(() => import("@/components/BrandsMarquee"), { 
  ssr: true,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));

/**
 * Main Landing Page
 * -----------------
 * This is the primary entry point for the Creatiancy website.
 * It features a heroic entrance, a client marquee, our core services, 
 * social proof via testimonials, and a showcase of our best work.
 */
export default function Home() {
  // Logic to dynamically pull brand logos from the public folder.
  // This allows the owner to simply drop a file into /public/brands to update the marquee.
  let brands: string[] = [];
  try {
    const brandsDir = path.join(process.cwd(), 'public/brands');
    if (fs.existsSync(brandsDir)) {
      brands = fs.readdirSync(brandsDir).filter(f => f.match(/\.(png|jpe?g|svg|webp)$/i));
    }
  } catch (err) {
    // We don't want a missing folder to crash the whole site
    console.warn("Hey, looks like the brands directory is missing or unreadable.", err);
  }

  // Fallback logos for a fresh install/dev environment
  if (brands.length === 0) {
    brands = ["placeholder_1", "placeholder_2", "placeholder_3", "placeholder_4"];
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.creatiancy.com/#website",
    "name": "Creatiancy",
    "url": "https://www.creatiancy.com",
    "description": "Boutique digital design and development studio crafting precision brand experiences.",
    "publisher": { "@id": "https://www.creatiancy.com/#organization" },
    "inLanguage": "en-US"
  };

  return (
    <>
      {/* WebSite JSON-LD — homepage only */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className="flex flex-col gap-24 md:gap-32 pb-24">
        {/* 01. The Hero Section - Our Big Hello */}
        <Hero />
        
        {/* 02. Client Trust - Scrolling Marquee */}
        {brands.length > 0 && <BrandsMarquee brands={brands} />}
        
        {/* 03. Services Snapshot - What We Actually Do */}
        <section aria-labelledby="services-heading" className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-[var(--ruby-red)]/10 text-[var(--ruby-red)] text-sm font-bold tracking-widest uppercase mb-6">
                Our Expertise
              </div>
              <AnimatedText 
                text="A creative agency engineering strategic design & intelligent development."
                el="h2"
                className="text-3xl md:text-5xl font-heading tracking-tight mb-6 -ml-1 text-left justify-start"
              />
              <p className="text-[var(--muted-fg)] max-w-md text-lg leading-relaxed">
                We provide end-to-end branding services and full-spectrum digital marketing to accelerate business performance.
              </p>
            </div>

            <div className="grid gap-8">
              {agencyServices.map((service, index) => (
                <Link 
                  href={service.href} 
                  key={index} 
                  className="group border-b border-[var(--muted)] pb-6 block cursor-pointer"
                  title={`Learn more about Creatiancy ${service.title} services`}
                >
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--ruby-red)] transition-colors inline-flex items-center gap-2">
                    {service.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                  <p className="text-[var(--muted-fg)] leading-snug">{service.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 04. Social Proof - What our clients say */}
        <Testimonials />

        {/* 05. Selected Work - The Portfolio Showcase */}
        <section aria-labelledby="work-heading" className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-[var(--ruby-red)]/10 text-[var(--ruby-red)] text-sm font-bold tracking-widest uppercase mb-6 border border-[var(--ruby-red)]/20">
                Selected Work
              </div>
              <h2 id="work-heading" className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-balance">
                Recent Projects.
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {recentProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`flex flex-col ${index % 2 !== 0 ? 'md:mt-16' : ''}`}
              >
                <Link 
                  href={project.link}
                  target={project.link !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group cursor-pointer relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-[var(--muted)]/10 border border-[var(--muted)]/30 block"
                >
                  {project.image ? (
                    <Image 
                      src={project.image} 
                      alt={`${project.title} — Creatiancy case study`}
                      fill
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      priority={index === 0}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--muted)]/40 to-[var(--bg)] group-hover:scale-105 transition-transform duration-700 ease-out" />
                  )}
                  
                  {/* Visual Feedback on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10 flex items-center justify-center pointer-events-none">
                    {project.link !== "#" && (
                      <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out shadow-2xl">
                        <ArrowUpRight className="w-8 h-8 text-black" />
                      </div>
                    )}
                  </div>
                </Link>

                <div className="flex flex-col gap-4 px-2">
                  <Link href={project.link} className="group cursor-pointer block">
                    <h3 className="text-2xl md:text-3xl font-bold font-heading group-hover:text-[var(--ruby-red)] transition-colors duration-300 flex justify-between items-center">
                      {project.title}
                    </h3>
                    <p className="text-[var(--muted-fg)] text-lg font-light mt-1">{project.industry}</p>
                    <div className="h-0.5 w-0 bg-[var(--ruby-red)] group-hover:w-12 transition-all duration-500 ease-out mt-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06. Interactive FAQ Section */}
        <FAQSection />
      </div>
    </>
  );
}
