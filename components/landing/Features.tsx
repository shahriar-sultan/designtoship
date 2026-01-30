"use client";

import { CTAButton } from "./CTAButton";
import { Lightbulb } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const benefits = [
  "UI/UX ডিজাইনে প্রবেশের জন্য ধাপে ধাপে রোডম্যাপ",
  "আপনার লার্নিং কার্ভ ত্বরান্বিত করবে এমন AI টুলস",
  "আপনার পোর্টফোলিও তৈরি করার জন্য রিয়েল-ওয়ার্ল্ড প্রজেক্টস",
  "ইন্ডাস্ট্রি প্রফেশনালদের সাথে কানেক্ট করার নেটওয়ার্কিং কৌশল",
  "শিখতে শিখতে আয় শুরু করার ফ্রিল্যান্সিং টিপস",
  "টপ ডিজাইন এজেন্সিগুলো যে অ্যাডভান্সড টেকনিক ব্যবহার করে",
];

export function Features() {
  return (
    <section className="relative bg-white py-16 md:py-20 lg:py-24">
      <div className="container mx-auto">
        <div className="max-w-[1200px] mx-auto">
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
                  style={{ color: "#AA5B2F" }}
                >
                  এই ওয়েবিনার কেন করবেন ?
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Main Heading */}
          <ScrollReveal delay={100}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.2] text-center mb-16 max-w-[504px] mx-auto bg-linear-to-br from-[#1F1A17] to-[#D7540D] bg-clip-text text-transparent"
            >
              কিভাবে বুঝবেন এই Webiner আপনার জন্য কিনা?
            </h2>
          </ScrollReveal>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-start">
            {/* Left: Benefits List */}
            <ScrollReveal delay={200} direction="right">
              <div className="space-y-5">
                <h3
                  className="text-xl font-semibold mb-6"
                  style={{ color: "#AE4407" }}
                >
                  এই ওয়েবিনার আপনাকে দেখাবে
                </h3>
                <div className="space-y-5">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className="w-8 h-8 flex-shrink-0 mt-0.5"
                        style={{ color: "#7E7068" }}
                      >
                        <Lightbulb
                          className="w-full h-full"
                          strokeWidth={1.5}
                          fill="currentColor"
                        />
                      </div>
                      <p
                        className="text-base md:text-lg leading-relaxed"
                        style={{ color: "#402617" }}
                      >
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Decorative Card */}
            <ScrollReveal delay={300} direction="left">
              <div
                className="rounded-[40px] h-[534px] flex items-center justify-center"
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
                <div
                  className="text-center opacity-20"
                  style={{ color: "#402617" }}
                >
                  <svg
                    className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  <p className="text-sm">Illustration</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Bottom Text - exact Figma */}
          <ScrollReveal delay={400}>
            <p
              className="text-center mt-16 max-w-[869px] mx-auto text-lg md:text-xl leading-relaxed bg-linear-to-br from-[#1F1A17] to-[#D7540D] bg-clip-text text-transparent font-medium"
            >
              এর একটিও যদি আপনার নাগালের বাইরে থাকে, আপনি যে কোন মুহুর্তে খেই হারাবেন
              এই AI Dominated Ui/UX Design World-এ! আর এই Webiner ঠিক এগুলোই পৌঁছে
              দেবে আপনার হাতের কাছে!
            </p>
          </ScrollReveal>

          {/* Bottom CTA */}
          <ScrollReveal delay={500}>
            <div className="flex justify-center mt-10">
              <CTAButton>রেজিস্ট্রেশন করুন (It&apos;s Free)</CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
