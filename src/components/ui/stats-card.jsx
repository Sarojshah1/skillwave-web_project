import React from 'react';
export function StatsCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      {icon}
      <span>
        {label}: {value}
      </span>
    </div>
  )
}
