"use client";

import { useEffect, useRef, useState } from "react";
import { LandingButton } from "./LandingButton";
import { GRADIENT_TEXT } from "./constants";

interface InterstitialProps {
  shape: string;
  copy: string;
  subCopy?: string;
  subCopyGradient?: boolean;
  showCta?: boolean;
}

export function Interstitial({
  shape,
  copy,
  subCopy,
  subCopyGradient = false,
  showCta = false,
}: InterstitialProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-particle-shape={shape}
      data-particle-side="center"
      data-interstitial="true"
      className="relative flex flex-col items-center justify-center min-h-screen px-6"
      style={{ background: "transparent" }}
    >
      <div
        className="relative z-10 text-center px-8 max-w-4xl transition-opacity duration-[400ms]"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <h2
          className={`text-3xl md:text-5xl lg:text-7xl font-bold leading-tight ${GRADIENT_TEXT}`}
        >
          {copy}
        </h2>
        {subCopy && (
          <p
            className={
              subCopyGradient
                ? `mt-4 text-3xl md:text-5xl lg:text-7xl font-bold leading-tight ${GRADIENT_TEXT}`
                : "mt-4 text-base md:text-lg text-slate-400"
            }
          >
            {subCopy}
          </p>
        )}
        {showCta && (
          <div className="mt-6 md:mt-8">
            <LandingButton className="text-base md:text-lg px-10 py-4">
              Apply for Batch 4
            </LandingButton>
          </div>
        )}
      </div>
    </div>
  );
}
