import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  MessageCircle,
  PenLine,
  Scale,
  Sparkles,
} from "lucide-react";

export type OutcomeCard = {
  title: string;
  description: string;
};

export type OutcomesCopy = {
  headline: string;
  intro: string;
  cards: OutcomeCard[];
};

export const OUTCOME_ICONS: LucideIcon[] = [
  Scale,
  PenLine,
  Briefcase,
  MessageCircle,
  Sparkles,
];

/** Edit outcome section copy in one place (bn + en). */
export const OUTCOMES_SECTION: Record<"bn" | "en", OutcomesCopy> = {
  bn: {
    headline: "এই কোর্স শেষে আপনি কী করতে পারবেন?",
    intro:
      "১৩ সপ্তাহ পরে আপনি আর confused beginner থাকবেন না। নিচের কাজগুলো তখন আপনি নিজে, নিজের হাতে করতে পারবেন।",
    cards: [
      {
        title: "নিজের ডিজাইন নিজে বিচার করতে পারবেন",
        description:
          'কোন ডিজাইন ভালো, কোনটা না, আর কেন, সেটা নিজেই বুঝবেন। আর "improve করেন" শুনে আটকে থাকতে হবে না।',
      },
      {
        title: "যেকোনো idea কে real ডিজাইনে রূপ দিতে পারবেন",
        description:
          "মাথার ভেতরের ভাবনা থেকে শুরু করে সুন্দর, কাজের একটা screen পর্যন্ত, পুরো পথটা একা পাড়ি দিতে পারবেন।",
      },
      {
        title: "Portfolio-ready কাজ বানাতে পারবেন",
        description:
          "এমন কাজ, যেটা আপনি গর্ব করে যে কাউকে দেখাতে পারবেন, employer হোক বা client।",
      },
      {
        title: "নিজের ডিজাইন explain করতে পারবেন",
        description:
          '"কেন এই ডিজাইন এভাবে", এই যুক্তিটা গুছিয়ে বলতে পারবেন, যেটা ছাড়া কাজ কাউকে বোঝানো কঠিন।',
      },
      {
        title: "AI কাজে লাগিয়ে দ্রুত ডিজাইন করতে পারবেন",
        description:
          "AI-কে নিজের সহকারী বানিয়ে আরও কম সময়ে, আরও smart-ভাবে কাজ করতে শিখবেন।",
      },
    ],
  },
  en: {
    headline: "What you'll be able to do after this course",
    intro:
      "After 13 weeks you won't be a confused beginner anymore. These are things you'll be able to do on your own.",
    cards: [
      {
        title: "Judge your own design",
        description:
          "You will know which designs work, which do not, and why. No more freezing when someone says \"improve it.\"",
      },
      {
        title: "Turn any idea into a real design",
        description:
          "From a thought in your head to a polished, working screen, you'll be able to walk the full path alone.",
      },
      {
        title: "Build portfolio-ready work",
        description:
          "Work you're proud to show anyone, whether that's an employer or a client.",
      },
      {
        title: "Explain your design decisions",
        description:
          "You will articulate why a design is the way it is, which is what makes your work convincing to others.",
      },
      {
        title: "Use AI to design faster",
        description:
          "You'll treat AI as your assistant and work smarter in less time.",
      },
    ],
  },
};
