"use client";

import { CTAButton } from "./CTAButton";
import { Twitter, Facebook, Instagram } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Footer() {
  return (
    <footer className="relative bg-[#FFF4EF] py-12 md:py-16">
      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[250px] md:h-[346px] bg-linear-to-b from-[#FFF3ED] to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-[1052px] mx-auto">
          {/* Main Heading */}
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-14 space-y-3 md:space-y-4 px-4">
              <h2 className="text-[#402617] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.2]">
                আপনার ডিজাইন যাত্রা শুরু করতে রেডি?
              </h2>
              <p className="text-[#64605D] text-lg md:text-xl lg:text-[22px] leading-relaxed max-w-[826px] mx-auto">
                আমাদের বিস্তারিত AI-augmented design strategies দিয়ে যারা তাদের
                ক্যারিয়ার পরিবর্তন করেছে এমন হাজারো ডিজাইনারদের সাথে যোগ দিন
              </p>
            </div>
          </ScrollReveal>

          {/* CTA Button and Social */}
          <div className="space-y-6 md:space-y-8">
            {/* CTA Button */}
            <ScrollReveal delay={100}>
              <div className="flex justify-center">
                <CTAButton paddingVariant="small">
                  ফ্রি ওয়েবিনারের জন্য রেজিস্টার করুন
                </CTAButton>
              </div>
            </ScrollReveal>

            {/* Social Icons */}
            <ScrollReveal delay={200}>
              <div className="flex justify-center gap-3 md:gap-4">
                {[
                  { icon: Twitter, label: "Twitter" },
                  { icon: Facebook, label: "Facebook" },
                  { icon: Instagram, label: "Instagram" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 md:w-12 md:h-12 bg-[#361F12] hover:bg-[#4A2F1A] rounded-full flex items-center justify-center transition-colors cursor-pointer"
                    aria-label={social.label}
                    style={{
                      boxShadow: "0 12px 30px rgba(77, 43, 23, 0.28)",
                    }}
                  >
                    <social.icon
                      className="w-5 h-5 md:w-6 md:h-6 text-white"
                      strokeWidth={2}
                    />
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Copyright */}
          <ScrollReveal distance={0} delay={300}>
            <div className="text-center mt-8 md:mt-12 px-4">
              <p
                className="text-[#65605B] text-base md:text-[18px]"
                style={{ fontFamily: "var(--font-bengali)" }}
              >
                ©
                {new Intl.DateTimeFormat("bn-BD", {
                  year: "numeric",
                }).format(new Date())}{" "}
                শাহরিয়ার সুলতান। সর্বস্বত্ব সংরক্ষিত।
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </footer>
  );
}
