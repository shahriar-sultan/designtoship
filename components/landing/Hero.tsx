"use client";

import { CTAButton } from "./CTAButton";
import { ScrollReveal } from "@/components/ScrollReveal";
import { DecorativeCard } from "@/components/DecorativeCard";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden min-h-[832px]"
      style={{
        backgroundImage: "url('/svgs/heroBg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto pt-32 md:pt-40 pb-20 md:pb-24 md:px-30 px-4">
        <div className=" mx-auto">
          {/* max-w-[1209px] */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-8 items-center">
            {/* Left Column - Content */}
            <ScrollReveal direction="right">
              <div className="space-y-8 max-w-[593px]">
                {/* Badge */}
                <div className="inline-flex">
                  <div
                    className="rounded-full px-6 py-1.5 inline-flex items-center"
                    style={{
                      backgroundColor: "rgba(25, 23, 21, 0.5)",
                      border: "1px solid rgba(151, 114, 93, 0.59)",
                    }}
                  >
                    <span className="text-[#FFFBF9] text-sm md:text-base font-medium">
                      FREE live webinar with Shahriar Sultan
                    </span>
                  </div>
                </div>

                {/* Heading + Description (Frame 1000003277: vertical, 16px spacing) */}
                <div className="flex flex-col gap-4 max-w-[593px]">
                  <h1
                    className="text-[32px] sm:text-5xl md:text-[48px] font-medium leading-[41px] md:leading-
                  [62px] tracking-[-3%] md:tracking-[3%] max-w-[525px] text-center md:text-left"
                    style={{
                      filter:
                        "drop-shadow(0 -1px 40px rgba(135, 82, 52, 0.61))",
                    }}
                  >
                    <span className="text-[#D7540D] font-bold">AI-</span>
                    <span className="text-white">
                      পাড় কহে ছাড়িয়া নিঃশ্বাস, এই{" "}
                    </span>
                    <span className="text-gradient-custom font-bold">
                      Webiner
                    </span>
                    <span className="text-white">
                      {" "}
                      আপনার লাগি, আমার বিশ্বাস
                    </span>
                  </h1>
                  <p
                    className="text-[#CCCCCC] text-base md:text-[26px] leading-normal md:leading-[39px] 
                  w-full font-hindSiliguri md:tracking-tight tracking-[-1%] text-center md:text-left"
                  >
                    UI/UX ডিজাইন এখন আর শুধু টুলস এর খেলা নেই। Artificial
                    Intelligence has entered the game! তাহলে কি আপনার ছিটকে পড়া
                    নিশ্চিত? না! সময়ের এক ফোঁড়, অসময়ের দশ ফোঁড়! আর এই Webiner-ই
                    হবে আপনার সেই ফোঁড়ের প্রথম সুচ!
                  </p>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <CTAButton
                    title="ওয়েবিনারে আপনার সিট বুক করুন!"
                    subtitle="আপনার ক্যারিয়ারের টার্নিং পয়েন্ট শুরু হোক এখন"
                    href="/register"
                    className="min-h-[82px] py-3 px-6 text-[#FFFEFE] text-base md:text-xl font-siliguri leading-[150%]"
                    style={{
                      background:
                        "linear-gradient(135deg, rgb(255, 150, 0) 0%, rgb(190, 0, 100) 100%)",
                      boxShadow: "0 -1px 40px rgba(135, 82, 52, 0.61)",
                    }}
                  />
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
