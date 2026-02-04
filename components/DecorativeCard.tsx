"use client";

export function DecorativeCard() {
  return (
    <div className="relative w-full md:max-w-[584px] aspect-584/543 md:min-h-[400px]">
      {/* Blurred angular gradient (Rectangle 7) - behind card */}
      <div
        className="absolute rounded-[20px] opacity-80"
        style={{
          left: "4.3%",
          top: "6.7%",
          width: "90.75%",
          height: "87.5%",
          background:
            "conic-gradient(from 180deg at 50% 50%, #A1C72E 0deg, #CC59FF 72deg, #FE0000 144deg, #FF9600 234deg, #A1C72E 360deg)",
          filter: "blur(80px)",
        }}
      />

      {/* Main card (Frame 1000003279): linear gradient + 3px border */}
      <div
        className="relative w-full h-full rounded-[40px] overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgb(31, 16, 7) 0%, rgb(145, 76, 36) 100%)",
          border: "3px solid rgb(255, 210, 183)",
          boxSizing: "border-box",
        }}
      >
        {/* Center play button (navbar-38) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            style={{
              backgroundColor: "rgba(252, 251, 251, 0.8)",
              boxShadow: "0 9px 33px rgba(151, 114, 93, 0.1)",
            }}
          >
            <svg
              className="relative z-10 w-[26px] h-7 ml-1"
              viewBox="0 0 26 28"
              fill="none"
            >
              <path d="M2 2L24 14L2 26V2Z" fill="rgb(19, 18, 14)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
