import { useState } from "react"
import { Camera, Edit, MapPin, Calendar, Mail, Globe, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card.jsx"
import { Button } from "@/components/ui/button.jsx"
import { Badge } from "@/components/ui/badge.jsx"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"

export function ProfileHeader({ tutor }) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card className="relative overflow-hidden">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative">
        <div className="absolute inset-0 bg-black/20" />
        <img
          src={`http://localhost:3000/profile/${tutor?.profile_picture}`}
          alt="Cover"
          className="w-full h-full object-cover opacity-70"
        />
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
        >
          <Camera className="h-4 w-4 mr-2" />
          Change Cover
        </Button>

        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      </div>

      <CardContent className="relative mt-8 pb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Picture */}
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
              <AvatarImage src={`http://localhost:3000/profile/${tutor?.profile_picture}`} alt={tutor?.name} />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                {tutor?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
            >
              <Camera className="h-4 w-4" />
            </Button>
            <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-sm" />
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{tutor?.name}</h1>
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    <Award className="h-3 w-3 mr-1" />
                    Verified Tutor
                  </Badge>
                </div>
                <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-1">{tutor?.role}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {tutor?.bio || "Passionate tutor with expertise in various subjects. Dedicated to helping students succeed."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Kathmandu,Nepal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(tutor?.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{tutor?.email}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>

            {/* Specializations */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {["Web Development", "Data Science", "Machine Learning", "React", "Python", "JavaScript"].map(
                  (skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      {skill}
                    </Badge>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
