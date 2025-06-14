
import { useState } from "react"
import { ProfileHeader } from "../components/profile-header.jsx"
import { ProfileTabs } from "@/features/tutor_features/profile_screen/components/profile-tabs.jsx"
import { PersonalInfo } from "../components/personal-info.jsx"
import { ProfessionalInfo } from "../components/professional-info.jsx"
import { SecuritySettings } from "../components/security-settings.jsx"
import { NotificationSettings } from "../components/notification-settings.jsx"
import { SocialLinks } from "../components/social-links.jsx"
import { ProfileStats } from "../components/profile-stats.jsx"
import { useGlobalAuth } from "@/hooks/useAuth.js"

export function ProfileContent() {
        const { isLoggedIn, profile, logout } = useGlobalAuth();
  const tutorData = profile
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <ProfileHeader tutor={tutorData} />

      {/* Profile Stats */}
      <ProfileStats />

      {/* Profile Content */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar with tabs */}
        <div className="lg:col-span-1">
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Main content area */}
        <div className="lg:col-span-3">
          {activeTab === "personal" && <PersonalInfo tutor={tutorData} />}
          {activeTab === "professional" && <ProfessionalInfo tutor={tutorData} />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "social" && <SocialLinks tutor={tutorData} />}
        </div>
      </div>
    </div>
  )
}
