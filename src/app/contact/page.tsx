import React from "react";
import WebsiteHeader from "@/components/website/WebsiteHeader";
import WebsiteFooter from "@/components/website/WebsiteFooter";
import "@/app/website.css";

export default function ContactPage() {
  return (
    <div className="creatiancy-scope">
      <WebsiteHeader />
      <main className="pt-40 pb-24 md:pt-48 md:pb-36 px-6 md:px-12 max-w-4xl mx-auto flex-1">
        <p className="text-[#9B1C22] text-xs font-semibold tracking-widest uppercase mb-4">Start a Project</p>
        <h1 className="text-4xl sm:text-6xl font-light text-[#1E1E1E] tracking-tight mb-8">Let’s build a legacy.</h1>
        <div className="border border-[#1E1E1E]/10 p-8 md:p-12 bg-white">
          <form className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold mb-2">Name</label>
              <input type="text" className="w-full border border-[#1E1E1E]/20 p-3 text-sm focus:outline-none focus:border-[#9B1C22]" placeholder="Your Name" required />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold mb-2">Email</label>
              <input type="email" className="w-full border border-[#1E1E1E]/20 p-3 text-sm focus:outline-none focus:border-[#9B1C22]" placeholder="corporate.email@domain.com" required />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold mb-2">Project Scope</label>
              <textarea rows={4} className="w-full border border-[#1E1E1E]/20 p-3 text-sm focus:outline-none focus:border-[#9B1C22]" placeholder="Briefly describe the ambition and timeline" required></textarea>
            </div>
            <button type="button" className="px-8 py-4 bg-[#9B1C22] text-[#FBFDF9] text-xs uppercase tracking-widest font-semibold hover:bg-[#1E1E1E] transition-colors">
              Submit Inquiry
            </button>
          </form>
        </div>
      </main>
      <WebsiteFooter />
    </div>
  );
}
