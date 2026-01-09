"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Pricing() {
  const t = useTranslations("pricing");

  const credentials = t.raw("credentials") as string[];

  return (
    <section className="relative bg-[#FFF4EF] py-12 md:py-16">
      {/* Gradient Background */}
      <div className="absolute bottom-0 left-0 right-0 h-[400px] md:h-[651px] bg-gradient-to-t from-[#FFF3ED] to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4">
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
            {/* Left: Illustration Card */}
            <ScrollReveal delay={200} direction="right">
              <div 
              className="bg-[#FFF4D4] border-4 md:border-[8px] border-[#FFFCFB] rounded-3xl md:rounded-[40px] h-[400px] md:h-[534px] flex items-center justify-center order-2 lg:order-1"
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
              {/* Placeholder for author image */}
              <div className="text-[#402617]/20 text-center">
                <div className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-400" />
                <p className="text-xs md:text-sm">Shahriar Sultan Photo</p>
              </div>
            </div>
            </ScrollReveal>

            {/* Right: Credentials List */}
            <ScrollReveal delay={300} direction="left">
              <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
              <h3 className="text-[#8F5C3F] text-xl md:text-[24px] font-semibold">
                {t("heading")}
              </h3>
              
              <div className="space-y-4 md:space-y-[18px]">
                {credentials.map((credential, index) => (
                  <div key={index} className="flex items-start gap-3 md:gap-4">
                    <div className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0 text-[#7E7068] mt-1">
                      <ArrowRight className="w-full h-full" strokeWidth={1.5} />
                    </div>
                    <p className="text-[#402617] text-base md:text-lg lg:text-[18px] leading-[1.8]">
                      {credential}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
