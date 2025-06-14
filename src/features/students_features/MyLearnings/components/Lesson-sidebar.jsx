import { useState } from "react"
import { BookOpen, CheckCircle, PlayCircle, HelpCircle } from "lucide-react"


export function LessonSidebar({
  lessons,
  quizzes,
  activeLesson,
  activeQuiz,
  onSelectLesson,
  onSelectQuiz,
}) {
  const [expandedSection, setExpandedSection] = useState("lessons")

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Course Content</h2>
        <p className="text-sm text-gray-500 mt-1">
          {lessons?.length} lessons • {quizzes?.length} quizzes
        </p>
      </div>

      {/* Lessons Section */}
      <div className="border-b border-gray-200">
        <button
          className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50"
          onClick={() => toggleSection("lessons")}
        >
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
            <span className="font-medium">Lessons</span>
          </div>
          <svg
            className={`h-5 w-5 text-gray-500 transform transition-transform ${
              expandedSection === "lessons" ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSection === "lessons" && (
          <div className="pl-4 pr-2 pb-2">
            {lessons?.map((lesson) => (
              <button
                key={lesson.id}
                className={`flex items-center w-full p-3 rounded-lg mb-1 text-left transition-colors ${
                  activeLesson === lesson.id
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => onSelectLesson(lesson.id)}
              >
                <div
                  className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                    lesson.isCompleted
                      ? "bg-green-100 text-green-600"
                      : activeLesson === lesson.id
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {lesson.isCompleted ? <CheckCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{lesson.title}</p>
                  <p className="text-xs text-gray-500">{lesson.duration}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quizzes Section */}
      <div>
        <button
          className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50"
          onClick={() => toggleSection("quizzes")}
        >
          <div className="flex items-center">
            <HelpCircle className="h-5 w-5 text-purple-500 mr-2" />
            <span className="font-medium">Quizzes</span>
          </div>
          <svg
            className={`h-5 w-5 text-gray-500 transform transition-transform ${
              expandedSection === "quizzes" ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSection === "quizzes" && (
          <div className="pl-4 pr-2 pb-2">
            {quizzes.map((quiz) => (
              <button
                key={quiz.id}
                className={`flex items-center w-full p-3 rounded-lg mb-1 text-left transition-colors ${
                  activeQuiz === quiz.id
                    ? "bg-purple-50 text-purple-700"
                    : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => onSelectQuiz(quiz.id)}
              >
                <div
                  className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                    activeQuiz === quiz.id ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{quiz.title}</p>
                  <p className="text-xs text-gray-500">{quiz.questions.length} questions</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
