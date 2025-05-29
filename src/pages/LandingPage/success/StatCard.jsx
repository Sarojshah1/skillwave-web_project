import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function StatCard({ stat, index }) {
  const [count, setCount] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const increment = stat.value / 50
        const interval = setInterval(() => {
          setCount((prev) => {
            if (prev >= stat.value) {
              clearInterval(interval)
              return stat.value
            }
            return Math.min(prev + increment, stat.value)
          })
        }, 30)
        return () => clearInterval(interval)
      }, index * 200)
      return () => clearTimeout(timer)
    }
  }, [isInView, stat.value, index])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onViewportEnter={() => setIsInView(true)}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
        <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", stat.color)} />
        <CardContent className="p-6 text-center">
          <motion.div
            className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4", stat.bgColor)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-indigo-600">{stat.icon}</div>
          </motion.div>
          <motion.div className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2" key={count}>
            {Math.floor(count).toLocaleString()}
            {stat.suffix}
          </motion.div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">{stat.label}</h3>
          <p className="text-sm text-slate-600">{stat.description}</p>
        </CardContent>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Card>
    </motion.div>
  )
}
