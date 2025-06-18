import { useChat } from "../../../hooks/useChat"
import { useVideoCall } from "../hooks/useVideoCall"
import ChatHeader from "./ChatHeader"
import VideoCallArea from "./VideoCallArea"
import MessagesList from "./MessageList"
import MessageInput from "./MessageInput"
import TypingIndicator from "./TypingIndicator"
import EmptyChat from "./EmptyChat"

export default function ChatArea({ activeGroup, onCreateGroup }) {
  const { messages, onlineUsers, isTyping, typingUsers, messagesEndRef, sendMessage, startTyping } = useChat(
    activeGroup?._id,
  )
  const {
    isCallActive,
    isMuted,
    isVideoOff,
    isScreenSharing,
    participants,
    localVideoRef,
    startCall,
    endCall,
    toggleMute,
    toggleVideo,
    toggleScreenShare,
  } = useVideoCall()

  if (!activeGroup) {
    return <EmptyChat onCreateGroup={onCreateGroup} />
  }

  const handleShowMembers = () => {
    alert("Show members panel - would open member list sidebar")
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      <ChatHeader
        activeGroup={activeGroup}
        isCallActive={isCallActive}
        participants={participants}
        onStartCall={startCall}
        onEndCall={endCall}
        onShowMembers={handleShowMembers}
      />

      <VideoCallArea
        isCallActive={isCallActive}
        participants={participants}
        localVideoRef={localVideoRef}
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        isScreenSharing={isScreenSharing}
        onToggleMute={toggleMute}
        onToggleVideo={toggleVideo}
        onToggleScreenShare={toggleScreenShare}
        onEndCall={endCall}
      />

      <MessagesList messages={messages} activeGroup={activeGroup} messagesEndRef={messagesEndRef} />

      <TypingIndicator typingUsers={typingUsers} isVisible={isTyping} />

      <MessageInput activeGroup={activeGroup} onSendMessage={sendMessage} onStartTyping={startTyping} />
    </div>
  )
}
