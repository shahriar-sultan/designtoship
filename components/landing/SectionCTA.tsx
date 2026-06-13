"use client";

import { LandingButton } from "./LandingButton";

export function SectionCTA() {
  return (
    <div className="relative z-10 w-full bg-[#080C14] flex flex-col items-center gap-4 py-16">
      <LandingButton className="text-base md:text-lg px-10 py-4">
        Apply for Batch 4
      </LandingButton>
      <p className="text-slate-400 text-sm">
        Batch 4 · Limited seats · Enrollment closes when full
      </p>
    </div>
  );
}
