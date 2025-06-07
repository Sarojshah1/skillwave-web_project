import React, { useState } from "react";
import ProfileHeader from "./profile-header";
import TabNavigation from "./tab-navigation";
import PersonalInfo from "./personal-info";
import CoursesSection from "./course-section";
import CertificatesSection from "./certificates-section";
import QuizzesSection from "./quizzes-section";
import SettingsSection from "./settings-section";

import { useUserProfileQuery } from "@/features/students_features/student_profile/hooks/useUserProfile";
import { useUpdateUserProfilePictureMutation } from "@/features/students_features/student_profile/hooks/useUpdateUserProfilePicture";

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState("info");

  const {
    data: user,
    isLoading,
    error
  } = useUserProfileQuery();
  console.log("User Profile Data:", user);

  const { mutate: updateUserProfilePicture, isLoading: isUploadingProfilePic } =
    useUpdateUserProfilePictureMutation();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

 const handleProfilePicUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      updateUserProfilePicture(file); 
    }
  };

  const renderTabContent = () => {
    if (isLoading) return <div className="text-center p-4">Loading profile...</div>;
    if (error) return <div className="text-center p-4 text-red-500">Error loading profile.</div>;

    switch (activeTab) {
      case "info":
        return <PersonalInfo user={user} />;
      case "courses":
        return <CoursesSection courses={user?.enrolled_courses || []} />;
      case "certificates":
        return <CertificatesSection certificates={user?.certificates || []} />;
      case "quizzes":
        return <QuizzesSection quizzes={user?.quizzes || []} />;
      case "settings":
        return <SettingsSection />;
      default:
        return <PersonalInfo user={user} />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen mt-10 p-4 md:p-6">
      <div className="max-w-full mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <ProfileHeader
            user={user}
            onProfilePicUpload={handleProfilePicUpload}
            isUploadingProfilePic={isUploadingProfilePic}
          />

          <div className="p-6">
            <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

            <div className="mt-8">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
