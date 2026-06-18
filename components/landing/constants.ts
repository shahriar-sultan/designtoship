export const LANDING = {
  bg: "var(--landing-bg)",
  bgAlt: "var(--landing-bg-alt)",
  surface: "var(--landing-surface)",
  border: "var(--landing-border)",
  textPrimary: "var(--landing-text-primary)",
  textSecondary: "var(--landing-text-secondary)",
  accent: "var(--landing-accent)",
  accentHover: "var(--landing-accent-hover)",
  gradientFrom: "var(--landing-gradient-from)",
  gradientTo: "var(--landing-gradient-to)",
} as const;

export const GRADIENT_TEXT =
  "bg-gradient-to-r from-landing-gradient-from to-landing-gradient-to bg-clip-text text-transparent";

export const EYEBROW_PILL =
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-landing-accent bg-landing-accent/10 border border-landing-accent/15";

export const EYEBROW =
  "text-sm uppercase tracking-widest font-semibold bg-gradient-to-r from-landing-gradient-from to-landing-gradient-to bg-clip-text text-transparent";

/** Standard vertical rhythm for every top-level landing section — tune here. */
export const SECTION_ROOT = "relative py-12 md:py-20 bg-landing-bg";
export const SECTION_ROOT_ALT = "relative py-12 md:py-20 bg-landing-bg-alt";
export const SECTION_CONTAINER = "mx-auto max-w-6xl px-5 md:px-8 w-full";

/** Single sitewide CTA label — used verbatim on every CTA button. */
export const CTA_LABEL = "Batch 4-এ জয়েন করুন";

/** @deprecated Use CTA_LABEL */
export const BATCH_4_CTA_LABEL = CTA_LABEL;

/** Modest padding for repeating CTA bands between major sections. */
export const CTA_BLOCK_ROOT = "py-8 md:py-10";

/** @deprecated Use Section component + SECTION_* tokens */
export const CENTERED_SECTION_ROOT = SECTION_ROOT;

/** @deprecated Use Section with containerClassName="max-w-2xl text-center" */
export const CENTERED_SECTION_CONTENT =
  "relative z-10 max-w-2xl mx-auto w-full text-center";

export const CENTERED_SECTION_VIGNETTE =
  "radial-gradient(ellipse 110% 90% at 50% 50%, rgba(248,250,252,0.9) 0%, rgba(255,255,255,0.4) 60%, transparent 100%)";

export const HERO_TOP_TINT =
  "linear-gradient(180deg, rgba(249,115,22,0.05) 0%, rgba(255,255,255,0) 45%)";

export const BATCH_4_APPLY_URL = "https://forms.gle/gorAbpXY1AoekTrU7";
export const HERO_VIDEO_ID = "9nxOYnLRPDw";
