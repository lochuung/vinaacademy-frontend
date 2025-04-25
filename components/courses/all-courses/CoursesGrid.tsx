import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./CourseCard";
import { CoursesPagination } from "./CoursesPagination";
import { Skeleton } from "@/components/ui/skeleton";

interface CoursesGridProps {
    courses: any[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    clearAllFilters: () => void;
    isLoading?: boolean;
}

export function CoursesGrid({
    courses,
    currentPage,
    totalPages,
    onPageChange,
    clearAllFilters,
    isLoading = false
}: CoursesGridProps) {
    // Hiển thị trạng thái loading
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {Array(8).fill(0).map((_, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden h-full flex flex-col shadow-sm transition-all">
                        <Skeleton className="w-full aspect-video" />
                        <div className="p-5">
                            <Skeleton className="h-6 w-4/5 mb-3" />
                            <Skeleton className="h-4 w-2/3 mb-5" />
                            <div className="flex items-center gap-2 mb-4">
                                <Skeleton className="h-4 w-8 rounded-full" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3 mb-4" />
                            <div className="flex justify-between items-center mt-4">
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-5 w-16" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Hiển thị trạng thái không có kết quả
    if (courses.length === 0) {
        return (
            <div className="text-center py-16 border border-gray-300 rounded-lg bg-gray-50">
                <div className="mb-6">
                    <Image
                        src="/no-results.svg"
                        alt="Không có kết quả"
                        width={180}
                        height={180}
                        className="mx-auto opacity-80"
                    />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Không tìm thấy khóa học phù hợp</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">Vui lòng thử với từ khóa khác hoặc xóa bộ lọc đã chọn</p>
                <Button
                    onClick={clearAllFilters}
                    className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md transition-all"
                >
                    Xóa tất cả bộ lọc
                </Button>
            </div>
        );
    }

    // Hiển thị danh sách khóa học
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
                {courses.map(course => (
                    <CourseCard key={course.slug} course={course} />
                ))}
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                    <CoursesPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </>
    );
}