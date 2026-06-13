"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on auth pages and dashboard
  const hideNavbar =
    pathname.startsWith("/auth/") ||
    pathname.startsWith("/dashboard") ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/verify-email";
  
  if (hideNavbar) {
    return null;
  }
  
  return <Navbar />;
}
