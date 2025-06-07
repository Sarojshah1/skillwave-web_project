import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User } from "lucide-react"
import { formatPrice } from "@/lib/utils"

const CourseCard= ({ course }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="p-0">
        <img
          src={`http://localhost:3000/thumbnails/${course.thumbnail}` || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-48 object-contain rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant={
              course.level === "Beginner" ? "secondary" : course.level === "Intermediate" ? "default" : "destructive"
            }
          >
            {course.level}
          </Badge>
          <span className="text-lg font-bold text-green-600">{formatPrice(course.price)}</span>
        </div>

        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{course.creator}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium">{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${course.progress}%` }} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCard
