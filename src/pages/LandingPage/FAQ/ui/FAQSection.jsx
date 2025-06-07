
import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import FAQList from "../components/FAQList"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { faqs, categories } from "../data/faqs"

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || faq.category === activeCategory

    return matchesSearch && matchesCategory
  })

  return (
    <motion.section
      className="py-16 px-4 sm:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 rounded-xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Find answers to common questions about our platform, courses, and policies. Can't find what you're looking
            for? Contact our support team.
          </p>
        </motion.div>

        <motion.div
          className="mb-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <Input
              type="text"
              placeholder="Search questions..."
              className="pl-10 bg-white/80 backdrop-blur-sm border-slate-200 focus:border-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="w-full flex flex-wrap justify-start gap-2 bg-transparent">
              <TabsTrigger
                value="all"
                onClick={() => setActiveCategory("all")}
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                All Questions
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {filteredFaqs.length > 0 ? (
          <FAQList items={filteredFaqs} />
        ) : (
          <motion.div
            className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-slate-600">No questions found matching your search.</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
