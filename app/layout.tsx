import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Anek_Bangla,
  Noto_Sans_Bengali,
  Hind_Siliguri,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ConditionalNavbar } from "@/components/ConditionalNavbar";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const anekBangla = Anek_Bangla({
  variable: "--font-anek-bangla",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_TITLE = "Design To Ship | AI Augmented UI/UX Design Career";
const SITE_DESCRIPTION =
  "Learn in Bangla from absolute zero, guided by a senior designer, and use AI to design faster and smarter. Batch 4 enrollment open.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Design To Ship",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body
        className={`${inter.variable} ${anekBangla.variable} ${geistSans.variable} ${geistMono.variable} ${notoSansBengali.variable} ${hindSiliguri.variable} antialiased font-sans`}
        style={{
          fontFamily:
            "var(--font-anek-bangla), var(--font-bengali), var(--font-hind-siliguri), var(--font-inter), sans-serif",
        }}
      >
        <SessionProvider>
          <ConditionalNavbar />
          {children}
        </SessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
