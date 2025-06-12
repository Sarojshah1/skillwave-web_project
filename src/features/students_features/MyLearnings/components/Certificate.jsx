import { CheckCircle } from "lucide-react"

export function Certificate({ studentName, courseName, instructorName, completionDate }) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(completionDate)

  return (
    <div className="max-w-3xl mx-auto bg-white border-8 border-double border-gray-300 p-8 rounded-lg shadow-xl">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-serif mb-1">Certificate of Completion</h2>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
        <p className="text-gray-600 mb-8">This certifies that</p>
        <h1 className="text-3xl font-bold text-blue-800 mb-6 font-serif">{studentName}</h1>
        <p className="text-gray-600 mb-4">has successfully completed the course</p>
        <h3 className="text-2xl font-bold mb-8 text-gray-800">{courseName}</h3>
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <div className="text-left">
            <div className="h-px w-40 bg-gray-400 mb-2"></div>
            <p className="font-medium">{instructorName}</p>
            <p className="text-sm text-gray-600">Course Instructor</p>
          </div>
          <div className="text-right">
            <p className="font-medium">Issued on</p>
            <p className="text-sm text-gray-600">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
