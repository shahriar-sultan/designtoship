"use client";

import { usePathname } from "@/i18n/navigation";
import { Navbar } from "./Navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on login, register, and verify-email pages
  const hideNavbar = 
    pathname === "/login" || 
    pathname === "/register" || 
    pathname === "/verify-email";
  
  if (hideNavbar) {
    return null;
  }
  
  return <Navbar />;
}
