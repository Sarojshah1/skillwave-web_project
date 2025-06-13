
import {
  LogOut,
  PlusCircle,
  BookOpen,
  FileText,
  LayoutDashboard,
  Settings,
  User,
  Wallet,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TutorProfile } from "./tutor-profile"


export function TutorPortalSidebar({ activeSection, setActiveSection }) {
  const tutorData = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Senior Tutor",
    avatar: "/placeholder.svg?height=80&width=80",
  }
    const menuItems = [
    {
      section: "main",
      label: "Overview",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
          badge: null,
          description: "Analytics & insights",
        },
      ],
    },
    {
      section: "content",
      label: "Content Management",
      items: [
        {
          id: "add-course",
          label: "Create Course",
          icon: PlusCircle,
          badge: "New",
          description: "Add new course",
        },
        {
          id: "view-courses",
          label: "My Courses",
          icon: BookOpen,
          badge: "12",
          description: "Manage courses",
        },
        {
          id: "add-blog",
          label: "Write Blog",
          icon: PlusCircle,
          badge: null,
          description: "Create blog post",
        },
        {
          id: "view-blogs",
          label: "My Blogs",
          icon: FileText,
          badge: "8",
          description: "Manage blog posts",
        },
      ],
    },
    {
      section: "account",
      label: "Account & Settings",
      items: [
        {
          id: "payments",
          label: "Earnings",
          icon: Wallet,
          badge: "$12.4k",
          description: "Payment history",
        },
        {
          id: "settings",
          label: "Settings",
          icon: Settings,
          badge: null,
          description: "Account preferences",
        },
        {
          id: "profile",
          label: "Profile",
          icon: User,
          badge: null,
          description: "Personal information",
        },
      ],
    },
  ]

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="border-b border-border/50 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <TutorProfile tutor={tutorData} />
        <div className="grid grid-cols-3 gap-2 px-2 pb-2">
          <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-2 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 mb-1">
              <Users className="h-3 w-3" />
            </div>
            <div className="text-xs font-semibold text-gray-900 dark:text-gray-100">1.2k</div>
            <div className="text-[10px] text-gray-600 dark:text-gray-400">Students</div>
          </div>
          <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-2 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center text-green-600 dark:text-green-400 mb-1">
              <Star className="h-3 w-3" />
            </div>
            <div className="text-xs font-semibold text-gray-900 dark:text-gray-100">4.8</div>
            <div className="text-[10px] text-gray-600 dark:text-gray-400">Rating</div>
          </div>
          <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-2 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center text-purple-600 dark:text-purple-400 mb-1">
              <TrendingUp className="h-3 w-3" />
            </div>
            <div className="text-xs font-semibold text-gray-900 dark:text-gray-100">+18%</div>
            <div className="text-[10px] text-gray-600 dark:text-gray-400">Growth</div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
        {menuItems.map((section) => (
          <SidebarGroup key={section.section} className="px-2 ">
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.id)}
                      isActive={activeSection === item.id}
                      className={`
                        group relative overflow-hidden rounded-xl transition-all duration-200 ease-in-out
                        ${
                          activeSection === item.id
                            ? "bg-[#49BBBD] text-white shadow-lg shadow-blue-500/25 scale-[1.02] "
                            : "hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-750 hover:shadow-md hover:scale-[1.01]"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div
                          className={`
                          p-2 rounded-lg transition-colors duration-200
                          ${
                            activeSection === item.id
                              ? "bg-white/20"
                              : "bg-gray-100 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700"
                          }
                        `}
                        >
                          <item.icon
                            className={`h-4 w-4 ${
                              activeSection === item.id
                                ? "text-white"
                                : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`font-medium text-sm ${
                              activeSection === item.id ? "text-white" : "text-gray-900 dark:text-gray-100"
                            }`}
                          >
                            {item.label}
                          </div>
                          <div
                            className={`text-xs ${
                              activeSection === item.id ? "text-white/80" : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {item.description}
                          </div>
                        </div>
                        {item.badge && (
                          <div
                            className={`
                            px-2 py-1 rounded-full text-xs font-medium
                            ${
                              activeSection === item.id
                                ? "bg-white/20 text-white"
                                : item.badge === "New"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                  : item.badge.startsWith("$")
                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            }
                          `}
                          >
                            {item.badge}
                          </div>
                        )}
                      </div>

                      {/* Active indicator */}
                      {activeSection === item.id && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="group relative overflow-hidden rounded-xl transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-red hover:to-pink-100 dark:hover:from-red-900/30 dark:hover:to-pink-900/30 hover:shadow-md hover:scale-[1.01]">
              <div className="flex items-center gap-3 w-full">
                <div className="p-2 rounded-lg bg-red dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-800/40 transition-colors duration-200">
                  <LogOut className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900 dark:text-gray-100">Sign Out</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">End your session</div>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
