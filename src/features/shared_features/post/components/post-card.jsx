import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Heart, MessageCircle, Share, MoreHorizontal, Send, ImageIcon, Smile } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { PostImages } from "./post-images"
import { CommentItem } from "./comment-item"

export function PostCard({ post, currentUser }) {
  const [isLiked, setIsLiked] = useState(post.isLikedByCurrentUser || false)
  const [likesCount, setLikesCount] = useState(post.likes || 0)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState(post.comments || [])
  const [showAllComments, setShowAllComments] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1)
    } else {
      setLikesCount(likesCount + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return

    const newComment = {
      id: `comment-${Date.now()}`,
      user: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
      },
      text: commentText,
      timestamp: new Date(),
      likes: 0,
      isLikedByCurrentUser: false,
      replies: [],
    }

    setComments([...comments, newComment])
    setCommentText("")
  }

  const visibleComments = showAllComments ? comments : comments.slice(0, 3)

  return (
    <Card className="mb-6 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 transition-colors bg-white dark:bg-gray-900">
      <CardHeader className="pb-3 px-5 pt-4 bg-[#49BBBD] rounded-t-xl text-white shadow-md">
        <div className="flex justify-between items-start py-2">
          <div className="flex items-center gap-8">
            <Avatar className="ring-2 ring-white dark:ring-gray-900 shadow-md">
              <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-lg leading-tight">{post.user.name}</div>
              <div className="text-xs opacity-90">
                {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-white hover:bg-white/20 transition"
                aria-label="More options"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg">
              <DropdownMenuItem>Save post</DropdownMenuItem>
              <DropdownMenuItem>Hide post</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Report post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pb-3 px-5 py-4">
        <div className="mb-5 whitespace-pre-wrap text-gray-800 dark:text-gray-100 leading-relaxed">
          {post.content}
        </div>
        {post.images && post.images.length > 0 && <PostImages images={post.images} />}

        <div className="flex items-center justify-between mt-6 text-sm text-muted-foreground">
          <div>{likesCount > 0 && `${likesCount} likes`}</div>
          <div>{comments.length > 0 && `${comments.length} comments`}</div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="p-0 px-5 pb-5">
        <div className="w-full">
          <div className="grid grid-cols-3 gap-2 py-3">
            <Button
              variant="ghost"
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg transition-colors duration-300",
                isLiked ? "text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900"
              )}
              onClick={handleLike}
            >
              <Heart className={cn("h-5 w-5", isLiked && "fill-indigo-600 dark:fill-indigo-400")} />
              Like
            </Button>
            <Button
              variant="ghost"
              className="flex items-center justify-center gap-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors duration-300"
            >
              <MessageCircle className="h-5 w-5" />
              Comment
            </Button>
            <Button
              variant="ghost"
              className="flex items-center justify-center gap-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors duration-300"
            >
              <Share className="h-5 w-5" />
              Share
            </Button>
          </div>

          <Separator className="my-3" />

          {/* Comments section */}
          <div>
            {visibleComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                currentUser={currentUser}
                onReply={(commentId, replyText) => {
                  const updatedComments = comments.map((c) => {
                    if (c.id === commentId) {
                      return {
                        ...c,
                        replies: [
                          ...c.replies,
                          {
                            id: `reply-${Date.now()}`,
                            user: {
                              id: currentUser.id,
                              name: currentUser.name,
                              avatar: currentUser.avatar,
                            },
                            text: replyText,
                            timestamp: new Date(),
                            likes: 0,
                            isLikedByCurrentUser: false,
                          },
                        ],
                      }
                    }
                    return c
                  })
                  setComments(updatedComments)
                }}
              />
            ))}

            {comments.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground mt-2"
                onClick={() => setShowAllComments(!showAllComments)}
              >
                {showAllComments ? "Show fewer comments" : `View all ${comments.length} comments`}
              </Button>
            )}

            {/* Add comment form */}
            <form onSubmit={handleAddComment} className="mt-4 flex items-center gap-3">
              <Avatar className="h-9 w-9 ring-2 ring-indigo-500">
                <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="relative flex-1">
                <Textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="min-h-0 h-10 py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Button type="button" size="icon" variant="ghost" className="h-8 w-8 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button type="button" size="icon" variant="ghost" className="h-8 w-8 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                size="icon"
                disabled={!commentText.trim()}
                className="text-indigo-600 hover:text-indigo-800 disabled:text-indigo-300 transition"
                aria-label="Send comment"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
