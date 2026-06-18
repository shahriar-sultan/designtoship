import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Design To Ship — From basics to building your AI Augmented UI/UX design career. Batch 4 enrollment open.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const BG = "#ffffff";
const BG_ALT = "#f8fafc";
const BORDER = "#e2e8f0";
const TEXT_PRIMARY = "#0f172a";
const TEXT_SECONDARY = "#475569";
const ACCENT = "#f97316";
const GRADIENT_FROM = "#fb923c";
const GRADIENT_TO = "#ea580c";

const STATS = [
  { value: "78+", label: "Hours live class" },
  { value: "13", label: "Weeks" },
  { value: "2", label: "Live classes / week" },
];

async function loadFont(weight: 600 | 700) {
  const url =
    weight === 700
      ? "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZJhiI2Bo.ttf"
      : "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZJhiI2Bo.ttf";

  const response = await fetch(url);
  return response.arrayBuffer();
}

export default async function OpenGraphImage() {
  const [fontSemiBold, fontBold] = await Promise.all([
    loadFont(600),
    loadFont(700),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: BG,
          position: "relative",
          overflow: "hidden",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, rgba(249,115,22,0.08) 0%, rgba(255,255,255,0) 42%), radial-gradient(circle at 88% 12%, rgba(251,146,60,0.14) 0%, transparent 34%), radial-gradient(circle at 10% 88%, rgba(234,88,12,0.08) 0%, transparent 38%)`,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 120% 90% at 50% 50%, rgba(255,255,255,0.92) 0%, rgba(248,250,252,0.55) 55%, rgba(255,255,255,0.2) 100%)`,
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "52px 72px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 28,
            }}
          >
            <svg width="44" height="44" viewBox="0 0 512 512">
              <defs>
                <radialGradient id="og-bg" cx="50%" cy="50%" r="72%">
                  <stop offset="0%" stopColor="#FFF7ED" />
                  <stop offset="100%" stopColor="#FFEDD5" />
                </radialGradient>
                <linearGradient id="og-glow" x1="50%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stopColor="#EA580C" stopOpacity="0.55" />
                  <stop offset="50%" stopColor="#F97316" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#FB923C" stopOpacity="0.9" />
                </linearGradient>
                <radialGradient id="og-tipGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="512" height="512" rx="112" fill="url(#og-bg)" />
              <polygon
                points="256,96 384,392 128,392"
                fill="url(#og-glow)"
                opacity="0.85"
              />
              <circle cx="256" cy="150" r="60" fill="url(#og-tipGlow)" />
              <circle cx="256" cy="146" r="18" fill="#FFEDD5" />
              <circle cx="256" cy="186" r="13" fill="#FDBA74" />
              <circle cx="222" cy="218" r="13" fill="#FB923C" />
              <circle cx="290" cy="218" r="13" fill="#FB923C" />
              <circle cx="192" cy="262" r="13" fill="#F97316" />
              <circle cx="320" cy="262" r="13" fill="#F97316" />
            </svg>
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: TEXT_PRIMARY,
              }}
            >
              Design To Ship
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 18px",
              borderRadius: 999,
              border: `1px solid rgba(249,115,22,0.2)`,
              background: "rgba(249,115,22,0.1)",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 28,
            }}
          >
            BATCH 4 · ENROLLMENT OPEN
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.08,
              color: TEXT_PRIMARY,
              letterSpacing: "-0.03em",
              marginBottom: 24,
              maxWidth: 980,
            }}
          >
            <span>From basics to building your</span>
            <span
              style={{
                background: `linear-gradient(90deg, ${GRADIENT_FROM} 0%, ${GRADIENT_TO} 100%)`,
                color: GRADIENT_TO,
              }}
            >
              AI Augmented UI/UX design career
            </span>
          </div>

          <div
            style={{
              fontSize: 24,
              lineHeight: 1.45,
              color: TEXT_SECONDARY,
              maxWidth: 920,
              marginBottom: 36,
            }}
          >
            Learn in Bangla from absolute zero, guided by a senior designer, and
            use AI to design faster and smarter.
          </div>

          <div
            style={{
              display: "flex",
              gap: 16,
              width: "100%",
              maxWidth: 920,
              justifyContent: "center",
            }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  flex: 1,
                  padding: "18px 22px",
                  borderRadius: 18,
                  border: `1px solid ${BORDER}`,
                  background: BG_ALT,
                }}
              >
                <span
                  style={{
                    fontSize: 34,
                    fontWeight: 700,
                    background: `linear-gradient(90deg, ${GRADIENT_FROM} 0%, ${GRADIENT_TO} 100%)`,
                    color: GRADIENT_TO,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: 18,
                    color: TEXT_SECONDARY,
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: fontSemiBold,
          weight: 600,
          style: "normal",
        },
        {
          name: "Inter",
          data: fontBold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
