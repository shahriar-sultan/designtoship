"use client";

export function DecorativeCard() {
  return (
    <div className="relative w-full max-w-[584px] h-[400px] md:h-[448px]">
      {/* Outer glow effect */}
      <div className="absolute -inset-4 bg-linear-to-br from-[#FF9600]/20 via-[#BE0064]/10 to-transparent rounded-[40px] blur-2xl opacity-50" />

      {/* Gradient border wrapper */}
      <div className="relative rounded-[32px] p-[2px] bg-linear-to-br from-[#FF9600]/40 via-[#BE0064]/20 to-transparent">
        {/* Inner card */}
        <div className="w-full h-full rounded-[32px] bg-[#1A110C] border border-white/5 backdrop-blur-xl overflow-hidden">
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-30">
            <svg width="100%" height="100%">
              <defs>
                <pattern
                  id="decorative-grid"
                  width="30"
                  height="30"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 30 0 L 0 0 0 30"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#decorative-grid)" />
            </svg>
          </div>

          {/* Center play button (optional) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform group"
              style={{
                boxShadow: "0 9px 33px rgba(255, 150, 0, 0.2)",
              }}
            >
              {/* Floating waves */}
              <span className="play-button-wave-alt" />
              <span className="play-button-wave-alt" />
              <span className="play-button-wave-alt" />
              <svg
                className="relative z-10 w-6 h-7 md:w-[26px] md:h-[28px] ml-1"
                viewBox="0 0 26 28"
                fill="none"
              >
                <path d="M2 2L24 14L2 26V2Z" fill="white" />
              </svg>
            </div>
          </div>

          {/* Gradient overlay effects */}
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-linear-to-br from-[#FF9600]/10 to-transparent rounded-tl-[32px]" />
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-linear-to-tl from-[#BE0064]/10 to-transparent rounded-br-[32px]" />
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#FF9600]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-[#BE0064]/20 rounded-full blur-2xl animate-pulse pointer-events-none" />
    </div>
  );
}
