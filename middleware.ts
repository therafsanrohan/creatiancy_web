import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Enforce HTTP Security Headers internally bypassing cache overlaps
  const headers = response.headers;
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Rate-limiting mechanism logic hook - placeholder for production redis algorithms
  const ip = request.ip || '127.0.0.1';
  // Here we would implement ip-based sliding window ratelimit check
  
  // Anti-bot basic block (if bot signature found unexpectedly on API routes)
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  if (userAgent.includes('curl') || userAgent.includes('python-requests')) {
    // Return 403 for obvious headless scripts to prevent automated scrape scraping
    return new NextResponse('Access denied', { status: 403 });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
