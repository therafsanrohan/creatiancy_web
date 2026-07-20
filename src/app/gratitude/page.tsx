"use client";

import dynamic from "next/dynamic";
import GratitudeHero from "./components/GratitudeHero";
import CampaignIntro from "./components/CampaignIntro";
import FeaturedStory from "./components/FeaturedStory";
import AboutProject from "./components/AboutProject";
import AboutCreatiancy from "./components/AboutCreatiancy";
import GratitudeFooter from "./components/GratitudeFooter";

// Client-side heavy interactive components are imported dynamically to prevent SSR hydration warnings
const ImpactCounters = dynamic(() => import("./components/ImpactCounters"), {
  ssr: false,
});

const GratitudeWall = dynamic(() => import("./components/GratitudeWall"), {
  ssr: false,
});

const NominateForm = dynamic(() => import("./components/NominateForm"), {
  ssr: false,
});

export default function GratitudeCampaignPage() {
  return (
    <div className="relative bg-[#1E1E1E] text-white selection:bg-[#9B1C22]/30 selection:text-white">
      {/* Scrollable sections container */}
      <GratitudeHero />
      <CampaignIntro />
      <ImpactCounters />
      <GratitudeWall />
      <FeaturedStory />
      <NominateForm />
      <AboutProject />
      <AboutCreatiancy />
      <GratitudeFooter />
    </div>
  );
}