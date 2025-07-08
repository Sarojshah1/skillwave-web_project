import React from 'react';
import GroupCard from './GroupCard';
import { useGetAllGroups, useJoinGroup } from '../hooks/useGroupStudy';

export default function StudyGroupsList({ onGroupJoined }) {
  const { data: groups = [], isLoading, error } = useGetAllGroups();
  const joinGroup = useJoinGroup();

  // Assume user ID is stored in localStorage
  const userId = localStorage.getItem('userid');

  const handleJoin = (groupId) => {
    joinGroup.mutate(groupId, {
      onSuccess: () => {
        onGroupJoined && onGroupJoined(groupId);
      },
    });
  };

  if (isLoading) return <div>Loading groups...</div>;
  if (error) return <div className="text-red-500">{error.message || 'Failed to load groups'}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map(group => (
        <GroupCard
          key={group._id}
          group={group}
          isMember={group.members.some(m => m._id === userId)}
          onJoin={() => handleJoin(group._id)}
        />
      ))}
    </div>
  );
} 