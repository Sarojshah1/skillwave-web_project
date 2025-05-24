

import { useState } from "react"
import { CreatePost } from "../components/create-post"
import { PostCard } from "../components/post-card"

// Sample data
const currentUser = {
  id: "user-1",
  name: "John Doe",
  avatar: "/placeholder.svg?height=40&width=40",
}

const initialPosts = [
  {
    id: "post-1",
    user: {
      id: "user-2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
    },
    content:
      "Just finished my new photography project! Here are some of my favorite shots from our trip to the mountains last weekend. The weather was perfect and the views were breathtaking. What do you think?",
    images: [
      "/placeholder.svg?height=600&width=800&text=Mountain+View",
      "/placeholder.svg?height=600&width=800&text=Sunset",
      "/placeholder.svg?height=600&width=800&text=Forest+Trail",
      "/placeholder.svg?height=600&width=800&text=Lake+Reflection",
    ],
    timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    likes: 24,
    isLikedByCurrentUser: false,
    comments: [
      {
        id: "comment-1",
        user: {
          id: "user-3",
          name: "Robert Johnson",
          avatar: "/placeholder.svg?height=40&width=40&text=RJ",
        },
        text: "These photos are amazing! Which camera did you use?",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        likes: 5,
        isLikedByCurrentUser: true,
        replies: [
          {
            id: "reply-1",
            user: {
              id: "user-2",
              name: "Jane Smith",
              avatar: "/placeholder.svg?height=40&width=40&text=JS",
            },
            text: "Thanks! I used my Sony A7III with a 24-70mm lens.",
            timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
            likes: 2,
            isLikedByCurrentUser: false,
          },
        ],
      },
      {
        id: "comment-2",
        user: {
          id: "user-4",
          name: "Sarah Williams",
          avatar: "/placeholder.svg?height=40&width=40&text=SW",
        },
        text: "I love the third photo with the forest trail. The lighting is perfect!",
        timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        likes: 3,
        isLikedByCurrentUser: false,
        replies: [],
      },
    ],
  },
  {
    id: "post-2",
    user: {
      id: "user-5",
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40&text=MB",
    },
    content:
      "Just launched my new website! It's been a long journey but I'm really proud of the result. Check it out and let me know what you think!",
    images: ["/placeholder.svg?height=600&width=800&text=Website+Screenshot"],
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    likes: 42,
    isLikedByCurrentUser: true,
    comments: [
      {
        id: "comment-3",
        user: {
          id: "user-1",
          name: "John Doe",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        text: "Congratulations! The design looks clean and modern.",
        timestamp: new Date(Date.now() - 43200000), // 12 hours ago
        likes: 7,
        isLikedByCurrentUser: false,
        replies: [],
      },
    ],
  },
  {
    id: "post-3",
    user: {
      id: "user-6",
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40&text=ED",
    },
    content:
      "I'm excited to announce that I'll be speaking at the Web Development Conference next month! My talk will be about the future of frontend frameworks and how to prepare for the changes ahead. Hope to see some of you there!",
    images: [],
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    likes: 56,
    isLikedByCurrentUser: false,
    comments: [],
  },
]

export default function ForumPage() {
  const [posts, setPosts] = useState(initialPosts)

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts])
  }

  return (
    <div className="container max-w-2xl mx-auto py-16 px-4">
      

      <CreatePost user={currentUser} onPostCreated={handlePostCreated} />

      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} currentUser={currentUser} />
        ))}
      </div>
    </div>
  )
}
