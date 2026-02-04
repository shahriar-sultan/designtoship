"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className = "" }: NavbarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleRegisterClick = () => {
    router.push("/register");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Mobile navbar - Figma style, no language/flag */}
      <nav
        className={`fixed z-50 inset-x-4 left-[10px] top-6 md:hidden ${
          isOpen
            ? "min-h-[170px] rounded-[20px] flex flex-col justify-between"
            : "rounded-[100px]"
        } ${className}`}
        style={{
          maxWidth: "350px",
          width: "calc(100vw - 20px)",
          backgroundColor: "rgba(0, 0, 0, 0.04)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(151, 114, 89, 0.3)",
          boxShadow: "0px 10px 39px rgba(166, 125, 102, 0.1)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-[#FFFDFB] text-base font-semibold">
            Shahriar Sultan
          </span>

          <button
            type="button"
            onClick={toggleMenu}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#FFFDFB]"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <div className="px-5 pb-4 pt-0">
            <Button
              onClick={handleRegisterClick}
              className="w-full rounded-full bg-[#362012] hover:bg-[#452A1A] text-white text-sm font-semibold py-2.5"
            >
              রেজিস্ট্রেশন করুন!
            </Button>
          </div>
        )}
      </nav>

      {/* Desktop/Tablet navbar - original pill style */}
      <nav
        className={`hidden md:block fixed top-12 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
        style={{
          maxWidth: "1200px",
          width: "calc(100% - 2rem)",
          height: "80px",
          backgroundColor: "#1a110c2e",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(151, 114, 89, 0.3)",
          borderRadius: "100px",
          boxShadow: "0px 8px 29px rgba(151, 114, 89, 0.15)",
        }}
      >
        <div className="flex items-center justify-between h-full px-6 md:px-8">
          <div className="text-white text-lg md:text-xl font-semibold">
            Shahriar Sultan
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <Button
              onClick={handleRegisterClick}
              className="bg-white-gradient hover:opacity-90 text-[#15120D] px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold transition-colors shadow-lg"
            >
              রেজিস্ট্রেশন করুন!
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
