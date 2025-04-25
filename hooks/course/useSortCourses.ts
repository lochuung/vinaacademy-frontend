import { useMemo } from "react";
import { LearningCourse } from "@/types/navbar";

export type SortOption = "newest" | "oldest" | "progress-high" | "progress-low" | "name-az" | "name-za";

export function useSortCourses(courses: LearningCourse[], sortOption: SortOption) {
    // Using useMemo to avoid unnecessary recalculations when dependencies haven't changed
    const sortedCourses = useMemo(() => {
        if (!courses.length) {
            return [];
        }

        // Create a new array to avoid mutating the original
        let sorted = [...courses];

        // Sort based on selected option
        switch (sortOption) {
            case "newest":
                sorted = sorted.sort((a, b) => {
                    const getTimestamp = (dateStr: string | undefined) => {
                        if (!dateStr) return 0;

                        if (dateStr.includes('/')) {
                            // DD/MM/YYYY format
                            const [day, month, year] = dateStr.split('/');
                            return new Date(`${year}-${month}-${day}`).getTime();
                        } else {
                            // ISO format
                            return new Date(dateStr).getTime();
                        }
                    };

                    const dateA = getTimestamp(a.lastAccessed);
                    const dateB = getTimestamp(b.lastAccessed);
                    return dateB - dateA;
                });
                break;
            case "oldest":
                sorted = sorted.sort((a, b) => {
                    const getTimestamp = (dateStr: string | undefined) => {
                        if (!dateStr) return 0;

                        if (dateStr.includes('/')) {
                            // DD/MM/YYYY format
                            const [day, month, year] = dateStr.split('/');
                            return new Date(`${year}-${month}-${day}`).getTime();
                        } else {
                            // ISO format
                            return new Date(dateStr).getTime();
                        }
                    };

                    const dateA = getTimestamp(a.lastAccessed);
                    const dateB = getTimestamp(b.lastAccessed);
                    return dateA - dateB;
                });
                break;
            case "progress-high":
                sorted = sorted.sort((a, b) => Number(b.progress) - Number(a.progress));
                break;
            case "progress-low":
                sorted = sorted.sort((a, b) => Number(a.progress) - Number(b.progress));
                break;
            case "name-az":
                sorted = sorted.sort((a, b) => {
                    const nameA = (a.name || "").toLowerCase();
                    const nameB = (b.name || "").toLowerCase();
                    return nameA.localeCompare(nameB);
                });
                break;
            case "name-za":
                sorted = sorted.sort((a, b) => {
                    const nameA = (a.name || "").toLowerCase();
                    const nameB = (b.name || "").toLowerCase();
                    return nameB.localeCompare(nameA);
                });
                break;
        }

        return sorted;
    }, [courses, sortOption]);

    return { sortedCourses };
}