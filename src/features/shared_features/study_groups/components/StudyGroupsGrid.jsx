import StudyGroupCard from "./StudyGroupCard"
import { Users } from "lucide-react"

export default function StudyGroupsGrid({ groups, currentUserId, onJoinGroup, onLeaveGroup }) {
  if (groups.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Users className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Study Groups Found</h3>
        <p className="text-gray-600 mb-6">Try adjusting your search terms or create a new study group!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => (
        <StudyGroupCard
          key={group._id}
          group={group}
          currentUserId={currentUserId}
          onJoinGroup={onJoinGroup}
          onLeaveGroup={onLeaveGroup}
        />
      ))}
    </div>
  )
}
