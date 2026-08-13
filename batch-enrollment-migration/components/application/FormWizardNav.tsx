import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type FormWizardNavProps = {
  step: number;
  totalSteps: number;
  onBack?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  onClear?: () => void;
  isLoading?: boolean;
  canGoBack?: boolean;
  isLastStep?: boolean;
};

export function FormWizardNav({
  step,
  totalSteps,
  onBack,
  onNext,
  onSubmit,
  onClear,
  isLoading,
  canGoBack = true,
  isLastStep = false,
}: FormWizardNavProps) {
  const progress = Math.round((step / totalSteps) * 100);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {canGoBack && step > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isLoading}
          >
            Back
          </Button>
        )}
        {isLastStep ? (
          <Button type="button" onClick={onSubmit} disabled={isLoading}>
            {isLoading ? "Submitting…" : "Submit"}
          </Button>
        ) : (
          <Button type="button" onClick={onNext} disabled={isLoading}>
            Next
          </Button>
        )}
        <div className="flex min-w-[180px] flex-1 items-center gap-3">
          <Progress value={progress} className="h-2" />
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            Page {step} of {totalSteps}
          </span>
        </div>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="ml-auto text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            Clear form
          </button>
        )}
      </div>
    </div>
  );
}
