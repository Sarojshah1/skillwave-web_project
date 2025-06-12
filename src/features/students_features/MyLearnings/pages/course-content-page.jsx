
import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { BookOpen, CheckCircle } from "lucide-react"
import { LessonSidebar } from "../components/Lesson-sidebar"
import { LessonContent } from "../components/Lesson-content"
import { QuizContent } from "../components/Quiz-content"
import { Certificate } from "../components/Certificate"
import { useCourseById } from "@/features/shared_features/courseDetailsPage/hooks/useCourseById"
// import { dummyCourse, dummyUserProgress } from "../../data/dummy-course"


export default function CourseContentPage() {
     const { id } = useParams(); 
     console.log("Course ID:", id)
  const { data, isLoading, isError, error } = useCourseById(id);
  const [course, setCourse] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [showCertificate, setShowCertificate] = useState(false)
  const [loading, setLoading] = useState(false)

    useEffect(() => {
  if (data) {
    console.log("Fetched course data:", data)
    setCourse(data)
    setActiveLesson(data.lessons?.[0]?._id || null)
  }
}, [data])
console.log("Course state:", course)
  const currentLesson = activeLesson ? course?.lessons.find((lesson) => lesson._id === activeLesson) : null
  const currentQuiz = activeQuiz ? course?.quizzes.find((quiz) => quiz.id === activeQuiz) : null

  const handleSelectLesson = (lessonId) => {
    setActiveLesson(lessonId)
    setActiveQuiz(null)
    setShowCertificate(false)
  }

  const handleSelectQuiz = (quizId) => {
    setActiveQuiz(quizId)
    setActiveLesson(null)
    setShowCertificate(false)
  }

  const handleMarkAsRead = () => {
    if (!activeLesson) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {

      const updatedLessons = course?.lessons.map((lesson) =>
        lesson.id === activeLesson ? { ...lesson, isCompleted: true } : lesson,
      )

      // Add to completed lessons if not already there
      if (!userProgress.completedLessons.includes(activeLesson)) {
        setUserProgress({
          ...userProgress,
          completedLessons: [...userProgress.completedLessons, activeLesson],
          progress: Math.round(((userProgress.completedLessons.length + 1) / course.lessons.length) * 100),
        })
      }

      setCourse({
        ...course,
        lessons: updatedLessons,
      })

      setLoading(false)
    }, 800)
  }

  const handleQuizComplete = (score) => {
    if (!activeQuiz) return

    // Add quiz result
    const quizResult = {
      quizId: activeQuiz,
      score,
      completed: true,
      date: new Date().toISOString(),
    }

    setUserProgress({
      ...userProgress,
      quizResults: [...userProgress.quizResults, quizResult],
    })

    // If passing score and all lessons completed, show certificate
    const quiz = course.quizzes.find((q) => q.id === activeQuiz)
    if (quiz && score >= quiz.passingScore && userProgress.completedLessons.length === course.lessons.length) {
      setTimeout(() => {
        setShowCertificate(true)
      }, 2000)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">{course?.title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleMarkAsRead}
            disabled={!activeLesson || loading || (currentLesson && currentLesson.isCompleted)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {loading ? (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <span>{currentLesson?.isCompleted ? "Completed" : "Mark as Complete"}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0 overflow-y-auto">
          <LessonSidebar
            lessons={course?.lessons}
            quizzes={course?.quizzes}
            activeLesson={activeLesson}
            activeQuiz={activeQuiz}
            onSelectLesson={handleSelectLesson}
            onSelectQuiz={handleSelectQuiz}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {showCertificate ? (
            <Certificate
              studentName="John Doe"
              courseName={course?.title}
              instructorName={course?.instructor}
              completionDate={new Date()}
            />
          ) : activeQuiz && currentQuiz ? (
            <QuizContent quiz={currentQuiz} onComplete={handleQuizComplete} />
          ) : (
            <LessonContent lesson={currentLesson} />
          )}
        </div>
      </div>
    </div>
  )
}
