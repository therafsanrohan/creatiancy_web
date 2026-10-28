"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ContactRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/#contact");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0C0708] flex items-center justify-center text-white text-[13px] font-mono">
      <span>Redirecting to studio contact section...</span>
    </div>
  );
}