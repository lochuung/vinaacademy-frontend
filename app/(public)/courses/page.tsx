"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

// Import API services
import {
    getCoursesPaginated,
    searchCourses,
} from "@/services/courseService";
import { CourseDto } from "@/types/course";
// Import components
import { HeroSection } from "@/components/courses/all-courses/HeroSection";
import { CoursesGrid } from "@/components/courses/all-courses/CoursesGrid";
import { SortCourses } from "@/components/courses/all-courses/SortCourses";

export default function AllCoursesPage() {
    // State cho các khóa học và bộ lọc
    const [courses, setCourses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchQueryDebounced] = useDebounce(searchQuery, 600);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<string>("totalStudent");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const coursesPerPage = 12;

    // Hàm lấy dữ liệu khóa học
    const fetchCourses = async () => {
        setIsLoading(true);
        try {
            // Sử dụng searchCourses nếu có từ khóa tìm kiếm
            if (searchQueryDebounced) {
                const searchParams = {
                    keyword: searchQueryDebounced
                };

                const result = await searchCourses(
                    searchParams,
                    currentPage - 1,
                    coursesPerPage,
                    sortBy,
                    sortDirection
                );

                if (result) {
                    setCourses(formatCourses(result.content));
                    setTotalElements(result.totalElements);
                }
            } else {
                // Sử dụng getCoursesPaginated khi không có từ khóa tìm kiếm
                const result = await getCoursesPaginated(
                    currentPage - 1,
                    coursesPerPage,
                    sortBy,
                    sortDirection
                );

                if (result) {
                    setCourses(formatCourses(result.content));
                    setTotalElements(result.totalElements);
                }
            }
        } catch (error) {
            console.error("Lỗi khi tải khóa học:", error);
            setCourses([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Chuyển đổi dữ liệu API sang định dạng component
    const formatCourses = (apiCourses: CourseDto[]) => {
        return apiCourses.map(course => ({
            id: course.id,
            slug: course.slug,
            title: course.name,
            image: course.image || "/placeholder-course.jpg",
            price: course.price.toString(),
            originalPrice: course.price * 1.5,
            rating: course.rating || 0,
            students: course.totalStudent || 0,
            level: getDisplayLevel(course.level),
            bestSeller: (course.totalStudent || 0) > 500,
            category: course.categoryName,
            createdAt: course.createdDate
        }));
    };

    // Chuyển đổi level từ API sang text hiển thị
    const getDisplayLevel = (level: string | undefined) => {
        switch (level) {
            case "BEGINNER": return "Cơ bản";
            case "INTERMEDIATE": return "Trung cấp";
            case "ADVANCED": return "Nâng cao";
            default: return "Cơ bản";
        }
    };

    // Hàm xử lý thay đổi sortBy
    const handleSortByChange = (value: string) => {
        setSortBy(value);
    };

    // Hàm xử lý thay đổi sortDirection
    const handleSortDirectionChange = () => {
        setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    };

    // Gọi API khi các bộ lọc hoặc trang thay đổi
    useEffect(() => {
        fetchCourses();
    }, [searchQueryDebounced, currentPage, sortBy, sortDirection]);

    // Tính toán số trang
    const totalPages = Math.ceil(totalElements / coursesPerPage);

    // Xử lý chuyển trang
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero section với thanh tìm kiếm */}
            <HeroSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            {/* Main content */}
            <div className="container mx-auto px-4 py-12">
                {/* Header section with sorting controls */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">
                        {searchQueryDebounced
                            ? `Kết quả tìm kiếm cho "${searchQueryDebounced}" (${totalElements})`
                            : `Tất cả khóa học (${totalElements})`}
                    </h2>

                    {/* Tùy chọn sắp xếp - đặt ở bên phải */}
                    <SortCourses
                        sortBy={sortBy}
                        sortDirection={sortDirection}
                        onSortByChange={handleSortByChange}
                        onSortDirectionChange={handleSortDirectionChange}
                    />
                </div>

                {/* Danh sách khóa học */}
                <div className="flex-grow">
                    <CoursesGrid
                        courses={courses}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        clearAllFilters={() => setSearchQuery("")}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}