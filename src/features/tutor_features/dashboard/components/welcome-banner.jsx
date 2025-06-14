
import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WelcomeBanner({ tutorName }) {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Time-based greeting
  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }

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

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              {getGreeting()}, {tutorName}!
            </h1>
            <p className="text-blue-100 mb-4">
              {formatDate(currentTime)} • {formatTime(currentTime)}
            </p>
            <p className="text-blue-100 italic border-l-4 border-blue-400 pl-3 max-w-xl">"{todaysQuote}"</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center mb-2">
              <div className="text-sm text-blue-100">Your Rating</div>
              <div className="flex items-center gap-1 text-yellow-300 mt-1">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current text-yellow-300/40" />
                <span className="ml-1 text-white font-bold">4.8</span>
              </div>
            </div>
            <Button className="bg-white text-blue-700 hover:bg-blue-50">View Profile</Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full opacity-50 blur-2xl" />
      <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-500 rounded-full opacity-50 blur-2xl" />
    </div>
  )
}
