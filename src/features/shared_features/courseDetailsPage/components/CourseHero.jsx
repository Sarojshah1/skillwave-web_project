
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, Users, Globe, TrendingUp, Heart, Share } from "lucide-react"
import { calculateDiscount, calculateAverageRating } from "@/lib/utils"

export function CourseHero({ course,reviews ,isWishlisted, onToggleWishlist }) {
  const averageRating = calculateAverageRating(reviews)
  const discountPercentage = course.price 

  return (
    <div className="overflow-hidden rounded-3xl shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50/30 py-20">
      <div className="relative">
        <img src={`http://localhost:3000/thumbnails/${course.thumbnail}`|| "/placeholder.svg"} alt={course.title} className="w-full h-96 object-contain" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-6 right-6 flex space-x-3">
          <Button
            size="icon"
            variant="default"
            className="rounded-full backdrop-blur-sm border-white/30 "
            onClick={onToggleWishlist}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-white"}`} />
          </Button>
          <Button
            size="icon"
            variant="default"
            className="rounded-fullbackdrop-blur-sm border-white/30 "
          >
            <Share className="w-5 h-5 text-white" />
          </Button>
        </div>

        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-[#49BBBD] text-white border-0 px-4 py-2 text-sm">
              {course.category_id.name}
            </Badge>
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2">
              {course.level}
            </Badge>
        
            <Badge className="bg-green-500/20 backdrop-blur-sm text-green-100 border-green-300/30 px-4 py-2">
              <TrendingUp className="w-4 h-4 mr-1" />
              Bestseller
            </Badge>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{course.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-white/90">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-lg">{averageRating.toFixed(1)}</span>
              <span>({reviews.length} reviews)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-[#49BBBD]" />
              <span className="font-medium">100 students</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span className="font-medium">{course.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
