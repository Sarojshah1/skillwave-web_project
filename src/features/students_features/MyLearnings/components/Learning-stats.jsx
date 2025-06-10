import { BookOpen, Trophy, Clock, TrendingUp } from "lucide-react"


export function LearningStats({ enrollments }) {
  const totalCourses = enrollments.length
  const completedCourses = enrollments.filter((e) => e.status === "completed").length
  const totalLessons = enrollments.reduce((sum, e) => sum + e.totalLessons, 0)
  const completedLessons = enrollments.reduce((sum, e) => sum + e.completedLessons, 0)
  const averageProgress = enrollments.reduce((sum, e) => sum + e.progress, 0) / totalCourses || 0

  const stats = [
    {
      icon: BookOpen,
      label: "Total Courses",
      value: totalCourses,
      color: "text-blue-500 bg-blue-50",
    },
    {
      icon: Trophy,
      label: "Completed",
      value: completedCourses,
      color: "text-green-500 bg-green-50",
    },
    {
      icon: Clock,
      label: "Lessons Done",
      value: `${30}/${40}`,
      color: "text-purple-500 bg-purple-50",
    },
    {
      icon: TrendingUp,
      label: "Avg Progress",
      value: `${Math.round(averageProgress)}%`,
      color: "text-orange-500 bg-orange-50",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-3`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
