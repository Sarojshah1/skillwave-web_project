import React from 'react';
import { motion } from "framer-motion"

const achievements = [
  "🏆 Best Online Learning Platform 2024",
  "🌟 Top Rated by Students Worldwide",
  "📈 Fastest Growing EdTech Company",
  "🎯 Industry Leader in Course Completion",
  "💡 Innovation Award Winner",
  "🌍 Global Education Excellence",
]

export default function AchievementsBanner() {
  return (
    <div className="mb-16">
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <motion.div
          className="flex space-x-8 whitespace-nowrap"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {achievements.map((achievement, index) => (
            <span key={index} className="text-lg font-medium">
              {achievement}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
