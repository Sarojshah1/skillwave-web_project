import { Star, Users, Clock, BookOpen } from "lucide-react"


export function CourseStats({ course, totalLessons,}) {
  return (
    <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
      <div className="flex items-center gap-1">
        <Clock className="w-4 h-4 text-green-500" />
        <span>{course.duration}</span>
      </div>
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-yellow-500 fill-current" />
        <span>4.5</span>
      </div>
    </div>
  )
}
