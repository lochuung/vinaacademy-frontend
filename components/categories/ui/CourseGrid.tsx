// components/CourseGrid.tsx
import { CourseCard } from "../category/CourseCard";
import { Button } from "@/components/ui/button";

interface CourseGridProps {
    courses: any[];
    resetFilters: () => void;
}

export function CourseGrid({ courses, resetFilters }: CourseGridProps) {
    if (courses.length === 0) {
        return (
            <div className="bg-white p-8 text-center border rounded-md">
                <p className="text-xl text-gray-600 mb-4">Không tìm thấy khóa học phù hợp</p>
                <p className="text-gray-500 mb-6">Vui lòng điều chỉnh bộ lọc</p>
                <Button onClick={resetFilters} variant="outline">
                    Xóa bộ lọc
                </Button>
            </div>
        );
    }

    return (
        <div>
            <p className="text-gray-600 text-sm mb-6">Hiển thị {courses.length} khóa học</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
}