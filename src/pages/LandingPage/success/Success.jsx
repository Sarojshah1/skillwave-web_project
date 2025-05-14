import React from "react";
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaTrophy,
  FaQuestionCircle,
  FaChalkboardTeacher,
  FaClock,
} from "react-icons/fa";

const stats = [
  { value: "15K+", label: "Students", icon: <FaUserGraduate /> },
  { value: "75%", label: "Total Success", icon: <FaTrophy /> },
  { value: "35", label: "Main Questions", icon: <FaQuestionCircle /> },
  { value: "26", label: "Chief Experts", icon: <FaChalkboardTeacher /> },
  { value: "16", label: "Years of Experience", icon: <FaClock /> },
];

const Success = () => {
  return (
    <div className="relative py-20 px-4 bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-800">
        Our Success
      </h2>
      <p className="text-lg text-gray-600 mb-14 text-center max-w-2xl mx-auto">
        Empowering students with knowledge and skills through interactive
        learning. Discover our achievements and milestones.
      </p>

      {/* Scrolling Stats */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex space-x-8 min-w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {[...stats, ...stats].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex flex-col items-center min-w-[220px] p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-transparent hover:border-indigo-300 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-5xl text-indigo-600 mb-3">{stat.icon}</div>
              <span className="text-3xl font-bold text-gray-900">
                {stat.value}
              </span>
              <span className="text-gray-600 text-sm mt-1 tracking-wide">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute top-10 left-0 w-72 h-72 bg-purple-300 opacity-10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-indigo-300 opacity-10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default Success;
