import { motion } from "framer-motion";
import useTypingText from "../../../hooks/useTypingEffect";

const TypingText = () => {
  const typingText = "Studying Online is now much easier";
  const displayedText = useTypingText(typingText, 100, true);

  return (
    <motion.h1
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#49BBBD] to-[#4F86F7] bg-clip-text text-transparent"
    >
      <span>{displayedText}</span>
      <span className="text-[#49BBBD] animate-pulse">|</span>
    </motion.h1>
  );
};

export default TypingText;
