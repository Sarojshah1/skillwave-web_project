import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, X, FileText, Plus } from "lucide-react";
import { useToast } from "../../courses/hooks/use-Toast";
import { cn } from "@/lib/utils.js"
import { useCreateBlog } from "../hook/useCreateBlog";

export default function AddBlogPage() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [contentFile, setContentFile] = useState(null);
  const [notification, setNotification] = useState(null);
  const { toast } = useToast();
  const showNotification = ({ title, description, type = "info" }) => {
    setNotification({ title, description, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const { mutate: createBlog, isPending: isSubmitting } = useCreateBlog();

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        setContentFile(file);
      } else {
        showNotification({
          title: "Invalid file type",
          description: "Please select a PDF file.",
          type: "error",
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      showNotification({
        title: "Title required",
        description: "Please enter a blog title.",
        type: "error",
      });
      return;
    }

    if (!contentFile) {
      showNotification({
        title: "Content file required",
        description: "Please upload a PDF file for the blog content.",
        type: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("tags", JSON.stringify(tags));
    formData.append("content", contentFile);

    createBlog(formData, {
      onSuccess: () => {
        showNotification({
          title: "Blog created successfully!",
          description: "Your blog post has been saved.",
          type: "success",
        });
        // Reset form
        setTitle("");
        setTags([]);
        setCurrentTag("");
        setContentFile(null);
        const fileInput = document.getElementById("content-file");
        if (fileInput) fileInput.value = "";
      },
      onError: (error) => {
        showNotification({
          title: "Error creating blog",
          description: error?.message || "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      {notification && (
        <div
          className={cn(
            "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 max-w-sm",
            notification.type === "success" &&
              "bg-green-50 border border-green-200 text-green-900",
            notification.type === "error" &&
              "bg-red-50 border border-red-200 text-red-900",
            notification.type === "info" &&
              "bg-blue-50 border border-blue-200 text-blue-900"
          )}
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-start">
              <strong className="text-sm">{notification.title}</strong>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setNotification(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {notification.description && (
              <p className="text-xs text-muted-foreground">
                {notification.description}
              </p>
            )}
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create New Blog Post
          </CardTitle>
          <CardDescription>
            Share your thoughts and ideas with the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="title">Blog Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter your blog title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Tags Field */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  type="text"
                  placeholder="Add a tag..."
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleAddTag}
                  disabled={!currentTag.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Display Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Content File Upload */}
            <div className="space-y-2">
              <Label htmlFor="content-file">Blog Content (PDF)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                {contentFile ? (
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">{contentFile.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setContentFile(null);
                        const fileInput =
                          document.getElementById("content-file");
                        if (fileInput) fileInput.value = "";
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">
                      <Label
                        htmlFor="content-file"
                        className="cursor-pointer hover:text-primary"
                      >
                        Click to upload PDF file
                      </Label>
                      <p className="text-xs mt-1">PDF files only, max 10MB</p>
                    </div>
                  </div>
                )}
                <Input
                  id="content-file"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Blog..." : "Create Blog Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
