import { useState } from "react"
import { Settings } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { CourseStats } from "./course-stats"

export function CourseCard({ course, onManageCourse }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-600 bg-green-50 border-green-200"
      case "Intermediate":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "Advanced":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const completedLessons = course.lessons.filter((lesson) => lesson.isCompleted).length
  const progress = course.lessons.length > 0 ? (completedLessons / course.lessons.length) * 100 : 0

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
      {/* Course Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge className={getDifficultyColor(course.level)}>{course.level}</Badge>
        </div>
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-white text-xs mt-1 block">{Math.round(progress)}% Complete</span>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {isExpanded
            ? course.description
            : `${course.description.substring(0, 100)}${course.description.length > 100 ? "..." : ""}`}
          {course.description.length > 100 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
              className="text-blue-500 hover:text-blue-600 ml-1 font-medium"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </p>

        <CourseStats course={course} />

        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => onManageCourse(course)}
            className="w-full flex items-center justify-center gap-2 bg-[#49BBBD] hover:bg-[#3a9a9c] text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Settings className="w-5 h-5" />
            Manage Content
          </button>
        </div>
      </div>
    </div>
  )
}
