import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ICONS_PATHS } from '../../constants/imagePaths'
import { FaUserCircle } from "react-icons/fa";
import NavItems from "./NavItems";
import ProfileOptions from "./ProfileOptions";
// import { getUserProfile } from "../../../services/api/userService";
import useOutsideClick from "../../../hooks/useOutsideClick";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const data = await getUserProfile(token);
          setIsLoggedIn(true);
          setUserName(data.name);
          setUserProfile(data);
        } catch (err) {
          console.error("Failed to fetch profile", err);
          setIsLoggedIn(false);
        }
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleNavLinkClick = (path) => {
    if (window.location.pathname !== `/${path}`) {
      navigate(`/${path}`);
    } else {
      window.location.reload();
    }
  };

  return (
    <nav className="bg-[#49BBBD] shadow-container md:px-8 p-4  mx-auto text-[#49BBBD]">
      <div className="text-lg mx-auto flex items-center justify-between">
        <a href="/" className="text-2xl font-semibold items-center">
          <img src={ICONS_PATHS.logoPrimary} alt="CareerVista" className="w-16 inline-block" />
        </a>
        <NavItems handleNavLinkClick={handleNavLinkClick} />
        <ProfileOptions
          isLoggedIn={isLoggedIn}
          dropdownRef={dropdownRef}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          userProfile={userProfile}
          userName={userName}
          handleLogout={handleLogout}
          handleNavLinkClick={handleNavLinkClick}
        />
      </div>
    </nav>
  );
};

export default NavBar;
