import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Design To Ship — Learn Design. Build Real Products. Batch 4 enrollment open.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const BG = "#080C14";
const SURFACE = "#0F1520";
const BORDER = "#1C2740";
const TEXT_PRIMARY = "#F1F5F9";
const TEXT_SECONDARY = "#94A3B8";

const NEBULA_DOTS = [
  { x: 80, y: 90, r: 3, color: "#6C3EFF", opacity: 0.9 },
  { x: 160, y: 140, r: 2, color: "#A855F7", opacity: 0.8 },
  { x: 240, y: 70, r: 4, color: "#22D3EE", opacity: 0.85 },
  { x: 980, y: 110, r: 3, color: "#6366F1", opacity: 0.75 },
  { x: 1060, y: 180, r: 2, color: "#A855F7", opacity: 0.7 },
  { x: 1120, y: 90, r: 3, color: "#22D3EE", opacity: 0.8 },
  { x: 120, y: 520, r: 2, color: "#7C3AED", opacity: 0.65 },
  { x: 1080, y: 500, r: 3, color: "#4F46E5", opacity: 0.7 },
  { x: 600, y: 40, r: 2, color: "#BAE6FD", opacity: 0.6 },
  { x: 520, y: 580, r: 2, color: "#67E8F9", opacity: 0.55 },
  { x: 900, y: 420, r: 2, color: "#C084FC", opacity: 0.6 },
  { x: 300, y: 460, r: 3, color: "#22D3EE", opacity: 0.5 },
  { x: 760, y: 120, r: 2, color: "#E0F2FE", opacity: 0.55 },
  { x: 420, y: 180, r: 2, color: "#8B5CF6", opacity: 0.65 },
  { x: 860, y: 560, r: 2, color: "#6366F1", opacity: 0.5 },
];

const STATS = [
  { value: "78+", label: "Hours Live" },
  { value: "2", label: "Projects Shipped" },
  { value: "2", label: "Figma projects" },
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
            background:
              "radial-gradient(circle at 18% 22%, rgba(108,62,255,0.35) 0%, transparent 42%), radial-gradient(circle at 82% 18%, rgba(34,211,238,0.28) 0%, transparent 38%), radial-gradient(circle at 72% 78%, rgba(168,85,247,0.22) 0%, transparent 40%), radial-gradient(circle at 28% 72%, rgba(79,70,229,0.18) 0%, transparent 36%)",
          }}
        />

        {NEBULA_DOTS.map((dot) => (
          <div
            key={`${dot.x}-${dot.y}`}
            style={{
              position: "absolute",
              left: dot.x,
              top: dot.y,
              width: dot.r * 2,
              height: dot.r * 2,
              borderRadius: "50%",
              background: dot.color,
              opacity: dot.opacity,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 100% 85% at 50% 50%, rgba(8,12,20,0.65) 0%, rgba(8,12,20,0.38) 50%, rgba(8,12,20,0.12) 80%, transparent 100%)",
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
            padding: "48px 72px",
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
                  <stop offset="0%" stopColor="#101A38" />
                  <stop offset="100%" stopColor="#080C14" />
                </radialGradient>
                <linearGradient id="og-glow" x1="50%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.55" />
                  <stop offset="50%" stopColor="#A855F7" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <rect width="512" height="512" rx="112" fill="url(#og-bg)" />
              <polygon
                points="256,96 384,392 128,392"
                fill="url(#og-glow)"
                opacity="0.7"
              />
              <circle cx="256" cy="146" r="18" fill="#E0F2FE" />
              <circle cx="256" cy="186" r="13" fill="#BAE6FD" />
              <circle cx="222" cy="218" r="13" fill="#22D3EE" />
              <circle cx="290" cy="218" r="13" fill="#22D3EE" />
              <circle cx="192" cy="262" r="13" fill="#A855F7" />
              <circle cx="320" cy="262" r="13" fill="#A855F7" />
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
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              background: "linear-gradient(90deg, #6C3EFF 0%, #A855F7 50%, #22D3EE 100%)",
              color: "#A855F7",
              marginBottom: 24,
            }}
          >
            BATCH 4 · ENROLLMENT OPEN
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              color: TEXT_PRIMARY,
              letterSpacing: "-0.03em",
              marginBottom: 24,
            }}
          >
            <span>Learn Design.</span>
            <span>Build Real Products.</span>
          </div>

          <div
            style={{
              fontSize: 26,
              lineHeight: 1.45,
              color: TEXT_SECONDARY,
              maxWidth: 900,
              marginBottom: 18,
            }}
          >
            A 3-month live program where you start from zero and finish with two
            real products live on the internet.
          </div>

          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: TEXT_PRIMARY,
              marginBottom: 36,
            }}
          >
            13 weeks · 2 live classes per week · 78+ hours with a senior designer
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
                  background: "rgba(15, 21, 32, 0.82)",
                }}
              >
                <span
                  style={{
                    fontSize: 34,
                    fontWeight: 700,
                    background:
                      "linear-gradient(90deg, #6C3EFF 0%, #A855F7 50%, #22D3EE 100%)",
                    color: "#A855F7",
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
