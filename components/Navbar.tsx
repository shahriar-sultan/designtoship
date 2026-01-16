"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
      style={{
        width: "1131px",
        height: "80px",
        backgroundColor: "rgba(255, 252, 248, 0.4)",
        backdropFilter: "blur(8px)",
        borderRadius: "100px",
        boxShadow: "0px 8px 29px rgba(151, 114, 89, 0.1)",
      }}
    >
      <div className="flex items-center justify-between h-full px-8">
        {/* Brand Name */}
        <div className="text-[#251531] text-xl font-semibold">
          Shahriar Sultan
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          {/* <div className="flex items-center gap-3 bg-transparent rounded-full px-4 py-3 hover:bg-white/20 transition-colors cursor-pointer">
            Bangladesh Flag
            <div className="relative w-9 h-6 rounded-sm overflow-hidden bg-green-600 flex items-center justify-center">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            </div>
            <span className="text-[#251531] text-base font-medium">বাংলা</span>
          </div> */}

          {/* Register Button */}
          <Button
            onClick={handleRegisterClick}
            className="bg-[#15120D] hover:bg-[#2a2419] text-white px-6 py-3 rounded-full text-base font-medium transition-colors shadow-lg"
          >
            রেজিস্ট্রেশন করুন!
          </Button>
        </div>
      </div>
    </nav>
  );
}
