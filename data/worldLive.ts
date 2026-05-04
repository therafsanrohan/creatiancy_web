export const worldCountries = [
  // North America
  { city: "Washington, D.C.", country: "United States", flag: "us", tz: "America/New_York" },
  { city: "Ottawa", country: "Canada", flag: "ca", tz: "America/Toronto" },
  { city: "Mexico City", country: "Mexico", flag: "mx", tz: "America/Mexico_City" },
  { city: "Havana", country: "Cuba", flag: "cu", tz: "America/Havana" },
  { city: "San José", country: "Costa Rica", flag: "cr", tz: "America/Costa_Rica" },
  { city: "Panama City", country: "Panama", flag: "pa", tz: "America/Panama" },
  { city: "Guatemala City", country: "Guatemala", flag: "gt", tz: "America/Guatemala" },
  
  // South America
  { city: "Brasília", country: "Brazil", flag: "br", tz: "America/Sao_Paulo" },
  { city: "Buenos Aires", country: "Argentina", flag: "ar", tz: "America/Argentina/Buenos_Aires" },
  { city: "Bogotá", country: "Colombia", flag: "co", tz: "America/Bogota" },
  { city: "Santiago", country: "Chile", flag: "cl", tz: "America/Santiago" },
  { city: "Lima", country: "Peru", flag: "pe", tz: "America/Lima" },
  { city: "Caracas", country: "Venezuela", flag: "ve", tz: "America/Caracas" },
  { city: "Quito", country: "Ecuador", flag: "ec", tz: "America/Guayaquil" },
  { city: "Montevideo", country: "Uruguay", flag: "uy", tz: "America/Montevideo" },

  // Europe
  { city: "London", country: "United Kingdom", flag: "gb", tz: "Europe/London" },
  { city: "Paris", country: "France", flag: "fr", tz: "Europe/Paris" },
  { city: "Berlin", country: "Germany", flag: "de", tz: "Europe/Berlin" },
  { city: "Rome", country: "Italy", flag: "it", tz: "Europe/Rome" },
  { city: "Madrid", country: "Spain", flag: "es", tz: "Europe/Madrid" },
  { city: "Amsterdam", country: "Netherlands", flag: "nl", tz: "Europe/Amsterdam" },
  { city: "Brussels", country: "Belgium", flag: "be", tz: "Europe/Brussels" },
  { city: "Vienna", country: "Austria", flag: "at", tz: "Europe/Vienna" },
  { city: "Stockholm", country: "Sweden", flag: "se", tz: "Europe/Stockholm" },
  { city: "Oslo", country: "Norway", flag: "no", tz: "Europe/Oslo" },
  { city: "Copenhagen", country: "Denmark", flag: "dk", tz: "Europe/Copenhagen" },
  { city: "Helsinki", country: "Finland", flag: "fi", tz: "Europe/Helsinki" },
  { city: "Athens", country: "Greece", flag: "gr", tz: "Europe/Athens" },
  { city: "Warsaw", country: "Poland", flag: "pl", tz: "Europe/Warsaw" },
  { city: "Prague", country: "Czechia", flag: "cz", tz: "Europe/Prague" },
  { city: "Budapest", country: "Hungary", flag: "hu", tz: "Europe/Budapest" },
  { city: "Lisbon", country: "Portugal", flag: "pt", tz: "Europe/Lisbon" },
  { city: "Kyiv", country: "Ukraine", flag: "ua", tz: "Europe/Kiev" },
  { city: "Moscow", country: "Russia", flag: "ru", tz: "Europe/Moscow" },

  // Asia
  { city: "Dhaka", country: "Bangladesh", flag: "bd", tz: "Asia/Dhaka" },
  { city: "Beijing", country: "China", flag: "cn", tz: "Asia/Shanghai" },
  { city: "Tokyo", country: "Japan", flag: "jp", tz: "Asia/Tokyo" },
  { city: "New Delhi", country: "India", flag: "in", tz: "Asia/Kolkata" },
  { city: "Seoul", country: "South Korea", flag: "kr", tz: "Asia/Seoul" },
  { city: "Jakarta", country: "Indonesia", flag: "id", tz: "Asia/Jakarta" },
  { city: "Bangkok", country: "Thailand", flag: "th", tz: "Asia/Bangkok" },
  { city: "Kuala Lumpur", country: "Malaysia", flag: "my", tz: "Asia/Kuala_Lumpur" },
  { city: "Singapore", country: "Singapore", flag: "sg", tz: "Asia/Singapore" },
  { city: "Hanoi", country: "Vietnam", flag: "vn", tz: "Asia/Ho_Chi_Minh" },
  { city: "Manila", country: "Philippines", flag: "ph", tz: "Asia/Manila" },
  { city: "Riyadh", country: "Saudi Arabia", flag: "sa", tz: "Asia/Riyadh" },
  { city: "Dubai", country: "United Arab Emirates", flag: "ae", tz: "Asia/Dubai" },
  { city: "Jerusalem", country: "Israel", flag: "il", tz: "Asia/Jerusalem" },
  { city: "Tehran", country: "Iran", flag: "ir", tz: "Asia/Tehran" },
  { city: "Islamabad", country: "Pakistan", flag: "pk", tz: "Asia/Karachi" },
  { city: "Kabul", country: "Afghanistan", flag: "af", tz: "Asia/Kabul" },
  { city: "Tashkent", country: "Uzbekistan", flag: "uz", tz: "Asia/Tashkent" },
  { city: "Doha", country: "Qatar", flag: "qa", tz: "Asia/Qatar" },

  // Africa
  { city: "Cairo", country: "Egypt", flag: "eg", tz: "Africa/Cairo" },
  { city: "Cape Town", country: "South Africa", flag: "za", tz: "Africa/Johannesburg" },
  { city: "Nairobi", country: "Kenya", flag: "ke", tz: "Africa/Nairobi" },
  { city: "Lagos", country: "Nigeria", flag: "ng", tz: "Africa/Lagos" },
  { city: "Addis Ababa", country: "Ethiopia", flag: "et", tz: "Africa/Addis_Ababa" },
  { city: "Accra", country: "Ghana", flag: "gh", tz: "Africa/Accra" },
  { city: "Algiers", country: "Algeria", flag: "dz", tz: "Africa/Algiers" },
  { city: "Casablanca", country: "Morocco", flag: "ma", tz: "Africa/Casablanca" },
  { city: "Dar es Salaam", country: "Tanzania", flag: "tz", tz: "Africa/Dar_es_Salaam" },
  { city: "Kampala", country: "Uganda", flag: "ug", tz: "Africa/Kampala" },
  { city: "Dakar", country: "Senegal", flag: "sn", tz: "Africa/Dakar" },

  // Oceania
  { city: "Canberra", country: "Australia", flag: "au", tz: "Australia/Sydney" },
  { city: "Wellington", country: "New Zealand", flag: "nz", tz: "Pacific/Auckland" },
  { city: "Suva", country: "Fiji", flag: "fj", tz: "Pacific/Fiji" },
  { city: "Port Moresby", country: "Papua New Guinea", flag: "pg", tz: "Pacific/Port_Moresby" },
  { city: "Apia", country: "Samoa", flag: "ws", tz: "Pacific/Apia" },

  // Add more as needed to fill out the grid
];

export const groupedCountries = {
  "North America": worldCountries.slice(0, 7),
  "South America": worldCountries.slice(7, 15),
  "Europe": worldCountries.slice(15, 34),
  "Asia": worldCountries.slice(34, 53),
  "Africa": worldCountries.slice(53, 64),
  "Oceania": worldCountries.slice(64),
};
