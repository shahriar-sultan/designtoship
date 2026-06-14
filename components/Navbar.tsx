"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BATCH_4_APPLY_URL } from "@/components/landing/constants";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  className?: string;
}

const navBarStyle = {
  backgroundColor: "rgba(8, 12, 20, 0.9)",
  backdropFilter: "blur(20px)",
  borderBottom: "1px solid #1C2740",
} as const;

export function Navbar({ className = "" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleRegisterClick = () => {
    window.open(BATCH_4_APPLY_URL, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 md:hidden ${className}`}
        style={navBarStyle}
      >
        <div className="flex items-center justify-between h-20 px-4">
          <span className="text-[#F1F5F9] text-base font-semibold">
            Design To Ship
          </span>

          <button
            type="button"
            onClick={toggleMenu}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#F1F5F9]"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <div className="px-4 pb-4 border-t border-[#1C2740]">
            <Button
              onClick={handleRegisterClick}
              className="w-full rounded-full bg-white-gradient hover:opacity-90 text-[#15120D] text-sm font-semibold py-2.5"
            >
              Apply for Batch 4
            </Button>
          </div>
        )}
      </nav>

      <nav
        className={`hidden md:block fixed top-0 inset-x-0 z-50 ${className}`}
        style={navBarStyle}
      >
        <div className="flex items-center justify-between h-20 max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-[#F1F5F9] text-lg font-semibold">
            Design To Ship
          </div>

          <Button
            onClick={handleRegisterClick}
            className="bg-white-gradient hover:opacity-90 text-[#15120D] px-6 py-2 rounded-full text-sm font-semibold transition-colors shadow-lg"
          >
            Apply for Batch 4
          </Button>
        </div>
      </nav>
    </>
  );
}
