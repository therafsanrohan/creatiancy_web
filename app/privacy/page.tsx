export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-32 max-w-3xl">
      <h1 className="text-5xl font-heading font-bold tracking-tight mb-12">Privacy Policy</h1>
      
      <div className="space-y-8 text-[var(--muted-fg)] leading-relaxed">
        <p className="font-bold text-[var(--text)]">Effective Date: April 2026</p>
        
        <p>
          <strong className="text-[var(--text)]">Creatiancy</strong> (“we”, “our”, “us”) respects your privacy and is committed to protecting your personal data. This policy explains how we collect, use, and safeguard information when you interact with our website and services.
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">1. Information We Collect</h2>
          <p>We collect only what is necessary to operate effectively:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal details such as name, email address, phone number</li>
            <li>Project-related information you choose to share</li>
            <li>Usage data such as pages visited, time spent, and device type</li>
            <li>Cookies and tracking data for analytics and performance</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">2. How We Use Your Information</h2>
          <p>Your information is used to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Respond to inquiries and communicate with you</li>
            <li>Deliver services and manage projects</li>
            <li>Improve website performance and user experience</li>
            <li>Analyze traffic and engagement</li>
            <li>Maintain security and prevent misuse</li>
          </ul>
          <p>We do not sell or trade your personal data.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">3. Data Sharing</h2>
          <p>We may share data only when necessary:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>With trusted service providers (hosting, analytics, communication tools)</li>
            <li>When required by law or legal obligation</li>
          </ul>
          <p>All partners are expected to handle data securely and responsibly.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">4. Data Security</h2>
          <p>We apply reasonable technical and organizational measures to protect your data. However, no system is completely secure, and absolute protection cannot be guaranteed.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">5. Cookies</h2>
          <p>We use cookies to enhance functionality and understand user behavior. You may disable cookies in your browser settings, though some features may not function properly.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">6. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your data</li>
            <li>Request correction or deletion</li>
            <li>Withdraw consent</li>
            <li>Object to certain data uses</li>
          </ul>
          <p>Requests can be made via the contact information below.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">7. Third-Party Links</h2>
          <p>Our website may include links to external sites. We are not responsible for their privacy practices.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">8. Updates</h2>
          <p>We may update this policy periodically. Changes will be reflected on this page with a revised effective date.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text)]">9. Contact</h2>
          <p>For privacy-related inquiries:<br /><strong className="text-[var(--text)]">Email:</strong> Contact@creatiancy.com</p>
        </section>
      </div>
    </div>
  );
}
