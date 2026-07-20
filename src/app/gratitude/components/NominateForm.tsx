"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown, ArrowRight } from "lucide-react";

export default function NominateForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    businessName: "",
    location: "",
    category: "restaurant",
    appreciation: "",
    nominatorName: "",
    nominatorEmail: "",
  });

  const categories = [
    { value: "restaurant", label: "Restaurant" },
    { value: "cafe", label: "Café" },
    { value: "hotel", label: "Hotel & Hospitality" },
    { value: "retail", label: "Retail & Shop" },
    { value: "creative", label: "Creative Agency" },
    { value: "wellness", label: "Wellness & Spa" },
    { value: "other", label: "Other Business" },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required.";
    if (!formData.location.trim()) newErrors.location = "Location (City, Country) is required.";
    if (!formData.appreciation.trim()) {
      newErrors.appreciation = "Please tell us what makes them special.";
    } else if (formData.appreciation.trim().length < 20) {
      newErrors.appreciation = "Please write a slightly longer appreciation story (min 20 characters).";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Simulate form submission
      setFormSubmitted(true);
    }
  };

  return (
    <section className="py-24 bg-[#1E1E1E] border-t border-white/5 relative" id="nominate">
      <div className="container mx-auto px-4 max-w-[650px] relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#9B1C22] mb-4">
            Participate
          </h2>
          <p className="text-3xl font-heading font-extrabold text-white mb-2 tracking-tight">
            Nominate a Business
          </p>
          <p className="text-sm text-neutral-400 font-light">
            Share your appreciation for an exceptional local business. No accounts required.
          </p>
        </div>

        <div className="bg-neutral-950 border border-white/5 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Business Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="businessName" className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Morning Ritual Café"
                    className="w-full px-5 py-4 bg-neutral-900 border border-white/5 focus:border-[#9B1C22] rounded-xl text-sm text-white placeholder-neutral-600 outline-none transition-all duration-300"
                  />
                  {errors.businessName && (
                    <span className="text-xs text-red-500 font-medium">{errors.businessName}</span>
                  )}
                </div>

                {/* Location */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="location" className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Dhaka, Bangladesh"
                    className="w-full px-5 py-4 bg-neutral-900 border border-white/5 focus:border-[#9B1C22] rounded-xl text-sm text-white placeholder-neutral-600 outline-none transition-all duration-300"
                  />
                  {errors.location && (
                    <span className="text-xs text-red-500 font-medium">{errors.location}</span>
                  )}
                </div>

                {/* Category & Drodown */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="category" className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-5 py-4 bg-neutral-900 border border-white/5 focus:border-[#9B1C22] rounded-xl text-sm text-white outline-none appearance-none cursor-pointer transition-all duration-300"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value} className="bg-neutral-900">
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                  </div>
                </div>

                {/* Appreciation Story */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="appreciation" className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    Your Story / Appreciation
                  </label>
                  <textarea
                    id="appreciation"
                    rows={4}
                    value={formData.appreciation}
                    onChange={(e) => setFormData({ ...formData, appreciation: e.target.value })}
                    placeholder="Tell us what they did that made a difference. Be as detailed as you like."
                    className="w-full px-5 py-4 bg-neutral-900 border border-white/5 focus:border-[#9B1C22] rounded-xl text-sm text-white placeholder-neutral-600 outline-none resize-none transition-all duration-300"
                  />
                  {errors.appreciation && (
                    <span className="text-xs text-red-500 font-medium">{errors.appreciation}</span>
                  )}
                </div>

                {/* Nominator Information */}
                <div className="grid sm:grid-cols-2 gap-4 border-t border-white/5 pt-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="nominatorName" className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                      Your Name <span className="text-neutral-600">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="nominatorName"
                      value={formData.nominatorName}
                      onChange={(e) => setFormData({ ...formData, nominatorName: e.target.value })}
                      placeholder="Anika R."
                      className="w-full px-5 py-4 bg-neutral-900 border border-white/5 focus:border-[#9B1C22] rounded-xl text-sm text-white placeholder-neutral-600 outline-none transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="nominatorEmail" className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                      Your Email <span className="text-neutral-600">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      id="nominatorEmail"
                      value={formData.nominatorEmail}
                      onChange={(e) => setFormData({ ...formData, nominatorEmail: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-5 py-4 bg-neutral-900 border border-white/5 focus:border-[#9B1C22] rounded-xl text-sm text-white placeholder-neutral-600 outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-[#9B1C22] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#85181D] active:scale-98 shadow-[0_4px_20px_rgba(155,28,34,0.15)]"
                >
                  <span>Submit Nomination</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center text-center py-12"
              >
                <div className="p-4 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-500 mb-6">
                  <CheckCircle2 className="w-12 h-12" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-3">Nomination Submitted</h3>
                <p className="text-sm text-neutral-400 leading-relaxed max-w-sm mb-8">
                  Thank you for sharing your story. We review all community nominations to maintain quality before showing them on the wall.
                </p>
                <button
                  onClick={() => {
                    setFormData({
                      businessName: "",
                      location: "",
                      category: "restaurant",
                      appreciation: "",
                      nominatorName: "",
                      nominatorEmail: "",
                    });
                    setFormSubmitted(false);
                  }}
                  className="px-6 py-3 border border-white/10 hover:border-white/20 rounded-xl text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white transition-all duration-300"
                >
                  Submit Another Story
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}