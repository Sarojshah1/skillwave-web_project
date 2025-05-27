
import { TrendingPosts } from "./trending-posts"
import { SuggestedUsers } from "./suggested-users"
import { RecentActivity } from "./recent-activity"
import { WeeklyChallenge } from "./weekely-challenge"

export function RightSidebar() {
  return (
      <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-8 space-y-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <TrendingPosts />
        <SuggestedUsers />
        <RecentActivity />
        <WeeklyChallenge />
      </div>
    </aside>
  )
}
