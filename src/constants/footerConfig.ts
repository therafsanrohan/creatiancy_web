const formatPhoneNumber = (numStr: string) => {
  const clean = numStr.replace(/[\s\-+]/g, "");
  if (clean.startsWith("880") && clean.length === 13) {
    return `+880 ${clean.slice(3, 7)} ${clean.slice(7, 10)} ${clean.slice(10)}`;
  }
  return `+${clean}`;
};

const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801325078941";
const waNumber = rawNumber.replace(/[\s\-+]/g, "");

export const footerConfig = {
  cta: "Let's build something remarkable.",
  contact: {
    inquiries: {
      label: "General & Inquiries",
      email: "contact@creatiancy.com",
    },
    chat: {
      label: "Direct Chat",
      whatsapp: formatPhoneNumber(rawNumber),
      link: `https://wa.me/${waNumber}`,
    },
    address: {
      label: "Global Studio",
      location: "Dhaka, Bangladesh",
    }
  },
  socials: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/creatiancy', icon: 'linkedin' },
    { name: 'Instagram', url: 'https://www.instagram.com/creatiancy/', icon: 'instagram' },
    { name: 'Pinterest', url: 'https://www.pinterest.com/creatiancy/', icon: 'pinterest' },
    { name: 'Behance', url: 'https://www.behance.net/creatiancyglobal', icon: 'behance' },
    { name: 'Facebook', url: 'https://www.facebook.com/creatiancy', icon: 'facebook' },
  ]
};
