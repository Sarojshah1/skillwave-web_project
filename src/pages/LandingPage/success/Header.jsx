import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  return (
    <div className="text-center mb-16 max-w-4xl mx-auto">
      <Badge variant="outline" className="mb-4 px-3 py-1 border-indigo-200 bg-indigo-50 text-indigo-700">
        Our Impact
      </Badge>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-indigo-900 bg-clip-text text-transparent"
      >
        Transforming Lives Through Education
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg text-slate-600 leading-relaxed"
      >
        Join thousands of successful learners who have transformed their careers and achieved their goals through
        our comprehensive learning platform.
      </motion.p>
    </div>
  )
}
