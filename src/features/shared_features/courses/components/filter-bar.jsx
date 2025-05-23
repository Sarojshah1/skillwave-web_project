import { useState } from "react"
import { ChevronDown, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

export function FilterBar({ categories = [], onFilterChange }) {
  const [filters, setFilters] = useState({
    categories: [],
    levels: [],
    priceRange: [0, 10000],
    duration: null,
  })

  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)

    let count = 0
    if (updatedFilters.categories.length) count++
    if (updatedFilters.levels.length) count++
    if (updatedFilters.priceRange[0] > 0 || updatedFilters.priceRange[1] < 10000) count++
    if (updatedFilters.duration) count++
    setActiveFiltersCount(count)
  }

  const toggleCategory = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]

    updateFilters({ categories: newCategories })
  }

  const toggleLevel = (level) => {
    const newLevels = filters.levels.includes(level)
      ? filters.levels.filter((l) => l !== level)
      : [...filters.levels, level]

    updateFilters({ levels: newLevels })
  }

  const handlePriceChange = (value) => {
    updateFilters({ priceRange: [value[0], value[1]] })
  }

  const handleDurationChange = (duration) => {
    updateFilters({ duration })
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      levels: [],
      priceRange: [0, 10000],
      duration: null,
    })
    onFilterChange({
      categories: [],
      levels: [],
      priceRange: [0, 10000],
      duration: null,
    })
    setActiveFiltersCount(0)
  }

  return (
    <div className="flex items-center gap-2">
      {/* Desktop Filters */}
      <div className="hidden md:flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Categories
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Select Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(categories || []).map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Level
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Select Level</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <DropdownMenuCheckboxItem
                key={level}
                checked={filters.levels.includes(level)}
                onCheckedChange={() => toggleLevel(level)}
              >
                {level}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Price
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 p-4">
            <DropdownMenuLabel className="mb-4">Price Range</DropdownMenuLabel>
            <div className="px-1">
              <Slider
                defaultValue={[0, 10000]}
                max={10000}
                step={100}
                value={filters.priceRange}
                onValueChange={handlePriceChange}
                className="my-6"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>NPR {filters.priceRange[0]}</span>
                <span>NPR {filters.priceRange[1]}</span>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Duration
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Course Duration</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["< 1 hour", "1-3 hours", "3-6 hours", "6+ hours"].map((duration) => (
              <DropdownMenuCheckboxItem
                key={duration}
                checked={filters.duration === duration}
                onCheckedChange={(checked) => handleDurationChange(checked ? duration : null)}
              >
                {duration}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear filters ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Filter courses by category, level, price, and duration.</SheetDescription>
            </SheetHeader>
            <div className="py-4 space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {(categories || []).map((category) => (
                    <Badge
                      key={category}
                      variant={filters.categories.includes(category) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Level</h3>
                <div className="flex flex-wrap gap-2">
                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <Badge
                      key={level}
                      variant={filters.levels.includes(level) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleLevel(level)}
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                <Slider
                  defaultValue={[0, 10000]}
                  max={10000}
                  step={100}
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                  className="my-6"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>NPR {filters.priceRange[0]}</span>
                  <span>NPR {filters.priceRange[1]}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Duration</h3>
                <div className="flex flex-wrap gap-2">
                  {["< 1 hour", "1-3 hours", "3-6 hours", "6+ hours"].map((duration) => (
                    <Badge
                      key={duration}
                      variant={filters.duration === duration ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleDurationChange(filters.duration === duration ? null : duration)}
                    >
                      {duration}
                    </Badge>
                  ))}
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <Button variant="outline" className="w-full" onClick={clearFilters}>
                  Clear all filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
