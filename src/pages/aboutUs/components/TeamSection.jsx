import React from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Twitter, Github, Mail } from "lucide-react"
import { IMAGE_PATHS } from '../../../shared/constants/imagePaths'

const teamMembers = [
  {
    name: 'Saroj Kumar Sah',
    role: 'Founder & CEO',
    image: '/images/team/saroj.jpg',
    intro: 'Visionary entrepreneur driving innovation in e-learning.',
    skills: ["Leadership", "Strategy", "Innovation"],
  },
  {
    name: 'Saroj Kumar Sah',
    role: 'Founder & CEO',
    image: '/images/team/saroj.jpg',
    intro: 'Visionary entrepreneur driving innovation in e-learning.',
    skills: ["Leadership", "Strategy", "Innovation"],
  },
  {
    name: 'Saroj Kumar Sah',
    role: 'Founder & CEO',
    image: '/images/team/saroj.jpg',
    intro: 'Visionary entrepreneur driving innovation in e-learning.',
    skills: ["Leadership", "Strategy", "Innovation"],
  },
  {
    name: 'Saroj Kumar Sah',
    role: 'Founder & CEO',
    image: '/images/team/saroj.jpg',
    intro: 'Visionary entrepreneur driving innovation in e-learning.',
    skills: ["Leadership", "Strategy", "Innovation"],
  },
]

const TeamSection = () => (
 <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold">Meet the Team</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">The Minds Behind SkillWave</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate professionals dedicated to transforming education and empowering learners worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-6 shadow-xl group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden p-1">
                    <img
                      src={IMAGE_PATHS.profile || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                {/* Member Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.intro}</p>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  {[Linkedin, Twitter, Github, Mail].map((Icon, iconIndex) => (
                    <motion.button
                      key={iconIndex}
                      className="w-8 h-8 bg-gray-100 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-lg flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.button>
                  ))}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          className="mt-20 grid md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { number: "50+", label: "Team Members" },
            { number: "15+", label: "Countries" },
            { number: "8+", label: "Years Experience" },
            { number: "24/7", label: "Support" },
          ].map((stat, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm">
              <h4 className="text-3xl font-black text-gray-900 mb-2">{stat.number}</h4>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
)

export default TeamSection
