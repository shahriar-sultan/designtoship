"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { ReactNode } from "react";

interface CTAButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  paddingVariant?: "default" | "small" | "medium" | "large";
  href?: string;
}

const paddingVariants = {
  default: "px-6 md:px-10",
  small: "px-6",
  medium: "px-6 md:px-8",
  large: "px-6 md:px-12",
};

export function CTAButton({
  children,
  className = "",
  onClick,
  paddingVariant = "default",
  href = "/register",
}: CTAButtonProps) {
  const router = useRouter();
  const paddingClass = paddingVariants[paddingVariant];

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(href);
    }
  };

  return (
    <Button
      className={`bg-[#361F12] hover:bg-[#2A1810] text-white rounded-full ${paddingClass} h-16 md:h-[82px] text-base md:text-[18px] font-semibold leading-[1.6] text-center cursor-pointer ${className}`}
      style={{
        boxShadow: "0 12px 30px rgba(77, 43, 23, 0.28)",
      }}
      onClick={handleClick}
    >
      <span className="block">{children}</span>
    </Button>
  );
}
