"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import {
  EYEBROW,
  CENTERED_SECTION_ROOT,
  CENTERED_SECTION_CONTENT,
  CENTERED_SECTION_VIGNETTE,
} from "./constants";

const tools = [
  { name: "Figma", description: "Design your products" },
  { name: "VS Code", description: "Your coding environment" },
  {
    name: "Gemini Code Assist",
    description: "AI that builds for you (free, no limits)",
  },
  { name: "GitHub", description: "Save and manage your work" },
  { name: "Vercel", description: "Deploy your website live" },
  { name: "Google Sheets", description: "Your app's backend" },
];

export function ToolStack() {
  return (
    <section
      id="tools"
      data-particle-shape="milky-way"
      className={CENTERED_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div
        className={CENTERED_SECTION_CONTENT}
        style={{ background: CENTERED_SECTION_VIGNETTE }}
      >
        <ScrollReveal>
          <p className={`${EYEBROW} mb-4`}>YOUR TOOLS</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9]">
            Everything is free.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="text-[#94A3B8] text-xl md:text-2xl mt-4 mb-10 md:mb-14">
            You will not pay for any tool to complete this course and ship both
            products.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-4 md:gap-6 text-left">
          {tools.map((tool, index) => (
            <ScrollReveal key={tool.name} delay={100 + index * 60}>
              <div className="rounded-2xl border border-[#1C2740] bg-[#0F1520] p-5 md:p-6 h-full">
                <h3 className="text-base md:text-lg font-semibold text-[#F1F5F9] mb-2">
                  {tool.name}
                </h3>
                <p className="text-[#94A3B8] text-base leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <p className="text-center text-[#475569] text-base mt-10">
            Optional: One month of Cursor Pro (BDT 2,500) during build weeks. Never
            required.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
