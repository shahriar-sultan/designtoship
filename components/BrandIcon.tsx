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
          <stop offset="0%" stopColor="#101A38" />
          <stop offset="100%" stopColor="#080C14" />
        </radialGradient>
        <linearGradient id="brand-glow" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#A855F7" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id="brand-tipGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill="url(#brand-bg)" />
      <polygon points="256,96 384,392 128,392" fill="url(#brand-glow)" opacity="0.7" />
      <circle cx="256" cy="150" r="60" fill="url(#brand-tipGlow)" />
      <circle cx="256" cy="146" r="18" fill="#E0F2FE" />
      <circle cx="256" cy="186" r="13" fill="#BAE6FD" />
      <circle cx="222" cy="218" r="13" fill="#22D3EE" />
      <circle cx="290" cy="218" r="13" fill="#22D3EE" />
      <circle cx="256" cy="226" r="10" fill="#67E8F9" />
      <circle cx="192" cy="262" r="13" fill="#A855F7" />
      <circle cx="256" cy="268" r="12" fill="#C084FC" />
      <circle cx="320" cy="262" r="13" fill="#A855F7" />
      <circle cx="166" cy="312" r="12" fill="#7C3AED" />
      <circle cx="224" cy="318" r="11" fill="#8B5CF6" />
      <circle cx="288" cy="318" r="11" fill="#8B5CF6" />
      <circle cx="346" cy="312" r="12" fill="#7C3AED" />
      <circle cx="150" cy="362" r="12" fill="#4F46E5" />
      <circle cx="212" cy="368" r="10" fill="#6366F1" />
      <circle cx="300" cy="368" r="10" fill="#6366F1" />
      <circle cx="362" cy="362" r="12" fill="#4F46E5" />
    </svg>
  );
}
