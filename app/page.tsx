import {
  Header,
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
      <Header />
      <main>
        <Hero />
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
