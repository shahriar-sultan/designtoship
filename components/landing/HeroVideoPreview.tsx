"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { HERO_VIDEO_ID } from "./constants";

type HeroVideoPreviewProps = {
  label: string;
  className?: string;
};

export function HeroVideoPreview({ label, className }: HeroVideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = `https://www.youtube.com/embed/${HERO_VIDEO_ID}?autoplay=1&rel=0`;
  const thumbnailUrl = `https://i.ytimg.com/vi/${HERO_VIDEO_ID}/hqdefault.jpg`;

  return (
    <div className={cn("relative w-full max-w-3xl mx-auto", className)}>
      <div
        aria-hidden="true"
        className="absolute -inset-1 rounded-[1.25rem] bg-gradient-to-r from-[#6C3EFF]/30 via-[#A855F7]/25 to-[#22D3EE]/30 blur-md opacity-80"
      />

      <div className="relative rounded-2xl bg-gradient-to-r from-[#6C3EFF] via-[#A855F7] to-[#22D3EE] p-[2px] shadow-[0_20px_60px_-20px_rgba(108,62,255,0.35)]">
        <div className="relative overflow-hidden rounded-[0.9375rem] bg-[#0F1520]">
          {isPlaying ? (
            <div className="aspect-video w-full">
              <iframe
                src={embedUrl}
                title={label}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="group relative block aspect-video w-full cursor-pointer"
              aria-label={label}
            >
              <img
                src={thumbnailUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-[#080C14]/55 transition-colors duration-300 group-hover:bg-[#080C14]/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#6C3EFF] via-[#A855F7] to-[#22D3EE] shadow-lg shadow-[#6C3EFF]/30 transition-transform duration-300 group-hover:scale-110 md:h-[4.5rem] md:w-[4.5rem]">
                  <Play className="ml-1 h-7 w-7 fill-white text-white md:h-8 md:w-8" />
                </span>
                <span className="text-sm font-medium text-[#F1F5F9] md:text-base">
                  {label}
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
