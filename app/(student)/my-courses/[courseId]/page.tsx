"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CourseProgressDetail from "@/components/student/progress/CourseProgressDetail";
import { mockCourseDetail, CourseDetailData } from "@/data/mockCourseData";

export default function LearningCoursePage() {
    const params = useParams();
    const courseId = Number(params.courseId);
    const [isLoading, setIsLoading] = useState(true);
    const [courseData, setCourseData] = useState<CourseDetailData | null>(null);

    useEffect(() => {
        // Giả lập việc lấy dữ liệu từ API
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Giả lập delay từ API
                await new Promise(resolve => setTimeout(resolve, 500));

                // Trong thực tế, đây sẽ là lệnh gọi API thực sự
                // const response = await fetch(`/api/courses/${courseId}/progress`);
                // const data = await response.json();

                // Sử dụng dữ liệu mẫu từ mockCourseData.ts
                setCourseData(mockCourseDetail);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu khóa học:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (courseId) {
            fetchData();
        }
    }, [courseId]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!courseData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-700">Không tìm thấy khóa học</h1>
                    <p className="mt-2 text-gray-500">Khóa học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa</p>
                    <Link
                        href="/mycourses"
                        className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Quay lại danh sách khóa học
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <CourseProgressDetail
                courseId={courseData.id}
                courseName={courseData.name}
                instructor={courseData.instructor}
                totalModules={courseData.totalModules}
                completedModules={courseData.completedModules}
                overallProgress={courseData.overallProgress}
                lastAccessed={courseData.lastAccessed}
                modules={courseData.modules}
            />
        </div>
    );
}