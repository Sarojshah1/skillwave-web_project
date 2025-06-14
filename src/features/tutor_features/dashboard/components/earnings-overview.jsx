import { TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export function EarningsOverview({ revenueData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings Overview</CardTitle>
        <CardDescription>Your revenue for the past 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border rounded-lg shadow-lg">
                        <p className="font-medium">{payload[0].payload.month}</p>
                        <p className="text-sm text-gray-500">
                          Revenue: <span className="text-green-600 font-medium">${payload[0].value}</span>
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <div className="text-sm text-green-700 dark:text-green-300">Total Earnings</div>
            <div className="text-xl font-bold text-green-900 dark:text-green-50">Rs.48,250</div>
            <div className="text-xs text-green-600 dark:text-green-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18% from last year
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="text-sm text-blue-700 dark:text-blue-300">Pending Payout</div>
            <div className="text-xl font-bold text-blue-900 dark:text-blue-50">Rs.3,450</div>
            <div className="text-xs text-blue-600 dark:text-blue-400">Next payout: Jun 30</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
