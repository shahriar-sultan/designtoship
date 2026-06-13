import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  ParticleCanvas,
  Hero,
  Interstitial,
  Problem,
  SectionCTA,
  WhatYouShip,
  Curriculum,
  HowItWorks,
  ToolStack,
  WhoIsThisFor,
  Instructor,
  Pricing,
  FAQ,
  Footer,
} from "@/components/landing";

export default async function HomePage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="relative min-h-screen" style={{ background: "#080C14" }}>
      <ParticleCanvas />
      <main className="relative">
        <Hero />

        <Interstitial
          shape="burst"
          copy="Design is changing."
          subCopy="The question is whether you are changing with it."
        />

        <Problem />
        <SectionCTA />

        <Interstitial
          shape="fragmented-scatter"
          copy="The ones who ship will win."
          subCopy="Everyone else will have Figma files."
        />

        <WhatYouShip />
        <SectionCTA />

        <Interstitial
          shape="galaxy"
          copy="Week 8. Your website goes live."
          subCopy="A real URL. Anyone in the world can open it."
        />

        <Curriculum />
        <SectionCTA />

        <Interstitial
          shape="timeline-dots"
          copy="13 weeks. Every one counts."
          subCopy="Each week ends with something real you made."
        />

        <HowItWorks />
        <SectionCTA />

        <Interstitial
          shape="cursor-hand"
          copy="Show up. Build. Ship. Repeat."
          subCopy="That is the whole system."
        />

        <ToolStack />

        <Interstitial
          shape="app-grid"
          copy="Every tool. Completely free."
          subCopy="You will not pay for a single subscription to complete this course."
        />

        <WhoIsThisFor />

        <Interstitial
          shape="ripple-rings"
          copy="You don't need experience."
          subCopy="You need to show up."
          subCopyGradient
        />

        <Instructor />
        <SectionCTA />

        <Interstitial
          shape="rising-diagonal"
          copy="6 years. Dozens of shipped products."
          subCopy="Now teaching you."
          subCopyGradient
        />

        <Pricing />
        <SectionCTA />

        <Interstitial
          shape="rocket-detailed"
          copy="Seats are limited."
          subCopy="The batch fills and closes."
          subCopyGradient
        />

        <FAQ />

        <Interstitial
          shape="heartbeat"
          copy="Ready to become a great designer?"
          showCta
        />

        <Footer />
      </main>
    </div>
  );
}
