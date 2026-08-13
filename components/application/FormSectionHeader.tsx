import { cn } from "@/lib/utils";

type FormSectionHeaderProps = {
  title: string;
  className?: string;
};

export function FormSectionHeader({ title, className }: FormSectionHeaderProps) {
  return (
    <div
      className={cn(
        "rounded-t-xl bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground",
        className,
      )}
    >
      {title}
    </div>
  );
}
