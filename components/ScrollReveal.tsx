"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  distance?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 50,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reveal = () => {
      window.setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    const rect = element.getBoundingClientRect();
    const isBelowFold = rect.top >= window.innerHeight * 0.9;

    if (!isBelowFold) {
      reveal();
      return;
    }

    setIsVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  const getTransform = () => {
    if (direction === "up") return `translateY(${distance}px)`;
    if (direction === "down") return `translateY(-${distance}px)`;
    if (direction === "left") return `translateX(${distance}px)`;
    if (direction === "right") return `translateX(-${distance}px)`;
    return "none";
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100" : "opacity-0",
        className,
      )}
      style={{
        transform: isVisible ? "translateX(0) translateY(0)" : getTransform(),
      }}
    >
      {children}
    </div>
  );
}
