"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import {
  EYEBROW,
  CENTERED_SECTION_ROOT,
  CENTERED_SECTION_CONTENT,
  CENTERED_SECTION_VIGNETTE,
} from "./constants";
import { useLanguage } from "./LanguageProvider";

const shipTags = [
  ["Figma", "Next.js", "Vercel"],
  ["Figma", "AI Build", "Google Sheets"],
];

const shipGlows = [
  "shadow-[0_0_40px_rgba(249,115,22,0.25)] border-[#F97316]/40",
  "shadow-[0_0_40px_rgba(108,62,255,0.25)] border-[#A855F7]/40",
];

export function WhatYouShip() {
  const { t } = useLanguage();

  const ships = [
    {
      badge: t.whatYouShip.ship1Badge,
      title: t.whatYouShip.ship1Title,
      description: t.whatYouShip.ship1Body,
      tags: shipTags[0],
      glow: shipGlows[0],
    },
    {
      badge: t.whatYouShip.ship2Badge,
      title: t.whatYouShip.ship2Title,
      description: t.whatYouShip.ship2Body,
      tags: shipTags[1],
      glow: shipGlows[1],
    },
  ];

  return (
    <section
      id="what-you-ship"
      data-particle-shape="torus"
      className={CENTERED_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div
        className={CENTERED_SECTION_CONTENT}
        style={{ background: CENTERED_SECTION_VIGNETTE }}
      >
        <ScrollReveal>
          <p className={`${EYEBROW} mb-4`}>{t.whatYouShip.eyebrow}</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9] mb-6 md:mb-16">
            {t.whatYouShip.headline}
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 md:gap-8 text-left">
          {ships.map((ship, index) => (
            <ScrollReveal key={ship.title} delay={150 + index * 100}>
              <div
                className={`rounded-2xl border bg-[#0F1520] p-6 md:p-8 h-full ${ship.glow}`}
              >
                <span className="inline-block text-sm uppercase tracking-widest font-semibold text-[#F97316] mb-4">
                  {ship.badge}
                </span>
                <h3 className="text-2xl font-bold text-[#F1F5F9] mb-4">
                  {ship.title}
                </h3>
                <p className="text-[#94A3B8] text-base leading-relaxed mb-6">
                  {ship.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {ship.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm font-medium border border-[#1C2740] text-[#94A3B8] bg-[#0F1520]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <p className="text-center text-[#475569] text-base mt-10">
            {t.whatYouShip.footnote}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
