import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { CANONICAL_HOST } from "@/lib/site";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  const proto = request.headers.get("x-forwarded-proto");
  const needsHttps = proto === "http";
  const needsWww = host === "thedesignworkbench.com";

  if (needsHttps || needsWww) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
