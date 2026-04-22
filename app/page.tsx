import Hero from "@/components/Hero";
import BrandsMarquee from "@/components/BrandsMarquee";
import { trustedBrands } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 md:gap-32 pb-24">
      <Hero />
      {trustedBrands && trustedBrands.length > 0 && <BrandsMarquee brands={trustedBrands} />}
      
      {/* Services Snapshot */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-[var(--text)] opacity-50 mb-4">Our Expertise</h2>
            <h3 className="text-3xl md:text-5xl font-heading tracking-tight mb-6">
              A creative agency engineering strategic design & intelligent development.
            </h3>
            <p className="text-[var(--muted-fg)] max-w-md text-lg">
              We provide end-to-end branding services and full-spectrum digital marketing to accelerate business performance.
            </p>
          </div>
          <div className="grid gap-8">
            {[
              { title: "Brand Identity", desc: "Creating distinct visual systems that communicate value and intent." },
              { title: "Online-first strategy", desc: "We combine strategy, design and technology to help you connect with the modern-day audiences." },
              { title: "Content marketing", desc: "A creative team of designers and copywriters execute your vision of your brand flawlessly!" },
              { title: "Technical powerhouse", desc: "We utilize all the latest tech stack for your marketing - from websites, apps, AI, to social media." },
              { title: "Tailor-made campaigns", desc: "We go beyond social media by integrating your content to create meaningful campaigns." }
            ].map((service, i) => (
              <div key={i} className="group border-b border-[var(--muted)] pb-6">
                <h4 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">{service.title}</h4>
                <p className="text-[var(--muted-fg)]">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-[var(--ruby-red)] mb-4">Selected Work</h2>
            <h3 className="text-3xl md:text-5xl font-heading tracking-tight">Recent Projects</h3>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[4/3] bg-[var(--muted)] rounded-lg overflow-hidden mb-6">
                {/* Image placeholder */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--muted)] to-[var(--bg)] group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              <h4 className="text-2xl font-bold mb-2">Project Title {i}</h4>
              <p className="text-[var(--muted-fg)]">Industry / Service</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
