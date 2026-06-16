"use client";

import { AuthenticatedRedirect } from "./AuthenticatedRedirect";
import { ParticleCanvas } from "./ParticleCanvas";
import { LanguageProvider } from "./LanguageProvider";
import { LandingNavbar } from "./LandingNavbar";
import { Hero } from "./Hero";
import { Interstitial } from "./Interstitial";
import { TheShift } from "./TheShift";
import { WhatCourseTeaches } from "./WhatCourseTeaches";
import { SectionCTA } from "./SectionCTA";
import { WhatYouShip } from "./WhatYouShip";
import { WhatYouLearn } from "./WhatYouLearn";
import { Curriculum } from "./Curriculum";
import { HowItWorks } from "./HowItWorks";
import { ToolStack } from "./ToolStack";
import { WhoIsThisFor } from "./WhoIsThisFor";
import { Instructor } from "./Instructor";
import { Pricing } from "./Pricing";
import { FAQ } from "./FAQ";
import { Footer } from "./Footer";
import { useLanguage } from "./LanguageProvider";

function LandingContent() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen" style={{ background: "#080C14" }}>
      <AuthenticatedRedirect />
      <LandingNavbar />
      <ParticleCanvas />
      <main className="relative z-10">
        <Hero />

        <TheShift />
        <WhatCourseTeaches />
        <SectionCTA />

        <Interstitial
          shape="torus"
          copy={t.interstitials.i2.main}
          subCopy={t.interstitials.i2.sub}
        />

        <WhatYouShip />
        <SectionCTA />

        <Interstitial
          shape="mobius-strip"
          copy={t.interstitials.i3.main}
          subCopy={t.interstitials.i3.sub}
        />

        <WhatYouLearn />
        <SectionCTA />

        <Interstitial
          shape="galaxy-spiral"
          copy={t.interstitials.i4.main}
          subCopy={t.interstitials.i4.sub}
        />

        <Curriculum />
        <SectionCTA />

        <Interstitial
          shape="dna-helix"
          copy={t.interstitials.i5.main}
          subCopy={t.interstitials.i5.sub}
        />

        <HowItWorks />
        <SectionCTA />

        <Interstitial
          shape="milky-way"
          copy={t.interstitials.i6.main}
          subCopy={t.interstitials.i6.sub}
        />

        <ToolStack />

        <Interstitial
          shape="hyperboloid"
          copy={t.interstitials.toolFree.main}
          subCopy={t.interstitials.toolFree.sub}
        />

        <WhoIsThisFor />

        <Interstitial
          shape="torus-knot"
          copy={t.interstitials.i7.main}
          subCopy={t.interstitials.i7.sub}
          subCopyGradient
        />

        <Instructor />
        <SectionCTA />

        <Interstitial
          shape="supernova-shell"
          copy={t.interstitials.i8.main}
          subCopy={t.interstitials.i8.sub}
          subCopyGradient
        />

        <Pricing />
        <SectionCTA />

        <Interstitial
          shape="stellar-nebula"
          copy={t.interstitials.i9.main}
          subCopy={t.interstitials.i9.sub}
          subCopyGradient
        />

        <FAQ />

        <Interstitial shape="sphere" copy={t.interstitials.i10.main} showCta />

        <Footer />
      </main>
    </div>
  );
}

export function LandingPage() {
  return (
    <LanguageProvider>
      <LandingContent />
    </LanguageProvider>
  );
}
