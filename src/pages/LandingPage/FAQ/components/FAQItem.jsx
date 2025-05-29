
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { categories } from "../data/faqs"



export default function FAQItem({ question, answer, category }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen((prev) => !prev)

  // Find category label
  const categoryLabel = categories.find((c) => c.value === category)?.label || category

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.01 }}
    >
      <button
        className="w-full p-5 flex items-center justify-between text-left bg-gradient-to-r from-white to-slate-50 hover:from-blue-50 hover:to-indigo-50 transition-colors duration-300"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question.replace(/\s+/g, "-").toLowerCase()}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <h3 className="text-lg font-semibold text-slate-800">{question}</h3>
          <Badge
            variant="outline"
            className="hidden sm:inline-flex text-xs bg-blue-50 text-blue-700 border-blue-200 whitespace-nowrap"
          >
            {categoryLabel}
          </Badge>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-4"
        >
          {isOpen ? (
            <ChevronUp className="text-blue-600" size={20} />
          ) : (
            <ChevronDown className="text-blue-600" size={20} />
          )}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${question.replace(/\s+/g, "-").toLowerCase()}`}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="p-5 text-slate-700 border-t border-slate-100 bg-gradient-to-r from-white to-slate-50">
              <p className="leading-relaxed">{answer}</p>
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="outline" className="sm:hidden text-xs bg-blue-50 text-blue-700 border-blue-200">
                  {categoryLabel}
                </Badge>
                <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600 border-slate-200">
                  Last updated: May 2024
                </Badge>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
