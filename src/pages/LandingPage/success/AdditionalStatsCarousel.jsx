import { motion } from "framer-motion"
import { Star, BookOpen, Award, Globe, TrendingUp, HelpCircle } from "lucide-react"

const stats = [
  { icon: <Star className="h-5 w-5" />, value: "4.9/5", label: "Average Rating" },
  { icon: <BookOpen className="h-5 w-5" />, value: "500+", label: "Courses Available" },
  { icon: <Award className="h-5 w-5" />, value: "25K+", label: "Certificates Issued" },
  { icon: <Globe className="h-5 w-5" />, value: "120+", label: "Countries Reached" },
  { icon: <TrendingUp className="h-5 w-5" />, value: "95%", label: "Job Placement Rate" },
  { icon: <HelpCircle className="h-5 w-5" />, value: "24/7", label: "Support Available" },
]

export default function AdditionalStatsCarousel() {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-center mb-8 text-slate-800">More Achievements</h3>
      <div className="relative overflow-hidden">
        <motion.div
          className="flex space-x-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...stats, ...stats].map((stat, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-3 min-w-[200px] p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-100"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-indigo-600">{stat.icon}</div>
              <div>
                <div className="font-bold text-slate-800">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
