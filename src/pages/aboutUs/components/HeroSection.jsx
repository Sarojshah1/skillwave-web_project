import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => (
  <motion.div
    className="relative"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 opacity-75"></div>
    <div className="relative z-10 text-center text-white py-16 px-6">
      <h1 className="text-5xl font-extrabold mb-4 text-shadow-lg">About Us</h1>
      <p className="text-xl mb-8 text-shadow-md">Empowering Learners for a Brighter Future</p>
      <a href="/signup" className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-gray-100 transition-colors">Get Started</a>
    </div>
  </motion.div>
);

export default HeroSection;
