"use client";

import { useRouter } from "next/navigation";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GRADIENT_TEXT } from "./constants";

export function Footer() {
  const router = useRouter();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      data-particle-shape="dispersing-pulse"
      data-particle-side="center"
      className="relative z-10 w-full bg-[#080C14] py-12 px-6"
    >
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 py-4 border-t border-[#1C2740]">
            <div>
              <p className={`text-lg font-bold ${GRADIENT_TEXT}`}>
                Design & Ship with AI
              </p>
              <p className="text-[#475569] text-sm mt-1">Batch 4 · 2026</p>
            </div>

            <nav className="flex items-center gap-6 text-sm">
              <button
                type="button"
                onClick={() => scrollTo("curriculum")}
                className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors cursor-pointer"
              >
                Curriculum
              </button>
              <button
                type="button"
                onClick={() => scrollTo("pricing")}
                className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors cursor-pointer"
              >
                Pricing
              </button>
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </nav>
          </div>
        </ScrollReveal>

        <p className="text-center text-[#475569] text-sm pt-4 border-t border-[#1C2740]">
          © 2026 Shahriar Sultan · The Design Workbench
        </p>
      </div>
    </footer>
  );
}
