import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: "upgrade-insecure-requests",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const devAllowedOrigins =
  process.env.NODE_ENV === "development"
    ? [
        "192.168.68.57",
        ...(process.env.DEV_ALLOWED_ORIGINS?.split(",").map((o) => o.trim()) ??
          []),
      ].filter(Boolean)
    : [];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", ...devAllowedOrigins],
  async headers() {
    if (process.env.NODE_ENV !== "production") {
      return [];
    }

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
