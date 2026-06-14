"use client";

import { AuthenticatedRedirect } from "./AuthenticatedRedirect";
import { ParticleCanvas } from "./ParticleCanvas";
import { LanguageProvider } from "./LanguageProvider";
import { LandingNavbar } from "./LandingNavbar";
import { Hero } from "./Hero";
import { Interstitial } from "./Interstitial";
import { Problem } from "./Problem";
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

        <Interstitial copy={t.interstitials.i1.main} subCopy={t.interstitials.i1.sub} />

        <Problem />
        <SectionCTA />

        <Interstitial copy={t.interstitials.i2.main} subCopy={t.interstitials.i2.sub} />

        <WhatYouShip />
        <SectionCTA />

        <Interstitial copy={t.interstitials.i3.main} subCopy={t.interstitials.i3.sub} />

        <WhatYouLearn />
        <SectionCTA />

        <Interstitial copy={t.interstitials.i4.main} subCopy={t.interstitials.i4.sub} />

        <Curriculum />
        <SectionCTA />

        <Interstitial copy={t.interstitials.i5.main} subCopy={t.interstitials.i5.sub} />

        <HowItWorks />
        <SectionCTA />

        <Interstitial copy={t.interstitials.i6.main} subCopy={t.interstitials.i6.sub} />

        <ToolStack />

        <Interstitial
          copy={t.interstitials.toolFree.main}
          subCopy={t.interstitials.toolFree.sub}
        />

        <WhoIsThisFor />

        <Interstitial
          copy={t.interstitials.i7.main}
          subCopy={t.interstitials.i7.sub}
          subCopyGradient
        />

        <Instructor />
        <SectionCTA />

        <Interstitial
          copy={t.interstitials.i8.main}
          subCopy={t.interstitials.i8.sub}
          subCopyGradient
        />

        <Pricing />
        <SectionCTA />

        <Interstitial
          copy={t.interstitials.i9.main}
          subCopy={t.interstitials.i9.sub}
          subCopyGradient
        />

        <FAQ />

        <Interstitial copy={t.interstitials.i10.main} showCta />

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
