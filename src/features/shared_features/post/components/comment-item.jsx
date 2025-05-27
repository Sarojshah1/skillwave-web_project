import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAddReply } from "../hooks/useAddReply";
import { useReplies } from "../hooks/useReplies";

export function CommentItem({
  postId,
  comment,
  currentUser,
  isReply = false,
}) {
  const [isLiked, setIsLiked] = useState(comment.isLikedByCurrentUser || false);
  const [likesCount, setLikesCount] = useState(comment.likes || 0);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showAllReplies, setShowAllReplies] = useState(false);
  const {
    data: repliesData,
    isLoading,
    isError,
  } = useReplies(postId, comment._id);
  const replies = repliesData || [];
  const addReplyMutation = useAddReply(postId, comment._id);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    addReplyMutation.mutate(
      { content: replyText },
      {
        onSuccess: () => {
          setReplyText("");
          setIsReplying(false);
        },
        onError: (error) => {
         
          console.error("Failed to add reply", error);
        },
      }
    );
    setReplyText("");
    setIsReplying(false);
  };

  const visibleReplies = showAllReplies
    ? comment.replies
    : comment.replies?.slice(0, 2);

  return (
    <div className={cn("mb-3", isReply && "ml-8 mt-2")}>
      <div className="flex gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={
              `http://localhost:3000/profile/${comment.user_id.profile_picture}` ||
              "/placeholder.svg"
            }
            alt={comment.user_id?.name}
          />
          <AvatarFallback>{comment.user_id?.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-muted rounded-lg px-3 py-2">
            <div className="font-semibold text-sm">{comment.user_id?.name}</div>
            <div className="text-sm">{comment.content}</div>
          </div>

          <div className="flex items-center gap-3 mt-1 text-xs">
            <button
              className={cn("font-medium", isLiked && "text-primary")}
              onClick={handleLike}
            >
              Like
            </button>
            <button
              className="font-medium"
              onClick={() => setIsReplying(!isReplying)}
            >
              Reply
            </button>
            <span className="text-muted-foreground">
              {formatDistanceToNow(new Date(comment.created_at), {
                addSuffix: true,
              })}
            </span>
            {likesCount > 0 && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Heart
                  className={cn(
                    "h-3 w-3",
                    isLiked && "fill-primary text-primary"
                  )}
                />
                {likesCount}
              </div>
            )}
          </div>

          {isReplying && (
            <form
              onSubmit={handleReplySubmit}
              className="mt-2 flex items-center gap-2"
            >
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={`http://localhost:3000/profile/${currentUser.profile_picture}` || "/placeholder.svg"}
                  alt={currentUser?.name}
                />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="relative flex-1">
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${comment.user_id?.name}...`}
                  className="min-h-0 h-8 py-1.5 px-3 resize-none text-sm"
                />
              </div>
              <Button type="submit" size="sm" disabled={!replyText.trim()}>
                Reply
              </Button>
            </form>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">
              {!showAllReplies && comment.replies.length > 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-xs text-muted-foreground mb-1 px-2"
                  onClick={() => setShowAllReplies(true)}
                >
                  View {comment.replies.length} replies
                </Button>
              )}

              {visibleReplies.map((reply) => (
                <CommentItem
                  key={reply._id}
                  comment={reply}
                  currentUser={currentUser}
                  isReply={true}
                />
              ))}

              {showAllReplies && comment.replies.length > 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-xs text-muted-foreground mt-1 px-2"
                  onClick={() => setShowAllReplies(false)}
                >
                  Hide replies
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
