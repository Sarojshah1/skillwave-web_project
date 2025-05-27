import { useEffect, useState, useMemo } from "react";

export const useCoursesFilter = (allCourses, apiReady = false) => {
  // Ensure allCourses is always an array to avoid runtime errors
  const safeAllCourses = useMemo(() => (Array.isArray(allCourses) ? allCourses : []), [allCourses]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    categories: [],
    levels: [],
    priceRange: [0, 10000],
    duration: null,
  });
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [filteredCourses, setFilteredCourses] = useState([]);

  // Memoize filters to avoid unnecessary effect runs
  const memoFilters = useMemo(() => filters, [
    filters.categories,
    filters.levels,
    filters.priceRange,
    filters.duration,
  ]);

  // Track previous dependencies to reset currentPage only when necessary
  const [prevResetDeps, setPrevResetDeps] = useState({
    searchQuery: "",
    filters: memoFilters,
  });

  useEffect(() => {
    if (!apiReady) {
      let result = [...safeAllCourses];

      // Search filter
      const query = searchQuery.toLowerCase();
      if (query) {
        result = result.filter(
          (course) =>
            course.title.toLowerCase().includes(query) ||
            course.description.toLowerCase().includes(query)
        );
      }

      // Category filter
      if (memoFilters.categories.length > 0) {
        result = result.filter((course) =>
          memoFilters.categories.includes(course.category)
        );
      }

      // Level filter
      if (memoFilters.levels.length > 0) {
        result = result.filter((course) =>
          memoFilters.levels.includes(course.level)
        );
      }

      // Price filter (handle price as number or string)
      result = result.filter((course) => {
        let price = course.price;
        if (typeof price === "string") {
          price = parseInt(price.replace(/,/g, ""), 10);
        }
        return price >= memoFilters.priceRange[0] && price <= memoFilters.priceRange[1];
      });

      // Duration filter
      if (memoFilters.duration) {
        result = result.filter((course) => {
          const hours = parseInt(course.duration.split(" ")[0], 10);
          switch (memoFilters.duration) {
            case "< 1 hour":
              return hours < 1;
            case "1-3 hours":
              return hours >= 1 && hours <= 3;
            case "3-6 hours":
              return hours > 3 && hours <= 6;
            case "6+ hours":
              return hours > 6;
            default:
              return true;
          }
        });
      }

      // Sorting
      switch (sortOption) {
        case "newest":
          result.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10));
          break;
        case "popular":
          result.sort((a, b) => (b.studentsCount || 0) - (a.studentsCount || 0));
          break;
        case "price-low-high":
          result.sort(
            (a, b) =>
              parseInt(a.price.toString().replace(/,/g, ""), 10) -
              parseInt(b.price.toString().replace(/,/g, ""), 10)
          );
          break;
        case "price-high-low":
          result.sort(
            (a, b) =>
              parseInt(b.price.toString().replace(/,/g, ""), 10) -
              parseInt(a.price.toString().replace(/,/g, ""), 10)
          );
          break;
        case "rating":
          result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        default:
          break;
      }

      setFilteredCourses(result);

      // Reset page only if searchQuery or filters changed since last time
      if (
        prevResetDeps.searchQuery !== searchQuery ||
        JSON.stringify(prevResetDeps.filters) !== JSON.stringify(memoFilters)
      ) {
        setCurrentPage(1);
        setPrevResetDeps({ searchQuery, filters: memoFilters });
      }
    }
    // For apiReady === true, API calls can be handled separately to avoid loops
  }, [safeAllCourses, searchQuery, memoFilters, sortOption, apiReady, prevResetDeps]);

  const totalCourses = filteredCourses.length;
  const totalPages = Math.ceil(totalCourses / itemsPerPage);

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearchQuery("");
    setFilters({
      categories: [],
      levels: [],
      priceRange: [0, 10000],
      duration: null,
    });
    setSortOption("newest");
    setCurrentPage(1);
  };

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortOption,
    setSortOption,
    filteredCourses: paginatedCourses,
    totalCourses,
    currentPage,
    totalPages,
    setCurrentPage,
    resetFilters,
  };
};
