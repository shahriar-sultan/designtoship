"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandIcon } from "@/components/BrandIcon";
import { Button } from "@/components/ui/button";
import { BATCH_4_APPLY_URL } from "@/components/landing/constants";
import { Menu, X } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { LanguageToggle } from "./LanguageToggle";

const navBarStyle = {
  backgroundColor: "rgba(8, 12, 20, 0.9)",
  backdropFilter: "blur(20px)",
  borderBottom: "1px solid #1C2740",
} as const;

export function LandingNavbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleRegisterClick = () => {
    window.open(BATCH_4_APPLY_URL, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 md:hidden"
        style={navBarStyle}
      >
        <div className="flex items-center justify-between h-20 px-4">
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <BrandIcon className="h-8 w-8 shrink-0 rounded-lg" />
            <span className="text-[#F1F5F9] text-base font-semibold truncate">
              {t.nav.brand}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              type="button"
              onClick={toggleMenu}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#F1F5F9]"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="px-4 pb-4 border-t border-[#1C2740]">
            <Button
              onClick={handleRegisterClick}
              className="w-full rounded-full bg-white-gradient hover:opacity-90 text-[#15120D] text-sm font-semibold py-2.5"
            >
              {t.nav.cta}
            </Button>
          </div>
        )}
      </nav>

      <nav
        className="hidden md:block fixed top-0 inset-x-0 z-50"
        style={navBarStyle}
      >
        <div className="flex items-center justify-between h-20 max-w-6xl mx-auto px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <BrandIcon className="h-8 w-8 shrink-0 rounded-lg" />
            <span className="text-[#F1F5F9] text-base md:text-lg font-semibold truncate">
              {t.nav.brand}
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Button
              onClick={handleRegisterClick}
              className="bg-white-gradient hover:opacity-90 text-[#15120D] px-6 py-2 rounded-full text-sm font-semibold transition-colors shadow-lg"
            >
              {t.nav.cta}
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
