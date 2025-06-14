
import { useState } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"
import { Timer } from "../components/Timer"


export function QuizContent({ quiz, onComplete }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  const handleAnswerChange = (questionId, answer) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleSubmit = () => {
    const correctAnswers = quiz.questions.filter((q) => answers[q.id] === q.correctAnswer).length
    const totalQuestions = quiz.questions.length
    const calculatedScore = Math.round((correctAnswers / totalQuestions) * 100)

    setScore(calculatedScore)
    setSubmitted(true)
    onComplete(calculatedScore)
  }

  const allQuestionsAnswered = quiz.questions.every((q) => answers[q.id])
  const isPassing = score !== null && score >= quiz.passingScore

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{quiz.title}</h1>
        <p className="opacity-90">{quiz.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          <div className="bg-white/20 px-3 py-1 rounded-full">{quiz.questions.length} Questions</div>
          <div className="bg-white/20 px-3 py-1 rounded-full">Passing Score: {quiz.passingScore}%</div>
        </div>
      </div>

      <div className="flex justify-end">
        <Timer initialTime={quiz.timeLimit} isActive={!submitted} onTimeUp={handleSubmit} />
      </div>

      {submitted && score !== null && (
        <div
          className={`p-4 rounded-lg flex items-center ${
            isPassing ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
          }`}
        >
          {isPassing ? (
            <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
          )}
          <div>
            <p className={`font-semibold ${isPassing ? "text-green-800" : "text-red-800"}`}>
              {isPassing ? "Congratulations!" : "Not quite there yet"}
            </p>
            <p className={`text-sm ${isPassing ? "text-green-700" : "text-red-700"}`}>
              Your score: {score}% {isPassing ? "(Passed)" : `(${quiz.passingScore - score}% below passing)`}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {quiz.questions.map((question, index) => (
          <div
            key={question.id}
            className={`bg-white border rounded-lg shadow-sm overflow-hidden ${
              submitted
                ? answers[question.id] === question.correctAnswer
                  ? "border-green-200"
                  : "border-red-200"
                : "border-gray-200"
            }`}
          >
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-medium flex items-center">
                <span className="bg-gray-200 text-gray-700 h-6 w-6 rounded-full inline-flex items-center justify-center mr-2 text-sm">
                  {index + 1}
                </span>
                {question.text}
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => {
                  const isSelected = answers[question.id] === option
                  const isCorrect = option === question.correctAnswer

                  let optionClass = "border border-gray-200 hover:border-gray-300"

                  if (submitted) {
                    if (isCorrect) {
                      optionClass = "border-green-500 bg-green-50"
                    } else if (isSelected) {
                      optionClass = "border-red-500 bg-red-50"
                    }
                  } else if (isSelected) {
                    optionClass = "border-blue-500 bg-blue-50"
                  }

                  return (
                    <label
                      key={optionIndex}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${optionClass}`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={isSelected}
                        onChange={() => handleAnswerChange(question.id, option)}
                        disabled={submitted}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-3">{option}</span>
                      {submitted && isCorrect && <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />}
                    </label>
                  )
                })}
              </div>

              {submitted && answers[question.id] !== question.correctAnswer && (
                <div className="mt-3 text-sm text-green-700 bg-green-50 p-2 rounded border border-green-200">
                  <strong>Correct answer:</strong> {question.correctAnswer}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {!submitted && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Quiz
          </button>
        </div>
      )}

      {submitted && isPassing && (
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
            Generate Certificate
          </button>
        </div>
      )}
    </div>
  )
}
