
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, TrendingUp, Star, BookOpen, HelpCircle, Settings } from "lucide-react"

export function NavigationMenu() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Navigation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          All Posts
        </Button>
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <TrendingUp className="mr-2 h-4 w-4" />
          Trending
        </Button>
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <Star className="mr-2 h-4 w-4" />
          Following
        </Button>
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <BookOpen className="mr-2 h-4 w-4" />
          Saved Posts
        </Button>
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help & FAQ
        </Button>
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </CardContent>
    </Card>
  )
}
