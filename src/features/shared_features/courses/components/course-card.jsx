
import { useState } from "react"
import { Clock, Star, User, BookOpen } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function CourseCard({
  id,
  thumbnail,
  title,
  description,
  price,
  duration,
  level,
  category,
  creator,
  rating = 4.5,
  studentsCount = 0,
  isFeatured = false,
  onEnroll,
  onClick,
}) {
  const [isReadMore, setIsReadMore] = useState(false)

  const toggleReadMore = (e) => {
    e.stopPropagation()
    setIsReadMore(!isReadMore)
  }

  const handleEnroll = (e) => {
    e.stopPropagation()
    onEnroll(id)
  }

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-blue-100 text-blue-800"
      case "Advanced":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer h-full flex flex-col",
        isFeatured && "border-primary border-2",
      )}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={thumbnail.startsWith("http") ? thumbnail : `/thumbnails/${thumbnail}`}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 left-0 m-3">
          <Badge variant="secondary" className={getLevelColor(level)}>
            {level}
          </Badge>
        </div>
        {isFeatured && (
          <div className="absolute top-0 right-0 m-3">
            <Badge variant="default" className="bg-amber-500">
              Featured
            </Badge>
          </div>
        )}
        <Badge variant="outline" className="absolute bottom-2 left-2 bg-white/80">
          {category}
        </Badge>
      </div>

      <CardHeader className="p-4 pb-0">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{title}</h3>
      </CardHeader>

      <CardContent className="p-4 flex-grow">
        <div className="text-gray-700 text-sm mb-3">
          {isReadMore ? description : `${description.substring(0, 100)}...`}
          {description.length > 100 && (
            <button onClick={toggleReadMore} className="text-primary font-medium ml-1 hover:underline">
              {isReadMore ? "Read Less" : "Read More"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 mb-2">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-gray-400" />
            {duration}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-amber-400" />
            {rating} ({rating >= 4.5 ? "Excellent" : "Good"})
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1 text-gray-400" />
            {creator}
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1 text-gray-400" />
            {studentsCount} students
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-4 flex justify-between items-center border-t">
        <span className="text-xl font-bold text-primary">NPR {price}</span>
        <Button onClick={handleEnroll} size="sm" className="bg-[#49BBBD] text-white ">
          Enroll Now
        </Button>
      </CardFooter>
    </Card>
  )
}
