"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { Twitter, Youtube, Linkedin } from "lucide-react";

const socials = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

export function Footer() {
  return (
    <footer
      className="relative py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "#1A110C" }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-[1052px] mx-auto">
          {/* Main Heading */}
          <ScrollReveal>
            <div className="text-center mb-10 space-y-6">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.2]"
                style={{ color: "#FFE8D9" }}
              >
                কথা বলুন, প্রশ্ন করুন, বা পরবর্তী গাইডলাইন নিন, আমরা আছি আপনার
                পাশে।
              </h2>
              <p
                className="text-lg md:text-xl leading-relaxed max-w-[826px] mx-auto"
                style={{ color: "#CBCCCC" }}
              >
                ডিজাইন বা AI শেখার যাত্রায় কেউ একা এগোতে পারে না। আপনার যেকোনো
                প্রশ্ন, পরামর্শ বা কোর্স সংক্রান্ত সহায়তার জন্য আমাদের সাথে
                যোগাযোগ করুন।
              </p>
            </div>
          </ScrollReveal>

          {/* Social Icons */}
          <ScrollReveal delay={100}>
            <div className="flex justify-center gap-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="relative w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                  aria-label={social.label}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, #FF9600 0%, #BE0064 100%)",
                      boxShadow: "0 12px 30px rgba(77, 43, 23, 0.28)",
                    }}
                  />
                  <social.icon
                    className="relative z-10 w-6 h-6 text-white"
                    strokeWidth={2}
                  />
                </a>
              ))}
            </div>
          </ScrollReveal>

          {/* Copyright */}
          <ScrollReveal delay={200}>
            <div className="text-center mt-10">
              <p
                className="text-base"
                style={{ color: "#949494" }}
              >
                © {new Date().getFullYear()} Shahriar Sultan. All rights reserved.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </footer>
  );
}
