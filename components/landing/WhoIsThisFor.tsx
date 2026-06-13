"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { LandingButton } from "./LandingButton";
import {
  EYEBROW,
  ZIGZAG_SECTION_ROOT,
  SECTION_INNER,
  CONTENT_COLUMN_LEFT,
  PARTICLE_COLUMN_RIGHT,
} from "./constants";

const forYou = [
  "You want to learn design but do not know where to start",
  "You are tired of watching tutorials and not finishing anything",
  "You want a job or freelance work in product design",
  "You want to actually build things, not just make Figma files",
];

const notForYou = [
  "You are looking for a recorded course you can watch later",
  "You already work as a designer",
  "You want to learn development, not design",
];

export function WhoIsThisFor() {
  return (
    <section
      id="who-is-this-for"
      data-particle-shape="galaxy"
      data-particle-side="right"
      className={ZIGZAG_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div className={PARTICLE_COLUMN_RIGHT} aria-hidden="true" />
      <div className={CONTENT_COLUMN_LEFT}>
        <div className={SECTION_INNER}>
          <ScrollReveal>
            <p className={`${EYEBROW} mb-4`}>WHO THIS IS FOR</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9] mb-12 md:mb-16">
              You do not need to know anything yet.
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
            <ScrollReveal delay={150}>
              <div className="rounded-2xl border border-[#1C2740] bg-[#0F1520] p-6 md:p-8">
                <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">
                  This is for you if:
                </h3>
                <ul className="space-y-3">
                  {forYou.map((item) => (
                    <li
                      key={item}
                      className="text-[#94A3B8] text-base leading-relaxed flex gap-3"
                    >
                      <span className="text-[#22D3EE] shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="rounded-2xl border border-[#1C2740] bg-[#0F1520] p-6 md:p-8">
                <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">
                  This is not for you if:
                </h3>
                <ul className="space-y-3">
                  {notForYou.map((item) => (
                    <li
                      key={item}
                      className="text-[#94A3B8] text-base leading-relaxed flex gap-3"
                    >
                      <span className="text-[#475569] shrink-0">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={300}>
            <div className="rounded-2xl border border-[#1C2740] bg-[#0F1520] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p className="text-[#94A3B8] text-base max-w-xl">
                Admission is limited and screened. We review every application.
              </p>
              <LandingButton className="shrink-0">Apply for Batch 4</LandingButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
