import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <motion.div
            className="bg-white rounded-lg shadow-lg mb-4 overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <button
                className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 transition-colors duration-300"
                onClick={toggle}
            >
                <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isOpen ? <FaChevronUp className="text-blue-600" /> : <FaChevronDown className="text-blue-600" />}
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="p-4 text-gray-800 border-t border-gray-200"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <p>{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

FAQItem.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
};

const FAQSection = () => {
    const faqs = [
        {
            question: "What is this platform about?",
            answer: "This platform offers a variety of online courses to help you advance your skills in various fields like Web Development, Data Science, Digital Marketing, and more. Our courses are designed to be practical and up-to-date, offering real-world knowledge to help you succeed in your career. Whether you're a beginner or an expert, there's something here for everyone.",
        },
        {
            question: "How can I enroll in a course?",
            answer: "To enroll in a course, browse our course catalog, select the course you’re interested in, and click on the 'Enroll Now' button. After that, follow the simple instructions to create an account or log in, choose your payment method, and you’ll be ready to start learning. All enrolled students get access to course materials, live sessions (if applicable), and a community of learners.",
        },
        {
            question: "What payment methods are accepted?",
            answer: "We accept a wide range of payment methods including credit/debit cards (Visa, MasterCard), PayPal, and other online payment options like Stripe and Apple Pay. All transactions are secure, and you will receive a confirmation email once your payment is successfully processed. For more information about payment methods, you can visit our payment page.",
        },
        {
            question: "Do you offer refunds?",
            answer: "Yes, we offer a refund policy for courses within a certain period after enrollment. If you're not satisfied with the course within the first 14 days, we’ll refund your payment, no questions asked. Please note that the refund policy only applies to courses purchased directly from our website. For more detailed information, please check our refund policy page or contact customer support.",
        },
        {
            question: "Are the courses beginner-friendly?",
            answer: "Absolutely! Our platform is designed to cater to learners of all levels. Many of our courses start with foundational concepts and gradually build up to more advanced topics. We also offer tutorials, discussion forums, and live Q&A sessions to help you along the way. Even if you're a complete beginner, you’ll find our courses easy to follow and engaging.",
        },
        {
            question: "Can I get a certificate after completing a course?",
            answer: "Yes, you can receive a certificate upon completing any of our courses. The certificate will demonstrate your accomplishment and can be shared on LinkedIn, included in your resume, or used as proof of your continued professional development. Each certificate includes your name, course title, and the date of completion.",
        },
        {
            question: "What if I have questions during the course?",
            answer: "We offer multiple ways to get help during your course. You can ask questions directly on the course page in the discussion forums, attend live office hours with the instructors, or even reach out to our support team via email. We’re here to make sure you succeed and have all the resources you need to succeed.",
        },
        {
            question: "Are there any discounts or promotions?",
            answer: "Yes, we offer discounts and promotions from time to time. You can sign up for our newsletter to get notified about upcoming sales and limited-time offers. Additionally, we offer special discounts for students, groups, and early birds. Check our homepage regularly or follow us on social media for the latest deals.",
        },
    ];

    return (
        <motion.div
            className="p-8 bg-gradient-to-r from-gray-100 to-gray-200"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>
            <motion.div
                className="max-w-3xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
                }}
            >
                {faqs.map((faq, index) => (
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
        </motion.div>
    );
};

export default FAQSection;