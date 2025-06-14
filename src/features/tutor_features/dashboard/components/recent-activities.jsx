import { MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx"
import { Button } from "@/components/ui/button.jsx"
import { Badge } from "@/components/ui/badge.jsx"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivities({ activities }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Activities</CardTitle>
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            New
          </Badge>
        </div>
        <CardDescription>Latest updates from your courses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>
                  <span className="text-muted-foreground"> {activity.action}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              {activity.type === "comment" && (
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" className="w-full mt-2">
            View All Activities
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
