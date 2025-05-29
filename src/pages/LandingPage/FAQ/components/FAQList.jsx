
import { motion } from "framer-motion"
import FAQItem from "./FAQItem"




export default function FAQList({ items }) {
  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
          },
        },
      }}
    >
      {items.map((faq, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <FAQItem question={faq.question} answer={faq.answer} category={faq.category} />
        </motion.div>
      ))}
    </motion.div>
  )
}
