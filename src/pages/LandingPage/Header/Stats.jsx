import { motion } from "framer-motion";
import { Users, BookOpen, Award } from "lucide-react";
import React from "react";

const statsItems = [
  { icon: <Users className="w-5 h-5" />, value: "10K+", label: "Students" },
  { icon: <BookOpen className="w-5 h-5" />, value: "300+", label: "Courses" },
  { icon: <Award className="w-5 h-5" />, value: "95%", label: "Success Rate" },
];

const Stats = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.7 }}
    className="flex flex-wrap justify-center md:justify-start gap-6 mb-8"
  >
    {statsItems.map((stat, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="flex items-center space-x-3 bg-primary text-white dark:text-white p-4 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-lg"
      >
        <div className="p-2 bg-white/20 rounded-full text-white transition-all duration-300 ease-in-out">
          {stat.icon}
        </div>
        <div>
          <div className="font-bold">{stat.value}</div>
          <div className="text-xs opacity-90">{stat.label}</div>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

export default Stats;
