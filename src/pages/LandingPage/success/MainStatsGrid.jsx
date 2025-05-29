import StatCard from "./StatCard"
import { GraduationCap, Trophy, Users, Clock } from "lucide-react"

const mainStats = [
  {
    value: 15000,
    suffix: "+",
    label: "Active Students",
    icon: <GraduationCap className="h-8 w-8" />,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    description: "Students enrolled across all courses",
  },
  {
    value: 89,
    suffix: "%",
    label: "Success Rate",
    icon: <Trophy className="h-8 w-8" />,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
    description: "Students who complete their courses",
  },
  {
    value: 150,
    suffix: "+",
    label: "Expert Instructors",
    icon: <Users className="h-8 w-8" />,
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-50",
    description: "Industry professionals teaching",
  },
  {
    value: 8,
    suffix: " Years",
    label: "Experience",
    icon: <Clock className="h-8 w-8" />,
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    description: "Average instructor experience",
  },
]

export default function MainStatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {mainStats.map((stat, index) => (
        <StatCard key={index} stat={stat} index={index} />
      ))}
    </div>
  )
}
