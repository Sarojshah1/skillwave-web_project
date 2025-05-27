import { useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import CustomButton from "../../../components/buttons/CustomButton";
import { useGlobalAuth } from "../../../hooks/useAuth";

const profileOptions = [
  { link: "View Profile", path: "profile" },
  { link: "Edit Profile", path: "edit-profile" },
  { link: "Change Password", path: "change-password" },
  { link: "My Learnings", path: "learnings" },
  { link: "Logout", path: "", action: "logout" },
];

const ProfileOptions = ({ handleNavLinkClick }) => {
  const { isLoggedIn, profile, logout } = useGlobalAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

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
    <div className="hidden md:flex space-x-4 items-center ml-12 relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 bg-[#49BBBD] text-white px-4 py-2 rounded-full border border-white hover:bg-white hover:text-primary transition duration-300"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {profile?.profile_picture ? (
          <img
            src={`http://localhost:3000/profile/${profile.profile_picture}`}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <FaUserCircle className="text-2xl" />
        )}
        <span className="hidden md:inline">{profile?.name || "Profile"}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-300 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-80 w-48 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 z-20">
          {profileOptions.map((option, index) =>
            option.action === "logout" ? (
              <button
                key={index}
                onClick={() => {
                  logout();
                  window.location.reload();
                }}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                {option.link}
              </button>
            ) : (
              <button
                key={index}
                onClick={() => {
                  handleNavLinkClick(option.path);
                  setIsDropdownOpen(false);
                }}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                {option.link}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileOptions;
