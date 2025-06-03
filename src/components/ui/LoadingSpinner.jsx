import { cn } from "@/lib/utils"

export function LoadingSpinner({ className, size = "md" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-16 w-16",
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-4 border-blue-600 border-t-transparent",
        sizeClasses[size],
        className,
      )}
    />
  )
}
