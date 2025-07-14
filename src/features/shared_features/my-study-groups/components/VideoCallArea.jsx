
import React, { useState } from "react"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  PhoneOff,
  Users,
  Settings,
  Maximize2,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Pin,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function VideoCallArea({
  isCallActive,
  participants,
  localVideoRef,
  isMuted,
  isVideoOff,
  isScreenSharing,
  callDuration,
  connectionStatus,
  error,
  onToggleMute,
  onToggleVideo,
  onToggleScreenShare,
  onEndCall,
  activeGroup,
}) {
  const [showParticipants, setShowParticipants] = useState(true)
  const [pinnedParticipant, setPinnedParticipant] = useState(null)

  if (!isCallActive) return null

  // Find screen sharing participant
  const screenSharingParticipant = participants.find((p) => p.isScreenSharing)
  const otherParticipants = participants.filter((p) => !p.isScreenSharing)
  const displayParticipants = screenSharingParticipant ? otherParticipants : participants

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50">
        <div className="flex items-center space-x-4">
          <Avatar className="w-10 h-10 ring-2 ring-[#49BBBD]/50">
            <AvatarFallback className="bg-[#49BBBD] text-white font-semibold">
              {activeGroup?.group_name?.charAt(0).toUpperCase() || "G"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-white font-semibold text-lg">{activeGroup?.group_name || "Study Group"}</h2>
            <div className="flex items-center space-x-3">
              <Badge
                variant={connectionStatus === "connected" ? "destructive" : "secondary"}
                className={`${
                  connectionStatus === "connected"
                    ? "animate-pulse text-xs bg-red-500 hover:bg-red-600"
                    : "text-xs bg-gray-600"
                }`}
              >
                {connectionStatus === "connected"
                  ? "🔴 Live"
                  : connectionStatus === "connecting"
                    ? "🟡 Connecting..."
                    : "⚫ Disconnected"}
              </Badge>
              <span className="text-gray-300 text-sm font-medium">
                {participants.length} participant{participants.length !== 1 ? "s" : ""}
              </span>
              {screenSharingParticipant && <Badge className="bg-blue-500 text-white text-xs">📺 Screen Sharing</Badge>}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 transition-colors"
            onClick={() => setShowParticipants(!showParticipants)}
          >
            <Users className="w-4 h-4 mr-2" />
            {showParticipants ? "Hide" : "Show"} Participants
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 transition-colors">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 transition-colors">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4">
          <Alert className="border-red-500/50 bg-red-500/10 backdrop-blur-sm">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Screen Share Area */}
        {screenSharingParticipant ? (
          <div className="flex-1 p-4">
            <ScreenShareView
              participant={screenSharingParticipant}
              localVideoRef={screenSharingParticipant.isLocal ? localVideoRef : null}
            />
          </div>
        ) : (
          /* Regular Video Grid */
          <div className="flex-1 p-6">
            {participants.length === 0 ? (
              <EmptyCallState />
            ) : (
              <VideoGrid
                participants={displayParticipants}
                localVideoRef={localVideoRef}
                pinnedParticipant={pinnedParticipant}
                onPinParticipant={setPinnedParticipant}
              />
            )}
          </div>
        )}

        {/* Participants Strip (when screen sharing) */}
        {screenSharingParticipant && (
          <ParticipantsStrip
            participants={displayParticipants}
            localVideoRef={localVideoRef}
            showParticipants={showParticipants}
            onToggleParticipants={() => setShowParticipants(!showParticipants)}
          />
        )}
      </div>

      {/* Bottom Controls */}
      <div className="p-6 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700/50">
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

      {/* Call Duration */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-white/10">
          <CallTimer duration={callDuration} />
        </div>
      </div>
    </div>
  )
}

function ScreenShareView({ participant, localVideoRef }) {
  const videoRef = React.useRef()

  React.useEffect(() => {
    if (participant.isLocal && localVideoRef) {
      return
    }
    if (participant.stream && videoRef.current) {
      videoRef.current.srcObject = participant.stream
    }
  }, [participant.stream, participant.isLocal, localVideoRef])

  return (
    <div className="h-full bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 relative group">
      {participant.isLocal ? (
        <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-contain bg-gray-900" />
      ) : (
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-contain bg-gray-900" />
      )}

      {/* Screen Share Info Overlay */}
      <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20">
        <div className="flex items-center space-x-2">
          <Monitor className="w-4 h-4 text-blue-400" />
          <span className="font-medium">{participant.name}'s Screen</span>
          {participant.isLocal && (
            <Badge variant="secondary" className="text-xs ml-2">
              You
            </Badge>
          )}
        </div>
      </div>

      {/* Connection Quality */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex space-x-1">
          <div className="w-1 h-3 bg-green-500 rounded"></div>
          <div className="w-1 h-4 bg-green-500 rounded"></div>
          <div className="w-1 h-2 bg-gray-400 rounded"></div>
        </div>
      </div>
    </div>
  )
}

function ParticipantsStrip({ participants, localVideoRef, showParticipants, onToggleParticipants }) {
  return (
    <div
      className={`bg-gray-800/90 backdrop-blur-sm border-t border-gray-700/50 transition-all duration-300 ${
        showParticipants ? "h-40" : "h-12"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-center p-2 border-b border-gray-700/30">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleParticipants}
          className="text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          {showParticipants ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          <span className="ml-2 text-sm">
            {participants.length} Participant{participants.length !== 1 ? "s" : ""}
          </span>
        </Button>
      </div>

      {/* Participants List */}
      {showParticipants && (
        <div className="flex space-x-3 p-3 overflow-x-auto">
          {participants.map((participant) => (
            <ParticipantThumbnail
              key={participant._id}
              participant={participant}
              localVideoRef={participant.isLocal ? localVideoRef : null}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ParticipantThumbnail({ participant, localVideoRef }) {
  const videoRef = React.useRef()

  React.useEffect(() => {
    if (participant.isLocal && localVideoRef) {
      return
    }
    if (participant.stream && videoRef.current) {
      videoRef.current.srcObject = participant.stream
    }
  }, [participant.stream, participant.isLocal, localVideoRef])

  return (
    <div className="relative flex-shrink-0 w-24 h-20 bg-gray-700 rounded-lg overflow-hidden border border-gray-600/50 hover:border-[#49BBBD]/50 transition-colors group">
      {participant.isLocal ? (
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ display: participant.isVideoOff ? "none" : "block" }}
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
          style={{ display: participant.isVideoOff ? "none" : "block" }}
        />
      )}

      {participant.isVideoOff && (
        <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-gray-600 text-white text-sm">{participant.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      )}

      {/* Name Label */}
      <div className="absolute bottom-1 left-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded text-center truncate">
        {participant.isLocal ? "You" : participant.name}
      </div>

      {/* Status Indicators */}
      <div className="absolute top-1 right-1 flex space-x-1">
        {participant.isMuted && (
          <div className="bg-red-500 p-0.5 rounded">
            <MicOff className="w-2 h-2 text-white" />
          </div>
        )}
      </div>

      {/* Speaking Indicator */}
      {!participant.isMuted && (
        <div className="absolute top-1 left-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  )
}

function VideoGrid({ participants, localVideoRef, pinnedParticipant, onPinParticipant }) {
  const getGridLayout = (count) => {
    if (count === 1) return "grid-cols-1"
    if (count === 2) return "grid-cols-2"
    if (count <= 4) return "grid-cols-2"
    if (count <= 6) return "grid-cols-3"
    return "grid-cols-4"
  }

  return (
    <div className={`grid ${getGridLayout(participants.length)} gap-4 h-full`}>
      {participants.map((participant) => (
        <ParticipantVideo
          key={participant._id}
          participant={participant}
          localVideoRef={participant.isLocal ? localVideoRef : null}
          isPinned={pinnedParticipant === participant._id}
          onPin={() => onPinParticipant(participant._id)}
          isFullScreen={participants.length === 1}
        />
      ))}
    </div>
  )
}

function ParticipantVideo({ participant, localVideoRef, isPinned, onPin, isFullScreen = false }) {
  const videoRef = React.useRef()
  const [showControls, setShowControls] = React.useState(false)

  React.useEffect(() => {
    if (participant.isLocal && localVideoRef) {
      return
    }
    if (participant.stream && videoRef.current) {
      videoRef.current.srcObject = participant.stream
    }
  }, [participant.stream, participant.isLocal, localVideoRef])

  return (
    <div
      className={`relative bg-gray-800 rounded-xl overflow-hidden ${
        isFullScreen ? "h-full" : "aspect-video h-full"
      } group hover:ring-2 hover:ring-[#49BBBD]/50 transition-all duration-300 shadow-lg`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {participant.isLocal ? (
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ display: participant.isVideoOff ? "none" : "block" }}
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
          style={{ display: participant.isVideoOff ? "none" : "block" }}
        />
      )}

      {participant.isVideoOff && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
          <div className="text-center">
            <Avatar className={`${isFullScreen ? "w-32 h-32" : "w-20 h-20"} mx-auto mb-4`}>
              <AvatarFallback className={`bg-gray-600 text-white ${isFullScreen ? "text-4xl" : "text-2xl"}`}>
                {participant.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <p className="text-white text-sm opacity-75">Camera is off</p>
          </div>
        </div>
      )}

      {/* Participant Info */}
      <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-2 rounded-lg backdrop-blur-sm border border-white/10">
        <div className="flex items-center space-x-2">
          <span className={`font-medium ${isFullScreen ? "text-lg" : "text-sm"}`}>{participant.name}</span>
          {participant.isLocal && (
            <Badge variant="secondary" className="text-xs">
              You
            </Badge>
          )}
        </div>
      </div>

      {/* Status Indicators */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {participant.isMuted && (
          <div className="bg-red-500 p-2 rounded-full shadow-lg">
            <MicOff className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Controls Overlay */}
      {showControls && (
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="sm"
            onClick={onPin}
            className="bg-black/50 hover:bg-black/70 text-white border-white/20"
          >
            <Pin className="w-3 h-3" />
          </Button>
          <Button variant="secondary" size="sm" className="bg-black/50 hover:bg-black/70 text-white border-white/20">
            <MoreHorizontal className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* Connection Quality */}
      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex space-x-1">
          <div className="w-1 h-3 bg-green-500 rounded"></div>
          <div className="w-1 h-4 bg-green-500 rounded"></div>
          <div className="w-1 h-2 bg-gray-400 rounded"></div>
        </div>
      </div>

      {/* Speaking Indicator */}
      {!participant.isMuted && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
        </div>
      )}
    </div>
  )
}

function EmptyCallState() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center text-white">
        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
          <Users className="w-12 h-12 text-white/70" />
        </div>
        <h3 className="text-2xl font-semibold mb-3">Waiting for participants...</h3>
        <p className="text-gray-300 text-lg">Share the group link to invite others to join</p>
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
    <div className="flex items-center justify-center space-x-6">
      <Button
        onClick={onToggleMute}
        variant={isMuted ? "destructive" : "secondary"}
        size="lg"
        className="rounded-full w-16 h-16 hover:scale-110 transition-all duration-200 shadow-lg"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </Button>

      <Button
        onClick={onToggleVideo}
        variant={isVideoOff ? "destructive" : "secondary"}
        size="lg"
        className="rounded-full w-16 h-16 hover:scale-110 transition-all duration-200 shadow-lg"
        title={isVideoOff ? "Turn on camera" : "Turn off camera"}
      >
        {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
      </Button>

      <Button
        onClick={onToggleScreenShare}
        variant={isScreenSharing ? "default" : "secondary"}
        size="lg"
        className={`rounded-full w-16 h-16 hover:scale-110 transition-all duration-200 shadow-lg ${
          isScreenSharing ? "bg-blue-600 hover:bg-blue-700" : ""
        }`}
        title={isScreenSharing ? "Stop sharing" : "Share screen"}
      >
        <Monitor className="w-6 h-6" />
      </Button>

      <Button
        onClick={onEndCall}
        variant="destructive"
        size="lg"
        className="rounded-full w-16 h-16 hover:scale-110 transition-all duration-200 bg-red-600 hover:bg-red-700 shadow-lg"
        title="End call"
      >
        <PhoneOff className="w-6 h-6" />
      </Button>
    </div>
  )
}

function CallTimer({ duration }) {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  return <span>{formatTime(duration)}</span>
}
