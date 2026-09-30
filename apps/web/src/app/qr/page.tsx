"use client";

import dynamic from "next/dynamic";
import QRHero from "./components/QRHero";
import QRStory from "./components/QRStory";
import QRAbout from "./components/QRAbout";
import QRCTA from "./components/QRCTA";
import QRFooter from "./components/QRFooter";

// ScrollProgress requires window context, import dynamically to prevent hydration mismatches
const ScrollProgress = dynamic(() => import("./components/ScrollProgress"), {
  ssr: false,
});

export default function QRLandingPage() {
  return (
    <div className="relative bg-[#1E1E1E] text-white selection:bg-[#9B1C22]/30 selection:text-white">
      {/* Top fixed scroll progression */}
      <ScrollProgress />
      
      {/* Campaign Sections */}
      <QRHero />
      <QRStory />
      <QRAbout />
      <QRCTA />
      <QRFooter />
    </div>
  );
}
