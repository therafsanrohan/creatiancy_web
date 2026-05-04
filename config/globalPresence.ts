/**
 * GLOBAL PRESENCE CONFIGURATION
 * 
 * Non-coders can easily update this file to add or remove countries 
 * where the company is actively operating.
 * 
 * Instructions:
 * 1. Copy an existing block `{ city: "...", country: "...", flag: "...", tz: "..." }`.
 * 2. Paste it in the array below.
 * 3. Update the values:
 *    - city: The name of the city.
 *    - country: The name of the country.
 *    - flag: The 2-letter country code (e.g., "bd" for Bangladesh, "us" for United States, "gb" for UK).
 *    - tz: The official IANA Timezone string (e.g., "Europe/London", "Asia/Tokyo").
 * 
 * Any city listed here will automatically:
 * - Appear in the Footer's Global Footprint section.
 * - Appear in the Contact Page's Global Footprint section.
 * - Show a RED "active" pulse on the World Live page (all others will have a neutral gray/white pulse).
 */

export const activePresence = [
  { city: "Dhaka", country: "Bangladesh", flag: "bd", tz: "Asia/Dhaka" },
  { city: "Wyoming", country: "United States", flag: "us", tz: "America/Denver" },
  { city: "Cape Town", country: "South Africa", flag: "za", tz: "Africa/Johannesburg" },
  { city: "Johannesburg", country: "South Africa", flag: "za", tz: "Africa/Johannesburg" },
  { city: "Nicosia", country: "Cyprus", flag: "cy", tz: "Asia/Nicosia" },
  { city: "Nairobi", country: "Kenya", flag: "ke", tz: "Africa/Nairobi" }
];
