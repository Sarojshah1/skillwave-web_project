
import { useState } from "react"
import { Play, CheckCircle, Pause } from "lucide-react"
import { ProgressBar } from "@/components/ui/progress-bar"
import { Badge } from "@/components/ui/badge"
import { CourseStats } from "./course-stats"


export function CourseCard({ enrollment, onContinue }) {
    console.log("Enrollment data:", enrollment)
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusBadge = () => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>
      case "paused":
        return <Badge variant="warning">Paused</Badge>
      default:
        return <Badge variant="info">In Progress</Badge>
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "paused":
        return <Pause className="w-5 h-5 text-yellow-500" />
      default:
        return <Play className="w-5 h-5 text-blue-500" />
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-600 bg-green-50"
      case "Intermediate":
        return "text-yellow-600 bg-yellow-50"
      case "Advanced":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
  
      <div className="relative overflow-hidden">
        <img
          src={`http://localhost:3000/thumbnails/${enrollment.course_id.thumbnail}`}
          alt={enrollment.course_id.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">{getStatusBadge()}</div>
        <div className="absolute top-3 right-3">
          <Badge className={getDifficultyColor(enrollment.course_id.level)}>{enrollment.course_id.level}</Badge>
        </div>
        {enrollment?.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
            <ProgressBar progress={enrollment?.progress} showLabel={false} className="text-white" />
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {enrollment.course_id.title}
            </h3>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {isExpanded
            ? enrollment.course_id.description
            : `${enrollment.course_id.description.substring(0, 100)}${enrollment.course_id.description > 100 ? "..." : ""}`}
          {enrollment.course_id.description > 100 && (
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

        <CourseStats course={enrollment.course_id} totalLessons={enrollment.course_id.lessons.length} />

        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => onContinue(enrollment)}
            className="w-full flex items-center justify-center gap-2 bg-[#49BBBD] hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {getStatusIcon()}
            {status === "completed" ? "Review Course" : "Continue Learning"}
          </button>
        </div>
      </div>
    </div>
  )
}
