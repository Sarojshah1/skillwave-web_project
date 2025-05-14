import React from "react";
import { motion } from "framer-motion";
import FAQList from "../components/FAQList";
import faqs from "../data/faqs";

const FAQSection = () => (
  <motion.section
    className="p-8 bg-gradient-to-r from-gray-100 to-gray-200"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
      Frequently Asked Questions
    </h2>
    <FAQList items={faqs} />
  </motion.section>
);

export default FAQSection;
