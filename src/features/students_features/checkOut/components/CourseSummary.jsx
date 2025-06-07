export function CourseSummary({ course }) {
  return (
    <div className="flex items-start space-x-4">
      <img
        src={course.thumbnail || "/placeholder.svg"}
        alt={course.title}
        width={100}
        height={75}
        className="rounded-lg object-cover"
      />
      <div>
        <h3 className="font-semibold text-sm">{course.title}</h3>
        <p className="text-gray-500 text-xs">by {course.instructor}</p>
        <div className="flex items-center mt-2">
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            Lifetime Access
          </span>
        </div>
      </div>
    </div>
  )
}
