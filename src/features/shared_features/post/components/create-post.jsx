import { X, ImageIcon, Smile, MapPin, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { usePostForm } from "../hooks/usePostForm"

export function CreatePost({ user, onPostCreated }) {
  const {
    postText,
    setPostText,
    selectedImages,
    selectedImagePreviews,
    handleImageSelect,
    removeImage,
    handleSubmit,
    fileInputRef
  } = usePostForm(user, onPostCreated)

  return (
    <Card className="mb-6 rounded-xl border border-[#49BBBD]/30 bg-[#f9fdfb]">
      <CardHeader className="pb-3 bg-[#E6F8DE] rounded-t-xl px-6 py-4">
        <h3 className="text-xl font-bold text-[#49BBBD] border-b-2 border-[#49BBBD] inline-block pb-1">
          Create Post
        </h3>
      </CardHeader>

      <form onSubmit={handleSubmit} className="px-6 pt-4 pb-2">
        <div className="flex gap-4 items-start">
          <Avatar className="flex-shrink-0 border-2 border-[#49BBBD]">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="text-[#49BBBD]">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder={`What's on your mind, ${user.name.split(" ")[0]}?`}
            className="min-h-[110px] resize-none rounded-lg border border-[#49BBBD]/60 px-4 py-3 text-[#333] placeholder:text-[#8fc4c6] focus:outline-none focus:ring-2 focus:ring-[#49BBBD]"
          />
        </div>

        {selectedImagePreviews.length > 0 && (
          <div className="mt-5 p-3 bg-[#E6F8DE] rounded-lg shadow-inner">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {selectedImagePreviews.map((preview, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={preview}
                    alt={`Selected image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7 bg-[#49BBBD] hover:bg-[#3a999a] text-white shadow-lg"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageSelect}
        />

        <Separator className="my-5" />

        <CardFooter className="flex justify-between items-center">
          <div className="flex gap-3 text-[#49BBBD]">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 hover:bg-[#49BBBD]/20 rounded-md"
            >
              <ImageIcon className="h-5 w-5" /> Photos
            </Button>
            <Button type="button" variant="ghost" size="sm" className="flex items-center gap-1 hover:bg-[#49BBBD]/20 rounded-md">
              <User className="h-5 w-5" /> Tag People
            </Button>
            <Button type="button" variant="ghost" size="sm" className="flex items-center gap-1 hover:bg-[#49BBBD]/20 rounded-md">
              <Smile className="h-5 w-5" /> Feeling
            </Button>
            <Button type="button" variant="ghost" size="sm" className="flex items-center gap-1 hover:bg-[#49BBBD]/20 rounded-md">
              <MapPin className="h-5 w-5" /> Location
            </Button>
          </div>

          <Button
            className="bg-[#49BBBD] text-white font-semibold rounded-lg px-6 py-2 shadow-md hover:bg-[#3a999a] disabled:bg-[#8cc0c1] disabled:cursor-not-allowed"
            type="submit"
            disabled={!postText.trim() && selectedImages.length === 0}
          >
            Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
