
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users } from "lucide-react"

const suggestedUsers = [
  {
    name: "John Doe",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JD",
  },
  {
    name: "Alice Smith",
    role: "Full Stack Engineer",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AS",
  },
  {
    name: "Mike Johnson",
    role: "DevOps Engineer",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MJ",
  },
]

export function SuggestedUsers() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Users className="mr-2 h-4 w-4" />
          Suggested Users
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestedUsers.map((user, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Follow
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
