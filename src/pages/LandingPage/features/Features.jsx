import React from "react";
import { motion } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaRegClock,
  FaRegThumbsUp,
  FaRegStar,
} from "react-icons/fa";

const features = [
  {
    icon: <FaChalkboardTeacher size={40} />,
    title: "Expert Instructors",
    description:
      "Learn from experienced professionals who are experts in their fields.",
  },
  {
    icon: <FaRegClock size={40} />,
    title: "Flexible Learning",
    description:
      "Access courses anytime, anywhere, and learn at your own pace.",
  },
  {
    icon: <FaRegThumbsUp size={40} />,
    title: "Interactive Content",
    description:
      "Engage with interactive and multimedia content to enhance learning.",
  },
  {
    icon: <FaRegStar size={40} />,
    title: "Certifications",
    description:
      "Earn certificates upon course completion to showcase your skills.",
  },
];

const Features = () => {
  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold mb-4 text-gray-800"
        >
          Features We Offer
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Discover the features that make our e-learning platform unique and
          effective in empowering your learning journey.
        </motion.p>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="text-primary mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
