import { motion } from "framer-motion";
import { ChevronRight, Play } from "lucide-react";

const ActionButtons = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      href="/signup"
      className="group flex items-center bg-primary text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out w-full sm:w-auto justify-center"
    >
      <span>Join for Free</span>
      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </motion.a>
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.1 }}
      href="#how-it-works"
      className="group flex items-center bg-white dark:bg-[#1e293b]/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out w-full sm:w-auto justify-center"
    >
      <div className="mr-2 p-1 bg-[#49BBBD]/10 rounded-full">
        <Play className="w-4 h-4 text-[#49BBBD] fill-[#49BBBD]" />
      </div>
      <span>Watch How It Works</span>
    </motion.a>
  </div>
);

export default ActionButtons;
