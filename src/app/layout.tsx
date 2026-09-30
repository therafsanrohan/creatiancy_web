import type { Metadata } from "next";
import "@/app/website.css";

export const metadata: Metadata = {
  title: "Creatiancy | We Build Legacies",
  description: "Performance over decoration. Authoritative creative technology and brand architecture agency.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
