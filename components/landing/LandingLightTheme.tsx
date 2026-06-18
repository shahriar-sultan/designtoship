"use client";

import { useEffect } from "react";

/** Landing is always light; clear dashboard dark-mode class if it leaked onto <html>. */
export function LandingLightTheme() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    root.style.colorScheme = "light";

    return () => {
      root.classList.remove("light");
      root.style.colorScheme = "";
    };
  }, []);

  return null;
}
