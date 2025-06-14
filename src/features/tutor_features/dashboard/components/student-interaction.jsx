import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx"
import { Button } from "@/components/ui/button.jsx"
import { Badge } from "@/components/ui/badge.jsx"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star } from "lucide-react"

export function StudentInteraction({ messages, questions, reviews }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Interaction</CardTitle>
        <CardDescription>Messages and feedback from students</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="messages">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="messages" className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{message.user.name}</p>
                    <p className="text-xs text-muted-foreground">{message.time}</p>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Open Message Center
            </Button>
          </TabsContent>
          <TabsContent value="questions" className="space-y-4">
            {questions.map((question, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={question.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{question.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{question.user.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {question.course}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{question.content}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button size="sm" variant="default" className="h-7 text-xs">
                      Answer
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      Later
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="reviews" className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{review.user.name}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{review.course}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{review.content}</p>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
