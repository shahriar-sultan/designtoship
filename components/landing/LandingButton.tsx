"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface LandingButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  className?: string;
  onClick?: () => void;
}

export function LandingButton({
  children,
  href = "/register",
  variant = "primary",
  className,
  onClick,
}: LandingButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(href);
    }
  };

  if (variant === "outline") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "rounded-full px-6 py-3 text-sm font-semibold text-[#F1F5F9] border border-[#1C2740] bg-[#0F1520]/80 hover:border-[#6C3EFF]/50 transition-colors cursor-pointer",
          className,
        )}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "rounded-full px-8 py-3.5 text-sm md:text-base font-semibold text-white cursor-pointer transition-opacity hover:opacity-90",
        "bg-gradient-to-r from-[#6C3EFF] via-[#A855F7] to-[#22D3EE]",
        className,
      )}
    >
      {children}
    </button>
  );
}
