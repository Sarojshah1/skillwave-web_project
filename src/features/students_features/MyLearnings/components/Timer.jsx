
import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export function Timer({ initialTime, onTimeUp, isActive = true }) {
  const [time, setTime] = useState(initialTime)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval)
          onTimeUp?.()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, onTimeUp])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
  }

  const getColorClass = () => {
    if (time < 60) return "text-red-600" // less than 1 minute
    if (time < 180) return "text-yellow-600" // less than 3 minutes
    return "text-blue-600"
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md flex items-center space-x-3">
      <Clock className="h-6 w-6 text-gray-500" />
      <div>
        <p className="text-sm font-medium text-gray-500">Time Remaining</p>
        <p className={`text-2xl font-bold ${getColorClass()}`}>{formatTime(time)}</p>
      </div>
    </div>
  )
}
