import React from 'react';
import { Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getProfileImageUrl } from "@/lib/utils"

export default function MessagesList({ messages, activeGroup, messagesEndRef }) {
    console.log(messages)
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <EmptyState groupName={activeGroup?.group_name} />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageItem key={message._id} message={message} formatTime={formatTime} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

function EmptyState({ groupName }) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Users className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-600 mb-2">Welcome to {groupName}!</h3>
      <p className="text-gray-500">Start the conversation by sending your first message.</p>
    </div>
  )
}

function MessageItem({ message, formatTime }) {
  const isCurrentUser = message.sender_id?._id === "6813ae13ad093371347e0f0a"

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex space-x-2 max-w-xs lg:max-w-md ${isCurrentUser ? "flex-row-reverse space-x-reverse" : ""}`}>
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage
            src={getProfileImageUrl(message.sender_id?.profile_picture) || "/placeholder.svg"}
            alt={message.sender_id?.name}
          />
          <AvatarFallback className="bg-gray-300 text-gray-600 text-xs">
            {message.sender_id?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className={`${isCurrentUser ? "text-right" : "text-left"}`}>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-medium text-gray-900">{message.sender_id?.name}</span>
            <span className="text-xs text-gray-500">{formatTime(message.sent_at)}</span>
          </div>
          <div
            className={`inline-block p-3 rounded-lg ${
              isCurrentUser ? "bg-[#49BBBD] text-white rounded-br-sm" : "bg-gray-100 text-gray-900 rounded-bl-sm"
            }`}
          >
            <p className="text-sm">{message.message_content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
