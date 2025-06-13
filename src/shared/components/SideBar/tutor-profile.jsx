import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TutorProfile({ tutor }) {
  return (
    <div className="flex items-center gap-3 px-2 py-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={tutor.avatar || "/placeholder.svg"} alt={tutor.name} />
        <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium">{tutor.name}</span>
        <span className="text-xs text-muted-foreground">{tutor.email}</span>
        <span className="text-xs text-muted-foreground">{tutor.role}</span>
      </div>
    </div>
  )
}
