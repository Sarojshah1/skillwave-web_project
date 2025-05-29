
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Users, BookOpen, Award } from "lucide-react"

const CTASection = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"></div>
     
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-20 w-6 h-6 bg-blue-400/30 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-32 w-4 h-4 bg-purple-400/30 rounded-full"
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.7, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-32 left-1/4 w-8 h-8 bg-cyan-400/20 rounded-full"
        animate={{
          y: [0, -25, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-white text-sm font-semibold">Join the Revolution</span>
          </div>
        </motion.div>

        <motion.h2
          className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to Transform
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Future?
          </span>
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Join thousands of learners who have already transformed their careers with SkillWave. 
          Start your journey today and unlock unlimited possibilities.
        </motion.p>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { icon: Users, number: '50K+', label: 'Active Students' },
            { icon: BookOpen, number: '500+', label: 'Courses' },
            { icon: Award, number: '95%', label: 'Success Rate' },
            { icon: Sparkles, number: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.number}</h3>
              <p className="text-blue-200 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/signup"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Start Learning Now</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </motion.a>

          <motion.a
            href="/courses"
            className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Explore Courses</span>
            <BookOpen className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
          </motion.a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-blue-200 text-sm mb-4">Trusted by students from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Harvard', 'MIT', 'Stanford', 'Oxford', 'Cambridge'].map((university, index) => (
              <span key={index} className="text-white font-semibold text-lg">
                {university}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
