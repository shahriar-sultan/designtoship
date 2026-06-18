interface BrandIconProps {
  className?: string;
}

export function BrandIcon({ className = "h-8 w-8 shrink-0" }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id="brand-bg" cx="50%" cy="50%" r="72%">
          <stop offset="0%" stopColor="#FFF7ED" />
          <stop offset="100%" stopColor="#FFEDD5" />
        </radialGradient>
        <linearGradient id="brand-glow" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#EA580C" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#F97316" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#FB923C" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="brand-tipGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill="url(#brand-bg)" />
      <polygon points="256,96 384,392 128,392" fill="url(#brand-glow)" opacity="0.85" />
      <circle cx="256" cy="150" r="60" fill="url(#brand-tipGlow)" />
      <circle cx="256" cy="146" r="18" fill="#FFEDD5" />
      <circle cx="256" cy="186" r="13" fill="#FDBA74" />
      <circle cx="222" cy="218" r="13" fill="#FB923C" />
      <circle cx="290" cy="218" r="13" fill="#FB923C" />
      <circle cx="256" cy="226" r="10" fill="#FDBA74" />
      <circle cx="192" cy="262" r="13" fill="#F97316" />
      <circle cx="256" cy="268" r="12" fill="#FB923C" />
      <circle cx="320" cy="262" r="13" fill="#F97316" />
      <circle cx="166" cy="312" r="12" fill="#EA580C" />
      <circle cx="224" cy="318" r="11" fill="#F97316" />
      <circle cx="288" cy="318" r="11" fill="#F97316" />
      <circle cx="346" cy="312" r="12" fill="#EA580C" />
      <circle cx="150" cy="362" r="12" fill="#EA580C" />
      <circle cx="212" cy="368" r="10" fill="#F97316" />
      <circle cx="300" cy="368" r="10" fill="#F97316" />
      <circle cx="362" cy="362" r="12" fill="#EA580C" />
    </svg>
  );
}
