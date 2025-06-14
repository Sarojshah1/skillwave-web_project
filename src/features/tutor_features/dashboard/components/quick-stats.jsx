
import { useState, useEffect } from "react"
import { Users, BookOpen, FileText, DollarSign, Star, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function QuickStats() {
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    courses: 0,
    blogs: 0,
    earnings: 0,
    rating: 0,
    growth: 0,
  })

  // Animate stats on load
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats((prev) => ({
        students: Math.min(prev.students + 42, 1248),
        courses: Math.min(prev.courses + 1, 12),
        blogs: Math.min(prev.blogs + 1, 8),
        earnings: Math.min(prev.earnings + 415, 12450),
        rating: Math.min(prev.rating + 0.16, 4.8),
        growth: Math.min(prev.growth + 0.6, 18),
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800/30">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription className="text-blue-700 dark:text-blue-300 font-medium">Total Students</CardDescription>
            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl text-blue-900 dark:text-blue-50">
            {animatedStats.students.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-blue-700 dark:text-blue-300 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            +12% from last month
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800/30">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription className="text-emerald-700 dark:text-emerald-300 font-medium">
              Active Courses
            </CardDescription>
            <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <CardTitle className="text-2xl text-emerald-900 dark:text-emerald-50">{animatedStats.courses}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-emerald-700 dark:text-emerald-300 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            +2 new this month
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800/30">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription className="text-purple-700 dark:text-purple-300 font-medium">
              Published Blogs
            </CardDescription>
            <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <CardTitle className="text-2xl text-purple-900 dark:text-purple-50">{animatedStats.blogs}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-purple-700 dark:text-purple-300 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            +3 this month
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800/30">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription className="text-amber-700 dark:text-amber-300 font-medium">
              Monthly Earnings
            </CardDescription>
            <DollarSign className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <CardTitle className="text-2xl text-amber-900 dark:text-amber-50">
            ${animatedStats.earnings.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-amber-700 dark:text-amber-300 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            +18% from last month
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800/30">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription className="text-yellow-700 dark:text-yellow-300 font-medium">
              Average Rating
            </CardDescription>
            <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </div>
          <CardTitle className="text-2xl text-yellow-900 dark:text-yellow-50">
            {animatedStats.rating.toFixed(1)}/5.0
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-yellow-700 dark:text-yellow-300 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            +0.2 from last month
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 border-rose-200 dark:border-rose-800/30">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription className="text-rose-700 dark:text-rose-300 font-medium">Growth Rate</CardDescription>
            <TrendingUp className="h-4 w-4 text-rose-600 dark:text-rose-400" />
          </div>
          <CardTitle className="text-2xl text-rose-900 dark:text-rose-50">{animatedStats.growth}%</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-rose-700 dark:text-rose-300 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            +3% from last month
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
