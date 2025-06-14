export function useDashboardData() {
  // In a real app, this would fetch from an API
  return {
    metrics: [
      { title: "Total Students", value: "1,248", change: "+12%" },
      { title: "Course Completion", value: "78%", change: "+5%" },
      { title: "Avg. Rating", value: "4.8/5", change: "+0.2" },
      { title: "Revenue", value: "$12,450", change: "+18%" },
    ],
    studentEngagement: [
      { day: "Mon", students: 45 },
      { day: "Tue", students: 52 },
      { day: "Wed", students: 49 },
      { day: "Thu", students: 63 },
      { day: "Fri", students: 58 },
      { day: "Sat", students: 48 },
      { day: "Sun", students: 40 },
    ],
    courseCompletionData: [
      { month: "Jan", completion: 65 },
      { month: "Feb", completion: 59 },
      { month: "Mar", completion: 70 },
      { month: "Apr", completion: 72 },
      { month: "May", completion: 75 },
      { month: "Jun", completion: 78 },
    ],
    revenueData: [
      { month: "Jan", revenue: 4200 },
      { month: "Feb", revenue: 3800 },
      { month: "Mar", revenue: 5100 },
      { month: "Apr", revenue: 5800 },
      { month: "May", revenue: 7200 },
      { month: "Jun", revenue: 8500 },
    ],
    courses: [
      { title: "Advanced Web Development", students: 245, progress: 85, rating: 4.9 },
      { title: "Data Science Fundamentals", students: 189, progress: 72, rating: 4.7 },
      { title: "UX/UI Design Principles", students: 156, progress: 68, rating: 4.5 },
      { title: "Mobile App Development", students: 210, progress: 90, rating: 4.8 },
    ],
    coursePerformance: [
      { name: "Web Dev", students: 245, completion: 85, rating: 4.9 },
      { name: "Data Science", students: 189, completion: 72, rating: 4.7 },
      { name: "UX/UI", students: 156, completion: 68, rating: 4.5 },
      { name: "Mobile Dev", students: 210, completion: 90, rating: 4.8 },
      { name: "Python", students: 178, completion: 75, rating: 4.6 },
    ],
    schedule: [
      {
        title: "Advanced JavaScript Live Class",
        type: "class",
        time: "Today, 2:00 PM",
        course: "Advanced Web Development",
      },
      {
        title: "Project Submissions Deadline",
        type: "assignment",
        time: "Tomorrow, 11:59 PM",
        course: "UX/UI Design Principles",
      },
      {
        title: "Course Planning Meeting",
        type: "meeting",
        time: "Jun 15, 10:00 AM",
      },
      {
        title: "Data Visualization Workshop",
        type: "class",
        time: "Jun 16, 3:00 PM",
        course: "Data Science Fundamentals",
      },
    ],
    activities: [
      {
        user: { name: "Emma Wilson", avatar: "/placeholder.svg?height=32&width=32" },
        action: "enrolled in Advanced Web Development",
        time: "10 minutes ago",
        type: "enrollment",
      },
      {
        user: { name: "James Rodriguez", avatar: "/placeholder.svg?height=32&width=32" },
        action: "submitted an assignment",
        time: "1 hour ago",
        type: "submission",
      },
      {
        user: { name: "Sophia Chen", avatar: "/placeholder.svg?height=32&width=32" },
        action: "left a comment on your course",
        time: "2 hours ago",
        type: "comment",
      },
      {
        user: { name: "Michael Brown", avatar: "/placeholder.svg?height=32&width=32" },
        action: "rated your course 5 stars",
        time: "Yesterday",
        type: "rating",
      },
    ],
    messages: [
      {
        user: { name: "Emma Wilson", avatar: "/placeholder.svg?height=32&width=32" },
        content:
          "Hi Dr. Johnson, I had a question about the latest assignment. Could you clarify the requirements for the final project?",
        time: "10:23 AM",
      },
      {
        user: { name: "James Rodriguez", avatar: "/placeholder.svg?height=32&width=32" },
        content:
          "Thank you for the feedback on my project. I've implemented your suggestions and updated my submission.",
        time: "Yesterday",
      },
      {
        user: { name: "Sophia Chen", avatar: "/placeholder.svg?height=32&width=32" },
        content:
          "I'm having trouble accessing the course materials for week 3. Could you please check if there's an issue?",
        time: "2 days ago",
      },
    ],
    questions: [
      {
        user: { name: "Michael Brown", avatar: "/placeholder.svg?height=32&width=32" },
        content:
          "In the lecture on React hooks, you mentioned a special case for useEffect. Could you elaborate on that?",
        course: "Web Dev",
        time: "3 hours ago",
      },
      {
        user: { name: "Sophia Chen", avatar: "/placeholder.svg?height=32&width=32" },
        content:
          "What's the difference between supervised and unsupervised learning in the context of our current project?",
        course: "Data Science",
        time: "Yesterday",
      },
    ],
    reviews: [
      {
        user: { name: "Emma Wilson", avatar: "/placeholder.svg?height=32&width=32" },
        content: "This course was incredibly helpful! The practical examples really helped me understand the concepts.",
        course: "Advanced Web Development",
        rating: 5,
        time: "2 days ago",
      },
      {
        user: { name: "James Rodriguez", avatar: "/placeholder.svg?height=32&width=32" },
        content: "Great course overall, but I wish there were more practice exercises for the advanced topics.",
        course: "Data Science Fundamentals",
        rating: 4,
        time: "1 week ago",
      },
      {
        user: { name: "Michael Brown", avatar: "/placeholder.svg?height=32&width=32" },
        content: "Dr. Johnson explains complex concepts in a way that's easy to understand. Highly recommended!",
        course: "Mobile App Development",
        rating: 5,
        time: "2 weeks ago",
      },
    ],
    demographics: [
      { name: "Kathmandu", value: 624 },
      { name: "Siraha", value: 312 },
      { name: "Janakpur", value: 187 },
      { name: "Biratnagar", value: 75 },
      { name: "Other", value: 50 },
    ],
    achievements: [
      { name: "Master Educator", icon: "star", unlocked: true },
      { name: "1000+ Students", icon: "users", unlocked: true },
      { name: "Top Rated", icon: "award", unlocked: true },
      { name: "Course Creator", icon: "book-open", unlocked: true },
      { name: "Rising Star", icon: "trending-up", unlocked: true },
      { name: "Content Expert", icon: "zap", unlocked: false, progress: "2/3" },
    ],
  }
}
