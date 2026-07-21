'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Immediate silent redirect to dashboard — no 404 page exposed
    router.replace('/billing');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#FBFDF9]">
      <div className="flex flex-col items-center space-y-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#9B1C22] border-t-transparent" />
        <p className="text-xs text-gray-500 font-semibold">Redirecting to Creatiancy Billing...</p>
      </div>
    </div>
  );
}
