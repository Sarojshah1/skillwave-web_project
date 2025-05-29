import React from "react"
import { motion } from "framer-motion"
import { Users, GraduationCap, Award, Globe, TrendingUp, Star } from "lucide-react"

const stats = [
  {
    icon: Users,
    label: "Active Learners",
    value: "50K+",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: GraduationCap,
    label: "Expert Mentors",
    value: "1K+",
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-500/10 to-emerald-500/10",
  },
  {
    icon: Award,
    label: "Industry Awards",
    value: "15+",
    color: "from-yellow-500 to-orange-500",
    bgColor: "from-yellow-500/10 to-orange-500/10",
  },
  {
    icon: Globe,
    label: "Countries Served",
    value: "25+",
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-500/10 to-pink-500/10",
  },
  {
    icon: TrendingUp,
    label: "Course Completion",
    value: "94%",
    color: "from-indigo-500 to-blue-500",
    bgColor: "from-indigo-500/10 to-blue-500/10",
  },
  {
    icon: Star,
    label: "Average Rating",
    value: "4.9",
    color: "from-rose-500 to-pink-500",
    bgColor: "from-rose-500/10 to-pink-500/10",
  },
]

const AchievementsSection = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50"></div>
  

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">Our Impact</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Achievements That Matter
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Numbers that reflect our commitment to educational excellence and global impact
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500`}></div>
              <div className="relative bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <motion.h3 
                    className="text-4xl font-black text-gray-900 mb-2"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                  <div className={`w-12 h-1 bg-gradient-to-r ${stat.color} rounded-full mx-auto mt-4`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { title: 'Featured in TechCrunch', desc: 'Recognized as a leading EdTech innovator' },
            { title: 'ISO 27001 Certified', desc: 'Highest standards of data security' },
            { title: 'Carbon Neutral Platform', desc: 'Committed to environmental sustainability' },
          ].map((achievement, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h4>
              <p className="text-gray-600 text-sm">{achievement.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AchievementsSection
