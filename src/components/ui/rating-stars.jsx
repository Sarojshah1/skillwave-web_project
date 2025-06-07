
import { Star } from "./icons"
import { cn } from "../../lib/utils"

export function RatingStars({ rating, maxRating = 5, size = "md", interactive = false, onRatingChange, className }) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  }

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= rating

        return (
          <Star
            key={index}
            className={cn(
              sizeClasses[size],
              isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
              interactive && "cursor-pointer hover:text-yellow-200 transition-colors",
            )}
            onClick={interactive ? () => onRatingChange?.(starValue) : undefined}
          />
        )
      })}
    </div>
  )
}
