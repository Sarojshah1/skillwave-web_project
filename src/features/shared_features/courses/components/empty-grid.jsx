
import { BookX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyCourses({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <BookX className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">No courses found</h3>
      <p className="text-muted-foreground mb-4">We couldn't find any courses matching your criteria.</p>
      <Button onClick={onReset}>Reset Filters</Button>
    </div>
  )
}
