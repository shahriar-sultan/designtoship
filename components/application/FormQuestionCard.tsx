import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FormQuestionCardProps = {
  label: string;
  description?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function FormQuestionCard({
  label,
  description,
  required,
  error,
  children,
  className,
}: FormQuestionCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card px-5 py-4 shadow-sm",
        error && "border-destructive/50",
        className,
      )}
    >
      <p className="text-sm font-medium leading-snug">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </p>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
      <div className="mt-3">{children}</div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
