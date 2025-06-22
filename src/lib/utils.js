import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) {
    return "Today"
  } else if (diffInDays === 1) {
    return "Yesterday"
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`
  } else {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
}

export function getImageUrl(imagePath) {
  if (!imagePath) return "/placeholder.svg?height=200&width=300"
  // For preview, return placeholder - in real app, construct full URL
  return `http://localhost:3000/${imagePath}`
}

export function getProfileImageUrl(profilePicture) {
  if (!profilePicture) return "/placeholder.svg?height=40&width=40"
  // For preview, return placeholder - in real app, construct full URL
  return `http://localhost:3000/profile/${profilePicture}`
}


export function calculateDiscount(originalPrice, currentPrice) {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

export function calculateAverageRating(reviews) {
  if (reviews.length === 0) return 0
  return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

