"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { LandingButton } from "./LandingButton";
import { EYEBROW } from "./constants";

const stats = [
  { value: "78+", label: "Hours Live" },
  { value: "2", label: "Projects Shipped" },
  { value: "1", label: "Senior Designer" },
];

export function Hero() {
  const scrollToWhatYouShip = () => {
    document.getElementById("what-you-ship")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      data-particle-shape="scattered-cloud"
      data-particle-side="center"
      className="relative z-10 min-h-screen"
      style={{ background: "transparent" }}
    >
      <div className="flex flex-col items-center justify-center text-center min-h-screen px-6 pt-16 pb-16">
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-4xl py-12 px-6"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(8,12,20,0.75) 0%, rgba(8,12,20,0.4) 60%, transparent 100%)",
          }}
        >
          <div className="space-y-8 w-full">
            <ScrollReveal>
              <p className={EYEBROW}>BATCH 4 · ENROLLMENT OPEN</p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F1F5F9] leading-[1.05]">
                Learn Design.
                <br />
                Build Real Products.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-xl md:text-2xl text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
                A 3-month live program where you start from zero and finish with
                two real products live on the internet. Products you designed.
                Products you built.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <p className="text-base text-[#475569]">
                13 weeks · 2 live classes per week · 78+ hours with a senior
                designer
              </p>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <LandingButton>Apply for Batch 4</LandingButton>
                <button
                  type="button"
                  onClick={scrollToWhatYouShip}
                  className="text-[#94A3B8] hover:text-[#F1F5F9] text-base font-medium transition-colors cursor-pointer"
                >
                  See what you will build →
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={500}>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 pt-4 max-w-3xl mx-auto">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-[#1C2740] bg-[#0F1520]/80 p-5 md:p-6"
                  >
                    <p className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-[#6C3EFF] via-[#A855F7] to-[#22D3EE] bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-[#94A3B8] mt-1 text-base">{stat.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
