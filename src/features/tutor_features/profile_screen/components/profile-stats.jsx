import { Users, BookOpen, Star, TrendingUp, Award, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfileStats() {
  const stats = [
    {
      title: "Total Students",
      value: "1,248",
      change: "+12%",
      icon: Users,
      color: "blue",
      description: "Active learners",
    },
    {
      title: "Courses Created",
      value: "24",
      change: "+3",
      icon: BookOpen,
      color: "green",
      description: "Published courses",
    },
    {
      title: "Average Rating",
      value: "4.8",
      change: "+0.2",
      icon: Star,
      color: "yellow",
      description: "Student feedback",
    },
    {
      title: "Teaching Hours",
      value: "2,450",
      change: "+120",
      icon: Clock,
      color: "purple",
      description: "Total hours taught",
    },
    {
      title: "Completion Rate",
      value: "89%",
      change: "+5%",
      icon: TrendingUp,
      color: "emerald",
      description: "Course completion",
    },
    {
      title: "Achievements",
      value: "15",
      change: "+2",
      icon: Award,
      color: "amber",
      description: "Earned badges",
    },
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-700 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-800/30 dark:text-blue-300",
      green:
        "from-green-50 to-green-100 border-green-200 text-green-700 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-800/30 dark:text-green-300",
      yellow:
        "from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-700 dark:from-yellow-900/20 dark:to-yellow-800/20 dark:border-yellow-800/30 dark:text-yellow-300",
      purple:
        "from-purple-50 to-purple-100 border-purple-200 text-purple-700 dark:from-purple-900/20 dark:to-purple-800/20 dark:border-purple-800/30 dark:text-purple-300",
      emerald:
        "from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-700 dark:from-emerald-900/20 dark:to-emerald-800/20 dark:border-emerald-800/30 dark:text-emerald-300",
      amber:
        "from-amber-50 to-amber-100 border-amber-200 text-amber-700 dark:from-amber-900/20 dark:to-amber-800/20 dark:border-amber-800/30 dark:text-amber-300",
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat, index) => (
        <Card key={index} className={`bg-gradient-to-br ${getColorClasses(stat.color)}`}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="font-medium">{stat.title}</CardDescription>
              <stat.icon className="h-4 w-4" />
            </div>
            <CardTitle className="text-2xl">{stat.value}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs flex items-center justify-between">
              <span>{stat.description}</span>
              <span className="font-medium">{stat.change}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
