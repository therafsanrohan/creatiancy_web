"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  ArrowUpRight,
  X,
  Utensils,
  Coffee,
  Home,
  ShoppingBag,
  Leaf,
  Palette,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { gratitudeCards, type GratitudeCard } from "../data/gratitudeCards";

const categoryIconMap: Record<GratitudeCard["categoryKey"], LucideIcon> = {
  restaurant: Utensils,
  cafe: Coffee,
  hotel: Home,
  retail: ShoppingBag,
  wellness: Leaf,
  creative: Palette,
  healthcare: Building2,
  education: Building2,
  other: Building2,
};

function CategoryIcon({
  categoryKey,
  className,
}: {
  categoryKey: GratitudeCard["categoryKey"];
  className?: string;
}) {
  const Icon = categoryIconMap[categoryKey] ?? Building2;
  return <Icon className={className ?? "w-5 h-5"} strokeWidth={1.5} />;
}

export default function GratitudeWall() {
  const [selectedCard, setSelectedCard] = useState<GratitudeCard | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = [
    { key: "all", label: "All Stories" },
    { key: "restaurant", label: "Restaurants" },
    { key: "cafe", label: "Cafés" },
    { key: "hotel", label: "Hospitality" },
    { key: "retail", label: "Retail" },
    { key: "creative", label: "Creative" },
    { key: "wellness", label: "Wellness" },
  ];

  const filteredCards =
    activeFilter === "all"
      ? gratitudeCards
      : gratitudeCards.filter((card) => card.categoryKey === activeFilter);

  return (
    <section className="py-24 bg-[#1E1E1E] relative border-t border-white/5" id="stories-wall">
      <div className="container mx-auto px-4 max-w-[1100px]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-400 mb-4">
            The Appreciation Ledger
          </h2>
          <p className="text-3xl md:text-4xl font-heading font-extrabold text-white tracking-tight">
            Stories from the Community
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                activeFilter === cat.key
                  ? "bg-white text-black"
                  : "bg-neutral-900 text-neutral-400 hover:text-white border border-white/5 hover:bg-neutral-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Card Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onClick={() => setSelectedCard(card)}
                className="group relative bg-neutral-950 border border-white/5 hover:border-white/10 rounded-2xl p-6 sm:p-8 cursor-pointer flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_30px_rgba(255,255,255,0.02)] min-h-[280px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="p-3 rounded-xl border"
                      style={{
                        backgroundColor: `${card.accentColor}10` || "rgba(255,255,255,0.03)",
                        borderColor: `${card.accentColor}30` || "rgba(255,255,255,0.1)",
                        color: card.accentColor || "#fff",
                      }}
                    >
                      <CategoryIcon categoryKey={card.categoryKey} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                      {card.categoryLabel}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#9B1C22] transition-colors duration-300">
                    {card.businessName}
                  </h3>

                  <p className="text-sm text-neutral-400 font-light leading-relaxed line-clamp-3">
                    "{card.appreciation}"
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{card.location}</span>
                  </div>
                  <div className="flex items-center gap-1 hover:text-white transition-colors duration-300">
                    <span className="font-semibold">Read</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedCard(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative w-full max-w-xl bg-neutral-900 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCard(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all duration-300"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="p-3.5 rounded-2xl border"
                    style={{
                      backgroundColor: `${selectedCard.accentColor}10` || "rgba(255,255,255,0.03)",
                      borderColor: `${selectedCard.accentColor}30` || "rgba(255,255,255,0.1)",
                      color: selectedCard.accentColor || "#fff",
                    }}
                  >
                    <CategoryIcon categoryKey={selectedCard.categoryKey} className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold">
                      {selectedCard.categoryLabel}
                    </span>
                    <h3 className="text-xl font-extrabold text-white mt-0.5">
                      {selectedCard.businessName}
                    </h3>
                  </div>
                </div>

                <p className="text-neutral-200 font-light text-base sm:text-lg leading-relaxed mb-8 text-balance">
                  "{selectedCard.appreciation}"
                </p>

                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-neutral-500" />
                    <span>{selectedCard.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-neutral-500" />
                    <span>Visited {selectedCard.visitDate}</span>
                  </div>
                  {selectedCard.nominatedBy && (
                    <div className="col-span-2 border-t border-white/5 pt-4 mt-2">
                      <span className="text-neutral-500">Shared by:</span>{" "}
                      <span className="font-bold text-white">{selectedCard.nominatedBy}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}