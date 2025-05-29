
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TestimonialCard({
  name,
  role,
  company,
  testimonial,
  avatar,
  rating,
  featured = false,
  delay = 0,
}) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut",
      },
    },
  }

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <Card
        className={`relative h-full overflow-hidden transition-all duration-300 ${
          featured
            ? "border-2 border-primary shadow-xl bg-gradient-to-br from-primary/5 to-secondary/5"
            : "border shadow-lg hover:shadow-xl"
        }`}
      >
        {featured && <Badge className="absolute top-4 right-4 z-10">Featured</Badge>}

        <CardContent className="p-6 h-full flex flex-col">
          {/* Quote Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.3, duration: 0.4 }}
            className="absolute top-4 left-4"
          >
            <Quote className="h-6 w-6 text-muted-foreground/30" />
          </motion.div>

          {/* Rating */}
          <motion.div
            className="flex items-center gap-1 mb-4 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.4 }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: delay + 0.5 + i * 0.1,
                  duration: 0.3,
                  ease: "backOut",
                }}
              >
                <Star
                  className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
                />
              </motion.div>
            ))}
            <span className="text-sm text-muted-foreground ml-2">{rating}/5</span>
          </motion.div>

          {/* Testimonial Text */}
          <motion.blockquote
            className="text-muted-foreground leading-relaxed flex-1 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.6 }}
          >
            "{testimonial}"
          </motion.blockquote>

          {/* User Info */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.7 }}
          >
            <Avatar className="h-12 w-12 border-2 border-background shadow-md">
              <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">{name}</h4>
              <p className="text-sm text-muted-foreground">
                {role}
                {company && (
                  <>
                    <span className="mx-1">•</span>
                    <span className="font-medium">{company}</span>
                  </>
                )}
              </p>
            </div>
          </motion.div>

          {/* Decorative Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.8, duration: 0.4 }}
            className="absolute bottom-4 right-4"
          >
            <Quote className="h-6 w-6 text-muted-foreground/20 rotate-180" />
          </motion.div>
        </CardContent>

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0"
          variants={hoverVariants}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  )
}
