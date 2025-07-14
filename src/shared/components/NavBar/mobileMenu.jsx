import React from 'react';
import { useState } from "react"
import { FaBars, FaTimes, FaUsers } from "react-icons/fa"
import CustomButton from "../../../components/buttons/CustomButton"

const navitems = [
  { link: "Home", path: "" },
  { link: "Courses", path: "courses" },
  { link: "Study Groups", path: "study-groups" },
  { link: "Posts", path: "posts" },
  { link: "Blog", path: "blogs" },
  { link: "Category", path: "category" },
  { link: "About Us", path: "aboutus" },
]

const MobileMenu = ({ handleNavLinkClick, isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="lg:hidden">
      <button
        onClick={toggleMenu}
        className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
      >
        {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 bg-white shadow-xl z-50 border-t border-gray-200">
            <div className="py-4 px-4 space-y-2">
              {navitems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleNavLinkClick(item.path)
                    setIsOpen(false)
                  }}
                  className="flex items-center space-x-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#49BBBD] rounded-lg transition-all duration-200"
                >
                  {item.link === "Study Groups" && <FaUsers className="w-4 h-4" />}
                  <span className="font-medium">{item.link}</span>
                </button>
              ))}

              {!isLoggedIn && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <CustomButton
                    onClick={() => {
                      handleNavLinkClick("login")
                      setIsOpen(false)
                    }}
                    variant="outline"
                    size="md"
                    className="w-full"
                  >
                    Login
                  </CustomButton>
                  <CustomButton
                    onClick={() => {
                      handleNavLinkClick("signup")
                      setIsOpen(false)
                    }}
                    variant="primary"
                    size="md"
                    className="w-full bg-[#49BBBD] text-white"
                  >
                    Sign Up
                  </CustomButton>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MobileMenu
