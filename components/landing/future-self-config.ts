import type { Language } from "@/lib/translations";

export type FutureSelfImage = {
  src: string;
  alt: string;
};

export type FutureSelfCopy = {
  headingBefore: string;
  headingAccent: string;
  headingAfter: string;
  paragraphs: string[];
  closing: string;
  images: FutureSelfImage[];
};

export const FUTURE_SELF_SECTION: Record<Language, FutureSelfCopy> = {
  bn: {
    headingBefore: "আজ থেকে ",
    headingAccent: "৩ মাস পরের আপনাকে",
    headingAfter: " একবার কল্পনা করুন",
    paragraphs: [
      "সকালে ঘুম থেকে উঠে আপনি আর confused না। আপনি জানেন আপনি কী করছেন, আর কোথায় যাচ্ছেন।",
      "প্রথমবারের মতো, নিজের বানানো একটা জিনিস আপনি **গর্ব করে** পরিবার আর বন্ধুদের দেখাচ্ছেন।",
      '"আমি কি আদৌ কখনো পারব?" — সেই ভয়টা আর নেই।',
      "কেউ আপনার কাজ নিয়ে প্রশ্ন করলে আপনি **গুছিয়ে, যুক্তি দিয়ে** উত্তর দিচ্ছেন — confident-ভাবে।",
      'আপনি এখন সেই মানুষ, যাকে অন্যরা জিজ্ঞেস করে — "এটা কীভাবে শিখলে?"',
    ],
    closing:
      "৩ মাস আগে যেটা শুধু স্বপ্ন ছিল — সেটাই এখন আপনার পরিচয়: **একজন UI/UX ডিজাইনার**",
    images: [
      {
        src: "/images/future-self-1.png",
        alt: "একজন ডিজাইনার আত্মবিশ্বাসের সাথে ল্যাপটপে কাজ করছেন",
      },
      {
        src: "/images/future-self-2.png",
        alt: "একটি পরিষ্কার পোর্টফোলিও বা লাইভ প্রজেক্ট স্ক্রিনে",
      },
      {
        src: "/images/future-self-3.png",
        alt: "কেউ নিজের কাজ নিয়ে গর্বিত ও উৎসাহিত",
      },
    ],
  },
  en: {
    headingBefore: "Picture yourself ",
    headingAccent: "three months from now",
    headingAfter: ", just once.",
    paragraphs: [
      "You wake up in the morning and you are no longer confused. You know what you are doing, and where you are headed.",
      "For the first time, you are **proudly** showing your family and friends something you built yourself.",
      '"Will I ever be able to do this?" — that fear is gone.',
      "When someone questions your work, you answer **clearly, with reasoning** — confidently.",
      'You are now the person others ask — "how did you learn to do this?"',
    ],
    closing:
      "What was only a dream three months ago is now your identity: **a UI/UX designer.**",
    images: [
      {
        src: "/images/future-self-1.png",
        alt: "A designer working confidently on a laptop",
      },
      {
        src: "/images/future-self-2.png",
        alt: "A clean portfolio or live project on screen",
      },
      {
        src: "/images/future-self-3.png",
        alt: "Someone proud and celebrating their work",
      },
    ],
  },
};
