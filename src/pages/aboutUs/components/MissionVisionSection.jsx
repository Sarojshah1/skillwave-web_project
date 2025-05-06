import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaStar } from 'react-icons/fa';

const MissionVisionSection = () => (
  <motion.div 
    className="p-8 bg-gray-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.3 }}
  >
    <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">Our Mission & Vision</h2>
    <div className="grid md:grid-cols-2 gap-12">
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl font-semibold mb-4 text-blue-600 flex items-center">
          <FaLightbulb className="text-4xl mr-2" />
          Our Mission
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to provide high-quality, accessible education that empowers individuals to achieve their goals and excel in their careers.
        </p>
      </motion.div>
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl font-semibold mb-4 text-blue-600 flex items-center">
          <FaStar className="text-4xl mr-2" />
          Our Vision
        </h3>
        <p className="text-gray-700 leading-relaxed">
          We envision a world where education is a bridge to success for everyone. Our platform aims to become a global leader in e-learning.
        </p>
      </motion.div>
    </div>
  </motion.div>
);

export default MissionVisionSection;