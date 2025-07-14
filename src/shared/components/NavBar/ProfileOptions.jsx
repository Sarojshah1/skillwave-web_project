import React from 'react';
import { useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import CustomButton from "../../../components/buttons/CustomButton";
import { useGlobalAuth } from "../../../hooks/useAuth";
import { User, ChevronDown, Users, Edit, Lock, GraduationCap, LogOut } from "lucide-react"

const profileOptions = [
  { link: "View Profile", path: "profile", icon: User },
  { link: "Edit Profile", path: "edit-profile", icon: Edit },
  { link: "Change Password", path: "change-password", icon: Lock },
  { link: "My Learnings", path: "learnings", icon: GraduationCap },
  { link: "My Study Groups", path: "my-study-groups", icon: Users },
  { link: "Logout", path: "", action: "logout", icon: LogOut },
]


const ProfileOptions = ({ handleNavLinkClick }) => {
  const { isLoggedIn, profile, logout } = useGlobalAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  if (!isLoggedIn) {
    return (
      <div className="hidden md:flex space-x-4 items-center ml-12">
        <CustomButton onClick={() => handleNavLinkClick("login")} variant="outline" size="md">
          Login
        </CustomButton>
        <CustomButton
          onClick={() => handleNavLinkClick("signup")}
          variant="primary"
          size="md"
          className="bg-[#49BBBD] text-white hover:bg-white hover:text-[#49BBBD] border border-white"
        >
          Signup
        </CustomButton>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm text-white px-4 py-2.5 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {profile?.profile_picture ? (
          <img
            src={`http://localhost:3000/profile/${profile?.profile_picture}`}
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-white/30"
          />
        ) : (
          <User className="w-6 h-6" />
        )}
        <span className="hidden md:inline font-medium">{profile?.name || "Profile"}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
      </button>

      {isDropdownOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl ring-1 ring-black/5 z-20 overflow-hidden">
            <div className="py-2">
              {profileOptions.map((option, index) => {
                const IconComponent = option.icon
                return option.action === "logout" ? (
                  <button
                    key={index}
                    onClick={() => {
                      logout()
                      setIsDropdownOpen(false)
                    }}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 w-full text-left transition-all duration-200 border-t border-gray-100"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-medium">{option.link}</span>
                  </button>
                ) : (
                  <button
                    key={index}
                    onClick={() => {
                      handleNavLinkClick(option.path)
                      setIsDropdownOpen(false)
                    }}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#49BBBD] w-full text-left transition-all duration-200"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-medium">{option.link}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProfileOptions
