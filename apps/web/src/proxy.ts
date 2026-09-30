import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sensitiveFiles = [
    "/package.json",
    "/package-lock.json",
    "/tsconfig.json",
    "/next.config.ts",
    "/next.config.js",
    "/.env",
    "/README.md",
    "/LICENSE",
    "/SRS.md",
    "/AGENTS.md",
    "/CLAUDE.md",
  ];

  if (sensitiveFiles.includes(pathname.toLowerCase())) {
    return new NextResponse("Access Denied: Restricted System File", { status: 403 });
  }

  if (pathname.includes("/.")) {
    return new NextResponse("Access Denied: Hidden Path", { status: 403 });
  }

  let response: NextResponse | undefined;
  try {
    response = await createClient(request);
  } catch {
    response = NextResponse.next();
  }

  if (!response) {
    response = NextResponse.next();
  }

  const headers = response.headers;
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Permitted-Cross-Domain-Policies", "none");
  headers.set("X-XSS-Protection", "1; mode=block");

  return response;
}

export default proxy;

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

