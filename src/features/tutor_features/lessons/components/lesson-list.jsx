import {
  BookOpen,
  Clock,
  CheckCircle,
  Play,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function LessonList({ lessons }) {
  if (lessons.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No lessons yet
          </h3>
          <p className="text-gray-500">
            Start building your course by adding your first lesson.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {lessons
        .sort((a, b) => a.order - b.order)
        .map((lesson) => (
          <Card key={lesson.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-gray-900">
                      {lesson.title}
                    </h4>
                    {lesson.isCompleted && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <Badge variant="outline" className="text-xs">
                      Lesson {lesson.order}
                    </Badge>
                    {lesson.createdAt && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(lesson.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {/* Content and Video Links */}
                  <div className="flex flex-wrap gap-2">
                    {lesson.content && (
                      <a
                        href={`http://localhost:3000/uploads/pdfs/${lesson.content}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>PDF Content</span>
                      </a>
                    )}

                    {lesson.video_url && (
                      <a
                        href={lesson.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                      >
                        <Play className="w-4 h-4" />
                        <span>Watch Video</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {!lesson.content && !lesson.video_url && (
                      <span className="text-sm text-gray-400 italic">
                        No content uploaded yet
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
