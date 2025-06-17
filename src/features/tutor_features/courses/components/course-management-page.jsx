import { useState } from "react"
import { ArrowLeft, BookOpen, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddLessonButton } from "@/features/tutor_features/lessons/components/add-lesson-button"
import { AddQuizButton } from "@/features/tutor_features/quizes/components/add-quiz-button"
import { LessonList } from "@/features/tutor_features/lessons/components/lesson-list"

export function CourseManagementPage({ course, onBack }) {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleContentAdded = () => {
    setRefreshKey((prev) => prev + 1)
  }

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

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Button>
      </div>

      {/* Course Info */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <img
              src={course.thumbnail || "/placeholder.svg"}
              alt={course.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
                <Badge className={getDifficultyColor(course.level)}>{course.level}</Badge>
              </div>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {course.lessons.length} Lessons
                </div>
                <div className="flex items-center gap-1">
                  <HelpCircle className="w-4 h-4" />
                  {course.quizzes.length} Quizzes
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <AddLessonButton courseId={course.id} onLessonAdded={handleContentAdded} />
        <AddQuizButton courseId={course.id} onQuizAdded={handleContentAdded} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Course Lessons ({course.lessons.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LessonList lessons={course.lessons} key={refreshKey} />
        </CardContent>
      </Card>
    </div>
  )
}
