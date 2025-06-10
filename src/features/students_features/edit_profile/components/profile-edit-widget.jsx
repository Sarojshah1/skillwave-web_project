
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfilePictureFeature } from "./profile-picture-feature"
import { ProfileInfoFeature } from "./profile-info-feature"
import { ProfileBioFeature } from "./profile-bio-feature"
import { ProfileActionsFeature } from "./profile-actions-feature"
import { useUpdateUserProfile } from "../hooks/useUpdateUserProfile"



export function ProfileEditWidget({ profile, onUpdateProfile, onUpdateProfilePicture  }) {
  const { mutate: updateUserProfile, isLoading: isSaving } = useUpdateUserProfile();
 const handleFieldUpdate = (field, value) => {
    const updatedProfile = { ...profile, [field]: value };
    onUpdateProfile(updatedProfile);
  };
  const handleSave = () => {
    console.log("Saving profile...");
    onUpdateProfile(profile);
  };
  const handleUpdateProfile = () => {
    if (!profile) return;

    const userId = profile._id; 
    const userDetails = {
      name: profile.name,
      email: profile.email,
      bio: profile.bio,
    };

    updateUserProfile({ userId, userDetails });
  }

  const handleCancel = () => {
    // Reset or navigate away
    console.log("Cancelling changes...")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfilePictureFeature
            currentAvatar={profile?.profile_picture}
             onAvatarChange={onUpdateProfilePicture}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileInfoFeature
            name={profile?.name}
            email={profile?.email}
            onNameChange={(name) => handleFieldUpdate("name", name)}
            onEmailChange={(email) => handleFieldUpdate("email", email)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileBioFeature bio={profile?.bio} onBioChange={(bio) => handleFieldUpdate("bio", bio)} />
        </CardContent>
      </Card>

      <ProfileActionsFeature onSave={handleUpdateProfile} onCancel={handleCancel} />
    </div>
  )
}
