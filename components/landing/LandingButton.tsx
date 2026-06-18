"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { BATCH_4_APPLY_URL } from "./constants";

interface LandingButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  className?: string;
  onClick?: () => void;
}

function navigateToHref(href: string, router: ReturnType<typeof useRouter>) {
  if (href.startsWith("http")) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }
  router.push(href);
}

export function LandingButton({
  children,
  href = BATCH_4_APPLY_URL,
  variant = "primary",
  className,
  onClick,
}: LandingButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    navigateToHref(href, router);
  };

  if (variant === "outline") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "rounded-full px-6 py-3 text-sm font-semibold text-landing-fg",
          "border border-landing-border bg-landing-surface",
          "hover:border-landing-accent hover:text-landing-accent",
          "transition-colors cursor-pointer",
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
        "rounded-full px-8 py-3.5 text-sm md:text-base font-semibold text-white cursor-pointer",
        "bg-landing-accent hover:bg-landing-accent-hover",
        "transition-colors shadow-landing",
        className,
      )}
    >
      {children}
    </button>
  );
}
