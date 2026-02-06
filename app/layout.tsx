import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans_Bengali,
  Hind_Siliguri,
} from "next/font/google";
import "./globals.css";
import { ConditionalNavbar } from "@/components/ConditionalNavbar";
import { SessionProvider } from "@/components/providers/SessionProvider";

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

export const metadata: Metadata = {
  title: "AI-Augmented UI/UX Design Free Webinar | Shahriar Sultan",
  description:
    "আপনার ডিজাইন ক্যারিয়ারের নতুন শুরু! AI দিয়ে UI/UX ডিজাইনে স্মার্ট কাজের একটি স্পষ্ট রোডম্যাপ শিখুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansBengali.variable} ${hindSiliguri.variable} antialiased font-sans`}
        style={{
          fontFamily:
            "var(--font-hind-siliguri), var(--font-bengali), var(--font-geist-sans), sans-serif",
        }}
      >
        <SessionProvider>
          <ConditionalNavbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
