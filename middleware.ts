import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./auth";

const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/verify-email",
  "/webinar"
];

const adminRoutes = [
  "/dashboard",
  "/admin",
  "/courses",
  "/students",
  "/analytics"
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/public") ||
    pathname.startsWith("/manifest.json")
  ) {
    return NextResponse.next();
  }

  let session = null;

  try {
    session = await auth();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const isPublic = publicRoutes.some((route) => pathname === route || pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // Redirect unauthenticated users from protected routes
  if (!session?.user && isAdminRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Redirect authenticated users away from auth pages
  if (session?.user && (pathname === "/auth/login" || pathname === "/auth/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Check admin role for admin routes
  if (session?.user && isAdminRoute && session.user.role !== 'admin') {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}