import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Explore our selected projects and case studies.',
};

export default function WorkPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mb-16">
        <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter mb-6">Selected Work</h1>
        <p className="text-xl text-[var(--muted-fg)] text-balance">
          Case studies that demonstrate our approach to problem solving, execution, and meaningful results.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative aspect-[4/3] bg-[var(--muted)] rounded-lg overflow-hidden mb-6">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--muted)] to-[var(--bg)] group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Detailed Case Study {i}</h2>
            <p className="text-[var(--muted-fg)]">Problem • Approach • Result</p>
          </div>
        ))}
      </div>
    </div>
  );
}
