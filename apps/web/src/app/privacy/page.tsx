"use client";

import React from "react";
import Link from "next/link";
import "@/app/website.css";

const sections = [
  {
    num: "01",
    title: "Information We Collect",
    content: "We collect only what is strictly necessary to conduct professional creative and production engagements. This includes contact details provided through project inquiries (name, organization, email) and non-identifying aggregate technical analytics to ensure optimal site reliability."
  },
  {
    num: "02",
    title: "How We Use Information",
    content: "Project inquiry details are used exclusively to evaluate creative fit, respond with proposals, and communicate during active client engagements. We do not sell, rent, or distribute personal data or client briefings to third parties."
  },
  {
    num: "03",
    title: "Confidentiality & Client IP",
    content: "We treat client blueprints, project specifications, and brand strategies with rigorous discretion. Client intellectual property remains protected under applicable professional non-disclosure standards and individual master services agreements."
  },
  {
    num: "04",
    title: "Third-Party Infrastructure",
    content: "Our website is hosted on secure global edge infrastructure (Vercel) with database persistence via Supabase. We do not embed deceptive third-party tracking scripts or aggressive advertising pixels."
  },
  {
    num: "05",
    title: "Your Rights & Inquiries",
    content: "You may request the review, update, or deletion of any personal information or inquiry records we hold by contacting our studio team directly."
  }
];

export default function PrivacyPolicyPage() {
  return (
    <div className="creatiancy-scope bg-[#FBFDF9] pb-32">
      <main className="w-full relative pt-40 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          
          <div className="pb-16 border-b border-[#1E1E1E]/10">
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#9B1C22] uppercase block mb-3">
              Legal & Privacy
            </span>
            <h1 className="text-[44px] sm:text-[60px] font-medium tracking-tight text-[#1E1E1E] leading-[1.05] mb-4">
              Privacy Policy
            </h1>
            <p className="text-[17px] text-[#666] font-light">
              Effective Date: October 2026 &bull; Creatiancy Studio
            </p>
          </div>

          <div className="pt-16 flex flex-col gap-12">
            {sections.map((sec) => (
              <div key={sec.num} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <span className="md:col-span-2 text-[14px] font-mono text-[#9B1C22]">
                  {sec.num}
                </span>
                <div className="md:col-span-10">
                  <h2 className="text-[22px] font-medium text-[#1E1E1E] mb-3">
                    {sec.title}
                  </h2>
                  <p className="text-[16px] text-[#555] font-light leading-relaxed">
                    {sec.content}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-12 border-t border-[#1E1E1E]/10 mt-8">
              <h2 className="text-[20px] font-medium text-[#1E1E1E] mb-2">
                Privacy Contacts &amp; Data Audits
              </h2>
              <p className="text-[15px] text-[#666] font-light mb-5">
                For questions regarding data processing, confidentiality, or audit requests, initiate a direct inquiry:
              </p>
              <a 
                href="mailto:hello@creatiancy.com?subject=Privacy%20Audit%20Request"
                aria-label="Send email to privacy officer"
                className="inline-flex items-center px-7 py-3 bg-[#1E1E1E] text-white rounded-[6px] text-[12px] font-mono uppercase tracking-[0.14em] hover:bg-[#9B1C22] transition-colors"
              >
                Inquire With Privacy Officer →
              </a>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
