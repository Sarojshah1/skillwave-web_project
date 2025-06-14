import { PlusCircle, FileText, Upload, Calendar, CheckCircle2, Bell, BarChart3, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button.jsx"
import { Badge } from "@/components/ui/badge.jsx"

export function ActionShortcuts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Shortcuts to common tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button className="h-auto flex-col py-4 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <PlusCircle className="h-6 w-6 mb-2" />
            <span>Create Course</span>
          </Button>
          <Button className="h-auto flex-col py-4 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
            <FileText className="h-6 w-6 mb-2" />
            <span>Write Blog</span>
          </Button>
          <Button className="h-auto flex-col py-4 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
            <Upload className="h-6 w-6 mb-2" />
            <span>Upload Resources</span>
          </Button>
          <Button className="h-auto flex-col py-4 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700">
            <Calendar className="h-6 w-6 mb-2" />
            <span>Schedule Class</span>
          </Button>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-sm">Grade Assignments</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              5
            </Badge>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Announcements</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-purple-500" />
              <span className="text-sm">Analytics</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
