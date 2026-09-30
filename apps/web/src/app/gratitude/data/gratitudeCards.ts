// Gratitude Wall — mock data (backend-ready interface)
// Replace this with an API fetch when the backend is ready.

export interface GratitudeCard {
  id: string;
  businessName: string;
  categoryKey:
    | "restaurant"
    | "cafe"
    | "hotel"
    | "retail"
    | "wellness"
    | "creative"
    | "healthcare"
    | "education"
    | "other";
  categoryLabel: string;
  location: string;
  appreciation: string;
  visitDate: string;
  nominatedBy?: string;
  accentColor?: string;
}

export const gratitudeCards: GratitudeCard[] = [
  {
    id: "1",
    businessName: "The Amber Pot",
    categoryKey: "restaurant",
    categoryLabel: "Restaurant",
    location: "Dhaka, Bangladesh",
    appreciation:
      "The chef came out to check on us personally. Not because we called him — just because he cared. That moment made our anniversary unforgettable.",
    visitDate: "March 2025",
    nominatedBy: "Anika R.",
    accentColor: "#c47a2f",
  },
  {
    id: "2",
    businessName: "Serene Stay Guesthouse",
    categoryKey: "hotel",
    categoryLabel: "Hotel & Hospitality",
    location: "Cape Town, South Africa",
    appreciation:
      "They left hand-written notes in our room every morning. Small gestures, but it felt like home in a foreign city.",
    visitDate: "January 2025",
    nominatedBy: "David M.",
    accentColor: "#2f7a6a",
  },
  {
    id: "3",
    businessName: "Morning Ritual Café",
    categoryKey: "cafe",
    categoryLabel: "Café",
    location: "Nairobi, Kenya",
    appreciation:
      "They remembered my order three weeks after my first visit. In a city of millions, that kind of attention is rare and precious.",
    visitDate: "February 2025",
    nominatedBy: "Wanjiku O.",
    accentColor: "#7a4f2f",
  },
  {
    id: "4",
    businessName: "Solé Boutique",
    categoryKey: "retail",
    categoryLabel: "Fashion Retail",
    location: "Nicosia, Cyprus",
    appreciation:
      "The owner spent an hour helping my grandmother find the perfect fit, showing infinite patience and warmth.",
    visitDate: "December 2024",
    nominatedBy: "Maria P.",
    accentColor: "#9b1c22",
  },
  {
    id: "5",
    businessName: "Pixel & Point Studio",
    categoryKey: "creative",
    categoryLabel: "Creative Agency",
    location: "Johannesburg, South Africa",
    appreciation:
      "They treated our small startup with the same respect and detail as a Fortune 500 company. A masterclass in professionalism.",
    visitDate: "March 2025",
    nominatedBy: "Thabo N.",
    accentColor: "#5c2f7a",
  },
  {
    id: "6",
    businessName: "The Wellness Sanctuary",
    categoryKey: "wellness",
    categoryLabel: "Wellness & Spa",
    location: "Wyoming, USA",
    appreciation:
      "The staff accommodated our last-minute cancellation with zero fuss and sent a warm message wishing us well. Human kindness at its best.",
    visitDate: "April 2025",
    nominatedBy: "Sarah K.",
    accentColor: "#7a2f5c",
  },
];