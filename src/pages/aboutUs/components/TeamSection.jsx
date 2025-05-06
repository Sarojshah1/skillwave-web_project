import React from 'react'
import { motion } from 'framer-motion'
import { IMAGE_PATHS } from '../../../shared/constants/imagePaths'

const teamMembers = [
  {
    name: 'Saroj Kumar Sah',
    role: 'Founder & CEO',
    image: '/images/team/saroj.jpg',
    intro: 'Visionary entrepreneur driving innovation in e-learning.',
  },
  {
    name: 'Saroj Kumar Sah',
    role: 'Founder & CEO',
    image: '/images/team/saroj.jpg',
    intro: 'Visionary entrepreneur driving innovation in e-learning.',
  },
  {
    name: 'Saroj Kumar Sah',
    role: 'Founder & CEO',
    image: '/images/team/saroj.jpg',
    intro: 'Visionary entrepreneur driving innovation in e-learning.',
  },
  {
    name: 'Saroj Kumar Sah',
    role: 'Founder & CEO',
    image: '/images/team/saroj.jpg',
    intro: 'Visionary entrepreneur driving innovation in e-learning.',
  },
]

const TeamSection = () => (
  <section className="bg-gradient-to-br from-white to-slate-100 py-20 px-6">
    <motion.div
      className="max-w-7xl mx-auto text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-5xl font-extrabold mb-4 text-gray-800">
        Meet Our Team
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
        Our passionate professionals dedicated to empowering your learning journey.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 text-center p-6"
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <img
              src={IMAGE_PATHS.profile}
              alt={member.name}
              className="w-28 h-28 mx-auto rounded-full object-cover mb-4 border-4 border-primary"
            />
            <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{member.role}</p>
            <p className="text-sm text-gray-600">{member.intro}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
)

export default TeamSection
