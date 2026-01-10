"use client";

import { CTAButton } from "./CTAButton";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative bg-[#FFF4EF] overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left Vector */}
        <svg
          className="absolute left-0 top-0 h-[1152px] w-[528px]"
          viewBox="0 0 528 1152"
          fill="none"
        >
          <path d="M0 0H528V829L0 1152V0Z" fill="#FFF4EF" />
        </svg>
        {/* Right Vector */}
        <svg
          className="absolute right-0 top-0 h-[1105px] w-[672px]"
          viewBox="0 0 672 1105"
          fill="none"
        >
          <path d="M0 0H672V1105H0V0Z" fill="#FFF4EF" />
        </svg>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[651px] bg-linear-to-t from-[#FFF3ED] to-transparent pointer-events-none" />

      {/* Navbar */}
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pt-16 md:pt-24 lg:pt-[140px] pb-12 md:pb-20">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col items-center text-center space-y-10 md:space-y-14">
            {/* Top Section with Badge and Heading */}
            <ScrollReveal>
              <div className="max-w-[953px] space-y-6 md:space-y-8">
                {/* Badge */}
                <div className="flex justify-center">
                  <div className="bg-[#FFF4ED]/50 border border-[#977259]/60 rounded-full px-4 md:px-6 py-1 md:py-[6px] inline-flex items-center">
                    <span className="text-[#402617] text-sm md:text-[16px] font-medium">
                      {t("badge")}
                    </span>
                  </div>
                </div>

                {/* Main Heading and Subheading */}
                <div className="space-y-3 md:space-y-4">
                  <h1 className="text-[#402617] text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold leading-[1.1] tracking-tight px-4">
                    {t("title")}
                  </h1>
                  <p className="text-[#595756] text-base md:text-xl lg:text-[24px] leading-[1.75] px-4">
                    {t("subtitle")}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Hero Card with CTA */}
            <ScrollReveal delay={200} className="w-full">
              <div
                className="bg-[#FFF4D4] border-4 md:border-8 border-[#FFFCFB] rounded-3xl md:rounded-[40px] p-8 md:p-12 lg:p-16 max-w-[1100px] w-full md:h-[534px] flex items-center justify-center"
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
                {/* Play Icon */}
                <div className="flex justify-center mb-8 md:mb-14 overflow-visible">
                  <div
                    className="relative w-16 h-16 md:w-20 md:h-20 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      boxShadow: "0 9px 33px rgba(151, 114, 93, 0.1)",
                    }}
                  >
                    {/* Floating waves */}
                    <span className="play-button-wave" />
                    <span className="play-button-wave" />
                    <span className="play-button-wave" />
                    <svg
                      className="relative z-10 w-6 h-7 md:w-[26px] md:h-[28px]"
                      viewBox="0 0 26 28"
                      fill="none"
                    >
                      <path d="M2 2L24 14L2 26V2Z" fill="#403B2E" />
                    </svg>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
          {/* CTA Button */}
          <ScrollReveal delay={400}>
            <div className="flex justify-center mt-14">
              <CTAButton paddingVariant="medium">{t("cta")}</CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
