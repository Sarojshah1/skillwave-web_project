import { ExternalLink, Clock, BookOpen } from "lucide-react";
import SimplePDFViewer from "@/features/shared_features/blogs/components/SimplePDFViewr";

export function LessonContent({ lesson }) {
  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-700">
            Select a lesson to begin
          </h3>
          <p className="text-gray-500 mt-2">
            Choose a lesson from the sidebar to start learning
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{lesson.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 opacity-80" />
            <span>1 hoursn</span>
          </div>
          {lesson.video_url && (
            <a
              href={lesson?.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              <span>Watch Video</span>
            </a>
          )}
        </div>
      </div>

      <div className="mb-12">
                <div className="bg-gray-50 rounded-2xl p-6 border-2 space-y-4 border-dashed border-gray-200">
                  <SimplePDFViewer pdfUrl={lesson?.content} title={lesson?.title} />
                  <iframe
                    src={`http://localhost:3000/uploads/pdfs/${lesson?.content}`}
                    className="w-full h-[600px] md:h-[800px] rounded-xl shadow-lg border border-gray-200"
                    title="Article PDF"
                  />
                </div>
              </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Key Takeaways</h3>
        <ul className="list-disc pl-5 space-y-1 text-blue-700">
          <li>Understand the core concepts of {lesson?.title}</li>
          <li>Apply best practices in real-world scenarios</li>
          <li>Build your own implementations using these principles</li>
        </ul>
      </div>
    </div>
  );
}
