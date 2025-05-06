import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import TypingText from "./TypingText";
import Stats from "./Stats";
import ActionButtons from "./ActionButtons";
import ImageSection from "./ImageSection";
import DecorativeBlobs from "./DecorativeBlobs";

const Header = () => {
  return (
    <div className="relative dark:from-[#0a192f] dark:to-[#112240] min-h-screen overflow-hidden">
      <DecorativeBlobs />
      <div className="relative z-10 px-6 pt-10 pb-20 md:pt-20 flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-12 md:gap-20">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2 text-center md:text-left"
          >
            <SearchBar />
            <TypingText />
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300 max-w-lg">
              SkillWave is an interactive learning platform that transforms how
              you acquire new skills with personalized learning paths and
              expert-led courses.
            </p>
            <Stats />
            <ActionButtons />
          </motion.div>

          {/* Right Section */}
          <ImageSection />
        </div>
      </div>
    </div>
  );
};

export default Header;
