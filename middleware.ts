import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to enhance security by hiding source structure and blocking unauthorized access.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Block access to sensitive files that might be accidentally exposed
  const sensitiveFiles = [
    '/package.json',
    '/package-lock.json',
    '/tsconfig.json',
    '/next.config.ts',
    '/next.config.js',
    '/.env',
    '/README.md',
    '/LICENSE',
    '/SRS.md',
    '/AGENTS.md',
    '/CLAUDE.md'
  ];

  if (sensitiveFiles.includes(pathname.toLowerCase())) {
    return new NextResponse("Access Denied: Restricted System File", { status: 403 });
  }

  // 2. Block access to hidden directories and files (starting with dot)
  if (pathname.includes('/.')) {
    return new NextResponse("Access Denied: Hidden Path", { status: 403 });
  }

  const response = NextResponse.next();

  // 3. Enforce HTTP Security Headers
  const headers = response.headers;
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Permitted-Cross-Domain-Policies", "none");
  headers.set("X-XSS-Protection", "1; mode=block");

  // 4. Basic anti-bot check (Curl/Python)
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";
  if (userAgent.includes("curl") || userAgent.includes("python-requests")) {
    return new NextResponse("Access denied: Automated agents restricted", { status: 403 });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes, let them handle their own security)
     */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};