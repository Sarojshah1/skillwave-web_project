import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function TutorProfile({ tutor }) {
  return (
      <div className="relative p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-lg" />

      <div className="relative flex items-center gap-4">
        <div className="relative">
         <Avatar className="h-10 w-10">
        <AvatarImage src={`http://localhost:3000/profile/${tutor?.profile_picture}`} alt={tutor?.name} />
        <AvatarFallback>{tutor?.name.charAt(0)}</AvatarFallback>
      </Avatar>
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{tutor?.name}</h3>
            <Badge
              variant="secondary"
              className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
            >
              Pro
            </Badge>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 truncate mb-1">{tutor?.email}</p>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">{tutor?.role}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

