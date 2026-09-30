import Image from "next/image";
import { Container, Grid } from "@/components/ui/Layout";
import { Heading, Text } from "@/components/ui/Typography";

interface HeroProps {
  title: string;
  client: string;
  industry: string;
  year: string;
  image?: string;
}

export function CaseStudyHero({ title, client, industry, year, image }: HeroProps) {
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col justify-end pb-12 pt-32 bg-[var(--bg)] text-[var(--text)]">
      <Container className="relative z-10 space-y-12">
        <Heading level={1} className="text-6xl md:text-8xl lg:text-9xl leading-none text-balance">
          {title}
        </Heading>
        <Grid cols={4} className="gap-8 border-t border-[var(--border)] pt-8">
          <div>
            <Text variant="small" className="uppercase font-bold tracking-widest mb-2">Client</Text>
            <Text>{client}</Text>
          </div>
          <div>
            <Text variant="small" className="uppercase font-bold tracking-widest mb-2">Industry</Text>
            <Text>{industry}</Text>
          </div>
          <div>
            <Text variant="small" className="uppercase font-bold tracking-widest mb-2">Year</Text>
            <Text>{year}</Text>
          </div>
        </Grid>
      </Container>
      {image && (
        <div className="absolute inset-0 z-0 opacity-20 object-cover w-full h-full pointer-events-none">
          <Image src={image} alt={title} fill className="object-cover" priority quality={90} />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent" />
        </div>
      )}
    </section>
  );
}

interface TextProps {
  title: string;
  content: string;
}

export function CaseStudyText({ title, content }: TextProps) {
  return (
    <section className="py-24">
      <Container>
        <Grid cols={3}>
          <div className="col-span-1">
            <Heading level={3}>{title}</Heading>
          </div>
          <div className="col-span-2 md:col-span-2">
            <Text variant="lead">{content}</Text>
          </div>
        </Grid>
      </Container>
    </section>
  );
}

interface MetricsProps {
  metrics: { label: string; value: string }[];
}

export function CaseStudyMetrics({ metrics }: MetricsProps) {
  return (
    <section className="py-24 bg-[var(--text)] text-[var(--bg)]">
      <Container>
        <Grid cols={metrics.length as 1 | 2 | 3 | 4 | 6 | 12}>
          {metrics.map((m, i) => (
            <div key={i} className="text-center space-y-4">
              <Heading level={2} className="text-6xl md:text-8xl text-[var(--bg)]">{m.value}</Heading>
              <Text variant="small" className="uppercase tracking-widest text-[var(--bg)]/70">{m.label}</Text>
            </div>
          ))}
        </Grid>
      </Container>
    </section>
  );
}

interface GalleryProps {
  images: string[];
}

export function CaseStudyGallery({ images }: GalleryProps) {
  return (
    <section className="py-12">
      <Container className="space-y-8">
        {images.map((img, i) => (
          <div key={i} className="relative w-full aspect-[16/9] bg-[var(--muted)]/20 rounded-2xl overflow-hidden">
            <Image src={img} alt="Gallery Image" fill className="object-cover" />
          </div>
        ))}
      </Container>
    </section>
  );
}

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
}

export function CaseStudyTestimonial({ quote, author, role }: TestimonialProps) {
  return (
    <section className="py-32 border-y border-[var(--border)]">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <Heading level={3} className="text-3xl md:text-5xl font-light italic text-balance leading-relaxed">
            "{quote}"
          </Heading>
          <div>
            <Text className="font-bold">{author}</Text>
            <Text variant="muted">{role}</Text>
          </div>
        </div>
      </Container>
    </section>
  );
}
