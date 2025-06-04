import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RatingStars } from "@/components/ui/rating-stars"
import { Card } from "@/components/ui/card"
import { MessageCircle } from "@/components/ui/icons"
import { useAddReview } from "../hooks/useAddReview"
import { toast } from "react-hot-toast"

export function ReviewForm({ courseId }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const { mutate: addReview, isPending } = useAddReview()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rating === 0 || !comment.trim()) return

    const reviewData = {
      courseId,
      rating,
      comment
    }

const formData = new FormData()
formData.append("course_id", reviewData.courseId)
formData.append("rating", reviewData.rating.toString())
formData.append("comment", reviewData.comment)
console.log(courseId)


    addReview({
                course_id: courseId,
                rating,
                comment
            }, {
      onSuccess: () => {
        toast.success("Review submitted successfully!")
        setRating(0)
        setComment("")
      },
      onError: () => {
        toast.error("Failed to submit review.")
      }
    })
  }

  return (
    <Card className="p-8 bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border-0">
      <h3 className="text-xl font-bold mb-6 flex items-center">
        <MessageCircle className="w-6 h-6 mr-3 text-blue-600" />
        Share Your Experience
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Your Rating</label>
          <RatingStars rating={rating} interactive onRatingChange={setRating} size="lg" />
          {rating > 0 && (
            <span className="ml-3 text-sm font-medium text-gray-600">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Your Review</label>
          <Textarea
            placeholder="Share your experience with this course. What did you like most? How did it help you?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <Button
          type="submit"
          variant="default"
          className="px-8 py-3 rounded-xl font-semibold"
          disabled={rating === 0 || !comment.trim() || isPending}
        >
          {isPending ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </Card>
  )
}
