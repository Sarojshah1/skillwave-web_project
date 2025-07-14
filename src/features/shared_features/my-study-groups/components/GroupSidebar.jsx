import React from 'react';
import { useState } from "react"
import { Users, Search, Plus, MessageCircle, Video, UserCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getProfileImageUrl,getImageUrl } from "@/lib/utils"

export default function GroupSidebar({ activeGroupId, onGroupSelect, onCreateGroup,groups }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredGroups = groups.filter((group) =>
    group.group_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Study Groups</h2>
          <Button onClick={onCreateGroup} size="sm" className="bg-[#49BBBD] hover:bg-[#3da5a7]">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Groups List */}
      <div className="flex-1 overflow-y-auto">
        {filteredGroups.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p>No groups found</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredGroups.map((group) => (
              <div
                key={group._id}
                onClick={() => onGroupSelect(group)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                  activeGroupId === group._id ? "bg-[#49BBBD]/10 border border-[#49BBBD]/20" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={getImageUrl(group.group_image) || "/placeholder.svg"}
                        alt={group.group_name}
                      />
                      <AvatarFallback className="bg-[#49BBBD] text-white text-sm">
                        {group.group_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{group.group_name}</h3>
                      {activeGroupId === group._id && (
                        <div className="flex space-x-1">
                          <MessageCircle className="w-4 h-4 text-[#49BBBD]" />
                          <Video className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center space-x-1">
                        <UserCheck className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{group.members.length} members</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {Math.floor(Math.random() * 5) + 1} online
                      </Badge>
                    </div>

                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{group.description}</p>

                    {/* Last message preview */}
                    <div className="mt-2 text-xs text-gray-400">
                      <span className="font-medium">John:</span> Let's start the video call...
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Online</span>
          <span>•</span>
          <span>{filteredGroups.length} groups</span>
        </div>
      </div>
    </div>
  )
}
