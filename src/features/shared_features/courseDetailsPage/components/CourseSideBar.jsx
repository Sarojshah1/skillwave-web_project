
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Heart, Shield, BookOpen, CheckCircle, Star } from "@/components/ui/icons"
import { formatPrice, calculateAverageRating } from "@/lib/utils"

export function CourseSidebar({ course, isWishlisted, onEnrollNow, onToggleWishlist }) {
  const averageRating = calculateAverageRating(course.reviews)

  return (
    <div className="sticky top-8 space-y-6">
      <Card className="rounded-3xl shadow-2xl overflow-hidden border-0 bg-white/90 backdrop-blur-sm">
        <div className="relative">
          <img src={`http://localhost:3000/thumbnails/${course.thumbnail}` || "/placeholder.svg"} alt={course.title} className="w-full h-56 object-contain" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <Button
              size="lg"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm rounded-full"
            >
              <Play className="w-6 h-6 mr-2" />
              Preview Course
            </Button>
          </div>
        </div>

        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formatPrice(course.price)}
              </div>
              {course.originalPrice && (
                <div className="text-xl text-gray-500 line-through">{formatPrice(course.price)}</div>
              )}
            </div>
            <p className="text-gray-600 font-medium">One-time payment • Lifetime access</p>
          </div>

          <div className="space-y-4 mb-8">
            <Button
              onClick={onEnrollNow}
              variant="default"
              className="w-full font-bold py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              size="lg"
            >
              Enroll Now
            </Button>
            <Button
              variant="outline"
              className="w-full border-2 border-gray-200 hover:border-blue-300 py-4 rounded-2xl font-semibold"
              size="lg"
              onClick={onToggleWishlist}
            >
              <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 rounded-full px-4 py-2">
              <Shield className="w-5 h-5" />
              <span className="font-medium">30-day money-back guarantee</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-3 text-xl">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span>Course Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
      "42 hours of on-demand video",
      "15 hands-on projects",
      "Downloadable resources",
      "Mobile and TV access",
      "Certificate of completion",
      "30-day money-back guarantee",
    ].map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700 font-medium">{feature}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-3xl shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Course Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Language</span>
            <span className="font-semibold">{course.language}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Last Updated</span>
            <span className="font-semibold">{course.lastUpdated}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Students</span>
            <span className="font-semibold">100</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Rating</span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{averageRating.toFixed(1)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
