
import { useState, useEffect } from "react"

import { useDashboardData } from "../components/use-dashboard-data"

import { WelcomeBanner } from "../components/welcome-banner"
import { QuickStats } from "../components/quick-stats"
import { CoursePerformance } from "../components/course-performance"
import { UpcomingSchedule } from "../components/upcoming-schedule"
import { EarningsOverview } from "../components/earnings-overview"
import { RecentActivities } from "../components/recent-activities"
import { StudentInteraction } from "../components/student-interaction"
import { ActionShortcuts } from "../components/action-shortcuts"
import { StudentDemographics } from "../components/student-demographics"
import { AchievementsBadges } from "../components/achievements-badges"
import { useGlobalAuth } from "@/hooks/useAuth"

export function DashboardContent() {
  const { isLoggedIn, profile, logout } = useGlobalAuth();
  const dashboardData = useDashboardData()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    courses: 0,
    blogs: 0,
    earnings: 0,
    rating: 0,
    growth: 0,
  })
  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }

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

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // Format date
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Format time
  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  // Quote of the day
  const quotes = [
    "Education is not the filling of a pail, but the lighting of a fire.",
    "The beautiful thing about learning is that no one can take it away from you.",
    "The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates. The great teacher inspires.",
    "Teaching is the greatest act of optimism.",
    "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
  ]
  const todaysQuote = quotes[Math.floor(currentTime.getDate() % quotes.length)]
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  return (
    <div className="space-y-6">
      <WelcomeBanner tutorName={profile?.name} />
      <QuickStats metrics={dashboardData.metrics} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    
        <CoursePerformance
          coursePerformance={dashboardData.coursePerformance}
          courses={dashboardData.courses}
          className="lg:col-span-2"
        />
        <UpcomingSchedule schedule={dashboardData.schedule} />
        <EarningsOverview revenueData={dashboardData.revenueData} />

        {/* Recent Activities */}
        <RecentActivities activities={dashboardData.activities} />

        {/* Student Interaction */}
        <StudentInteraction
          messages={dashboardData.messages}
          questions={dashboardData.questions}
          reviews={dashboardData.reviews}
        />

        {/* Action Shortcuts */}
        <ActionShortcuts />

        {/* Student Demographics */}
        <StudentDemographics demographics={dashboardData.demographics} />

        {/* Achievements & Badges */}
        <AchievementsBadges achievements={dashboardData.achievements} />
      </div>
    </div>
  )
}
