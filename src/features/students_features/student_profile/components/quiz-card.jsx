import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Calendar, Target } from "lucide-react"


const QuizCard = ({ quiz }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-100"
    if (score >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getScoreBadge = (score) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    return "Needs Improvement"
  }

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Brain className="w-8 h-8 text-purple-500" />
          <Badge className={getScoreColor(quiz.score)}>{getScoreBadge(quiz.score)}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-lg mb-2">{quiz.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{quiz.description}</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Score</span>
            </div>
            <span className="text-2xl font-bold text-purple-600">{quiz.score}%</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Completed on {new Date(quiz.completionDate).toLocaleDateString()}</span>
          </div>

          <div className="text-sm text-gray-500">
            Questions answered: {Math.round((quiz.score / 100) * quiz.totalQuestions)}/{quiz.totalQuestions}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default QuizCard
