
import { motion } from "framer-motion"
import { Target, Eye, Lightbulb, Rocket } from "lucide-react"

const MissionVisionSection = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 mb-6">
            <Lightbulb className="w-4 h-4" />
            <span className="text-sm font-semibold">Our Purpose</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">Mission & Vision</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Driving the future of education with purpose and innovation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Mission Card */}
          <motion.div
            className="group relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-10 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                To democratize high-quality education by providing accessible, innovative learning experiences that
                empower individuals to achieve their full potential and excel in their chosen careers.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Accessibility", "Innovation", "Excellence"].map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            className="group relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-10 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                To become the world's leading e-learning platform, creating a global community where education
                transcends boundaries and becomes the bridge to unlimited opportunities and success.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Global Impact", "Community", "Future-Ready"].map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Rocket, title: "Innovation", desc: "Pushing boundaries in education technology" },
              { icon: Target, title: "Excellence", desc: "Delivering the highest quality learning experiences" },
              { icon: Eye, title: "Transparency", desc: "Open and honest in all our interactions" },
              { icon: Lightbulb, title: "Growth", desc: "Continuous improvement and learning" },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="group p-6 rounded-2xl hover:bg-white/50 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MissionVisionSection
