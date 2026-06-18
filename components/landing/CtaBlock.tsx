"use client";

import { cn } from "@/lib/utils";
import { CTA_BLOCK_ROOT } from "./constants";
import { CtaButton } from "./CtaButton";

type CtaBlockProps = {
  className?: string;
};

export function CtaBlock({ className }: CtaBlockProps) {
  return (
    <div className={cn(CTA_BLOCK_ROOT, className)}>
      <div className="mx-auto flex max-w-6xl justify-center px-5 md:px-8">
        <CtaButton className="text-base md:text-lg px-10 py-4" />
      </div>
    </div>
  );
}
