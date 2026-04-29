import Hero from "@/components/Hero";
import AnimatedText from "@/components/AnimatedText";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";

const BrandsMarquee = dynamic(() => import("@/components/BrandsMarquee"), { 
  ssr: true,
});
import fs from "fs";
import path from "path";
import { recentProjects } from "@/config/projects";

export default function Home() {
  let brands: string[] = [];
  try {
    const brandsDir = path.join(process.cwd(), 'public/brands');
    if (fs.existsSync(brandsDir)) {
      brands = fs.readdirSync(brandsDir).filter(f => f.match(/\.(png|jpe?g|svg|webp)$/i));
    }
  } catch (error) {
    console.error("Brands directory could not be read:", error);
  }

  // Fallback so the marquee visually exists immediately before user uploads files!
  if (brands.length === 0) {
    brands = ["placeholder_1", "placeholder_2", "placeholder_3", "placeholder_4"];
  }

  return (
    <div className="flex flex-col gap-24 md:gap-32 pb-24">
      <Hero />
      {brands.length > 0 && <BrandsMarquee brands={brands} />}
      
      {/* Services Snapshot */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-[var(--text)] opacity-50 mb-4">Our Expertise</h2>
            <AnimatedText 
              text="A creative agency engineering strategic design & intelligent development."
              className="text-3xl md:text-5xl font-heading tracking-tight mb-6 -ml-1 text-left justify-start"
            />
            <p className="text-[var(--muted-fg)] max-w-md text-lg">
              We provide end-to-end branding services and full-spectrum digital marketing to accelerate business performance.
            </p>
          </div>
          <div className="grid gap-8">
            {[
              { title: "Brand Identity", desc: "Creating distinct visual systems that communicate value and intent." },
              { title: "Online-first Strategy", desc: "We combine strategy, design and technology to help you connect with the modern-day audiences." },
              { title: "Content Marketing", desc: "A creative team of designers and copywriters execute your vision of your brand flawlessly!" },
              { title: "Technical Powerhouse", desc: "We utilize all the latest tech stack for your marketing - from websites, apps, AI, to social media." },
              { title: "Tailor-made Campaigns", desc: "We go beyond social media by integrating your content to create meaningful campaigns." }
            ].map((service, i) => (
              <Link href="/services" key={i} className="group border-b border-[var(--muted)] pb-6 block cursor-pointer">
                <h4 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors inline-flex items-center gap-2">
                  {service.title}
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </h4>
                <p className="text-[var(--muted-fg)]">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-[var(--accent)] mb-4">Selected Work</h2>
            <h3 className="text-3xl md:text-5xl font-heading tracking-tight">Recent Projects</h3>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {recentProjects.map((project) => (
            <a 
              key={project.id} 
              href={project.link} 
              target={project.link !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group cursor-pointer block"
            >
              <div className="relative aspect-[4/3] bg-[var(--muted)] rounded-lg overflow-hidden mb-6">
                {project.image ? (
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority={project.id === '4'}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--muted)] to-[var(--bg)] group-hover:scale-105 transition-transform duration-700 ease-out" />
                )}
              </div>
              <h4 className="text-2xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors inline-flex items-center gap-2">
                {project.title}
                {project.link !== "#" && <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />}
              </h4>
              <p className="text-[var(--muted-fg)]">{project.industry}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
