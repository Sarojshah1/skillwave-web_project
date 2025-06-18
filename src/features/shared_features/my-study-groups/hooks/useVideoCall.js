"use client"

import { useEffect, useRef, useState } from "react"
import { socket } from "@/infrastructure/socket/socket"
import { useGlobalAuth } from "@/hooks/useAuth"

export const useVideoCall = (contextId) => {
  const { userId,profile } = useGlobalAuth()
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [participants, setParticipants] = useState([])
  const [callDuration, setCallDuration] = useState(0)
  const [connectionStatus, setConnectionStatus] = useState("disconnected") // disconnected, connecting, connected
  const [error, setError] = useState(null)

  const localStream = useRef(null)
  const screenStream = useRef(null)
  const peerConnections = useRef({})
  const localVideoRef = useRef()
  const callStartTime = useRef(null)
  const callTimer = useRef(null)

  // ICE servers configuration for better connectivity
  const iceServers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
    ],
  }

  const startCall = async () => {
    try {
      setError(null)
      setConnectionStatus("connecting")
      setIsCallActive(true)

      // Get user media
      localStream.current = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream.current
      }

      // Start call timer
      callStartTime.current = Date.now()
      callTimer.current = setInterval(() => {
        setCallDuration(Math.floor((Date.now() - callStartTime.current) / 1000))
      }, 1000)

      // Join room via socket
      socket.emit("joinRoom", { context_id: contextId, userId })
      setConnectionStatus("connected")
      setParticipants([
        {
          _id: userId,
          name: "You",
          socketId: socket.id,
          isMuted: false,
          isVideoOff: false,
          isScreenSharing: false,
          stream: localStream.current,
          isLocal: true,
        },
      ])
    } catch (error) {
      console.error("Failed to start call:", error)
      setError("Failed to access camera/microphone. Please check permissions.")
      setIsCallActive(false)
      setConnectionStatus("disconnected")
    }
  }

  const endCall = () => {
    setIsCallActive(false)
    setConnectionStatus("disconnected")

    // Close all peer connections
    Object.values(peerConnections.current).forEach((pc) => pc.close())
    peerConnections.current = {}

    // Stop local streams
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop())
      localStream.current = null
    }

    if (screenStream.current) {
      screenStream.current.getTracks().forEach((track) => track.stop())
      screenStream.current = null
    }

    // Clear timer
    if (callTimer.current) {
      clearInterval(callTimer.current)
      callTimer.current = null
    }

    // Reset states
    setParticipants([])
    setCallDuration(0)
    setIsMuted(false)
    setIsVideoOff(false)
    setIsScreenSharing(false)
    setError(null)

    // Leave room
    socket.emit("leaveRoom", { context_id: contextId, userId })
  }

  const toggleMute = () => {
    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = isMuted
        setIsMuted(!isMuted)

        // Update participant state
        setParticipants((prev) =>
          prev.map((p) => (p.isLocal ? { ...p, isMuted: !isMuted } : p))
        )

        // Notify other participants
        socket.emit("toggleAudio", {
          context_id: contextId,
          userId,
          isMuted: !isMuted,
        })
      }
    }
  }

  const toggleVideo = () => {
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = isVideoOff
        setIsVideoOff(!isVideoOff)

        // Update participant state
        setParticipants((prev) =>
          prev.map((p) => (p.isLocal ? { ...p, isVideoOff: !isVideoOff } : p))
        )

        // Notify other participants
        socket.emit("toggleVideo", {
          context_id: contextId,
          userId,
          isVideoOff: !isVideoOff,
        })
      }
    }
  }

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        screenStream.current = await navigator.mediaDevices.getDisplayMedia({
          video: {
            cursor: "always",
            displaySurface: "monitor",
          },
          audio: true,
        })

        const videoTrack = screenStream.current.getVideoTracks()[0]
        Object.values(peerConnections.current).forEach((pc) => {
          const sender = pc.getSenders().find((s) => s.track && s.track.kind === "video")
          if (sender) {
            sender.replaceTrack(videoTrack)
          }
        })
        videoTrack.onended = () => {
          stopScreenShare()
        }

        setIsScreenSharing(true)

        setParticipants((prev) =>
          prev.map((p) => (p.isLocal ? { ...p, isScreenSharing: true } : p))
        )

        // Notify other participants
        socket.emit("toggleScreenShare", {
          context_id: contextId,
          userId,
          isScreenSharing: true,
        })
      } else {
        stopScreenShare()
      }
    } catch (error) {
      console.error("Screen sharing failed:", error)
      setError("Screen sharing failed. Please try again.")
    }
  }

  const stopScreenShare = async () => {
    if (screenStream.current) {
      screenStream.current.getTracks().forEach((track) => track.stop())
      screenStream.current = null
    }

    // Replace back to camera video
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0]
      Object.values(peerConnections.current).forEach((pc) => {
        const sender = pc.getSenders().find((s) => s.track && s.track.kind === "video")
        if (sender) {
          sender.replaceTrack(videoTrack)
        }
      })
    }

    setIsScreenSharing(false)

    // Update participant state
    setParticipants((prev) =>
      prev.map((p) => (p.isLocal ? { ...p, isScreenSharing: false } : p))
    )

    // Notify other participants
    socket.emit("toggleScreenShare", {
      context_id: contextId,
      userId,
      isScreenSharing: false,
    })
  }

  const createPeerConnection = (socketId,user, isInitiator = false) => {
    const pc = new RTCPeerConnection(iceServers)

    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStream.current)
      })
    }
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          candidate: event.candidate,
          context_id: contextId,
          userId,
          targetSocketId: socketId,
        })
      }
    }

    pc.ontrack = (event) => {
      const remoteStream = event.streams[0]
      setParticipants((prev) => {
        const existingParticipant = prev.find((p) => p.socketId === socketId)
        if (existingParticipant) {
          return prev.map((p) =>
            p.socketId === socketId ? { ...p, stream: remoteStream } : p
          )
        } else {
          return [
            ...prev,
            {
              _id: `remote_${socketId}`,
              name: ` ${user?.name}`,
              socketId,
              isMuted: false,
              isVideoOff: false,
              isScreenSharing: false,
              stream: remoteStream,
              isLocal: false,
            },
          ]
        }
      })
    }

    // Handle connection state changes
    pc.onconnectionstatechange = () => {
      console.log(`Connection state: ${pc.connectionState}`)
      if (pc.connectionState === "failed") {
        setError("Connection failed. Trying to reconnect...")
      }
    }

    peerConnections.current[socketId] = pc

    return pc
  }

  // Handle signaling
  useEffect(() => {
    if (!contextId || !isCallActive) return

    socket.on("userJoined", async ({ socketId }) => {
      console.log("User joined:", socketId)
      const pc = createPeerConnection(socketId,profile, true)

      try {
        const offer = await pc.createOffer()
        await pc.setLocalDescription(offer)

        socket.emit("offer", {
          offer,
          context_id: contextId,
          userId,
          targetSocketId: socketId,
        })
      } catch (error) {
        console.error("Error creating offer:", error)
      }
    })

    // Handle offer
    socket.on("offer", async ({ offer, socketId }) => {
      console.log("Received offer from:", socketId)
      const pc = createPeerConnection(socketId, false)

      try {
        await pc.setRemoteDescription(new RTCSessionDescription(offer))
        const answer = await pc.createAnswer()
        await pc.setLocalDescription(answer)

        socket.emit("answer", {
          answer,
          context_id: contextId,
          userId,
          targetSocketId: socketId,
        })
      } catch (error) {
        console.error("Error handling offer:", error)
      }
    })

    // Handle answer
    socket.on("answer", async ({ answer, socketId }) => {
      console.log("Received answer from:", socketId)
      const pc = peerConnections.current[socketId]
      if (pc) {
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(answer))
        } catch (error) {
          console.error("Error handling answer:", error)
        }
      }
    })

    // Handle ICE candidate
    socket.on("ice-candidate", async ({ candidate, socketId }) => {
      const pc = peerConnections.current[socketId]
      if (pc) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidate))
        } catch (error) {
          console.error("Error adding ICE candidate:", error)
        }
      }
    })

    // Handle user leaving
    socket.on("userLeft", ({ socketId }) => {
      console.log("User left:", socketId)
      if (peerConnections.current[socketId]) {
        peerConnections.current[socketId].close()
        delete peerConnections.current[socketId]
      }
      setParticipants((prev) => prev.filter((p) => p.socketId !== socketId))
    })

    // Handle remote audio toggle
    socket.on("audioToggled", ({ socketId, isMuted }) => {
      setParticipants((prev) =>
        prev.map((p) => (p.socketId === socketId ? { ...p, isMuted } : p))
      )
    })

    // Handle remote video toggle
    socket.on("videoToggled", ({ socketId, isVideoOff }) => {
      setParticipants((prev) =>
        prev.map((p) => (p.socketId === socketId ? { ...p, isVideoOff } : p))
      )
    })

    // Handle remote screen share toggle
    socket.on("screenShareToggled", ({ socketId, isScreenSharing }) => {
      setParticipants((prev) =>
        prev.map((p) => (p.socketId === socketId ? { ...p, isScreenSharing } : p))
      )
    })

    return () => {
      socket.off("userJoined")
      socket.off("offer")
      socket.off("answer")
      socket.off("ice-candidate")
      socket.off("userLeft")
      socket.off("audioToggled")
      socket.off("videoToggled")
      socket.off("screenShareToggled")
    }
  }, [contextId, userId, isCallActive])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isCallActive) {
        endCall()
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
    callDuration,
    connectionStatus,
    error,
    startCall,
    endCall,
    toggleMute,
    toggleVideo,
    toggleScreenShare,
  }
}
