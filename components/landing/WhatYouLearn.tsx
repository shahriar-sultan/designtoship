"use client";

import {
  Layout,
  Type,
  Palette,
  Component,
  Route,
  MousePointerClick,
  Boxes,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CENTERED_SECTION_ROOT, EYEBROW } from "./constants";

const WIDE_SECTION_VIGNETTE =
  "radial-gradient(ellipse 110% 95% at 50% 50%, rgba(8,12,20,0.9) 0%, rgba(8,12,20,0.6) 60%, transparent 100%)";

const skills: {
  Icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    Icon: Layout,
    title: "Visual Hierarchy & Layout",
    description:
      "Learn what makes a screen feel right. Spacing, alignment, balance, and composition — the foundation every good design stands on.",
  },
  {
    Icon: Type,
    title: "Typography",
    description:
      "Type scales, pairing fonts, weight, and rhythm. Make text that is both beautiful and easy to read.",
  },
  {
    Icon: Palette,
    title: "Color & Theory",
    description:
      "Build color palettes with intention. Understand contrast, mood, and how color creates a brand feeling.",
  },
  {
    Icon: Component,
    title: "Figma Mastery",
    description:
      "Components, variants, and auto layout. The exact Figma skills professional product designers use every single day.",
  },
  {
    Icon: Route,
    title: "UX Thinking",
    description:
      "User flows, sitemaps, information architecture, and wireframing. Learn to think about the user before you draw a single screen.",
  },
  {
    Icon: MousePointerClick,
    title: "Interface & Interaction",
    description:
      "Design real screens — landing pages, forms, empty states, loading and error states. The details that separate amateur work from professional work.",
  },
  {
    Icon: Boxes,
    title: "Design Systems",
    description:
      "Stop designing one screen at a time. Build reusable components and think in systems, the way senior designers do.",
  },
  {
    Icon: Smartphone,
    title: "Responsive & Mobile-First",
    description:
      "Design across every screen size. Start mobile-first — the same way the industry builds real products today.",
  },
];

export function WhatYouLearn() {
  return (
    <section
      id="what-you-learn"
      data-particle-shape="mobius-strip"
      className={CENTERED_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div
        className="relative z-10 max-w-5xl mx-auto px-8 py-24 w-full"
        style={{ background: WIDE_SECTION_VIGNETTE }}
      >
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className={`${EYEBROW} mb-4`}>What You Will Learn</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9] mb-5">
              Real design skills.
              <br />
              Not just tools.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
              You will learn UI and UX design from the ground up — the same skills
              that working product designers use to build real products.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((skill, index) => (
            <ScrollReveal key={skill.title} delay={200 + index * 50}>
              <div className="rounded-2xl border border-[#1C2740] bg-[#0F1520]/70 backdrop-blur-sm p-6 text-left transition-colors hover:border-[#6C3EFF]/50 h-full">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-[#6C3EFF] to-[#22D3EE]">
                  <skill.Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-semibold text-[#F1F5F9] mb-2">
                  {skill.title}
                </h3>
                <p className="text-base text-[#94A3B8] leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
