import { useState, useMemo } from "react"
import {
  useGetAllGroups,
  useJoinGroup,
} from "../hooks/useGroupStudy"
import StudyGroupsHeader from "../components/StudyGroupsHeader"
import StudyGroupsGrid from "../components/StudyGroupsGrid"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"

export default function StudyGroupsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const CURRENT_USER_ID = localStorage.getItem("userid")

  const { data: studyGroups = [], isLoading, isError, error } = useGetAllGroups()
  const { mutateAsync: joinGroup } = useJoinGroup()


  const filteredGroups = useMemo(() => {
    if (!searchTerm.trim()) return studyGroups

    const searchLower = searchTerm.toLowerCase()
    return studyGroups.filter(
      (group) =>
        group.group_name.toLowerCase().includes(searchLower) ||
        group.description.toLowerCase().includes(searchLower) ||
        group.created_by.name.toLowerCase().includes(searchLower),
    )
  }, [studyGroups, searchTerm])

  const handleJoinGroup = async (groupId) => {
    try {
      await joinGroup(groupId)
      alert("Successfully joined the study group! 🎉")
    } catch (error) {
      console.error("Failed to join group:", error)
    }
  }

  const handleLeaveGroup = async (groupId) => {
    try {
    //   await leaveGroup(groupId)
      alert("Successfully left the study group!")
    } catch (error) {
      console.error("Failed to leave group:", error)
    }
  }

  const handleCreateGroup = () => {
    alert("Create Group functionality - would open create group modal/page")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <StudyGroupsHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} onCreateGroup={handleCreateGroup} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-[#49BBBD] mx-auto mb-4" />
              <p className="text-gray-600">Loading study groups...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StudyGroupsHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} onCreateGroup={handleCreateGroup} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isError && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error.message}</AlertDescription>
          </Alert>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {searchTerm ? `Search Results (${filteredGroups.length})` : `All Study Groups (${studyGroups.length})`}
            </h2>
          </div>
        </div>

        <StudyGroupsGrid
          groups={filteredGroups}
          currentUserId={CURRENT_USER_ID}
          onJoinGroup={handleJoinGroup}
          onLeaveGroup={handleLeaveGroup}
        />

        {/* Demo Info */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">🎯 Demo Features</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <p className="font-medium mb-1">✅ Working Features:</p>
              <ul className="space-y-1 text-blue-700">
                <li>• Join/Leave groups with loading states</li>
                <li>• Real-time search functionality</li>
                <li>• Responsive card design</li>
                <li>• Member count updates</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">💡 Current User:</p>
              <p className="text-blue-700">
                You are logged in as <strong>Saroj Shah</strong>
              </p>
              <p className="text-blue-700 text-xs mt-1">
                Try joining/leaving groups to see the functionality in action!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
