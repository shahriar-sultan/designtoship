import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { CANONICAL_HOST } from "@/lib/site";

function isLocalHost(hostname: string) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");

  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    host.endsWith(".local") ||
    /^192\.168\./.test(host) ||
    /^10\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
  );
}

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;

  if (process.env.NODE_ENV === "development" || isLocalHost(hostname)) {
    return NextResponse.next();
  }

  const proto = request.headers.get("x-forwarded-proto");
  const needsHttps = proto === "http";
  const needsWww = hostname === "thedesignworkbench.com";

  if (needsHttps || needsWww) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
