import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function FeatureCard({ feature, index }) {
  return (
    <motion.div
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: feature.delay,
          },
        },
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
    >
      <div className={cn("h-1.5 w-full bg-gradient-to-r", feature.color)} />

      <div className="p-6 sm:p-8">
        <motion.div
          className={cn("w-16 h-16 rounded-xl flex items-center justify-center mb-6", feature.bgColor)}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <motion.div
            className={feature.textColor}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          >
            {feature.icon}
          </motion.div>
        </motion.div>
        <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-blue-700 transition-colors duration-200">
          {feature.title}
        </h3>
        <p className="text-slate-600 leading-relaxed">{feature.description}</p>
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300"
        style={{
          backgroundImage: `linear-gradient(to right, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`,
        }}
      />
    </motion.div>
  )
}
