"use client";

import React from "react";
import Link from "next/link";
import "@/app/website.css";

const sections = [
  {
    num: "01",
    title: "Studio Engagements",
    content: "Creatiancy operates as a strategic creative and production studio delivering brand architecture, digital platforms, and campaign production systems. Each client engagement is defined by an individual statement of work, proposal, or written agreement specifying deliverables, milestones, and timelines."
  },
  {
    num: "02",
    title: "Intellectual Property Rights",
    content: "Upon full settlement of agreed project fees, final approved client deliverables transfer to the client according to the applicable contract terms. Preliminary exploratory concepts, unselected drafts, and the studio's proprietary working tools remain the property of Creatiancy."
  },
  {
    num: "03",
    title: "Proposals & Invoicing",
    content: "Project parameters, payment schedules, and milestone approvals are governed by formal invoices and written scopes. Changes to project scope requested during execution are reviewed and scheduled transparently."
  },
  {
    num: "04",
    title: "Website Use & Representation",
    content: "The content, portfolio presentations, and brand assets displayed on this website are provided for informational and demonstration purposes. Unauthorized commercial scraping or misrepresentation of Creatiancy's work is prohibited."
  },
  {
    num: "05",
    title: "Governing Standards",
    content: "These terms and all related client agreements are conducted in accordance with applicable laws governing professional commercial services."
  }
];

export default function TermsOfServicePage() {
  return (
    <div className="creatiancy-scope bg-[#FBFDF9] pb-32">
      <main className="w-full relative pt-40 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          
          <div className="pb-16 border-b border-[#1E1E1E]/10">
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#9B1C22] uppercase block mb-3">
              Legal Framework
            </span>
            <h1 className="text-[44px] sm:text-[60px] font-medium tracking-tight text-[#1E1E1E] leading-[1.05] mb-4">
              Terms of Service
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
                Legal &amp; Contract Inquiries
              </h2>
              <p className="text-[15px] text-[#666] font-light mb-5">
                To request formal master services agreements or clarification on commercial terms:
              </p>
              <a 
                href="mailto:hello@creatiancy.com?subject=Legal%20Agreement%20Inquiry"
                aria-label="Send email to legal department"
                className="inline-flex items-center px-7 py-3 bg-[#1E1E1E] text-white rounded-[6px] text-[12px] font-mono uppercase tracking-[0.14em] hover:bg-[#9B1C22] transition-colors"
              >
                Inquire With Legal Counsel →
              </a>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
