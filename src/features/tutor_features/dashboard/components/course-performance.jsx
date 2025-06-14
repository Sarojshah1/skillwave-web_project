import { Users, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button.jsx"
import { Progress } from "@/components/ui/progress.jsx"
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils.js"

export function CoursePerformance({ coursePerformance, courses, className }) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Course Performance</CardTitle>
          <Button variant="outline" size="sm" className="h-8">
            View All
          </Button>
        </div>
        <CardDescription>Overview of your top performing courses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={coursePerformance}>
              <XAxis dataKey="name" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border rounded-lg shadow-lg">
                        <p className="font-medium">{payload[0].payload.name}</p>
                        <p className="text-sm text-gray-500">
                          Students: <span className="text-blue-600 font-medium">{payload[0].value}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Completion:{" "}
                          <span className="text-green-600 font-medium">{payload[0].payload.completion}%</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Rating: <span className="text-yellow-600 font-medium">{payload[0].payload.rating}/5</span>
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="students" fill="#3b82f6" name="Students" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-4">
          {courses.slice(0, 3).map((course, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-10 rounded-full ${
                    index === 0 ? "bg-blue-500" : index === 1 ? "bg-green-500" : "bg-amber-500"
                  }`}
                />
                <div>
                  <div className="font-medium">{course.title}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {course.students}
                    </span>
                    <span className="flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      {course.rating}/5
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">{course.progress}%</div>
                <Progress value={course.progress} className="h-2 w-20" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
