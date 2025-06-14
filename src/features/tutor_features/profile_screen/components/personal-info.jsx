import { useState } from "react"
import { Save, Edit, Calendar, MapPin, Phone, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx"
import { Button } from "@/components/ui/button.jsx"
import { Input } from "@/components/ui/input.jsx"
import { Label } from "@/components/ui/label.jsx"
import { Textarea } from "@/components/ui/textarea"
import { useUpdateUserProfile } from "@/features/students_features/edit_profile/hooks/useUpdateUserProfile"

export function PersonalInfo({ tutor }) {
      const { mutate: updateUserProfile, isLoading: isSaving } = useUpdateUserProfile();
    console.log("Tutor data:", tutor)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: tutor?.name,
    email: tutor?.email,
    bio: tutor?.bio,
  })


  const handleSave = () => {
        const userDetails = {
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
    };
     console.log("Saving profile data:", userDetails)
   const tutorId= tutor?._id;
 updateUserProfile({ tutorId, userDetails });
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Your personal details and contact information</CardDescription>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              ) : (
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">{tutor?.name}</div>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              ) : (
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md flex items-center gap-2">
                  <span>{tutor?.email}</span>
                </div>
              )}
            </div>
          </div>


          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={4}
                placeholder="Tell us about yourself..."
              />
            ) : (
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">{tutor?.bio}</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>Optional details about yourself</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              {isEditing ? (
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                />
              ) : (
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>March 15, 1985</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="languages">Languages</Label>
              {isEditing ? (
                <Input
                  id="languages"
                  value={formData.languages}
                  onChange={(e) => handleInputChange("languages", e.target.value)}
                  placeholder="e.g., English, Spanish, French"
                />
              ) : (
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">{formData.languages}</div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Personal Website</Label>
            {isEditing ? (
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            ) : (
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                <a
                  href={formData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {formData.website}
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
