
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Award, MessageSquare, Star } from "lucide-react"

const activities = [
  {
    icon: Award,
    iconColor: "text-yellow-500",
    user: "Sarah Wilson",
    action: 'earned the "Helpful Contributor" badge',
    time: "2 hours ago",
  },
  {
    icon: MessageSquare,
    iconColor: "text-blue-500",
    user: "Tom Brown",
    action: 'posted in "JavaScript Tips"',
    time: "4 hours ago",
  },
  {
    icon: Star,
    iconColor: "text-orange-500",
    user: "Lisa Chen",
    action: "received 50 upvotes",
    time: "6 hours ago",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm space-y-2">
          {activities.map((activity, index) => {
            const IconComponent = activity.icon
            return (
              <div key={index} className="flex items-start space-x-2">
                <IconComponent className={`h-4 w-4 ${activity.iconColor} mt-0.5`} />
                <div>
                  <p className="text-xs">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
