import React from "react";
import { motion } from "framer-motion";

const stats = [
    { value: "15K+", label: "Students" },
    { value: "75%", label: "Total Success" },
    { value: "35", label: "Main Questions" },
    { value: "26", label: "Chief Experts" },
    { value: "16", label: "Years of Experience" },
];

const Success = () => {
    return (
        <div className="text-center py-12 px-4 bg-gray-100 overflow-hidden">
            <h2 className="text-4xl font-extrabold mb-4 text-gray-800">Our Success</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Empowering students with knowledge and skills through interactive learning. Discover our achievements and milestones.
            </p>

            {/* Scrolling Wrapper */}
            <div className="relative w-full overflow-hidden">
                <motion.div
                    className="flex space-x-8 min-w-max"
                    animate={{ x: ["0%", "-50%"] }} // Moves slowly for a better experience
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }} // Slower speed for readability
                >
                    {/* Duplicate stats for a seamless infinite scroll */}
                    {[...stats, ...stats].map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 min-w-[200px]"
                        >
                            <span className="text-5xl font-bold text-primary mb-2">{stat.value}</span>
                            <span className="text-gray-500 text-lg">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Success;