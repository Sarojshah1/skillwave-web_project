
import { NavigationMenu } from "./navigation-menu"
import { PopularTags } from "./popuarYags"
import { CommunityStats } from "./commuity-tags"

export function LeftSidebar() {
  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-4 space-y-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <NavigationMenu />
        <PopularTags />
        <CommunityStats />
      </div>
    </aside>
  )
}
