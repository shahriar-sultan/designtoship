import { AuthenticatedRedirect } from "@/components/landing/AuthenticatedRedirect";
import {
  ParticleCanvas,
  Hero,
  Interstitial,
  Problem,
  SectionCTA,
  WhatYouShip,
  WhatYouLearn,
  Curriculum,
  HowItWorks,
  ToolStack,
  WhoIsThisFor,
  Instructor,
  Pricing,
  FAQ,
  Footer,
} from "@/components/landing";

export default function HomePage() {
  return (
    <div className="relative min-h-screen" style={{ background: "#080C14" }}>
      <AuthenticatedRedirect />
      <ParticleCanvas />
      <main className="relative z-10">
        <Hero />

        <Interstitial
          copy="The Design Industry Is Changing"
          subCopy="The question is whether you are changing with it."
        />

        <Problem />
        <SectionCTA />

        <Interstitial
          copy="The ones who ship will win."
          subCopy="Everyone else will have Figma files."
        />

        <WhatYouShip />
        <SectionCTA />

        <Interstitial
          copy="Design is a skill."
          subCopy="And every skill can be learned."
        />

        <WhatYouLearn />
        <SectionCTA />

        <Interstitial
          copy="Week 8. Your website goes live."
          subCopy="A real URL. Anyone in the world can open it."
        />

        <Curriculum />
        <SectionCTA />

        <Interstitial
          copy="13 weeks. Every one counts."
          subCopy="Each week ends with something real you made."
        />

        <HowItWorks />
        <SectionCTA />

        <Interstitial
          copy="Show up. Build. Ship. Repeat."
          subCopy="That is the whole system."
        />

        <ToolStack />

        <Interstitial
          copy="Every tool. Completely free."
          subCopy="You will not pay for a single subscription to complete this course."
        />

        <WhoIsThisFor />

        <Interstitial
          copy="You don't need experience."
          subCopy="You need to show up."
          subCopyGradient
        />

        <Instructor />
        <SectionCTA />

        <Interstitial
          copy="8 years in Design. Dozens of shipped products."
          subCopy="Now teaching you."
          subCopyGradient
        />

        <Pricing />
        <SectionCTA />

        <Interstitial
          copy="Seats are limited."
          subCopy="The batch fills and closes."
          subCopyGradient
        />

        <FAQ />

        <Interstitial copy="Ready to become a great designer?" showCta />

        <Footer />
      </main>
    </div>
  );
}
