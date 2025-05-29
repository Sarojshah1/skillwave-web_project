
import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react"

const testimonials = [
  {
    name: "Priya Thapa",
    role: "Software Engineer",
    company: "Tech Corp",
    feedback:
      "SkillWave completely transformed my career trajectory. The courses are incredibly well-structured, and the community support is unmatched. I landed my dream job within 6 months!",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Rahul Shrestha",
    role: "Product Manager",
    company: "Innovation Labs",
    feedback:
      "The interactive learning approach and real-world projects helped me transition from engineering to product management seamlessly. The mentorship program is exceptional.",
    image: "https://images.unsplash.com/photo-1472099645785-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Maya Singh",
    role: "Data Scientist",
    company: "Analytics Pro",
    feedback:
      "As someone who was completely new to data science, SkillWave made complex concepts accessible and engaging. The hands-on projects built my confidence tremendously.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Arjun Patel",
    role: "UX Designer",
    company: "Design Studio",
    feedback:
      "The design courses are cutting-edge and taught by industry experts. I particularly loved the portfolio review sessions and career guidance. Highly recommended!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
]

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 px-6 relative overflow-hidden">
    
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">Student Success</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from learners who transformed their careers with SkillWave
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          className="max-w-4xl mx-auto mb-16"
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-12 shadow-2xl">
            <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Quote className="w-8 h-8 text-white" />
            </div>
            
            <div className="pt-8">
              <div className="flex items-center gap-2 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-2xl text-gray-800 leading-relaxed mb-8 font-medium">
                "{testimonials[currentIndex].feedback}"
              </blockquote>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-lg"
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                  <p className="text-blue-600 font-semibold">{testimonials[currentIndex].role}</p>
                  <p className="text-gray-500 text-sm">{testimonials[currentIndex].company}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-6 mb-16">
          <motion.button
            onClick={prevTestimonial}
            className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-white/50 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          
          <motion.button
            onClick={nextTestimonial}
            className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-white/50 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={`group cursor-pointer transition-all duration-300 ${
                index === currentIndex ? 'scale-105' : 'hover:scale-105'
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                    <p className="text-blue-600 text-xs font-semibold">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm line-clamp-3">{testimonial.feedback}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
