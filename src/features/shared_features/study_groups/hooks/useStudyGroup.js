// "use client"

// import { useState, useEffect } from "react"
// import { studyGroupService } from "../services/studyGroupService"
// import { CURRENT_USER_ID } from "../data/mockStudyGroups"

// export function useStudyGroups() {
//   const [studyGroups, setStudyGroups] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   const fetchStudyGroups = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const groups = await studyGroupService.getAllStudyGroups()
//       setStudyGroups(groups)
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to fetch study groups")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const joinGroup = async (groupId) => {
//     try {
//       const response = await studyGroupService.joinStudyGroup(groupId, CURRENT_USER_ID)
//       if (response.success && response.group) {
//         setStudyGroups((prev) => prev.map((group) => (group._id === groupId ? response.group : group)))
//       }
//       return response
//     } catch (error) {
//       throw error
//     }
//   }

//   const leaveGroup = async (groupId) => {
//     try {
//       const response = await studyGroupService.leaveStudyGroup(groupId, CURRENT_USER_ID)
//       if (response.success && response.group) {
//         setStudyGroups((prev) => prev.map((group) => (group._id === groupId ? response.group : group)))
//       }
//       return response
//     } catch (error) {
//       throw error
//     }
//   }

//   useEffect(() => {
//     fetchStudyGroups()
//   }, [])

//   return {
//     studyGroups,
//     loading,
//     error,
//     refetch: fetchStudyGroups,
//     joinGroup,
//     leaveGroup,
//   }
// }
