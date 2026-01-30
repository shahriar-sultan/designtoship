"use client";

export function AnimatedBlobs() {
  return (
    <>
      {/* Orange blob - top right */}
      <div
        className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#FF9600]/20 rounded-full blur-[100px] animate-pulse pointer-events-none"
        style={{
          animation: "pulse 8s ease-in-out infinite",
        }}
      />

      {/* Purple blob - bottom left */}
      <div
        className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-[#BE0064]/15 rounded-full blur-[80px] animate-pulse pointer-events-none"
        style={{
          animation: "pulse 10s ease-in-out infinite",
          animationDelay: "2s",
        }}
      />

      {/* Additional brown blob - center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#977259]/10 rounded-full blur-[120px] animate-pulse pointer-events-none"
        style={{
          animation: "pulse 12s ease-in-out infinite",
          animationDelay: "4s",
        }}
      />
    </>
  );
}
