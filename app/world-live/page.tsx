"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Globe, Search } from "lucide-react";
import LiveTime from "@/components/LiveTime";
import { groupedCountries } from "@/data/worldLive";
import { activePresence } from "@/config/globalPresence";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 70, damping: 20 } },
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
    <div className="min-h-screen pt-32 pb-32 relative bg-[var(--bg)] selection:bg-[var(--ruby-red)] selection:text-white">
      {/* Eye-soothing Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_100%_50%_at_50%_0%,#000_60%,transparent_100%)]"></div>
      </div>
      
      {/* Softened Glows for reduced eye strain */}
      <div className="absolute top-[0%] right-[10%] w-[40vw] h-[40vw] bg-[var(--ruby-red)]/5 blur-[180px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[20%] left-[-10%] w-[30vw] h-[30vw] bg-[var(--text)]/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 md:px-8 relative z-10"
      >
        <div className="max-w-[1400px] mx-auto w-full">
          {/* Header Section */}
          <div className="flex flex-col justify-center items-center text-center mb-20">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--ruby-red)]/10 text-[var(--ruby-red)] text-xs font-bold tracking-[0.2em] uppercase mb-8 border border-[var(--ruby-red)]/20 shadow-[0_0_20px_rgba(155,28,34,0.1)]">
              <Globe className="w-3.5 h-3.5" />
              <span>Global Time Matrix</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter mb-6 relative text-balance leading-[1.1] text-[var(--text)]/90"
            >
              World <span className="text-[var(--ruby-red)] drop-shadow-[0_0_30px_rgba(155,28,34,0.3)]">Live</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-[var(--muted-fg)]/80 font-light max-w-2xl leading-relaxed mb-12"
            >
              Real-time synchronization across 193 sovereign states. Active operational hubs glow with a <span className="text-[var(--ruby-red)] font-semibold">ruby signal</span>.
            </motion.p>

            {/* Premium Glassmorphism Search Bar */}
            <motion.div variants={itemVariants} className="w-full max-w-lg flex flex-col items-center gap-4">
              <div className="w-full relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-[var(--muted-fg)]/50 group-focus-within:text-[var(--ruby-red)] transition-colors duration-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search 193 countries or cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[var(--muted)]/5 hover:bg-[var(--muted)]/10 focus:bg-[var(--bg)] border border-[var(--muted)]/10 hover:border-[var(--muted)]/30 focus:border-[var(--ruby-red)]/40 focus:ring-4 focus:ring-[var(--ruby-red)]/10 rounded-full py-4 pl-14 pr-6 text-[var(--text)] placeholder-[var(--muted-fg)]/40 outline-none transition-all duration-500 shadow-sm backdrop-blur-md"
                />
              </div>
              
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted-fg)]/70">
                {searchQuery ? (
                  <span>Filtering <span className="text-[var(--text)]">{filteredTotal}</span> matches</span>
                ) : (
                  <span>Monitoring <span className="text-[var(--text)]">{totalLocations}</span> global sectors</span>
                )}
              </div>
            </motion.div>
          </div>

          {/* Grid Matrix Layout */}
          <div className="flex flex-col gap-20">
            {Object.entries(groupedCountries).map(([region, countries]) => {
              const filteredCountries = countries.filter(
                (c) =>
                  c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  c.city.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (filteredCountries.length === 0) return null;

              return (
                <motion.div key={region} variants={itemVariants} className="flex flex-col gap-8">
                  {/* Elegant Region Header */}
                  <div className="flex items-center gap-6">
                    <h2 className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-[var(--text)]/80">
                      {region} <span className="text-[var(--muted-fg)]/50 text-xs ml-2">({filteredCountries.length})</span>
                    </h2>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-[var(--muted)]/30 to-transparent"></div>
                  </div>

                  {/* Organized Uniform Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                    {filteredCountries.map((loc, i) => {
                      const isActive = activePresence.some(
                        (active) => active.country === loc.country && active.city === loc.city
                      );

                      return (
                        <div
                          key={i}
                          className={`group flex items-center p-3 md:p-3.5 rounded-2xl transition-all duration-500 gap-3.5 overflow-hidden border w-full
                            ${isActive 
                              ? "bg-gradient-to-br from-[var(--ruby-red)]/5 to-[var(--bg)] border-[var(--ruby-red)]/30 shadow-[0_0_20px_rgba(155,28,34,0.06)] hover:border-[var(--ruby-red)] hover:shadow-[0_0_30px_rgba(155,28,34,0.15)] -translate-y-0.5 z-10 relative" 
                              : "bg-[var(--muted)]/5 border-[var(--muted)]/10 hover:border-[var(--muted)]/30 hover:bg-[var(--muted)]/10 opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
                            }
                          `}
                        >
                          {/* Flag Container */}
                          <div className="relative overflow-hidden rounded-[3px] shadow-sm shrink-0 bg-[var(--muted)]/20">
                            <img
                              src={`https://flagcdn.com/${loc.flag}.svg`}
                              alt={`${loc.country} Flag`}
                              className={`w-8 h-5.5 object-cover transition-transform duration-700 ${isActive ? "scale-105" : "group-hover:scale-105"}`}
                              loading="lazy"
                            />
                          </div>

                          {/* Data Container */}
                          <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <span className={`text-[13px] font-bold truncate transition-colors duration-300 ${isActive ? "text-[var(--text)]" : "text-[var(--text)]/80 group-hover:text-[var(--text)]"}`}>
                                {loc.city}
                              </span>
                              
                              {/* Pulse Indicator */}
                              {isActive ? (
                                <span className="relative flex h-2 w-2 shrink-0 ml-auto">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-80 bg-[var(--ruby-red)]"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ruby-red)]"></span>
                                </span>
                              ) : (
                                <span className="relative flex h-1.5 w-1.5 shrink-0 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--muted-fg)]/40"></span>
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[9px] font-semibold text-[var(--muted-fg)] uppercase tracking-wider truncate">
                                {loc.country}
                              </span>
                              <div className={`text-[9px] shrink-0 font-medium ${isActive ? "text-[var(--ruby-red)]" : "text-[var(--muted-fg)]"}`}>
                                <LiveTime timeZone={loc.tz} />
                              </div>
                            </div>
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
