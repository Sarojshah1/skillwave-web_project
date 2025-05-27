
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function WeeklyChallenge() {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-blue-800">Weekly Challenge</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-blue-700">Build a responsive navigation component using only CSS Grid</p>
          <div className="flex items-center justify-between text-xs text-blue-600">
            <span>Ends in 3 days</span>
            <span>🏆 Prize: $100</span>
          </div>
          <Button size="sm" className="w-full mt-2" variant="default">
            Join Challenge
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
