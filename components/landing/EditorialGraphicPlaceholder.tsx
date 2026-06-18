import { cn } from "@/lib/utils";

type EditorialGraphicPlaceholderProps = {
  src: string;
  alt: string;
  className?: string;
  /** Frameless — no border/shadow; image scales to fit and sits on section background */
  blend?: boolean;
};

export function EditorialGraphicPlaceholder({
  src,
  alt,
  className,
  blend = false,
}: EditorialGraphicPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full",
        blend ? "max-w-2xl sm:max-w-3xl lg:mx-0 lg:max-w-none" : "max-w-md lg:mx-0 lg:max-w-none",
        className,
      )}
      aria-hidden={alt === ""}
    >
      {blend ? (
        <img
          src={src}
          alt={alt}
          width={640}
          height={640}
          decoding="async"
          className="h-auto w-full object-contain"
        />
      ) : (
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
      )}
    </div>
  );
}
