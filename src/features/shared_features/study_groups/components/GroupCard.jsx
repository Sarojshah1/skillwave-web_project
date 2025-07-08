import React from 'react';

export default function GroupCard({ group, isMember, onJoin }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start space-y-2">
      <div className="flex items-center space-x-3">
        {group.group_image && (
          <img
            src={group.group_image.startsWith('http') ? group.group_image : `/public/${group.group_image}`}
            alt={group.group_name}
            className="w-16 h-16 object-cover rounded-full border"
          />
        )}
        <div>
          <h3 className="text-lg font-bold">{group.group_name}</h3>
          <div className="text-sm text-gray-500">{group.members.length} members</div>
        </div>
      </div>
      <div className="text-gray-700 text-sm mb-2">{group.description}</div>
      <div className="flex-1" />
      {!isMember && (
        <button
          onClick={onJoin}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
        >
          Join Group
        </button>
      )}
    </div>
  );
} 