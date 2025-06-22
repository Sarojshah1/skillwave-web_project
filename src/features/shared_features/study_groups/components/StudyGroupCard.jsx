import { useState } from "react"
import { Users, Calendar, User, UserPlus, UserMinus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDate, getImageUrl, getProfileImageUrl } from "@/lib/utils"

export default function StudyGroupCard({ group, currentUserId, onJoinGroup, onLeaveGroup }) {
  console.log(currentUserId)
  const [isLoading, setIsLoading] = useState(false)

  const isMember = group.members.some((member) => member._id === currentUserId)
  const isCreator = group.created_by._id === currentUserId
  const memberCount = group.members.length

  const handleJoinLeave = async () => {
    if (!currentUserId) {
      alert("Please login to join study groups")
      return
    }

    setIsLoading(true)
    try {
      if (isMember) {
        await onLeaveGroup(group._id)
      } else {
        await onJoinGroup(group._id)
      }
    } catch (error) {
      console.error("Error:", error)
      alert(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden">
      {/* Group Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImageUrl(group.group_image) || "/placeholder.svg"}
          alt={group.group_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-700">
            <Users className="w-3 h-3 mr-1" />
            {memberCount} member{memberCount !== 1 ? "s" : ""}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#49BBBD] transition-colors">
            {group.group_name}
          </h3>
          {isCreator && (
            <Badge variant="outline" className="text-xs border-[#49BBBD] text-[#49BBBD]">
              Creator
            </Badge>
          )}
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{group.description}</p>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Creator Info */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={getProfileImageUrl(group.created_by.profile_picture) || "/placeholder.svg"}
              alt={group.created_by.name}
            />
            <AvatarFallback className="bg-[#49BBBD] text-white text-xs">
              {group.created_by.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Created by {group.created_by.name}</p>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(group.created_at)}
            </div>
          </div>
        </div>

        {/* Members Preview */}
        {memberCount > 0 && (
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {group.members.slice(0, 3).map((member, index) => (
                <Avatar key={member._id} className="w-6 h-6 border-2 border-white">
                  <AvatarImage
                    src={getProfileImageUrl(member.profile_picture) || "/placeholder.svg"}
                    alt={member.name}
                  />
                  <AvatarFallback className="bg-gray-300 text-gray-600 text-xs">
                    {member.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
              {memberCount > 3 && (
                <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-gray-600 font-medium">+{memberCount - 3}</span>
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500">{memberCount === 1 ? "1 member" : `${memberCount} members`}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          onClick={handleJoinLeave}
          disabled={isLoading || isCreator}
          className={`w-full transition-all duration-300 ${
            isMember ? "bg-[#49BBBD] hover:bg-red-600 text-white" : "bg-[#49BBBD] hover:bg-[#3da5a7] text-white"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : isCreator ? (
            <>
              <User className="w-4 h-4 mr-2" />
              Your Group
            </>
          ) : isMember ? (
            <>
              <UserMinus className="w-4 h-4 mr-2" />
              Leave Group
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-2" />
              Join Group
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
