import React from 'react';
export default function TypingIndicator({ typingUsers, isVisible }) {
  if (!isVisible || typingUsers.length === 0) return null

  return (
    <div className="px-4 py-2 text-sm text-gray-500">
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
        <span>
          {`Someone people are typing...`}
        </span>
      </div>
    </div>
  )
}
