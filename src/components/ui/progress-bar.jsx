import { cn } from "@/lib/utils"



export function ProgressBar({ progress, className, showLabel = true }) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        {showLabel && <span className="text-sm font-medium text-gray-700">Progress</span>}
        <span className="text-sm text-gray-500">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-[#49BBBD] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  )
}
