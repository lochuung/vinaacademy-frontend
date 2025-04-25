import { useMemo } from "react";
import { LearningCourse } from "@/types/navbar";

export function useFilterCourses(courses: LearningCourse[], searchQuery: string) {
    // Using useMemo to avoid unnecessary recalculations when dependencies haven't changed
    const filteredCourses = useMemo(() => {
        if (!courses.length) {
            return [];
        }

        // If no search query, return all courses
        if (searchQuery.trim() === "") {
            return [...courses];
        }

        // Filter by search query (name, instructor, category)
        const query = searchQuery.toLowerCase();
        return courses.filter(
            course =>
            (course.name?.toLowerCase().includes(query) ||
                course.instructor?.toLowerCase().includes(query) ||
                course.category?.toLowerCase().includes(query))
        );
    }, [courses, searchQuery]);

    return { filteredCourses };
}