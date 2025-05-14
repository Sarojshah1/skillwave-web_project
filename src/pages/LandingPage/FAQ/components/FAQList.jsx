import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import FAQItem from "./FAQItem";

const FAQList = ({ items }) => (
  <motion.div
    className="max-w-3xl mx-auto"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    }}
  >
    {items.map((faq, index) => (
      <motion.div
        key={index}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <FAQItem {...faq} />
      </motion.div>
    ))}
  </motion.div>
);

FAQList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default React.memo(FAQList);
