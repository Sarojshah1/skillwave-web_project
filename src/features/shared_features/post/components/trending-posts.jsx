
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

const trendingPosts = [
  {
    title: "How to optimize React performance in 2024",
    upvotes: 142,
    comments: 23,
  },
  {
    title: "Next.js 15 new features you should know",
    upvotes: 98,
    comments: 15,
  },
  {
    title: "Building scalable APIs with Node.js",
    upvotes: 76,
    comments: 31,
  },
]

export function TrendingPosts() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <TrendingUp className="mr-2 h-4 w-4" />
          Trending Posts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          {trendingPosts.map((post, index) => (
            <div key={index} className="cursor-pointer hover:bg-gray-50 p-2 rounded">
              <p className="text-sm font-medium line-clamp-2">{post.title}</p>
              <p className="text-xs text-gray-500 mt-1">
                {post.upvotes} upvotes • {post.comments} comments
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
