import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/Benefits";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { MyIntro } from "@/components/landing/MyIntro";
import { Reviews } from "@/components/landing/Reviews";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Benefits />
        <Features />
        <Testimonials />
        <MyIntro />
        <Reviews />
        <Pricing />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
