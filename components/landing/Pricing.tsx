"use client";

import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LandingButton } from "./LandingButton";
import {
  EYEBROW,
  GRADIENT_TEXT,
  ZIGZAG_SECTION_ROOT,
  SECTION_INNER,
  CONTENT_COLUMN_LEFT,
  PARTICLE_COLUMN_RIGHT,
} from "./constants";

const features = [
  "Full 13-week program",
  "78+ hours of live instruction",
  "Two shipped products",
  "Lifetime recording access",
  "Direct access to a senior designer",
  "Private batch community",
];

export function Pricing() {
  return (
    <section
      id="pricing"
      data-particle-shape="rocket-detailed"
      data-particle-side="right"
      className={ZIGZAG_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div className={PARTICLE_COLUMN_RIGHT} aria-hidden="true" />
      <div className={CONTENT_COLUMN_LEFT}>
        <div className={SECTION_INNER}>
          <ScrollReveal>
            <p className={`${EYEBROW} mb-4`}>PRICING</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9] mb-12 md:mb-16">
              Batch 4 Pricing
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="w-full rounded-2xl border border-[#1C2740] bg-[#0F1520] p-6 md:p-8">
              <p className="text-3xl md:text-4xl font-bold tracking-tight text-slate-500 line-through">
                ৳18,990
              </p>
              <p className="text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9] mt-2">
                ৳13,900
              </p>

              <div className="mt-6 rounded-2xl p-[2px] bg-gradient-to-r from-[#6C3EFF] via-[#A855F7] to-[#22D3EE] shadow-[0_0_40px_rgba(249,115,22,0.2)]">
                <div className="rounded-2xl bg-[#0F1520] p-5 md:p-6 border border-[#F97316]/20 bg-gradient-to-br from-[#F97316]/10 via-[#0F1520] to-[#0F1520]">
                  <p className="text-base md:text-lg font-semibold text-[#F1F5F9]">
                    ⚡ Early Bird Price:{" "}
                    <span className={`font-bold ${GRADIENT_TEXT}`}>৳9,900</span>
                  </p>
                  <p className="text-[#94A3B8] text-base leading-relaxed mt-2">
                    Apply before{" "}
                    <span className="font-bold text-[#F97316]">June 22nd</span>{" "}
                    and pay{" "}
                    <span className={`font-bold ${GRADIENT_TEXT}`}>৳9,900</span>{" "}
                    only.
                  </p>
                </div>
              </div>

              <ul className="space-y-3 my-8">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[#94A3B8] text-base"
                  >
                    <Check
                      className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5"
                      strokeWidth={2}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <LandingButton className="w-full text-base md:text-lg py-4">
                Apply for Early Bird — ৳9,900
              </LandingButton>

              <p className="text-center text-[#F1F5F9] text-sm md:text-base font-medium mt-6">
                Regular price of ৳13,900 applies after June 22nd. Installment
                available on regular price.
              </p>

              <p className="text-center text-[#F1F5F9] text-sm md:text-base font-semibold mt-4 pt-4 border-t border-[#1C2740]">
                Batch 4 has a hard cap. Once seats are full, enrollment closes.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
