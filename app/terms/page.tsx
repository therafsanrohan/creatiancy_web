export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-32 max-w-3xl">
      <h1 className="text-5xl font-heading font-bold tracking-tight mb-12">Terms of Service</h1>
      
      <div className="space-y-8 text-[var(--muted-fg)] leading-relaxed">
        <p className="font-bold text-[var(--text)]">Effective Date: April 2026</p>
        
        <p>By accessing or using Creatiancy’s website or services, you agree to the following terms.</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">1. Services</h2>
          <p>Creatiancy provides branding, design, marketing, and digital solutions. The scope of work for each project is defined through separate agreements or proposals.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">2. Use of Website</h2>
          <p>You agree to use this website lawfully and not engage in:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Unauthorized access or attempts to breach security</li>
            <li>Distribution of harmful or malicious content</li>
            <li>Any activity that disrupts site performance</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">3. Intellectual Property</h2>
          <p>All content on this website, including visuals, text, and design elements, is the property of Creatiancy unless stated otherwise.</p>
          <p>Client work remains the property of the client upon full payment, unless otherwise agreed.</p>
          <p>We reserve the right to showcase completed work for portfolio and promotional purposes.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">4. Payments and Agreements</h2>
          <p>Project fees, timelines, and deliverables are defined in individual agreements. Failure to meet payment terms may result in paused or terminated services.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">5. Revisions and Delivery</h2>
          <p>Revision limits and timelines are defined per project. Additional revisions or scope changes may require additional cost and time.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">6. Limitation of Liability</h2>
          <p>Creatiancy is not liable for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Indirect or consequential losses</li>
            <li>Business interruption or loss of revenue</li>
            <li>Third-party service failures</li>
          </ul>
          <p>All services are provided “as is” without guaranteed outcomes.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">7. Confidentiality</h2>
          <p>We respect client confidentiality and handle shared materials with care. Clients are also expected to respect any proprietary processes or materials shared by Creatiancy.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">8. Termination</h2>
          <p>We reserve the right to terminate services if:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Terms are violated</li>
            <li>Payments are not fulfilled</li>
            <li>Collaboration becomes unworkable</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">9. Governing Law</h2>
          <p>These terms are governed by applicable laws of the operating jurisdiction. Specific legal venue may be defined in project agreements.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">10. Updates</h2>
          <p>We may update these terms at any time. Continued use of the website or services implies acceptance of the updated terms.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">11. Contact</h2>
          <p>For any questions regarding these terms:<br /><strong className="text-[var(--text)]">Email:</strong> Contact@creatiancy.com</p>
        </section>
      </div>
    </div>
  );
}
