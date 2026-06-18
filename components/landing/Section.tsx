import { cn } from "@/lib/utils";
import { SECTION_CONTAINER, SECTION_ROOT, SECTION_ROOT_ALT } from "./constants";

type SectionElement = "section" | "div" | "footer";

type SectionProps<T extends SectionElement = "section"> = {
  as?: T;
  containerClassName?: string;
  variant?: "default" | "alt";
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export function Section<T extends SectionElement = "section">({
  as,
  className,
  containerClassName,
  variant = "default",
  children,
  ...props
}: SectionProps<T>) {
  const Tag = (as ?? "section") as SectionElement;

  return (
    <Tag
      className={cn(
        variant === "alt" ? SECTION_ROOT_ALT : SECTION_ROOT,
        className,
      )}
      {...props}
    >
      <div className={cn(SECTION_CONTAINER, containerClassName)}>{children}</div>
    </Tag>
  );
}
