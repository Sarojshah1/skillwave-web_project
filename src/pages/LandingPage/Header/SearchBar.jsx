import { motion } from "framer-motion";
import { Search } from "lucide-react";
import React from "react";

const SearchBar = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="relative mb-8 max-w-md mx-auto md:mx-0"
  >
    <div className="relative">
      <input
        type="text"
        placeholder="Search for courses..."
        className="w-full py-3 pl-12 pr-4 text-black bg-transparent border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-[#49BBBD] shadow-sm"
      />
      <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
    </div>
  </motion.div>
);

export default SearchBar;
