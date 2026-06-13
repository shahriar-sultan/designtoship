export const LANDING = {
  bg: "#080C14",
  surface: "#0F1520",
  border: "#1C2740",
  textPrimary: "#F1F5F9",
  textSecondary: "#94A3B8",
  textMuted: "#475569",
  accentWarm: "#F97316",
} as const;

export const GRADIENT_TEXT =
  "bg-gradient-to-r from-[#6C3EFF] via-[#A855F7] to-[#22D3EE] bg-clip-text text-transparent";

export const EYEBROW =
  "text-sm uppercase tracking-widest font-semibold bg-gradient-to-r from-[#6C3EFF] via-[#A855F7] to-[#22D3EE] bg-clip-text text-transparent";

export const ZIGZAG_SECTION_ROOT =
  "relative z-10 min-h-screen flex items-center";

export const CONTENT_COLUMN_BASE =
  "w-full relative z-10 px-6 py-16 pt-52 md:py-24 md:px-12 bg-[#080C14]/95 md:bg-transparent";

export const CONTENT_COLUMN_LEFT = `${CONTENT_COLUMN_BASE} md:w-1/2 md:ml-0 md:pt-24 md:[background:linear-gradient(to_right,#080C14_85%,transparent)]`;

export const CONTENT_COLUMN_RIGHT = `${CONTENT_COLUMN_BASE} md:w-1/2 md:ml-auto md:pt-24 md:[background:linear-gradient(to_left,#080C14_85%,transparent)]`;

export const PARTICLE_COLUMN_LEFT =
  "hidden md:block w-1/2 absolute top-0 bottom-0 left-0 pointer-events-none";

export const PARTICLE_COLUMN_RIGHT =
  "hidden md:block w-1/2 absolute top-0 bottom-0 right-0 pointer-events-none";

export const SECTION_INNER = "w-full max-w-3xl";
