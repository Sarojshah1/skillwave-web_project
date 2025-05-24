"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export function PostImages({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handlePrevImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // Different layouts based on number of images
  const renderImageGrid = () => {
    if (images.length === 1) {
      return (
        <div className="rounded-md overflow-hidden cursor-pointer" onClick={() => setIsDialogOpen(true)}>
          <img
            src={images[0] || "/placeholder.svg"}
            alt="Post content"
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>
      )
    }

    if (images.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-1 rounded-md overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square cursor-pointer"
              onClick={() => {
                setCurrentImageIndex(index)
                setIsDialogOpen(true)
              }}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Post content ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )
    }

    if (images.length === 3) {
      return (
        <div className="grid grid-cols-2 gap-1 rounded-md overflow-hidden">
          <div
            className="row-span-2 cursor-pointer"
            onClick={() => {
              setCurrentImageIndex(0)
              setIsDialogOpen(true)
            }}
          >
            <img src={images[0] || "/placeholder.svg"} alt="Post content 1" className="w-full h-full object-cover" />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setCurrentImageIndex(1)
              setIsDialogOpen(true)
            }}
          >
            <img src={images[1] || "/placeholder.svg"} alt="Post content 2" className="w-full h-full object-cover" />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setCurrentImageIndex(2)
              setIsDialogOpen(true)
            }}
          >
            <img src={images[2] || "/placeholder.svg"} alt="Post content 3" className="w-full h-full object-cover" />
          </div>
        </div>
      )
    }

    if (images.length === 4) {
      return (
        <div className="grid grid-cols-2 gap-1 rounded-md overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square cursor-pointer"
              onClick={() => {
                setCurrentImageIndex(index)
                setIsDialogOpen(true)
              }}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Post content ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )
    }

    // 5 or more images
    return (
      <div className="grid grid-cols-2 gap-1 rounded-md overflow-hidden">
        <div
          className="col-span-2 aspect-video cursor-pointer"
          onClick={() => {
            setCurrentImageIndex(0)
            setIsDialogOpen(true)
          }}
        >
          <img src={images[0] || "/placeholder.svg"} alt="Post content 1" className="w-full h-full object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-1 col-span-2">
          {images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className={cn(
                "aspect-square relative cursor-pointer",
                index === 3 &&
                  images.length > 5 &&
                  "after:absolute after:inset-0 after:bg-black/50 after:flex after:items-center after:justify-center after:text-white after:font-bold after:text-xl after:content-['+'] after:content-['+_" +
                    (images.length - 5) +
                    "']",
              )}
              onClick={() => {
                setCurrentImageIndex(index + 1)
                setIsDialogOpen(true)
              }}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Post content ${index + 2}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="mt-3 rounded-md overflow-hidden">{renderImageGrid()}</div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <div className="relative bg-black flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white z-10 bg-black/50 hover:bg-black/70"
              onClick={() => setIsDialogOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white z-10 bg-black/50 hover:bg-black/70"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <img
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={`Post content ${currentImageIndex + 1}`}
              className="max-h-[80vh] max-w-full object-contain"
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white z-10 bg-black/50 hover:bg-black/70"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={cn("w-2 h-2 rounded-full", index === currentImageIndex ? "bg-white" : "bg-white/50")}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
