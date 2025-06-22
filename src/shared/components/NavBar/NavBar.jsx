import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ICONS_PATHS } from '../../constants/imagePaths'
import NavItems from "./NavItems";
import ProfileOptions from "./ProfileOptions";
import MobileMenu from "@/shared/components/NavBar/mobileMenu"
import { useGlobalAuth } from "../../../hooks/useAuth"

const NavBar = () => {
  const { isLoggedIn } = useGlobalAuth()
  const navigate = useNavigate();

 const handleNavLinkClick = (path) => {
    console.log(path);
    if (window.location.pathname !== `/${path}`) {
      navigate(`/${path}`);
    } else {
      window.location.reload();
    }
  };
  return (
    <nav className="bg-gradient-to-r from-[#49BBBD] to-[#3da5a7] shadow-lg backdrop-blur-sm border-b border-white/10 py-4">
      <div className="max-w-full mx-auto px-4 sm:px-6 ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2 group">
              <img
                src={ICONS_PATHS.logoPrimary}
                alt="CareerVista"
                className="w-16 h-16 transition-transform duration-300 group-hover:scale-110 rounded-lg"
              />
              
            </a>
          </div>

          {/* Desktop Navigation */}
          <NavItems handleNavLinkClick={handleNavLinkClick} />

          {/* Profile Options */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:block">
              <ProfileOptions handleNavLinkClick={handleNavLinkClick} />
            </div>

            {/* Mobile Menu */}
            <MobileMenu handleNavLinkClick={handleNavLinkClick} isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
