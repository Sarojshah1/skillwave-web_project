# SkillWave - E-Learning Platform

<div align="center">
  <img src="public/assets/icons/logo.png" alt="SkillWave Logo" width="200"/>
  <h3>Modern E-Learning Platform for Students and Tutors</h3>
  <p><strong>Semester 5 College Project</strong></p>
  <p><strong>Developed by: Saroj Kumar Sah</strong></p>
  <p><strong>BSc (Hons) Computing</strong></p>
  <p><strong>Softwarica College of IT and E-Commerce</strong></p>
  <p><strong>Affiliated to Coventry University</strong></p>
</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [WebRTC Video Calling](#webrtc-video-calling)
- [API Documentation](#api-documentation)
- [User Roles](#user-roles)
- [Development Guide](#development-guide)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

SkillWave is a comprehensive e-learning platform that connects students with tutors through interactive courses, study groups, and community features. Built with modern React technologies, it provides a seamless learning experience with real-time collaboration capabilities including **WebRTC video calling**.

> **This project was developed as a Semester 5 college project by Saroj Kumar Sah, a BSc (Hons) Computing student at Softwarica College of IT and E-Commerce, affiliated to Coventry University.**

### Key Highlights
- **Multi-role Platform**: Separate interfaces for students and tutors
- **Real-time Features**: Live chat, study groups, and collaborative learning
- **WebRTC Video Calling**: High-quality peer-to-peer video communication
- **Payment Integration**: Support for multiple payment gateways (eSewa, Khalti)
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Modular Architecture**: Feature-based organization for scalability

## ✨ Features

### 🎓 For Students
- **Course Discovery**: Browse and search courses by category
- **Learning Management**: Track progress, access course content, earn certificates
- **Study Groups**: Join or create study groups for collaborative learning
- **Video Calling**: High-quality WebRTC video calls with screen sharing
- **Community**: Share posts, comment, and interact with other learners
- **Profile Management**: Complete profile with achievements and certificates
- **Payment**: Secure checkout with multiple payment options

### 👨‍🏫 For Tutors
- **Course Creation**: Create and manage courses with lessons and quizzes
- **Dashboard**: Analytics and performance tracking
- **Blog Management**: Create and manage educational content
- **Student Management**: Track student progress and engagement
- **Profile Management**: Professional profile with achievements

### 🌐 Shared Features
- **Authentication**: Secure login/signup with profile setup
- **Real-time Chat**: Live messaging in study groups
- **WebRTC Video Calls**: Peer-to-peer video communication
- **Blog System**: Educational content with PDF support
- **Responsive Design**: Works on all devices
- **Search & Filter**: Advanced course discovery

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library

### State Management & Data Fetching
- **React Query (TanStack Query)** - Server state management
- **React Hook Form** - Form handling with validation
- **Yup** - Schema validation

### Real-time Communication
- **Socket.io Client** - Real-time chat and notifications
- **WebRTC** - Peer-to-peer video calling

### WebRTC Technologies
- **RTCPeerConnection** - Peer-to-peer connections
- **getUserMedia API** - Camera and microphone access
- **getDisplayMedia API** - Screen sharing
- **ICE Servers** - STUN servers for NAT traversal
- **WebRTC Signaling** - Socket.io for signaling

### UI/UX Libraries
- **Lucide React** - Icon library
- **React Icons** - Additional icon sets
- **React Hot Toast** - Toast notifications
- **React Modal** - Modal components
- **React PDF** - PDF viewing capabilities

### Charts & Analytics
- **Chart.js** - Data visualization
- **Recharts** - React charting library

### Payment Integration
- **Khalti Checkout** - Payment gateway integration

## 🏗️ Architecture

### Modular Feature-Based Architecture

The project follows a **Modular Feature-Based Architecture** with clear separation of concerns:

```
src/
├── features/                    # Feature modules
│   ├── shared_features/        # Cross-cutting features
│   │   ├── my-study-groups/    # Study groups with WebRTC
│   │   ├── auth/               # Authentication
│   │   ├── blogs/              # Blog system
│   │   ├── courses/            # Course browsing
│   │   ├── post/               # Community posts
│   │   └── study_groups/       # Study groups
│   ├── students_features/      # Student-specific features
│   └── tutor_features/         # Tutor-specific features
├── components/                 # Reusable UI components
├── layouts/                    # Page layouts
├── guards/                     # Route protection
├── infrastructure/             # External integrations
└── shared/                     # Shared utilities
```

### Key Architectural Principles

1. **Feature Isolation**: Each feature is self-contained
2. **Role-Based Separation**: Clear distinction between student and tutor features
3. **Shared Resources**: Common components and utilities
4. **Service Layer**: API calls abstracted in service files
5. **Custom Hooks**: Reusable business logic
6. **WebRTC Integration**: Peer-to-peer video calling in study groups

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git
- Modern browser with WebRTC support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skillwave
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_SOCKET_URL=http://localhost:3000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
skillwave/
├── public/                          # Static assets
│   └── assets/
│       ├── icons/                   # Payment icons, logos
│       └── images/                  # Background images
├── src/
│   ├── features/                    # Feature modules
│   │   ├── shared_features/         # Shared features
│   │   │   ├── auth/               # Authentication
│   │   │   ├── blogs/              # Blog system
│   │   │   ├── courses/            # Course browsing
│   │   │   ├── post/               # Community posts
│   │   │   ├── study_groups/       # Study groups
│   │   │   └── my-study-groups/    # Study groups with WebRTC
│   │   │       ├── components/     # Video call components
│   │   │       ├── hooks/          # WebRTC hooks
│   │   │       └── services/       # Chat services
│   │   ├── students_features/       # Student features
│   │   │   ├── MyLearnings/        # Enrolled courses
│   │   │   ├── checkOut/           # Payment
│   │   │   └── student_profile/    # Profile management
│   │   └── tutor_features/          # Tutor features
│   │       ├── dashboard/          # Analytics dashboard
│   │       ├── courses/            # Course management
│   │       └── add_blogs/          # Blog creation
│   ├── components/                  # Reusable UI components
│   │   ├── ui/                     # Base UI components
│   │   └── buttons/                # Custom buttons
│   ├── layouts/                     # Page layouts
│   ├── guards/                      # Route protection
│   ├── infrastructure/              # External integrations
│   │   ├── api/                    # API configuration
│   │   ├── socket/                 # WebSocket setup
│   │   └── storage/                # Local storage
│   ├── shared/                      # Shared resources
│   │   ├── components/             # Common components
│   │   ├── constants/              # App constants
│   │   └── utils/                  # Utility functions
│   ├── pages/                       # Main pages
│   ├── providers/                   # React providers
│   ├── routes/                      # Routing configuration
│   └── services/                    # Global services
└── configuration files...
```

## 📹 WebRTC Video Calling

### Overview
SkillWave implements a comprehensive WebRTC video calling system for study groups, enabling real-time peer-to-peer video communication with advanced features.

### Features
- **Peer-to-Peer Video Calls**: Direct browser-to-browser communication
- **Screen Sharing**: Share entire screen or specific applications
- **Audio/Video Controls**: Mute/unmute, enable/disable camera
- **Participant Management**: View all participants in the call
- **Connection Quality**: Real-time connection status monitoring
- **Call Duration**: Timer showing call length
- **Responsive Design**: Works on desktop and mobile devices

### Technical Implementation

#### Core WebRTC Hook (`useVideoCall.js`)
```javascript
// Key WebRTC functionality
const useVideoCall = (contextId) => {
  // State management for call features
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [participants, setParticipants] = useState([])
  
  // WebRTC connections
  const localStream = useRef(null)
  const peerConnections = useRef({})
  
  // ICE servers for NAT traversal
  const iceServers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
    ],
  }
}
```

#### Key WebRTC Functions

**1. Starting a Call**
```javascript
const startCall = async () => {
  // Get user media (camera + microphone)
  localStream.current = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720, frameRate: 30 },
    audio: { echoCancellation: true, noiseSuppression: true }
  })
  
  // Join room via socket for signaling
  socket.emit("joinRoom", { context_id: contextId, userId })
}
```

**2. Creating Peer Connections**
```javascript
const createPeerConnection = (socketId, isInitiator = false) => {
  const pc = new RTCPeerConnection(iceServers)
  
  // Add local stream tracks
  localStream.current.getTracks().forEach(track => {
    pc.addTrack(track, localStream.current)
  })
  
  // Handle ICE candidates
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", {
        candidate: event.candidate,
        targetSocketId: socketId
      })
    }
  }
  
  // Handle incoming streams
  pc.ontrack = (event) => {
    const remoteStream = event.streams[0]
    // Update participants with remote stream
  }
}
```

**3. Screen Sharing**
```javascript
const toggleScreenShare = async () => {
  if (!isScreenSharing) {
    screenStream.current = await navigator.mediaDevices.getDisplayMedia({
      video: { cursor: "always", displaySurface: "monitor" },
      audio: true
    })
    
    // Replace video track in all peer connections
    const videoTrack = screenStream.current.getVideoTracks()[0]
    Object.values(peerConnections.current).forEach(pc => {
      const sender = pc.getSenders().find(s => s.track?.kind === "video")
      if (sender) sender.replaceTrack(videoTrack)
    })
  }
}
```

### Signaling Protocol

The WebRTC implementation uses Socket.io for signaling:

```javascript
// Join room
socket.emit("joinRoom", { context_id: contextId, userId })

// Handle user joining
socket.on("userJoined", async ({ socketId }) => {
  const pc = createPeerConnection(socketId, true)
  const offer = await pc.createOffer()
  await pc.setLocalDescription(offer)
  socket.emit("offer", { offer, targetSocketId: socketId })
})

// Handle offers
socket.on("offer", async ({ offer, socketId }) => {
  const pc = createPeerConnection(socketId, false)
  await pc.setRemoteDescription(new RTCSessionDescription(offer))
  const answer = await pc.createAnswer()
  await pc.setLocalDescription(answer)
  socket.emit("answer", { answer, targetSocketId: socketId })
})

// Handle ICE candidates
socket.on("ice-candidate", async ({ candidate, socketId }) => {
  const pc = peerConnections.current[socketId]
  if (pc) await pc.addIceCandidate(new RTCIceCandidate(candidate))
})
```

### Video Call Components

#### VideoCallArea.jsx
Main video call interface with:
- **Video Grid**: Responsive layout for multiple participants
- **Screen Share View**: Dedicated area for screen sharing
- **Controls**: Mute, video, screen share, and end call buttons
- **Participant Strip**: Thumbnail view of all participants
- **Connection Status**: Real-time connection quality indicators

#### Key Features
- **Responsive Grid**: Automatically adjusts layout based on participant count
- **Screen Sharing**: Dedicated full-screen view for shared content
- **Participant Management**: Visual indicators for mute, video off, speaking
- **Call Controls**: Intuitive button layout with hover effects
- **Error Handling**: Graceful handling of connection issues

### Browser Compatibility

**Supported Browsers:**
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

**Required Permissions:**
- Camera access
- Microphone access
- Screen sharing (for screen share feature)

### Performance Optimization

1. **Video Quality**: Adaptive quality based on connection
2. **Bandwidth Management**: Efficient video encoding
3. **Connection Monitoring**: Real-time quality indicators
4. **Resource Cleanup**: Proper cleanup of media streams
5. **Error Recovery**: Automatic reconnection attempts

## 🔌 API Documentation

### Base Configuration
- **Base URL**: `http://localhost:3000/api`
- **Authentication**: Bearer token in Authorization header
- **Content Type**: JSON (multipart for file uploads)

### Key Endpoints

#### Authentication
```javascript
POST /user/login          // User login
POST /user/register       // User registration
GET  /user/profile        // Get user profile
PUT  /user/update-details // Update profile
```

#### Courses
```javascript
GET  /courses/pagination           // Get courses with pagination
GET  /courses/:id                  // Get course by ID
GET  /courses/category/:categoryId // Get courses by category
POST /courses                      // Create course (tutor only)
```

#### Study Groups
```javascript
GET  /groupstudy                   // Get all groups
POST /groupstudy/create            // Create group
POST /groupstudy/:groupId/addMember // Join group
GET  /groupstudy/user              // Get user's groups
```

#### Posts & Comments
```javascript
GET  /post                         // Get posts
POST /post                         // Create post
POST /post/:id/comments            // Add comment
POST /post/:postId/comments/:commentId/replies // Add reply
```

#### Real-time Chat
```javascript
POST /chats                        // Send message
GET  /chats/:context_id            // Get chat messages
```

## 👥 User Roles

### Student Role
- Browse and enroll in courses
- Access course content and track progress
- Join study groups and participate in discussions
- **Join video calls with screen sharing capabilities**
- Create community posts and interact with others
- Manage profile and view achievements

### Tutor Role
- Create and manage courses
- Add lessons and quizzes
- View analytics and student progress
- Create educational blog posts
- Manage professional profile

### Authentication Flow
1. **Registration**: Multi-step profile setup
2. **Login**: Email/password authentication
3. **Role-based Access**: Different interfaces based on user role
4. **Protected Routes**: Guards for role-specific features

## 🛠️ Development Guide

### Code Style
- **ESLint**: Configured for React best practices
- **Prettier**: Code formatting
- **Component Naming**: PascalCase for components
- **File Naming**: kebab-case for files

### Adding New Features

1. **Create Feature Structure**
   ```
   features/new_feature/
   ├── components/
   ├── hooks/
   ├── pages/
   └── services/
   ```

2. **Add Route**
   ```javascript
   // In router.jsx
   {
     path: '/new-feature',
     element: <NewFeaturePage />
   }
   ```

3. **Create Service**
   ```javascript
   // services/newFeatureService.js
   export const newFeatureService = {
     getData: async () => {
       const response = await api.get('/endpoint');
       return response.data;
     }
   };
   ```

### Custom Hooks Pattern
```javascript
// hooks/useNewFeature.js
export const useNewFeature = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await newFeatureService.getData();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, fetchData };
};
```

### Component Structure
```javascript
// components/NewComponent.jsx
import React from 'react';
import { useNewFeature } from '../hooks/useNewFeature';

const NewComponent = () => {
  const { data, loading, fetchData } = useNewFeature();

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      {/* Component content */}
    </div>
  );
};

export default NewComponent;
```

### WebRTC Development

#### Adding WebRTC to New Features
```javascript
// hooks/useWebRTC.js
export const useWebRTC = (roomId) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState({});
  
  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    setLocalStream(stream);
  };
  
  return { localStream, remoteStreams, startCall };
};
```

#### WebRTC Best Practices
1. **Error Handling**: Always handle getUserMedia errors
2. **Resource Cleanup**: Stop tracks when component unmounts
3. **Connection Monitoring**: Monitor connection state changes
4. **Fallback Strategies**: Provide alternatives for unsupported browsers
5. **Performance**: Optimize video quality for bandwidth

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_SOCKET_URL=https://your-api-domain.com
```

### Deployment Platforms
- **Vercel**: Recommended for React apps
- **Netlify**: Alternative with good CI/CD
- **AWS S3 + CloudFront**: For custom hosting

### Build Optimization
- Code splitting by routes
- Lazy loading for components
- Image optimization
- Bundle analysis with `npm run build -- --analyze`

### WebRTC Deployment Considerations
1. **HTTPS Required**: WebRTC requires secure context
2. **STUN/TURN Servers**: Configure for production
3. **Bandwidth**: Monitor video call bandwidth usage
4. **Browser Support**: Ensure target browsers support WebRTC
5. **Fallbacks**: Provide alternatives for unsupported scenarios

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes and commit: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Create Pull Request

### Code Review Guidelines
- Follow existing code patterns
- Add proper error handling
- Include loading states
- Test on multiple devices
- Update documentation if needed

### Testing
- Test all user flows
- Verify responsive design
- Check accessibility
- Test payment flows (use test credentials)
- **Test WebRTC features across different browsers**

---

<div align="center">
  <p>Built  by Saroj Kumar Sah</p>
  <p>BSc (Hons) Computing, Semester 5</p>
  <p>Softwarica College of IT and E-Commerce</p>
  <p>Affiliated to Coventry University</p>
</div>

