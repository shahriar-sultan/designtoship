"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

export function Pricing() {
  return (
    <section className="relative bg-white py-16 md:py-20 lg:py-24">
      {/* Bottom Gradient - exact Figma */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[346px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(255, 244, 237, 1) 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      />

      <div className="relative z-10 container mx-auto">
        <div className="max-w-[1092px] mx-auto">
          {/* Main Heading - gradient */}
          <ScrollReveal>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.2] text-center mb-6 max-w-[692px] mx-auto bg-linear-to-br from-[#1F1A17] to-[#D7540D] bg-clip-text text-transparent"
            >
              নিজের উপর Investment সবচেয়ে লাভজনক Investment
            </h2>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal delay={100}>
            <p
              className="text-center mb-12 max-w-[734px] mx-auto text-lg leading-relaxed"
              style={{ color: "#64605D" }}
            >
              এখন সময় এসেছে নিজের উপর invest করার, আপনার দক্ষতাকে কয়েক ধাপ এগিয়ে
              নেওয়ার। তাহলে আর দেরি কিসে?
            </p>
          </ScrollReveal>

          {/* Large Card */}
          <ScrollReveal delay={200}>
            <div
              className="rounded-[40px] h-[516px] flex items-center justify-center"
              style={{
                backgroundColor: "#FFF4D4",
                border: "8px solid #FFFCFB",
                boxShadow: `
                  2px -3px 8px rgba(228, 220, 216, 0.64),
                  8px -12px 14px rgba(228, 220, 216, 0.55),
                  18px -27px 19px rgba(228, 220, 216, 0.33),
                  32px -48px 23px rgba(228, 220, 216, 0.1),
                  50px -75px 25px rgba(228, 220, 216, 0.01)
                `,
              }}
            >
              <p
                className="text-xl font-medium"
                style={{ color: "#402617" }}
              >
                Illustration here
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
