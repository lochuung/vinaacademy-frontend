// components/CoursesGrid.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./CourseCard";
import { CoursesPagination } from "./CoursesPagination";

interface CoursesGridProps {
    courses: any[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    clearAllFilters: () => void;
}

export function CoursesGrid({
    courses,
    currentPage,
    totalPages,
    onPageChange,
    clearAllFilters
}: CoursesGridProps) {
    // Hiển thị trạng thái không có kết quả
    if (courses.length === 0) {
        return (
            <div className="text-center py-12 border rounded-lg">
                <div className="mb-4">
                    <Image
                        src="/no-results.svg"
                        alt="Không có kết quả"
                        width={150}
                        height={150}
                        className="mx-auto"
                    />
                </div>
                <h3 className="text-xl font-bold mb-2">Không tìm thấy khóa học phù hợp</h3>
                <p className="text-gray-600 mb-6">Vui lòng thử với các bộ lọc khác</p>
                <Button onClick={clearAllFilters}>Xóa tất cả bộ lọc</Button>
            </div>
        );
    }

    // Hiển thị danh sách khóa học
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>

            {/* Phân trang */}
            <CoursesPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </>
    );
}