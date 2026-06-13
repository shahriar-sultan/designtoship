"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import {
  EYEBROW,
  ZIGZAG_SECTION_ROOT,
  SECTION_INNER,
  CONTENT_COLUMN_LEFT,
  PARTICLE_COLUMN_RIGHT,
} from "./constants";

const steps = [
  {
    title: "Lecture",
    description:
      "New material. The senior designer teaches live and shows every decision in real time.",
  },
  {
    title: "Assignment",
    description:
      "You apply what you learned to your own product before the next class.",
  },
  {
    title: "Build Lab",
    description:
      "You work live. The senior designer reviews your work publicly. You unblock each other.",
  },
  {
    title: "Weekly Artifact",
    description:
      "Every week ends with one named deliverable. A brand board. A landing page. A live URL.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      data-particle-shape="cursor-hand"
      data-particle-side="right"
      className={ZIGZAG_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div className={PARTICLE_COLUMN_RIGHT} aria-hidden="true" />
      <div className={CONTENT_COLUMN_LEFT}>
        <div className={SECTION_INNER}>
          <ScrollReveal>
            <p className={`${EYEBROW} mb-4`}>HOW EACH WEEK WORKS</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9] mb-12 md:mb-16">
              The same rhythm, every week.
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <ScrollReveal key={step.title} delay={100 + index * 80}>
                <div className="relative rounded-2xl border border-[#1C2740] bg-[#0F1520] p-6 h-full">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#6C3EFF] via-[#A855F7] to-[#22D3EE] text-white text-sm font-bold mb-4">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#94A3B8] text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <p className="text-center text-[#475569] text-base mt-10">
              You always know exactly where you are and what comes next.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
