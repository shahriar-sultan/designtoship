"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UKFlag } from "@/components/UKFlag";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className = "" }: NavbarProps) {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <nav
      className={`fixed top-12 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
      style={{
        maxWidth: "1200px",
        width: "calc(100% - 2rem)",
        height: "80px",
        backgroundColor: "#1a110c2e",
        // backgroundColor: "rgba(255, 252, 251, 0.08)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(151, 114, 89, 0.3)",
        borderRadius: "100px",
        boxShadow: "0px 8px 29px rgba(151, 114, 89, 0.15)",
      }}
    >
      <div className="flex items-center justify-between h-full px-6 md:px-8">
        {/* Brand Name */}
        <div className="text-white text-lg md:text-xl font-semibold">
          Shahriar Sultan
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Language Selector */}
          {/* <div className="flex items-center gap-2 md:gap-3 bg-white/5 rounded-full px-3 md:px-4 py-2 md:py-3 hover:bg-white/10 transition-colors cursor-pointer border border-white/10">
            <UKFlag className="w-7 h-5 md:w-9 md:h-6 rounded-sm" />
            <span className="text-white text-sm md:text-base font-medium">
              English
            </span>
          </div> */}

          {/* Register Button */}
          <Button
            onClick={handleRegisterClick}
            className="bg-white-gradient hover:opacity-90 text-[#15120D] px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold transition-colors shadow-lg"
          >
            রেজিস্ট্রেশন করুন!
          </Button>
        </div>
      </div>
    </nav>
  );
}
