import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const ContactSection = () => (
  <motion.div className="py-16 px-8 bg-blue-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Contact Us</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="text-center">
        <FaMapMarkerAlt className="text-blue-600 text-3xl mb-2 mx-auto" />
        <h3 className="text-lg font-semibold text-gray-700">Address</h3>
        <p className="text-gray-600">Kathmandu, Nepal</p>
      </div>
      <div className="text-center">
        <FaPhoneAlt className="text-blue-600 text-3xl mb-2 mx-auto" />
        <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
        <p className="text-gray-600">+977-1234567890</p>
      </div>
      <div className="text-center">
        <FaEnvelope className="text-blue-600 text-3xl mb-2 mx-auto" />
        <h3 className="text-lg font-semibold text-gray-700">Email</h3>
        <p className="text-gray-600">info@skillwave.com</p>
      </div>
    </div>
  </motion.div>
);

export default ContactSection;
