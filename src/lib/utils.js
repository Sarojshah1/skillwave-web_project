import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
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

