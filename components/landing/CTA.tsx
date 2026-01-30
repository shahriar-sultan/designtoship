"use client";

import { CTAButton } from "./CTAButton";
import { ScrollReveal } from "@/components/ScrollReveal";

export function CTA() {
  return (
    <section className="relative bg-white py-16 md:py-20 lg:py-24">
      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-linear-to-b from-[#FFF4ED] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-[1052px] mx-auto">
          {/* Main Heading */}
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-14 space-y-4 md:space-y-6 px-4">
              <h2 className="text-[#402617] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.2]">
                আপনার ডিজাইন যাত্রা শুরু করতে রেডি?
              </h2>
              <p className="text-[#64605D] text-lg md:text-xl lg:text-[22px] leading-relaxed max-w-[826px] mx-auto">
                আমাদের বিস্তারিত AI-augmented design strategies দিয়ে যারা তাদের ক্যারিয়ার পরিবর্তন করেছে এমন হাজারো ডিজাইনারদের সাথে যোগ দিন
              </p>
            </div>
          </ScrollReveal>

          {/* CTA Button */}
          <ScrollReveal delay={100}>
            <div className="flex justify-center">
              <CTAButton paddingVariant="small">
                ফ্রি ওয়েবিনারের জন্য রেজিস্টার করুন
              </CTAButton>
            </div>
          </ScrollReveal>

          {/* Additional Info */}
          <ScrollReveal delay={200}>
            <div className="text-center mt-8 md:mt-12 px-4">
              <p className="text-[#64605D] text-base md:text-lg">
                ⏰ সীমিত Seat Available | 🎁 Completely Free | 💯 No Hidden Charges
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
