import { ConditionalNavbar } from "@/components/ConditionalNavbar";
import {
  Reviews,
  Hero,
  Features,
  Benefits,
  Testimonials,
  Pricing,
  CTA,
  Footer,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="pt-8 bg-[#fff4ef]">
        <Hero />
        <Reviews />
        <Features />
        <Benefits />
        <Testimonials />
        <Pricing />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
