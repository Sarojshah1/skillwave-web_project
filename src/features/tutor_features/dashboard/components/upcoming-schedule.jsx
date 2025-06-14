import { Calendar, Clock, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx"
import { Button } from "@/components/ui/button.jsx"
import { Badge } from "@/components/ui/badge"

export function UpcomingSchedule({ schedule }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Upcoming Schedule</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Your upcoming classes and deadlines</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedule.map((item, index) => (
            <div key={index} className="flex gap-3">
              <div
                className={`min-w-[4px] rounded-full ${
                  item.type === "class" ? "bg-blue-500" : item.type === "assignment" ? "bg-amber-500" : "bg-purple-500"
                }`}
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{item.title}</div>
                  <Badge
                    variant={item.type === "class" ? "default" : item.type === "assignment" ? "secondary" : "outline"}
                  >
                    {item.type}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.time}
                </div>
                {item.course && (
                  <div className="text-sm text-muted-foreground flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {item.course}
                  </div>
                )}
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full mt-2">
            <Calendar className="h-4 w-4 mr-2" />
            View Full Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
