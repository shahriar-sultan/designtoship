"use client";

import { CTAButton } from "./CTAButton";
import { Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Benefits() {
  const t = useTranslations("benefits");

  const benefits = t.raw("items") as string[];

  return (
    <section className="relative bg-[#FFF4EF] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-[1200px] mx-auto">
          {/* Section Badge */}
          <ScrollReveal>
            <div className="flex justify-center mb-6 md:mb-8">
              <div 
                className="bg-[#FFF4ED]/50 border border-[#977259]/60 rounded-full px-4 md:px-6 py-[6px] inline-flex items-center"
              >
                <span className="text-[#977259] text-base md:text-[18px] font-medium">
                  {t("badge")}
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Main Heading */}
          <ScrollReveal delay={100}>
            <div className="max-w-[1052px] mx-auto text-center mb-8 md:mb-12 space-y-3 md:space-y-4 px-4">
              <h2 className="text-[#402617] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.2]">
                {t("title")}
              </h2>
              <p className="text-[#64605D] text-lg md:text-xl lg:text-[22px]">
                {t("subtitle")}
              </p>
            </div>
          </ScrollReveal>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center mt-8 md:mt-12">
            {/* Left: Benefits List */}
            <ScrollReveal delay={200} direction="right">
              <div className="space-y-6 md:space-y-8">
              <h3 className="text-[#8F5C3F] text-xl md:text-[24px] font-semibold">
                {t("heading")}
              </h3>
              
              <div className="space-y-4 md:space-y-5">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 md:gap-4">
                    <div className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0 text-[#7E7068] mt-1">
                      <Lightbulb className="w-full h-full" strokeWidth={1.5} />
                    </div>
                    <p className="text-[#402617] text-base md:text-lg lg:text-[20px] leading-[1.75]">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            </ScrollReveal>

            {/* Right: Illustration Card */}
            <ScrollReveal delay={300} direction="left">
              <div 
              className="bg-[#FFF4D4] border-4 md:border-[8px] border-[#FFFCFB] rounded-3xl md:rounded-[40px] h-[400px] md:h-[534px] flex items-center justify-center"
              style={{
                boxShadow: `
                  2px -3px 8px rgba(228, 220, 216, 0.64),
                  8px -12px 14px rgba(228, 220, 216, 0.55),
                  18px -27px 19px rgba(228, 220, 216, 0.33),
                  32px -48px 23px rgba(228, 220, 216, 0.1),
                  50px -75px 25px rgba(228, 220, 216, 0.01)
                `,
              }}
            >
              {/* Placeholder for illustration */}
              <div className="text-[#402617]/20 text-center">
                <svg className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                <p className="text-xs md:text-sm">Illustration Placeholder</p>
              </div>
            </div>
            </ScrollReveal>
          </div>

          {/* Bottom CTA */}
          <ScrollReveal delay={400}>
            <div className="flex justify-center mt-10 md:mt-14">
              <CTAButton>
                {t("cta")}
              </CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
