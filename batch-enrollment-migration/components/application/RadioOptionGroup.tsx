import { cn } from "@/lib/utils";

export type RadioOption = {
  value: string;
  label: string;
};

type RadioOptionGroupProps = {
  name: string;
  value: string;
  options: RadioOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
  "aria-invalid"?: boolean;
};

export function RadioOptionGroup({
  name,
  value,
  options,
  onChange,
  disabled,
  "aria-invalid": ariaInvalid,
}: RadioOptionGroupProps) {
  return (
    <fieldset className="space-y-2" disabled={disabled}>
      <legend className="sr-only">{name}</legend>
      {options.map((option) => {
        const id = `${name}-${option.value}`;
        const checked = value === option.value;
        return (
          <label
            key={option.value}
            htmlFor={id}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-md border px-3 py-2.5 text-sm transition-colors",
              checked
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-muted/50",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <input
              id={id}
              type="radio"
              name={name}
              value={option.value}
              checked={checked}
              onChange={() => onChange(option.value)}
              disabled={disabled}
              aria-invalid={ariaInvalid}
              className="mt-0.5 size-4 shrink-0 accent-primary"
            />
            <span>{option.label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
