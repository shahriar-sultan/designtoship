import type { Language } from "@/lib/translations";

export type CurriculumWeekRow = {
  label: string;
  title: string;
  bullets: string[];
  tags: string[];
};

export type DetailedCurriculumPhase = {
  kind: "detailed";
  title: string;
  weeks: string;
  outcome: string;
  weekRows: CurriculumWeekRow[];
};

export type ShortCurriculumPhase = {
  kind: "short";
  title: string;
  weeks: string;
  outcome: string;
  summary: string;
};

export type DestinationCurriculumPhase = {
  kind: "destination";
  title: string;
  weeks: string;
  outcome: string;
};

export type CurriculumPhase =
  | DetailedCurriculumPhase
  | ShortCurriculumPhase
  | DestinationCurriculumPhase;

export const CURRICULUM_PHASES: Record<Language, CurriculumPhase[]> = {
  bn: [
    {
      kind: "detailed",
      title: "ডিজাইন ফাউন্ডেশন",
      weeks: "সপ্তাহ ১–৩",
      outcome:
        "একদম শূন্য থেকে — Figma আর ডিজাইনের মূল ভিত্তিগুলো আপনার আয়ত্তে আসবে।",
      weekRows: [
        {
          label: "সপ্তাহ ১",
          title: "Figma Basics + Hierarchy ও Alignment",
          bullets: [
            "Figma-র গোড়ার কাজ: frame, shape, text, image, fill/stroke, group, layer panel, জরুরি shortcut",
            "Visual Hierarchy: একটা screen-এ চোখ আগে কোথায় যায়, আর কেন",
            "Alignment: যে invisible grid amateur আর clean কাজের পার্থক্য গড়ে দেয়",
            "নিজের product-এর প্রথম কয়েকটা screen বানানো",
          ],
          tags: ["Figma", "Hierarchy", "Alignment"],
        },
        {
          label: "সপ্তাহ ২",
          title: "Deep Figma + Typography ও Color",
          bullets: [
            "Component ও Variant: একবার বানিয়ে বারবার ব্যবহার (navbar, button, card দিয়ে — abstract না)",
            "Auto Layout: padding, gap, resizing — beginner-দের সবচেয়ে কঠিন জিনিসটা পুরো একটা lab জুড়ে হাতে-কলমে",
            "Typography: font pairing, type scale, weight — live সিদ্ধান্ত নিয়ে",
            "Color: নিজের palette (primary, neutral, accent) আর contrast-এর basics",
            "নিজের একটা mini design system দাঁড় করানো",
          ],
          tags: ["Components", "Variants", "Auto Layout", "Typography", "Color"],
        },
        {
          label: "সপ্তাহ ৩",
          title: "UX Thinking + Contrast ও Balance",
          bullets: [
            "Visitor কে, তার goal vs business-এর goal — দুটোর জন্যই ডিজাইন",
            "User Flow: land → বোঝা → বিশ্বাস → action",
            "Information Architecture: কোন page থাকবে, কোন order-এ, কোথায় কী",
            "Lo-fi wireframe — আঁকার আগে ভাবা",
            "Contrast ও Balance: কোনটা গুরুত্ব পাবে, কোনটা পেছনে যাবে",
          ],
          tags: [
            "UX Thinking",
            "User Flow",
            "Information Architecture",
            "Wireframe",
            "Contrast",
            "Balance",
          ],
        },
      ],
    },
    {
      kind: "detailed",
      title: "Website ডিজাইন",
      weeks: "সপ্তাহ ৪–৫",
      outcome:
        "নিজে হাতে একটা সম্পূর্ণ website ডিজাইন করবেন — সুন্দর, mobile-first, ব্যবহারে সহজ।",
      weekRows: [
        {
          label: "সপ্তাহ ৪",
          title: "Landing Page গভীরভাবে",
          bullets: [
            "Landing page anatomy: hero, social proof, feature, trust, CTA — আর কেন ঠিক এই order",
            "Mobile-first design: phone-ই প্রধান canvas, desktop পরে",
            "Figma-তে responsive: constraint দিয়ে design কীভাবে নিজের resize intent জানায়",
            "Hero section একদম scratch থেকে ডিজাইন",
          ],
          tags: ["Landing Page", "Mobile-First", "Responsive", "Layout"],
        },
        {
          label: "সপ্তাহ ৫",
          title: "Inner Pages দ্রুত + আসল লেখা",
          bullets: [
            'Inner page (about, services, contact) দ্রুত — senior নিয়ম: "redesign না, reuse"',
            "AI দিয়ে copywriting + এর উপর senior pass (কোনো Lorem Ipsum থাকবে না)",
            "Build-ready file: naming, structure, auto-layout hygiene",
            "৫–৭ পেজের পুরো website, design freeze",
          ],
          tags: ["System Reuse", "AI Copywriting", "File Hygiene"],
        },
      ],
    },
    {
      kind: "short",
      title: "Website টি বাস্তবে আনুন",
      weeks: "সপ্তাহ ৬–৮",
      outcome: "আপনার ডিজাইন live website-এ — AI-এর সাহায্যে, কোনো code ছাড়াই।",
      summary:
        "এবার আপনার ডিজাইন করা website টি AI-এর সাহায্যে একটা real, live website-এ পরিণত হবে। কোনো code লিখতে হবে না — আপনি শুধু prompt দেবেন, AI বানাবে, আপনি guide করবেন। সপ্তাহ ৮-এ আপনার প্রথম live website তৈরি — যার link আপনি যে কাউকে পাঠাতে পারবেন।",
    },
    {
      kind: "detailed",
      title: "App (Booking Tool) ডিজাইন",
      weeks: "সপ্তাহ ৯–১০",
      outcome:
        "শুধু সুন্দর screen না — একটা পুরো product-এর UX নিজে ভাবতে আর ডিজাইন করতে শিখবেন।",
      weekRows: [
        {
          label: "সপ্তাহ ৯",
          title: "Userflow ও Advanced UX Thinking",
          bullets: [
            "Product design vs website design: task, persuasion না",
            "Userflow: booking journey-র প্রতিটা step, decision, screen — happy path vs edge case (sold out, invalid date, empty form)",
            "Advanced UX: screen state (empty, loading, error, success), form UX (field order, label, validation, mobile keyboard), confirmation psychology",
            "নিজের UX সিদ্ধান্ত professional-ভাবে present করা",
          ],
          tags: ["Userflow", "Screen States", "Form UX", "Edge Cases"],
        },
        {
          label: "সপ্তাহ ১০",
          title: "Figma-তে Booking Tool ডিজাইন",
          bullets: [
            "Flow থেকে hi-fi: selection, date/quantity, details form, confirmation — mobile-first",
            "State গুলো সত্যিকারের ডিজাইন: loading, error, success (booking reference সহ)",
            "Website-এর সাথে UI continuity — একই type/color পরিবার",
            "সব screen + state, design freeze",
          ],
          tags: ["Hi-Fi UI", "State Design", "Product UI", "Consistency"],
        },
      ],
    },
    {
      kind: "short",
      title: "App টি বাস্তবে আনুন",
      weeks: "সপ্তাহ ১১–১২",
      outcome: "আপনার booking tool live — real user book করতে পারবে।",
      summary:
        "আপনার ডিজাইন করা booking tool টি live হবে — real user book করতে পারবে, আর প্রতিটা booking আপনার Google Sheet-এ এসে জমা হবে। দ্বিতীয়বার বলে কাজটা আরও দ্রুত, আরও confident। সপ্তাহ ১২-তে আপনার দ্বিতীয় live product।",
    },
    {
      kind: "destination",
      title: "Showcase ও পরবর্তী পথ",
      weeks: "সপ্তাহ ১৩",
      outcome:
        "দুইটা real product হাতে নিয়ে কোর্স শেষ — একটা strong portfolio যা আপনি যে কাউকে দেখাতে পারবেন, আর সামনে এগোনোর একটা পরিষ্কার পথ।",
    },
  ],
  en: [
    {
      kind: "detailed",
      title: "Design Foundations",
      weeks: "Weeks 1–3",
      outcome:
        "From absolute zero — Figma and the core foundations of design become yours.",
      weekRows: [
        {
          label: "Week 1",
          title: "Figma Basics + Hierarchy & Alignment",
          bullets: [
            "Figma fundamentals: frames, shapes, text, images, fill/stroke, groups, layers panel, essential shortcuts",
            "Visual hierarchy: where the eye goes first on a screen, and why",
            "Alignment: the invisible grid that separates amateur from clean work",
            "Build the first few screens of your own product",
          ],
          tags: ["Figma", "Hierarchy", "Alignment"],
        },
        {
          label: "Week 2",
          title: "Deep Figma + Typography & Color",
          bullets: [
            "Components & variants: build once, reuse everywhere (navbar, button, card — not abstract)",
            "Auto Layout: padding, gap, resizing — the hardest beginner skill, practiced hands-on across a full lab",
            "Typography: font pairing, type scale, weight — decided live",
            "Color: your own palette (primary, neutral, accent) and contrast basics",
            "Stand up your own mini design system",
          ],
          tags: ["Components", "Variants", "Auto Layout", "Typography", "Color"],
        },
        {
          label: "Week 3",
          title: "UX Thinking + Contrast & Balance",
          bullets: [
            "Who the visitor is, their goal vs the business goal — design for both",
            "User flow: land → understand → trust → action",
            "Information architecture: which pages exist, in what order, what goes where",
            "Lo-fi wireframes — think before you draw",
            "Contrast & balance: what earns emphasis, what steps back",
          ],
          tags: [
            "UX Thinking",
            "User Flow",
            "Information Architecture",
            "Wireframe",
            "Contrast",
            "Balance",
          ],
        },
      ],
    },
    {
      kind: "detailed",
      title: "Website Design",
      weeks: "Weeks 4–5",
      outcome:
        "You design a complete website by hand — beautiful, mobile-first, easy to use.",
      weekRows: [
        {
          label: "Week 4",
          title: "Landing Page in Depth",
          bullets: [
            "Landing page anatomy: hero, social proof, features, trust, CTA — and why this order",
            "Mobile-first design: phone is the primary canvas, desktop comes after",
            "Responsive in Figma: constraints that communicate resize intent",
            "Design the hero section from scratch",
          ],
          tags: ["Landing Page", "Mobile-First", "Responsive", "Layout"],
        },
        {
          label: "Week 5",
          title: "Inner Pages Fast + Real Copy",
          bullets: [
            'Inner pages (about, services, contact) fast — senior rule: "no redesign, reuse"',
            "AI copywriting plus a senior pass (no Lorem Ipsum)",
            "Build-ready file: naming, structure, auto-layout hygiene",
            "Full 5–7 page website, design freeze",
          ],
          tags: ["System Reuse", "AI Copywriting", "File Hygiene"],
        },
      ],
    },
    {
      kind: "short",
      title: "Bring Your Website to Life",
      weeks: "Weeks 6–8",
      outcome: "Your design becomes a live website — with AI, no code required.",
      summary:
        "Your designed website becomes a real, live site with AI. You write no code — you prompt, AI builds, you guide. By week 8 you have your first live website with a link you can send to anyone.",
    },
    {
      kind: "detailed",
      title: "App (Booking Tool) Design",
      weeks: "Weeks 9–10",
      outcome:
        "Not just pretty screens — you learn to think and design full product UX.",
      weekRows: [
        {
          label: "Week 9",
          title: "Userflow & Advanced UX Thinking",
          bullets: [
            "Product design vs website design: tasks, not persuasion",
            "Userflow: every step, decision, and screen in the booking journey — happy path vs edge cases (sold out, invalid date, empty form)",
            "Advanced UX: screen states (empty, loading, error, success), form UX (field order, labels, validation, mobile keyboard), confirmation psychology",
            "Present your UX decisions professionally",
          ],
          tags: ["Userflow", "Screen States", "Form UX", "Edge Cases"],
        },
        {
          label: "Week 10",
          title: "Booking Tool Design in Figma",
          bullets: [
            "Flow to hi-fi: selection, date/quantity, details form, confirmation — mobile-first",
            "Real state design: loading, error, success (with booking reference)",
            "UI continuity with the website — same type and color family",
            "All screens + states, design freeze",
          ],
          tags: ["Hi-Fi UI", "State Design", "Product UI", "Consistency"],
        },
      ],
    },
    {
      kind: "short",
      title: "Bring Your App to Life",
      weeks: "Weeks 11–12",
      outcome: "Your booking tool goes live — real users can book.",
      summary:
        "Your designed booking tool goes live — real users can book, and every booking lands in your Google Sheet. The second time is faster and more confident. By week 12 you have your second live product.",
    },
    {
      kind: "destination",
      title: "Showcase & What Comes Next",
      weeks: "Week 13",
      outcome:
        "Finish the course with two real products — a strong portfolio you can show anyone, and a clear path forward.",
    },
  ],
};
