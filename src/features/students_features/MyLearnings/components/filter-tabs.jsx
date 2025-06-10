
import { cn } from "@/lib/utils"


export function FilterTabs({ activeFilter, onFilterChange, enrollments }) {
  const filters = [
    { key: "all", label: "All Courses", count: enrollments.length },
    { key: "active", label: "In Progress", count: enrollments.filter((e) => e.status === "active").length },
    { key: "completed", label: "Completed", count: enrollments.filter((e) => e.status === "completed").length },
    { key: "paused", label: "Paused", count: enrollments.filter((e) => e.status === "paused").length },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={cn(
            "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200",
            activeFilter === filter.key
              ? "bg-blue-500 text-white shadow-md"
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200",
          )}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  )
}
