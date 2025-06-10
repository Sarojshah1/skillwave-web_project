import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload } from "lucide-react";

export function ProfilePictureFeature({ currentAvatar, onAvatarChange }) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null); 

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
     onAvatarChange(file);
     setTimeout(() => {
        setIsUploading(false);
      }, 1000);

    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center space-x-6">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={currentAvatar ? `http://localhost:3000/profile/${currentAvatar}` : "/placeholder.svg"}
            alt="Profile picture"
          />
          <AvatarFallback>
            <Camera className="h-8 w-8 text-gray-400" />
          </AvatarFallback>
        </Avatar>
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Button
          onClick={triggerFileSelect}
          disabled={isUploading}
          className="flex items-center space-x-2"
        >
          <Upload className="h-4 w-4" />
          <span>{isUploading ? "Uploading..." : "Change Picture"}</span>
        </Button>
        <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
