import { cn } from "@/lib/utils";

type EditorialGraphicPlaceholderProps = {
  src: string;
  alt: string;
  className?: string;
};

export function EditorialGraphicPlaceholder({
  src,
  alt,
  className,
}: EditorialGraphicPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none",
        className,
      )}
      aria-hidden={alt === ""}
    >
      <div className="overflow-hidden rounded-2xl border border-landing-border bg-landing-bg-alt shadow-landing">
        <img
          src={src}
          alt={alt}
          width={640}
          height={480}
          decoding="async"
          className="aspect-[4/3] h-full w-full object-cover lg:aspect-[5/6]"
        />
      </div>
    </div>
  );
}
