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

export const dynamicParams = true;

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Reviews />
        <Features />
        <Benefits />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
