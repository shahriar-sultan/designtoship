"use client";

import { useRouter } from "next/navigation";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  GRADIENT_TEXT,
  CENTERED_SECTION_VIGNETTE,
} from "./constants";

export function Footer() {
  const router = useRouter();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      data-particle-shape="stellar-nebula"
      className="relative z-10 w-full py-12 px-6"
      style={{ background: "transparent" }}
    >
      <div
        className="relative z-10 max-w-2xl mx-auto px-8 py-12 text-center"
        style={{ background: CENTERED_SECTION_VIGNETTE }}
      >
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 py-4 border-t border-[#1C2740]">
            <div>
              <p className={`text-lg font-bold ${GRADIENT_TEXT}`}>
                Design & Ship with AI
              </p>
              <p className="text-[#475569] text-sm mt-1">Batch 4 · 2026</p>
            </div>

            <nav className="flex items-center justify-center gap-6 text-sm">
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
