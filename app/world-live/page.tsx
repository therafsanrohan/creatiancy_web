"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Search } from "lucide-react";
import LiveTime from "@/components/LiveTime";
import { groupedCountries } from "@/data/worldLive";
import { activePresence } from "@/config/globalPresence";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } },
};

export default function WorldLivePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const totalLocations = Object.values(groupedCountries).flat().length;
  const filteredTotal = Object.values(groupedCountries).flat().filter(
    (c) =>
      c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase())
  ).length;

  return (
    <div className="min-h-screen pt-32 pb-24 relative bg-[var(--bg)] selection:bg-[var(--ruby-red)] selection:text-white">
      {/* High-Tech Grid Lines Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>
      
      {/* Ambient Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[var(--ruby-red)]/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40vw] h-[40vw] bg-[var(--text)]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 md:px-8 relative z-10"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col justify-center items-center text-center mb-16">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--ruby-red)]/10 text-[var(--ruby-red)] text-xs font-bold tracking-widest uppercase mb-6 border border-[var(--ruby-red)]/20">
              <Globe className="w-3 h-3" />
              <span>Global Synchronization</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter mb-6 relative text-balance leading-[1.1]"
            >
              World <span className="text-[var(--ruby-red)]">Live</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-[var(--muted-fg)] font-light max-w-2xl leading-relaxed mb-10"
            >
              Real-time synchronization across our global operational footprint. Active hubs show a <span className="text-[var(--ruby-red)] font-semibold">red</span> signal.
            </motion.p>

            {/* Filter Search Bar & Counts */}
            <motion.div variants={itemVariants} className="w-full max-w-md flex flex-col items-center gap-4">
              <div className="w-full relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-[var(--muted-fg)] group-focus-within:text-[var(--ruby-red)] transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search country or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[var(--muted)]/5 border border-[var(--muted)]/20 hover:border-[var(--muted)]/40 focus:border-[var(--ruby-red)]/50 focus:ring-1 focus:ring-[var(--ruby-red)]/50 rounded-2xl py-4 pl-12 pr-4 text-[var(--text)] placeholder-[var(--muted-fg)]/50 outline-none transition-all shadow-sm backdrop-blur-sm"
                />
              </div>
              
              {/* Dynamic Count Display */}
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--muted-fg)]">
                {searchQuery ? (
                  <span>Showing <span className="text-[var(--text)]">{filteredTotal}</span> of {totalLocations} locations</span>
                ) : (
                  <span>Monitoring <span className="text-[var(--text)]">{totalLocations}</span> global locations</span>
                )}
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col gap-16 md:gap-20">
            {Object.entries(groupedCountries).map(([region, countries]) => {
              const filteredCountries = countries.filter(
                (c) =>
                  c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  c.city.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (filteredCountries.length === 0) return null;

              return (
                <motion.div key={region} variants={itemVariants} className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl md:text-2xl font-heading font-bold text-[var(--text)]">
                      {region}
                    </h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-[var(--muted)]/40 to-transparent"></div>
                  </div>

                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {filteredCountries.map((loc, i) => {
                      // Check if this specific location is an active Creatiancy hub
                      const isActive = activePresence.some(
                        (active) => active.country === loc.country && active.city === loc.city
                      );

                      // Dynamic styling based on active status
                      const pulseColor = isActive ? "bg-[var(--ruby-red)]" : "bg-[var(--muted-fg)]/30";
                      const pulsePing = isActive ? "bg-[var(--ruby-red)]" : "bg-[var(--text)]/20";
                      const textColorHover = isActive ? "group-hover:text-[var(--ruby-red)]" : "group-hover:text-[var(--text)]";
                      const borderColorHover = isActive ? "hover:border-[var(--ruby-red)]/30" : "hover:border-[var(--text)]/20";
                      const shadowHover = isActive ? "hover:shadow-[0_0_15px_rgba(155,28,34,0.08)]" : "hover:shadow-[0_0_15px_rgba(255,255,255,0.03)]";

                      return (
                        <div
                          key={i}
                          className={`group flex items-center p-3 pr-5 md:p-3.5 md:pr-6 rounded-2xl bg-gradient-to-br from-[var(--muted)]/5 to-[var(--bg)] border border-[var(--muted)]/20 ${borderColorHover} ${shadowHover} hover:-translate-y-0.5 transition-all duration-300 gap-4 w-fit shrink-0 cursor-default`}
                        >
                          <div className="relative overflow-hidden rounded-[4px] shadow-sm shrink-0">
                            <img
                              src={`https://flagcdn.com/${loc.flag}.svg`}
                              alt={`${loc.country} Flag`}
                              className={`w-7 h-4.5 md:w-8 md:h-5.5 object-cover group-hover:scale-110 transition-transform duration-500 ${!isActive && "grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100"}`}
                              loading="lazy"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-xs md:text-sm font-bold text-[var(--text)] flex items-center gap-2 ${textColorHover} transition-colors whitespace-nowrap`}>
                              {loc.city}
                              <span className="relative flex h-2 w-2 shrink-0">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pulsePing}`}></span>
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${pulseColor}`}></span>
                              </span>
                            </span>
                            <span className="text-[10px] md:text-[11px] font-semibold text-[var(--muted-fg)] uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5">
                              <span>{loc.country}</span>
                              <LiveTime timeZone={loc.tz} />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
