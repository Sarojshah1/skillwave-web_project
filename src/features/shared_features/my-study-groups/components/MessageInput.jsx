import React from 'react';
import { useState, useRef } from "react"
import { Send, Smile, Paperclip, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function MessageInput({ activeGroup, onSendMessage, onStartTyping }) {
  const [messageText, setMessageText] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const fileInputRef = useRef(null)
  const imageInputRef = useRef(null)

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (messageText.trim()) {
      onSendMessage(messageText)
      setMessageText("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    } else {
      onStartTyping()
    }
  }

  const handleFileUpload = (type) => {
    if (type === "image") {
      imageInputRef.current?.click()
    } else {
      fileInputRef.current?.click()
    }
  }

  const emojis = ["😀", "😂", "❤️", "👍", "👎", "😢", "😮", "😡", "🎉", "🔥", "💯", "👏"]

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      {/* Quick Actions */}
      <div className="flex items-center space-x-2 mb-3">
        <QuickActionButton
          icon={<Paperclip className="w-4 h-4" />}
          label="Attach File"
          onClick={() => handleFileUpload("file")}
        />
        <QuickActionButton
          icon={<ImageIcon className="w-4 h-4" />}
          label="Upload Image"
          onClick={() => handleFileUpload("image")}
        />
        <QuickActionButton
          icon={<Smile className="w-4 h-4" />}
          label="Add Emoji"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          active={showEmojiPicker}
        />
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-6 gap-2">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => {
                  setMessageText((prev) => prev + emoji)
                  setShowEmojiPicker(false)
                }}
                className="text-xl hover:bg-gray-200 rounded p-1 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
        <div className="flex-1">
          <Input
            type="text"
            placeholder={`Message ${activeGroup?.group_name || "group"}...`}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="resize-none"
          />
        </div>
        <Button
          type="submit"
          disabled={!messageText.trim()}
          className="bg-[#49BBBD] hover:bg-[#3da5a7] disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>

      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.zip"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            onSendMessage(`📎 Shared file: ${file.name}`, "file")
          }
        }}
      />
      <input
        type="file"
        ref={imageInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            onSendMessage(`🖼️ Shared image: ${file.name}`, "image")
          }
        }}
      />
    </div>
  )
}

function QuickActionButton({ icon, label, onClick, active = false }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onClick}
      className={`text-gray-500 hover:text-gray-700 ${active ? "bg-[#49BBBD] text-white border-[#49BBBD]" : ""}`}
      title={label}
    >
      {icon}
    </Button>
  )
}
