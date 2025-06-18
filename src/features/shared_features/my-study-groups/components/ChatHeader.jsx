import { Video, Phone, Users, MoreVertical, PhoneOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getProfileImageUrl } from "@/lib/utils"

export default function ChatHeader({ activeGroup, isCallActive, participants, onStartCall, onEndCall, onShowMembers }) {
  if (!activeGroup) return null

  return (
    <div className="p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={getProfileImageUrl(activeGroup.group_image) || "/placeholder.svg"}
              alt={activeGroup.group_name}
            />
            <AvatarFallback className="bg-[#49BBBD] text-white">
              {activeGroup.group_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900">{activeGroup.group_name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{activeGroup.members.length} members</span>
              <span>•</span>
              <span>{Math.floor(Math.random() * activeGroup.members.length) + 1} online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {!isCallActive ? (
            <>
              <Button
                onClick={onStartCall}
                variant="outline"
                size="sm"
                className="text-[#49BBBD] border-[#49BBBD] hover:bg-[#49BBBD] hover:text-white"
              >
                <Video className="w-4 h-4 mr-2" />
                Start Call
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Badge variant="destructive" className="animate-pulse">
                Live Call • {participants.length} participants
              </Badge>
              <Button onClick={onEndCall} variant="destructive" size="sm">
                <PhoneOff className="w-4 h-4" />
              </Button>
            </div>
          )}
          <Button onClick={onShowMembers} variant="outline" size="sm">
            <Users className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
