import { useQuery } from "@tanstack/react-query";
import { courseService } from "../services/courseServices";

export const useCourses = (params) => {
  return useQuery({
    queryKey: ["courses", params],
    queryFn: () => courseService.getCourses(params),
    staleTime: Infinity,            // data is always fresh
    cacheTime: Infinity,            // cache data forever
    refetchOnWindowFocus: false,   // don't refetch on tab focus
    refetchOnMount: false,         // don't refetch on remount
    refetchInterval: false,        // no polling
  });
};
