import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Users, Award, TrendingUp, Star } from "lucide-react"
import { TestimonialCard } from "./TestimonialCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Frontend Developer",
    company: "TechCorp",
    testimonial:
      "This platform completely transformed my development skills. The hands-on projects and expert mentorship helped me advance from junior to senior developer in just 8 months. The community support is incredible!",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    featured: true,
  },
  {
    name: "Marcus Rodriguez",
    role: "Data Scientist",
    company: "DataFlow Inc",
    testimonial:
      "The machine learning courses here are top-notch. Real-world projects with actual datasets made all the difference. I landed my dream job at a Fortune 500 company thanks to the skills I gained here.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "UX Designer",
    company: "Design Studio",
    testimonial:
      "Amazing content and fantastic community. The design thinking workshops and portfolio reviews helped me transition from graphic design to UX. The instructors are industry veterans who really care about student success.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Full Stack Engineer",
    company: "StartupXYZ",
    testimonial:
      "The practical approach to learning is what sets this platform apart. Building real applications while learning gave me the confidence to tackle complex projects at work. Highly recommend to anyone serious about coding.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
  },
  {
    name: "Lisa Thompson",
    role: "Product Manager",
    company: "InnovateTech",
    testimonial:
      "The business and technical skills combination is perfect for product management. The cross-functional collaboration projects prepared me for real-world challenges. Best investment in my career development.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    name: "Alex Johnson",
    role: "DevOps Engineer",
    company: "CloudFirst",
    testimonial:
      "The cloud infrastructure and DevOps courses are incredibly comprehensive. From basic concepts to advanced automation, everything is covered with hands-on labs. The certification prep was invaluable.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
]

const achievements = [
  {
    icon: Users,
    value: "50K+",
    label: "Students Enrolled",
    description: "Active learners worldwide",
  },
  {
    icon: Award,
    value: "95%",
    label: "Completion Rate",
    description: "Students finish their courses",
  },
  {
    icon: TrendingUp,
    value: "89%",
    label: "Career Advancement",
    description: "Get promoted or new jobs",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Average Rating",
    description: "From student reviews",
  },
]

export default function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0)
  const [viewMode, setViewMode] = useState("grid") // "grid" or "carousel"
  const testimonialsPerPage = 3

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage)

  const currentTestimonials =
    Array.isArray(testimonials) && testimonials.length > 0
      ? testimonials.slice(
          currentPage * testimonialsPerPage,
          (currentPage + 1) * testimonialsPerPage
        )
      : []

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            What Our Students Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of successful graduates who transformed their careers with our platform
          </p>
        </motion.div>

        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-md"
            >
              Grid View
            </Button>
            <Button
              variant={viewMode === "carousel" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("carousel")}
              className="rounded-md"
            >
              Carousel
            </Button>
          </div>
        </motion.div>

        {/* Testimonials */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} delay={index * 0.1} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="carousel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-16"
            >
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="wait">
                    {currentTestimonials.map((testimonial, index) => (
                      <motion.div
                        key={`${currentPage}-${index}`}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <TestimonialCard {...testimonial} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Carousel Controls */}
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button variant="outline" size="icon" onClick={prevPage} disabled={totalPages <= 1}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentPage ? "bg-primary w-8" : "bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <Button variant="outline" size="icon" onClick={nextPage} disabled={totalPages <= 1}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-8">Our Impact in Numbers</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardContent className="p-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        delay: index * 0.1 + 0.3,
                        type: "spring",
                        stiffness: 300,
                      }}
                      className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4"
                    >
                      <achievement.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <motion.h4
                      className="text-3xl font-bold text-primary mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      {achievement.value}
                    </motion.h4>
                    <p className="font-semibold text-foreground mb-1">{achievement.label}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
