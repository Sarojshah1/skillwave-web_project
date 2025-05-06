import { motion } from "framer-motion";
import { BookOpen, Award } from "lucide-react";
import { IMAGE_PATHS } from "../../../shared/constants/imagePaths";

const HeroImage = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="md:w-1/2 relative"
    >
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, x: -20, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute -left-10 top-1/4 bg-white dark:bg-[#1e293b] p-3 rounded-lg shadow-lg z-10"
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-800 dark:text-white">
                Live Classes
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Interactive Learning
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute -right-5 bottom-1/4 bg-white dark:bg-[#1e293b] p-3 rounded-lg shadow-lg z-10"
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Award className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-800 dark:text-white">
                Certificates
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Industry Recognized
              </div>
            </div>
          </div>
        </motion.div>
        <div className="relative p-4 rounded-2xl">
          <motion.img
            src={IMAGE_PATHS.background}
            alt="Learning Illustration"
            className="w-full h-auto rounded-lg object-cover relative z-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default HeroImage;
