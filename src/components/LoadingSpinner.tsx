interface LoadingSpinnerProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({
  text = "페이지를 불러오는 중...",
  size = "md",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="text-center">
        <div
          className={`animate-spin rounded-full border-b-2 border-neutral-900 mx-auto mb-4 ${sizeClasses[size]}`}
        ></div>
        <p className="text-neutral-600">{text}</p>
      </div>
    </div>
  );
}
