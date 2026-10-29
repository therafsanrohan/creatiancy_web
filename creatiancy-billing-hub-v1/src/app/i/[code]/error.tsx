'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[ShortPublicInvoiceError]', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 mb-4">
        <AlertCircle className="h-8 w-8 text-[#9B1C22]" />
      </div>
      <h1 className="text-2xl font-extrabold text-gray-900">Unable to Display Invoice</h1>
      <p className="text-sm text-gray-600 max-w-md mt-2 leading-relaxed">
        A temporary rendering error occurred while loading this invoice. Please refresh the page or try again shortly.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 inline-flex items-center space-x-2 rounded-xl bg-[#9B1C22] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#80171C] transition cursor-pointer shadow-sm"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Reload Invoice</span>
      </button>
    </div>
  );
}
