import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Enforce HTTP Security Headers
  const headers = response.headers;

  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );

  // Basic anti-bot check
  const userAgent =
    request.headers.get("user-agent")?.toLowerCase() || "";

  if (
    userAgent.includes("curl") ||
    userAgent.includes("python-requests")
  ) {
    return new NextResponse("Access denied", { status: 403 });
  }

  // Safe IP fallback (Next.js compatible)
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    "127.0.0.1";

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};