import { useState, useEffect } from "react";
import { LearningCourse } from "@/types/navbar";

export function useFilterCourses(courses: LearningCourse[], searchQuery: string) {
    const [filteredCourses, setFilteredCourses] = useState<LearningCourse[]>([]);

    useEffect(() => {
        if (!courses.length) {
            setFilteredCourses([]);
            return;
        }

        // If no search query, return all courses
        if (searchQuery.trim() === "") {
            setFilteredCourses([...courses]);
            return;
        }

        // Filter by search query (name, instructor, category)
        const query = searchQuery.toLowerCase();
        const filtered = courses.filter(
            course =>
            (course.name?.toLowerCase().includes(query) ||
                course.instructor?.toLowerCase().includes(query) ||
                course.category?.toLowerCase().includes(query))
        );

        setFilteredCourses(filtered);
    }, [courses, searchQuery]);

    return { filteredCourses };
}