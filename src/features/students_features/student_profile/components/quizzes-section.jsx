import React from "react"
import QuizCard from "./quiz-card"


const QuizzesSection = ({ quizzes }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quiz Results</h2>
        <span className="text-gray-500">{quizzes.length} quizzes completed</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  )
}

export default QuizzesSection
