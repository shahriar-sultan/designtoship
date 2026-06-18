"use client";

import { AuthenticatedRedirect } from "./AuthenticatedRedirect";
import { LanguageProvider } from "./LanguageProvider";
import { LandingNavbar } from "./LandingNavbar";
import { Hero } from "./Hero";
import { MentorWelcome } from "./MentorWelcome";
import { CourseOutline } from "./CourseOutline";
import { CtaBlock } from "./CtaBlock";
import { TheShift } from "./TheShift";
import { WhatCourseTeaches } from "./WhatCourseTeaches";
import { WhatYouLearn } from "./WhatYouLearn";
import { Curriculum } from "./Curriculum";
import { AfterCourseOutcomes } from "./AfterCourseOutcomes";
import { HowItWorks } from "./HowItWorks";
import { WhoIsThisFor } from "./WhoIsThisFor";
import { FutureSelf } from "./FutureSelf";
import { Instructor } from "./Instructor";
import { Pricing } from "./Pricing";
import { FAQ } from "./FAQ";
import { Footer } from "./Footer";

function LandingContent() {
  return (
    <div className="relative min-h-screen bg-landing-bg">
      <AuthenticatedRedirect />
      <LandingNavbar />
      <main>
        <Hero />
        <MentorWelcome />
        <CourseOutline />

        <Curriculum />

        <WhatYouLearn />

        <AfterCourseOutcomes />

        <FutureSelf />
        <CtaBlock />

        <TheShift />
        <WhatCourseTeaches />

        <HowItWorks />

        <WhoIsThisFor />

        <Instructor />
        <CtaBlock />

        <Pricing />

        <FAQ />
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
