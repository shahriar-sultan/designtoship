"use client";

import { CTAButton } from "./CTAButton";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GridPattern } from "@/components/GridPattern";
import { NoiseTexture } from "@/components/NoiseTexture";
import { AnimatedBlobs } from "@/components/AnimatedBlobs";
import { DecorativeCard } from "@/components/DecorativeCard";

export function Hero() {
  return (
    <section className="relative bg-[#1A110C] overflow-hidden min-h-[832px]">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <GridPattern />
        <NoiseTexture />
        <AnimatedBlobs />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 md:pt-40 pb-20 md:pb-24">
        <div className="max-w-[1209px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-8 items-center">
            {/* Left Column - Content */}
            <ScrollReveal direction="right">
              <div className="space-y-8 max-w-[593px]">
                {/* Badge */}
                <div className="inline-flex">
                  <div
                    className="rounded-full px-6 py-2 inline-flex items-center"
                    style={{
                      backgroundColor: "rgba(25, 23, 21, 0.5)",
                      border: "1px solid rgba(151, 114, 89, 0.59)",
                    }}
                  >
                    <span className="text-[#FCFBF9] text-sm md:text-base font-medium">
                      FREE live webinar with Shahriar Sultan
                    </span>
                  </div>
                </div>

                {/* Main Heading - exact Figma text with gradient */}
                <div className="space-y-4">
                  <h1
                    className="text-4xl sm:text-5xl md:text-[56px] font-bold leading-[1.15] tracking-tight max-w-[525px] bg-linear-to-br from-[#1F1A17] via-[#D7540D] to-[#D7540D] bg-clip-text text-transparent"
                    style={{
                      filter: "drop-shadow(0 -1px 40px rgba(135, 82, 52, 0.61))",
                    }}
                  >
                    AI-পাড় কহে ছাড়িয়া নিঃশ্বাস, এই Webiner আপনার লাগি, আমার বিশ্বাস
                  </h1>
                </div>

                {/* Description - exact Figma text */}
                <p className="text-[#CCCCCC] text-base md:text-lg leading-relaxed">
                  UI/UX ডিজাইন এখন আর শুধু টুলস এর খেলা নেই। Artificial Intelligence
                  has entered the game! তাহলে কি আপনার ছিটকে পড়া নিশ্চিত? না! সময়ের
                  এক ফোঁড়, অসময়ের দশ ফোঁড়! আর এই Webiner-ই হবে আপনার সেই ফোঁড়ের প্রথম
                  সুচ!
                </p>

                {/* CTA Button - exact Figma text */}
                <div className="pt-2">
                  <CTAButton paddingVariant="medium">
                    আপনার ক্যারিয়ারের টার্নিং পয়েন্ট শুরু হোক এখন ওয়েবিনারে আপনার সিট বুক করুন!
                  </CTAButton>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column - Decorative Card */}
            <ScrollReveal delay={200} direction="left">
              <div className="flex justify-center lg:justify-end">
                <DecorativeCard />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
