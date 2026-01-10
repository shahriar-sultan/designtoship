"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  paddingVariant?: "default" | "small" | "medium" | "large";
  sizeVariant?: "default" | "small" | "medium" | "large";
  href?: string;
  style?: CSSProperties;
}

const paddingVariants = {
  default: "px-6 md:px-10",
  small: "px-6",
  medium: "px-6 md:px-8",
  large: "px-6 md:px-12",
};

const sizeVariants = {
  default: "h-12 md:h-14 text-base md:text-lg",
  small: "h-10 md:h-12 text-sm md:text-base",
  medium: "h-14 md:h-16 text-lg md:text-xl",
  large: "h-16 md:h-20 text-xl md:text-2xl",
};

export function CTAButton({
  children,
  className = "",
  onClick,
  paddingVariant = "default",
  sizeVariant = "medium",
  href = "/register",
  style,
}: CTAButtonProps) {
  const router = useRouter();
  const paddingClass = paddingVariants[paddingVariant];
  const sizeClass = sizeVariants[sizeVariant];

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(href);
    }
  };

  const defaultStyle: CSSProperties = {
    boxShadow: "0 12px 30px rgba(77, 43, 23, 0.28)",
    ...style,
  };

  return (
    <Button
      className={cn(
        "bg-[#361F12] hover:bg-[#4A2F1A] text-white rounded-full font-semibold leading-[1.6] text-center",
        paddingClass,
        sizeClass,
        className
      )}
      style={defaultStyle}
      onClick={handleClick}
    >
      <span className="block">{children}</span>
    </Button>
  );
}
