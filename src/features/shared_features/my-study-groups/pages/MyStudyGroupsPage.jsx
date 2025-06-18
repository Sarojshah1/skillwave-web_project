import { useState,useEffect } from "react"
import GroupSidebar from "../components/GroupSidebar"
import ChatArea from "../components/ChatArea"
import { useUserGroups } from "../hooks/useUserGroups";


export default function MyStudyGroupsPage() {
  const [activeGroup, setActiveGroup] = useState(null);

  const { data: myGroups = [], isLoading, error } = useUserGroups();

  const handleGroupSelect = (group) => {
    setActiveGroup(group);
  };

  const handleCreateGroup = () => {
    alert("Create Group functionality - would open create group modal");
  };

  useEffect(() => {
    if (!activeGroup && myGroups.length > 0) {
      setActiveGroup(myGroups[0]);
    }
  }, [myGroups, activeGroup]);

  if (isLoading) return <div className="p-4">Loading your study groups...</div>;
  if (error) return <div className="p-4 text-red-500">Failed to load groups.</div>;

  return (
    <div className="h-screen flex bg-gray-50">
      <GroupSidebar
        groups={myGroups}
        activeGroupId={activeGroup?._id}
        onGroupSelect={handleGroupSelect}
        onCreateGroup={handleCreateGroup}
      />
      <ChatArea activeGroup={activeGroup} onCreateGroup={handleCreateGroup} />
    </div>
  );
}
