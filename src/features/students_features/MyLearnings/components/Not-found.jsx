
import { BookX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center max-w-md p-8">
        <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <BookX className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h1>
        <p className="text-gray-600 mb-6">
          The course you're looking for doesn't exist or you don't have access to it.
        </p>
      </div>
    </div>
  )
}
