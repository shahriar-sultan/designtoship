"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import {
  EYEBROW,
  ZIGZAG_SECTION_ROOT,
  SECTION_INNER,
  CONTENT_COLUMN_LEFT,
  PARTICLE_COLUMN_RIGHT,
} from "./constants";

const ships = [
  {
    badge: "SHIP 01 · WEEK 8",
    title: "Your Website",
    description:
      "A complete 5 to 7 page website for a real product. Designed by you in Figma. Built with AI. Live on the internet with a real URL.",
    tags: ["Figma", "Next.js", "Vercel"],
    glow: "shadow-[0_0_40px_rgba(249,115,22,0.25)] border-[#F97316]/40",
  },
  {
    badge: "SHIP 02 · WEEK 12",
    title: "Your Booking Tool",
    description:
      "A working web app where real users can make bookings. It has a real backend. Users can install it on their phone.",
    tags: ["Figma", "AI Build", "Google Sheets"],
    glow: "shadow-[0_0_40px_rgba(108,62,255,0.25)] border-[#A855F7]/40",
  },
];

export function WhatYouShip() {
  return (
    <section
      id="what-you-ship"
      data-particle-shape="figma-logo"
      data-particle-side="right"
      className={ZIGZAG_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div className={PARTICLE_COLUMN_RIGHT} aria-hidden="true" />
      <div className={CONTENT_COLUMN_LEFT}>
        <div className={SECTION_INNER}>
          <ScrollReveal>
            <p className={`${EYEBROW} mb-4`}>WHAT YOU WILL SHIP</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9] mb-12 md:mb-16">
              Two real products.
              <br />
              Both live on the internet.
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 md:gap-8">
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
              Every tool used to build these is free. You will not pay for any
              subscription.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
