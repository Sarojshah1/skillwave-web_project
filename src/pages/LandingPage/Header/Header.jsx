import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IMAGE_PATHS } from "../../../shared/constants/imagePaths";

const typingText = "Studying Online is now much easier";

const Header = () => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayedText((prev) =>
                index < typingText.length ? typingText.slice(0, index + 1) : typingText
            );
            setIndex((prevIndex) => (prevIndex < typingText.length ? prevIndex + 1 : 0));
        }, 100);

        return () => clearInterval(interval);
    }, [index]);

    return (
        <div className="bg-hero-pattern bg-cover bg-center h-screen flex items-center justify-center px-8">
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-12 md:gap-20">
                {/* Left Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="md:w-1/2 text-center md:text-left text-white"
                >
                    {/* Typing Animation Effect */}
                    <motion.h1 
                        initial={{ y: -30, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-[#49BBBD] text-5xl font-bold mb-4"
                    >
                        <span className="text-orange">{displayedText}</span>
                        <span className="text-white">|</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-lg mb-8 text-[#49BBBD]"
                    >
                        SkillWave is an interesting platform that will teach you in a more interactive way.
                    </motion.p>

                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            href="#join"
                            className="bg-[#49BBBD] text-white py-3 px-6 rounded-full shadow-lg hover:bg-white hover:text-[#49BBBD] hover:shadow-xl transition-transform duration-300 ease-in-out"
                        >
                            Join for Free
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2, delay: 1, ease: "easeInOut" }}
                            href="#how-it-works"
                            className="bg-transparent border-2 border-white text-[#49BBBD] py-3 px-6 rounded-full shadow-lg hover:bg-[#E6F8DE] hover:border-[#E6F8DE] transition-transform duration-300 ease-in-out"
                        >
                            Watch How It Works
                        </motion.a>
                    </div>
                </motion.div>

                {/* Right Content - Image with Continuous Animation */}
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="md:w-1/2 mb-4 md:mb-0"
                >
                    <motion.img
                        src={IMAGE_PATHS.background}
                        alt="Learning Illustration"
                        className="w-2/4 md:w-3/4 h-auto rounded-lg object-cover"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Header;