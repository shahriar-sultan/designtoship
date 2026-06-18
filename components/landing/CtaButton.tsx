"use client";

import { cn } from "@/lib/utils";
import { BATCH_4_APPLY_URL, CTA_LABEL } from "./constants";
import { LandingButton } from "./LandingButton";

type CtaButtonProps = {
  className?: string;
  href?: string;
};

export function CtaButton({ className, href = BATCH_4_APPLY_URL }: CtaButtonProps) {
  return (
    <LandingButton href={href} className={cn(className)}>
      {CTA_LABEL}
    </LandingButton>
  );
}
