import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Priya Thapa',
    feedback: 'SkillWave has completely transformed the way I learn. The content is rich and well-structured.',
    image: '/images/users/priya.jpg',
  },
  {
    name: 'Rahul Shrestha',
    feedback: 'The community and collaboration tools helped me stay motivated throughout my course.',
    image: '/images/users/rahul.jpg',
  },
];

const TestimonialsSection = () => (
  <motion.div className="py-16 px-8 bg-blue-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.03 }}
        >
          <div className="flex items-center mb-4">
            <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full mr-4 object-cover" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{t.name}</h3>
              <p className="text-gray-600">Student</p>
            </div>
          </div>
          <p className="text-gray-700 italic">"{t.feedback}"</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default TestimonialsSection;