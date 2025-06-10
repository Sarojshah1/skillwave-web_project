import  React from "react"
import { User, BookOpen, Award, Brain, Settings } from "lucide-react"


const tabs = [
  { id: "info", label: "Personal Info", icon: User },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "quizzes", label: "Quizzes", icon: Brain },
  { id: "settings", label: "Settings", icon: Settings },
]

const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#49BBBD] text-white border-b-2 border-[#49BBBD]"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default TabNavigation
