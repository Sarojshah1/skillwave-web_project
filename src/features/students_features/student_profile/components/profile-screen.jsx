
import React from "react"
import { useState } from "react"
import ProfileHeader from "./profile-header"
import TabNavigation from "./tab-navigation"
import PersonalInfo from "./personal-info"
import CoursesSection from "./course-section"
import CertificatesSection from "./certificates-section"
import QuizzesSection from "./quizzes-section"
import SettingsSection from "./settings-section"
import { dummyUserData } from "./dummyData"


const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState("info")
  const [user, setUser] = useState(dummyUserData.user)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleProfilePicUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUser((prevUser) => ({
          ...prevUser,
          profilePic: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "info":
        return <PersonalInfo user={user} />
      case "courses":
        return <CoursesSection courses={dummyUserData.courses} />
      case "certificates":
        return <CertificatesSection certificates={dummyUserData.certificates} />
      case "quizzes":
        return <QuizzesSection quizzes={dummyUserData.quizzes} />
      case "settings":
        return <SettingsSection />
      default:
        return <PersonalInfo user={user} />
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen  mt-10 p-4 md:p-6">
      <div className="max-w-full mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <ProfileHeader user={user} onProfilePicUpload={handleProfilePicUpload} />

          <div className="p-6">
            <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

            <div className="mt-8">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen
