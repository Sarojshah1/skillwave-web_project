import { Users, MessageCircle, Video } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EmptyChat({ onCreateGroup }) {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="w-12 h-12 text-gray-400" />
        </div>

        <h3 className="text-2xl font-semibold text-gray-600 mb-4">Select a Study Group</h3>

        <p className="text-gray-500 mb-8 leading-relaxed">
          Choose a group from the sidebar to start chatting and collaborating with your study partners.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <MessageCircle className="w-4 h-4 text-[#49BBBD]" />
              <span>Real-time chat</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Video className="w-4 h-4 text-[#49BBBD]" />
              <span>Video calls</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-4 h-4 text-[#49BBBD]" />
              <span>Group collaboration</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="w-4 h-4 text-[#49BBBD]">📎</span>
              <span>File sharing</span>
            </div>
          </div>

          <Button onClick={onCreateGroup} className="bg-[#49BBBD] hover:bg-[#3da5a7] text-white">
            Create New Group
          </Button>
        </div>
      </div>
    </div>
  )
}
