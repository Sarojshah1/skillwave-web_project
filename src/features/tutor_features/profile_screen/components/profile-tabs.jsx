import { User, Briefcase, Shield, Bell, Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card.jsx"
import { Button } from "@/components/ui/button"

export function ProfileTabs({ activeTab, onTabChange }) {
  const tabs = [
    {
      id: "personal",
      label: "Personal Info",
      icon: User,
      description: "Basic information",
    },
    {
      id: "professional",
      label: "Professional",
      icon: Briefcase,
      description: "Work & education",
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
      description: "Password & privacy",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      description: "Email & alerts",
    },
    {
      id: "social",
      label: "Social Links",
      icon: Share2,
      description: "Connect accounts",
    },
  ]

  return (
    <Card>
      <CardContent className="p-2">
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={`w-full justify-start h-auto p-3 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <div className="flex items-center gap-3 w-full">
                <div
                  className={`p-2 rounded-lg ${activeTab === tab.id ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"}`}
                >
                  <tab.icon className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">{tab.label}</div>
                  <div
                    className={`text-xs ${activeTab === tab.id ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`}
                  >
                    {tab.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}
