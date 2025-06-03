import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { RatingStars } from "@/components/ui/rating-stars"

export function ReviewList({ reviews }) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <Card key={review.id} className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-0">
          <div className="flex items-start space-x-4">
            <Avatar className="ring-2 ring-gray-100">
              <AvatarImage src={review.user_id.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {review.user_id.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-bold text-gray-900">{review.user_id.name}</h4>
                  <RatingStars rating={review.rating} size="sm" className="mt-1" />
                </div>
                <span className="text-sm text-gray-500">{review.created_at}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
