interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ 
  title = "Something went wrong", 
  message = "An error occurred. Please try again.",
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-4">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-destructive">{title}</h2>
        <p className="text-muted-foreground">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 h-10 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 cursor-pointer transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

