import { Star, Users, Award, Zap, TrendingUp, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge.jsx"

export function AchievementsBadges({ achievements }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
        <CardDescription>Your teaching milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {achievement.icon === "star" && <Star className="h-6 w-6" />}
                {achievement.icon === "users" && <Users className="h-6 w-6" />}
                {achievement.icon === "award" && <Award className="h-6 w-6" />}
                {achievement.icon === "zap" && <Zap className="h-6 w-6" />}
                {achievement.icon === "trending-up" && <TrendingUp className="h-6 w-6" />}
                {achievement.icon === "book-open" && <BookOpen className="h-6 w-6" />}
              </div>
              <div className="text-xs font-medium">{achievement.name}</div>
              {achievement.unlocked ? (
                <Badge variant="secondary" className="mt-1 text-[10px] bg-amber-100 text-amber-800 border-amber-200">
                  Unlocked
                </Badge>
              ) : (
                <div className="text-[10px] text-gray-500 mt-1">{achievement.progress}</div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Teaching Level</div>
          <div className="bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full"
              style={{ width: "65%" }}
            />
          </div>
          <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
            <div>Level 7: Expert</div>
            <div>65% to Level 8</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
