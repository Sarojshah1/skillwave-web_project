import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-slate-800">Ready to join our success story?</h3>
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          size="lg"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          Start Learning Today
        </Button>
        <Button size="lg" variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
          View Success Stories
        </Button>
      </div>
    </motion.div>
  )
}
