import { Clock, BookOpen, Award } from 'lucide-react'
import { StatsCard } from "@/components/ui/stats-card"

export function CourseStats({ course }) {
  return (
    <div className="flex flex-wrap gap-4">
      <StatsCard icon={<Clock className="w-4 h-4" />} label="Duration" value={course.duration} />
      <StatsCard icon={<BookOpen className="w-4 h-4" />} label="Lessons" value={course.lessons.length} />
      <StatsCard icon={<Award className="w-4 h-4" />} label="Quizzes" value={course.quizzes.length} />
    </div>
  )
}
