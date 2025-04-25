"use client";

import { useState, useEffect } from "react";
import { LearningCourse } from "@/types/navbar";
import { mockEnrolledCourses } from "@/data/mockCourseData";
import CourseCard from "@/components/student/progress/CourseCard";
import { getUserEnrollments, EnrollmentResponse } from "@/services/enrollmentService";

type SortOption = "newest" | "oldest" | "progress-high" | "progress-low" | "name-az" | "name-za";

const MyCoursesPage = () => {
    const [courses, setCourses] = useState<LearningCourse[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<LearningCourse[]>([]);
    const [activeTab, setActiveTab] = useState<"all" | "inProgress" | "completed">("all");
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState<SortOption>("newest");
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Convert activeTab to API status format inside the effect
        const getStatusFromTab = (): 'IN_PROGRESS' | 'COMPLETED' | 'PAUSED' | undefined => {
            switch (activeTab) {
                case 'inProgress': return 'IN_PROGRESS';
                case 'completed': return 'COMPLETED';
                default: return undefined;
            }
        };

        // Fetch enrollments from API
        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                const status = getStatusFromTab();
                const response = await getUserEnrollments(currentPage, 10, status);

                if (response && response.content) {
                    // Map enrollment data to LearningCourse format
                    // Đảm bảo id của course luôn là string
                    const mappedCourses = response.content.map((enrollment: EnrollmentResponse) => ({
                        id: String(enrollment.courseId), // Chuyển đổi sang string
                        name: enrollment.courseName,
                        slug: enrollment.courseSlug, // API provided slug
                        image: enrollment.courseImage || '/images/course-placeholder.jpg',
                        instructor: enrollment.instructorName || enrollment.instructor || '',
                        progress: enrollment.progressPercentage?.toFixed(0) || 0,
                        completedLessons: enrollment.completedLessons || 0,
                        totalLessons: enrollment.totalLessons || 0,
                        category: enrollment.category || '',
                        lastAccessed: enrollment.lastAccessedAt || '',
                        enrollmentId: enrollment.id
                    }));

                    setCourses(mappedCourses);
                    setTotalPages(response.totalPages || 1);
                }
            } catch (err) {
                console.error("Lỗi khi tải danh sách khóa học:", err);
                setError(err instanceof Error ? err : new Error('Lỗi không xác định khi tải khóa học'));
                // Fallback to mock data if API fails
                // Đảm bảo chuyển đổi id trong dữ liệu mẫu sang string
                const mockCoursesWithStringId = mockEnrolledCourses.map(course => ({
                    ...course,
                    id: String(course.id)
                }));
                setCourses(mockCoursesWithStringId as LearningCourse[]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, [activeTab, currentPage]);

    // Lọc và sắp xếp khóa học
    useEffect(() => {
        if (!courses.length) return;

        // Lọc theo từ khóa tìm kiếm
        let filtered = [...courses];

        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                course =>
                (course.name?.toLowerCase().includes(query) ||
                    course.instructor?.toLowerCase().includes(query) ||
                    course.category?.toLowerCase().includes(query))
            );
        }

        // Sắp xếp
        switch (sortOption) {
            case "newest":
                filtered = [...filtered].sort((a, b) => {
                    // Parse dates in DD/MM/YYYY format or ISO format
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
                filtered = [...filtered].sort((a, b) => {
                    // Parse dates in DD/MM/YYYY format or ISO format
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
                filtered = [...filtered].sort((a, b) => b.progress - a.progress);
                break;
            case "progress-low":
                filtered = [...filtered].sort((a, b) => a.progress - b.progress);
                break;
            case "name-az":
                filtered = [...filtered].sort((a, b) => {
                    const nameA = (a.name || "").toLowerCase();
                    const nameB = (b.name || "").toLowerCase();
                    return nameA.localeCompare(nameB);
                });
                break;
            case "name-za":
                filtered = [...filtered].sort((a, b) => {
                    const nameA = (a.name || "").toLowerCase();
                    const nameB = (b.name || "").toLowerCase();
                    return nameB.localeCompare(nameA);
                });
                break;
        }

        setFilteredCourses(filtered);
    }, [courses, searchQuery, sortOption]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Khóa học của tôi</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Theo dõi tiến độ học tập và tiếp tục các khóa học của bạn
                    </p>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex -mb-px">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === "all"
                                ? "border-black text-black"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            Tất cả khóa học
                        </button>
                        <button
                            onClick={() => setActiveTab("inProgress")}
                            className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === "inProgress"
                                ? "border-black text-black"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            Đang học
                        </button>
                        <button
                            onClick={() => setActiveTab("completed")}
                            className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === "completed"
                                ? "border-black text-black"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            Hoàn thành
                        </button>
                    </nav>
                </div>

                {/* Search and Sort Controls */}
                {!isLoading && courses.length > 0 && (
                    <div
                        className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="relative w-full md:w-1/3">
                            <input
                                type="text"
                                placeholder="Tìm kiếm khóa học..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <svg
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>

                        <div className="flex items-center space-x-2">
                            <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                                Sắp xếp:
                            </label>
                            <select
                                id="sort"
                                className="pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value as SortOption)}
                            >
                                <option value="newest">Mới truy cập gần đây nhất</option>
                                <option value="oldest">Lâu nhất chưa truy cập</option>
                                <option value="progress-high">Tiến độ: cao đến thấp</option>
                                <option value="progress-low">Tiến độ: thấp đến cao</option>
                                <option value="name-az">Tên: A đến Z</option>
                                <option value="name-za">Tên: Z đến A</option>
                            </select>
                        </div>
                    </div>
                )}
                {/* Loading state */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <div
                            className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : (
                    <>
                        {/* Course Grid or Empty State */}
                        {filteredCourses.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h3 className="mt-2 text-lg font-medium text-gray-900">Không tìm thấy khóa học</h3>
                                <p className="mt-1 text-gray-500 text-sm">
                                    {searchQuery
                                        ? "Không tìm thấy khóa học nào phù hợp với từ khóa tìm kiếm."
                                        : "Không có khóa học nào trong danh mục này."}
                                </p>
                                {searchQuery && (
                                    <button
                                        className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                        onClick={() => setSearchQuery("")}
                                    >
                                        Xóa tìm kiếm
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCourses.map((course) => (
                                    <CourseCard key={course.id || String(course.enrollmentId)} course={course} />
                                ))}
                            </div>
                        )}

                        {/* Phân trang */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button
                                        onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                                        disabled={currentPage === 0}
                                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    {/* Hiển thị trang hiện tại và tổng số trang */}
                                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                        Trang {currentPage + 1} / {totalPages}
                                    </span>

                                    <button
                                        onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                                        disabled={currentPage >= totalPages - 1}
                                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        )}
                    </>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12 bg-red-50 rounded-lg shadow-sm border border-red-200 text-red-600">
                        <svg
                            className="mx-auto h-12 w-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium">Đã xảy ra lỗi</h3>
                        <p className="mt-1 text-sm">{error.message}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Tải lại trang
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCoursesPage;