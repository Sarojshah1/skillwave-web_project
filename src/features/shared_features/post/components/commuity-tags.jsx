
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { label: "Total Members", value: "12,847" },
  { label: "Posts Today", value: "156" },
  { label: "Online Now", value: "1,234", className: "text-green-600" },
]

export function CommunityStats() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Community Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{stat.label}</span>
            <span className={`font-semibold ${stat.className || ""}`}>{stat.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
