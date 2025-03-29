"use client";

import { useState, useEffect } from "react";
import SortSelector from "../ui/SortSelector";
import CourseCard from "./CourseCard";
import Pagination from "./Pagination";
import { useSearchParams, useRouter } from "next/navigation";

interface SearchResultsProps {
    courses: any[];
}

export default function SearchResults({ courses }: SearchResultsProps) {
    const [sortMethod, setSortMethod] = useState("popular");
    const searchParams = useSearchParams();
    const router = useRouter();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 10;
    const totalPages = Math.ceil(courses.length / coursesPerPage);

    // Get current courses for this page
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    // Initialize page from URL
    useEffect(() => {
        const pageParam = searchParams.get("page");
        if (pageParam) {
            const pageNumber = parseInt(pageParam);
            if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
                setCurrentPage(pageNumber);
            }
        }
    }, [searchParams, totalPages]);

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);

        // Update URL with new page parameter
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNumber.toString());
        router.push(`/courses/search?${params.toString()}`);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Handle sort method change
    const handleSortChange = (value: string) => {
        setSortMethod(value);
        // Implement actual sorting logic here
    };

    return (
        <>
            {/* Results header with sorting */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-600 mb-2 sm:mb-0">
                    {courses.length} khóa học được tìm thấy
                    {courses.length > 0 && (
                        <span className="text-sm ml-2">
                            (Hiển thị {indexOfFirstCourse + 1}-{Math.min(indexOfLastCourse, courses.length)} kết quả)
                        </span>
                    )}
                </p>
                <SortSelector onChange={handleSortChange} />
            </div>

            {/* Course grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
}