

import React from "react"
import { Camera, Award, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"


const ProfileHeader= ({ user, onProfilePicUpload }) => {
  return (
    <div className="bg-[#49BBBD] text-white p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <div className="relative group">
          <img
            src={`http://localhost:3000/profile/${user?.profile_picture}`}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <input
            type="file"
            id="profilePicInput"
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept="image/*"
            onChange={onProfilePicUpload}
          />
          <label
            htmlFor="profilePicInput"
            className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <Camera className="w-8 h-8 text-white" />
          </label>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2">{user?.name}</h1>
          <p className="text-blue-100 text-lg mb-4 max-w-2xl">{user?.bio}</p>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>{user?.enrolled_courses.length} Enrolled</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>{user?.certificates} Certificates</span>
            </div>
          </div>

          <Button className="bg-white text-blue-600 hover:bg-blue-50">Edit Profile</Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
