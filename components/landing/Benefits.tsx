"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

export function Benefits() {
  return (
    <section className="relative bg-white py-16 md:py-20 lg:py-24 min-h-[631px]">
      {/* Bottom Gradient - exact Figma */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[651px] pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(255, 244, 237, 1) 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-[832px] mx-auto py-12 md:py-16">
          {/* Section Badge */}
          <ScrollReveal>
            <div className="flex justify-center mb-8">
              <div
                className="rounded-full px-6 py-2 inline-flex items-center"
                style={{
                  backgroundColor: "rgba(255, 244, 237, 0.5)",
                  border: "1px solid rgba(151, 114, 89, 0.59)",
                }}
              >
                <span
                  className="text-base font-medium"
                  style={{ color: "#AB5C2F" }}
                >
                  কেন এই Webiner?
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Main Heading - gradient from Figma */}
          <ScrollReveal delay={100}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.2] text-center mb-8 max-w-[832px] mx-auto bg-linear-to-br from-[#1F1A17] to-[#D7540D] bg-clip-text text-transparent"
            >
              AI আপনার জায়গা তখনই কেড়ে নেবে যখন আপনি তাকে জায়গা করে দেবেন
            </h2>
          </ScrollReveal>

          {/* Body text - exact Figma */}
          <ScrollReveal delay={200}>
            <p className="text-[#402617] text-base md:text-lg leading-relaxed text-center max-w-[832px] mx-auto">
              This Webiner is all about telling you how stop that from happening!
              আমরা জানাবো আপনাকে কিভাবে AI-কে Assistant বানাবেন, Boss নয়! &quot;Miss
              this, and you&apos;ll learn it later—when others are already ahead.&quot;
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
