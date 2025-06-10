import { useState,useEffect } from "react";
import { ProfileEditWidget } from "../components/profile-edit-widget";
import { useUserProfileQuery } from "@/features/students_features/student_profile/hooks/useUserProfile";
import { useUpdateUserProfilePictureMutation } from "@/features/students_features/student_profile/hooks/useUpdateUserProfilePicture";

export default function EditProfilePage() {
     const [editableProfile, setEditableProfile] = useState(null);
  const { data: user, isLoading, error } = useUserProfileQuery();
  const { mutate: updateUserProfilePicture, isLoading: isUploadingProfilePic } =
    useUpdateUserProfilePictureMutation();
      useEffect(() => {
    if (user) {
      setEditableProfile(user);
    }
  }, [user]);

  const handleProfilePicUpload = (file) => {
    if (file) {
      updateUserProfilePicture(file);
    }
  };

  const handleProfileFieldUpdate = (updatedProfile) => {
    console.log("Updating profile fields:", updatedProfile);
    setEditableProfile(updatedProfile);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-600 mt-2">
            Update your personal information and preferences
          </p>
        </div>

        {isLoading ? (
          <p>Loading profile...</p>
        ) : error ? (
          <p className="text-red-500">Error loading profile</p>
        ) : (
          <ProfileEditWidget
            profile={editableProfile}
            onUpdateProfile={handleProfileFieldUpdate}
            onUpdateProfilePicture={handleProfilePicUpload}
          />
        )}
      </div>
    </div>
  );
}
