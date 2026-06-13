"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import {
  EYEBROW,
  ZIGZAG_SECTION_ROOT,
  SECTION_INNER,
  CONTENT_COLUMN_RIGHT,
  PARTICLE_COLUMN_LEFT,
} from "./constants";

const credentials = [
  "Senior Product Designer",
  "Figma → Next.js workflow",
  "$80K+ on Upwork",
  "3 free batches taught",
  "SaaS · B2B · Fintech",
];

export function Instructor() {
  return (
    <section
      id="instructor"
      data-particle-shape="portrait-silhouette"
      data-particle-side="left"
      className={ZIGZAG_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div className={PARTICLE_COLUMN_LEFT} aria-hidden="true" />
      <div className={CONTENT_COLUMN_RIGHT}>
        <div className={SECTION_INNER}>
          <ScrollReveal>
            <p className={`${EYEBROW} mb-4`}>YOUR INSTRUCTOR</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9]">
              Shahriar Sultan
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-[#94A3B8] mt-3 mb-8 text-xl md:text-2xl">
              Senior Product Designer · Founder, Lumixel Studio
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="rounded-2xl border border-[#1C2740] bg-[#0F1520] p-6 md:p-10">
              <p className="text-[#94A3B8] text-base leading-relaxed whitespace-pre-line">
                {`For the past 6 years, Shahriar has designed and shipped products for clients in the US, UK, Europe, the Middle East, and Australia. He does not just design in Figma. He takes ideas from zero to live, deployed products — the same workflow you will learn in this course.

This is Batch 4. The first three batches were free. This one is paid because it is a completely different level.`}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex flex-wrap gap-2 mt-8">
              {credentials.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-sm font-medium border border-[#1C2740] text-[#94A3B8] bg-[#0F1520]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
