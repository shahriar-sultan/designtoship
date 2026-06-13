"use client";

import { AlertTriangle, Layers, Rocket } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  EYEBROW,
  ZIGZAG_SECTION_ROOT,
  SECTION_INNER,
  CONTENT_COLUMN_RIGHT,
  PARTICLE_COLUMN_LEFT,
} from "./constants";

const cards = [
  {
    icon: Layers,
    title: "You finish the course. You have Figma files.",
    description:
      "Most design courses teach you tools. You graduate with screens that sit on your hard drive and go nowhere.",
  },
  {
    icon: AlertTriangle,
    title: "The market has changed.",
    description:
      "AI can make screens now. What it cannot do is think about the user, make good decisions, and actually ship a product to the internet. That is what employers and clients pay for.",
  },
  {
    icon: Rocket,
    title: "This course is different.",
    description:
      "You leave with two real, live products. Not mockups. Not Figma files. Real URLs anyone can open.",
  },
];

export function Problem() {
  return (
    <section
      id="problem"
      data-particle-shape="broken-cursor"
      data-particle-side="left"
      className={ZIGZAG_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div className={PARTICLE_COLUMN_LEFT} aria-hidden="true" />
      <div className={CONTENT_COLUMN_RIGHT}>
        <div className={SECTION_INNER}>
          <ScrollReveal>
            <p className={`${EYEBROW} mb-4`}>THE PROBLEM</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9] max-w-3xl mb-12 md:mb-16">
              Everyone learns design.
              <br />
              Almost nobody ships anything.
            </h2>
          </ScrollReveal>

          <div className="grid gap-6">
            {cards.map((card, index) => (
              <ScrollReveal key={card.title} delay={150 + index * 100}>
                <div className="rounded-2xl border border-[#1C2740] bg-[#0F1520] p-6 md:p-8 h-full">
                  <card.icon className="w-6 h-6 text-[#A855F7] mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold text-[#F1F5F9] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[#94A3B8] text-base leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
