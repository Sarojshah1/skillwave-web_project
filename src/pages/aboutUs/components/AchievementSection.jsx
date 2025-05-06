import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaChalkboardTeacher } from 'react-icons/fa';

const stats = [
  { icon: <FaUsers className="text-blue-500 text-4xl mb-2" />, label: 'Active Users', value: '50K+' },
  { icon: <FaChalkboardTeacher className="text-green-500 text-4xl mb-2" />, label: 'Expert Mentors', value: '1K+' },
  { icon: <FaAward className="text-yellow-500 text-4xl mb-2" />, label: 'Awards', value: '15+' },
];

const AchievementsSection = () => (
  <motion.div className="py-16 px-8 bg-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Achievements</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">{stat.icon}</div>
          <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          <p className="text-gray-600">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default AchievementsSection;
