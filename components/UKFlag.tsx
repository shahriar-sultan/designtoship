export function UKFlag({ className = "w-9 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Blue background */}
      <rect width="36" height="24" fill="#012169" rx="2" />

      {/* White diagonals */}
      <path
        d="M0 0L36 24M36 0L0 24"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="square"
      />

      {/* Red diagonals */}
      <path
        d="M0 0L36 24M36 0L0 24"
        stroke="#C8102E"
        strokeWidth="2.4"
        strokeLinecap="square"
      />

      {/* White cross */}
      <path d="M0 10H36M0 14H36" fill="white" />
      <rect x="15" y="0" width="6" height="24" fill="white" />

      {/* Red cross */}
      <path d="M0 10.8H36M0 13.2H36" fill="#C8102E" />
      <rect x="16.2" y="0" width="3.6" height="24" fill="#C8102E" />
    </svg>
  );
}
