
import { Card, CardContent, CardFooter, CardHeader } from "../../../../components/ui/card"
import { Badge } from "../../../../components/ui/Badge"
import { Button } from "../../../../components/ui/Button"
import { RatingStars } from "../../../../components/ui/rating-stars"
import { Clock, Users, BookOpen, Award } from "../../../../components/ui/icons"
import { formatPrice, calculateDiscount } from "../../../../lib/utils"

export function CourseCard({ course, onCourseClick }) {
  const discountPercentage = course.price

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden border-0 shadow-lg">
      <CardHeader className="p-0 relative">
        <div className="relative overflow-hidden rounded-t-3xl">
          <img
            src={`http://localhost:3000/thumbnails/${course.thumbnail}`}
            alt={course.title}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-3 py-1">
              {course.category_id.name}
            </Badge>
            <div className="flex flex-col gap-2 text-white">
              {discountPercentage}
              <Badge variant="secondary" className="bg-white/90 text-gray-800">
                {course.level}
              </Badge>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2">
            <img
              src={`http://localhost:3000/profile/${course.created_by.profile_picture}` }
              alt={course.created_by.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium text-gray-800">{course.created_by.name}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <RatingStars rating={4.5} size="sm" />
            <span className="text-sm font-bold text-gray-900">{4.5}</span>
            <span className="text-sm text-gray-500">({course.reviews.length})</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">{course.description}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {["JavaScript", "Frontend", "WebDev"].slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border-blue-200">
              {tag}
            </Badge>
          ))}
          {["JavaScript", "Frontend", "WebDev"].length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-1 bg-gray-50 text-gray-600">
              +{course.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.lessons.length} lessons</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">{formatPrice(course.price)}</span>
            {course.price && (
              <span className="text-sm text-gray-500 line-through">{formatPrice(course.price)}</span>
            )}
          </div>
          <div className="flex items-center space-x-1 text-green-600">
            <Award className="w-4 h-4" />
            <span className="text-xs font-medium">Certificate</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          variant="default"
          className="w-full font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          onClick={() => onCourseClick(course._id)}
        >
          Enroll Now
        </Button>
      </CardFooter>
    </Card>
  )
}
