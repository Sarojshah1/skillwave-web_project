import { Mic, MicOff, Video, VideoOff, Monitor, PhoneOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function VideoCallArea({
  isCallActive,
  participants,
  localVideoRef,
  isMuted,
  isVideoOff,
  isScreenSharing,
  onToggleMute,
  onToggleVideo,
  onToggleScreenShare,
  onEndCall,
}) {
  if (!isCallActive) return null

  return (
    <div className="bg-gray-900 p-4">
      {/* Participants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {participants.map((participant) => (
          <ParticipantVideo
            key={participant._id}
            participant={participant}
            localVideoRef={participant._id === "6813ae13ad093371347e0f0a" ? localVideoRef : null}
            isVideoOff={participant._id === "6813ae13ad093371347e0f0a" ? isVideoOff : participant.isVideoOff}
            isMuted={participant._id === "6813ae13ad093371347e0f0a" ? isMuted : participant.isMuted}
          />
        ))}
      </div>

      {/* Video Controls */}
      <VideoControls
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        isScreenSharing={isScreenSharing}
        onToggleMute={onToggleMute}
        onToggleVideo={onToggleVideo}
        onToggleScreenShare={onToggleScreenShare}
        onEndCall={onEndCall}
      />
    </div>
  )
}

function ParticipantVideo({ participant, localVideoRef, isVideoOff, isMuted }) {
  const isLocalUser = participant._id === "6813ae13ad093371347e0f0a"

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video">
      {isLocalUser ? (
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="w-full h-full object-cover"
          style={{ display: isVideoOff ? "none" : "block" }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-white/20 text-white text-xl">{participant.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      )}

      {isVideoOff && (
        <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-gray-600 text-white text-xl">{participant.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      )}

      <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
        {participant.name}
      </div>

      <div className="absolute bottom-2 right-2 flex space-x-1">
        {isMuted && (
          <div className="bg-red-500 p-1 rounded">
            <MicOff className="w-3 h-3 text-white" />
          </div>
        )}
        {participant.isScreenSharing && (
          <div className="bg-blue-500 p-1 rounded">
            <Monitor className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
    </div>
  )
}

function VideoControls({
  isMuted,
  isVideoOff,
  isScreenSharing,
  onToggleMute,
  onToggleVideo,
  onToggleScreenShare,
  onEndCall,
}) {
  return (
    <div className="flex items-center justify-center space-x-4">
      <Button
        onClick={onToggleMute}
        variant={isMuted ? "destructive" : "secondary"}
        size="sm"
        className="rounded-full w-12 h-12"
      >
        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </Button>
      <Button
        onClick={onToggleVideo}
        variant={isVideoOff ? "destructive" : "secondary"}
        size="sm"
        className="rounded-full w-12 h-12"
      >
        {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
      </Button>
      <Button
        onClick={onToggleScreenShare}
        variant={isScreenSharing ? "default" : "secondary"}
        size="sm"
        className="rounded-full w-12 h-12"
      >
        <Monitor className="w-5 h-5" />
      </Button>
      <Button onClick={onEndCall} variant="destructive" size="sm" className="rounded-full w-12 h-12">
        <PhoneOff className="w-5 h-5" />
      </Button>
    </div>
  )
}
