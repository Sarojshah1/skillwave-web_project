
import { useState } from "react"
import { Bell, Mail, MessageSquare, Calendar, DollarSign, Users, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx"
import { Switch } from "@/components/ui/switch.jsx"
import { Button } from "@/components/ui/button"

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState({
    newStudents: true,
    courseUpdates: true,
    messages: true,
    payments: true,
    marketing: false,
    weeklyReport: true,
  })

  const [pushNotifications, setPushNotifications] = useState({
    newMessages: true,
    classReminders: true,
    assignments: true,
    reviews: false,
  })

  const handleEmailToggle = (key) => {
    setEmailNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handlePushToggle = (key) => {
    setPushNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>Choose what email notifications you'd like to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">New Student Enrollments</h3>
                <p className="text-sm text-gray-500">Get notified when students enroll in your courses</p>
              </div>
            </div>
            <Switch checked={emailNotifications.newStudents} onCheckedChange={() => handleEmailToggle("newStudents")} />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Course Updates</h3>
                <p className="text-sm text-gray-500">Updates about your published courses</p>
              </div>
            </div>
            <Switch
              checked={emailNotifications.courseUpdates}
              onCheckedChange={() => handleEmailToggle("courseUpdates")}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium">Messages & Comments</h3>
                <p className="text-sm text-gray-500">New messages and comments from students</p>
              </div>
            </div>
            <Switch checked={emailNotifications.messages} onCheckedChange={() => handleEmailToggle("messages")} />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <DollarSign className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="font-medium">Payment Notifications</h3>
                <p className="text-sm text-gray-500">Earnings, payouts, and payment updates</p>
              </div>
            </div>
            <Switch checked={emailNotifications.payments} onCheckedChange={() => handleEmailToggle("payments")} />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Mail className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-medium">Marketing & Promotions</h3>
                <p className="text-sm text-gray-500">Tips, feature updates, and promotional content</p>
              </div>
            </div>
            <Switch checked={emailNotifications.marketing} onCheckedChange={() => handleEmailToggle("marketing")} />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-medium">Weekly Reports</h3>
                <p className="text-sm text-gray-500">Weekly summary of your teaching activity</p>
              </div>
            </div>
            <Switch
              checked={emailNotifications.weeklyReport}
              onCheckedChange={() => handleEmailToggle("weeklyReport")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>Manage browser and mobile push notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">New Messages</h3>
                <p className="text-sm text-gray-500">Instant notifications for new messages</p>
              </div>
            </div>
            <Switch checked={pushNotifications.newMessages} onCheckedChange={() => handlePushToggle("newMessages")} />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Class Reminders</h3>
                <p className="text-sm text-gray-500">Reminders for upcoming classes and meetings</p>
              </div>
            </div>
            <Switch
              checked={pushNotifications.classReminders}
              onCheckedChange={() => handlePushToggle("classReminders")}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium">Assignment Submissions</h3>
                <p className="text-sm text-gray-500">When students submit assignments</p>
              </div>
            </div>
            <Switch checked={pushNotifications.assignments} onCheckedChange={() => handlePushToggle("assignments")} />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Users className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="font-medium">Course Reviews</h3>
                <p className="text-sm text-gray-500">New reviews and ratings for your courses</p>
              </div>
            </div>
            <Switch checked={pushNotifications.reviews} onCheckedChange={() => handlePushToggle("reviews")} />
          </div>
        </CardContent>
      </Card>

      {/* Notification Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Schedule</CardTitle>
          <CardDescription>Set quiet hours and notification frequency</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Quiet Hours Start</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="22:00">10:00 PM</option>
                <option value="23:00">11:00 PM</option>
                <option value="00:00">12:00 AM</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Quiet Hours End</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="07:00">7:00 AM</option>
                <option value="08:00">8:00 AM</option>
                <option value="09:00">9:00 AM</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email Digest Frequency</label>
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option value="immediate">Immediate</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          Save Notification Settings
        </Button>
      </div>
    </div>
  )
}
