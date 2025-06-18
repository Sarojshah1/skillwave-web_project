import { useState, useRef, useEffect } from "react"

export function useVideoCall() {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [participants, setParticipants] = useState([])
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const localVideoRef = useRef(null)
  const localStreamRef = useRef(null)

  // Mock participants for demo
  const mockParticipants = [
    {
      _id: "6813ae13ad093371347e0f0a",
      name: "Saroj Shah (You)",
      isMuted: false,
      isVideoOff: false,
      isScreenSharing: false,
    },
    {
      _id: "user2",
      name: "John Doe",
      isMuted: false,
      isVideoOff: false,
      isScreenSharing: false,
    },
    {
      _id: "user3",
      name: "Jane Smith",
      isMuted: true,
      isVideoOff: false,
      isScreenSharing: false,
    },
  ]

  const startCall = async () => {
    try {
      // In a real app, this would initialize WebRTC
      setIsCallActive(true)
      setParticipants(mockParticipants)

      // Simulate getting user media
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          })
          localStreamRef.current = stream
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream
          }
        } catch (error) {
          console.log("Camera/microphone access denied or not available")
        }
      }
    } catch (error) {
      console.error("Failed to start call:", error)
    }
  }

  const endCall = () => {
    setIsCallActive(false)
    setParticipants([])
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop())
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks()
      audioTracks.forEach((track) => {
        track.enabled = isMuted
      })
    }
  }

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff)
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks()
      videoTracks.forEach((track) => {
        track.enabled = isVideoOff
      })
    }
  }

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        // In a real app, this would start screen sharing
        setIsScreenSharing(true)
      } else {
        setIsScreenSharing(false)
      }
    } catch (error) {
      console.error("Screen sharing failed:", error)
    }
  }

  useEffect(() => {
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return {
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
  }
}
