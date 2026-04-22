import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Creatiancy.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter mb-6">Let's build.</h1>
          <p className="text-xl text-[var(--muted-fg)] text-balance mb-12">
            Ready to elevate your digital presence? Reach out. We keep things direct and actionable.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-[var(--ruby-red)] mb-2">Email</h3>
              <a href="mailto:hello@creatiancy.com" className="text-xl font-medium hover:text-[var(--ruby-red)] transition-colors">
                hello@creatiancy.com
              </a>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-[var(--ruby-red)] mb-2">Location</h3>
              <p className="text-xl font-medium text-[var(--text)]">Global Studio</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--muted)]/30 p-8 rounded-2xl border border-[var(--muted)]">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input 
                  id="name" 
                  type="text" 
                  className="w-full bg-[var(--bg)] border border-[var(--muted)] rounded-md px-4 py-3 outline-none focus:border-[var(--text)] transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input 
                  id="email" 
                  type="email" 
                  className="w-full bg-[var(--bg)] border border-[var(--muted)] rounded-md px-4 py-3 outline-none focus:border-[var(--text)] transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea 
                id="message" 
                rows={5}
                className="w-full bg-[var(--bg)] border border-[var(--muted)] rounded-md px-4 py-3 outline-none focus:border-[var(--text)] transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button 
              type="button"
              className="group w-full flex items-center justify-center gap-2 bg-[var(--text)] text-[var(--bg)] px-8 py-4 rounded-md font-medium hover:bg-[var(--ruby-red)] hover:text-white transition-all duration-300"
            >
              <span>Submit Request</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
