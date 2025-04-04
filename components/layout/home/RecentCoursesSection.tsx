"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mockEnrolledCourses } from "@/data/mockCourseData";
import CourseCard from "@/components/layout/home/CourseCard";

// Định nghĩa kiểu dữ liệu cho các khóa học
interface CourseType {
    id: number;
    name: string;
    instructor: string;
    category: string;
    image: string;
    progress: number;
    lastAccessed: string;
    completedLessons: number;
    totalLessons: number;
}

const RecentCoursesSection = () => {
    // Định nghĩa kiểu dữ liệu cho state
    const [recentCourses, setRecentCourses] = useState<CourseType[]>([]);

    useEffect(() => {
        // Lấy 3 khóa học gần nhất dựa trên lastAccessed
        const sortedCourses = [...mockEnrolledCourses]
            .sort((a, b) => {
                // Chuyển đổi ngày từ định dạng dd/mm/yyyy sang đối tượng Date
                const dateA = a.lastAccessed.split('/').reverse().join('-');
                const dateB = b.lastAccessed.split('/').reverse().join('-');
                return new Date(dateB).getTime() - new Date(dateA).getTime();
            })
            .slice(0, 3);

        setRecentCourses(sortedCourses);
    }, []);

    return (
        <>
            {/* Tiêu đề và liên kết */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-black px-4">Tiếp tục học</h1>
                <Link href="/my-courses" className="text-lg font-medium text-blue-600 hover:text-blue-800 pr-4">
                    Khóa học của tôi
                </Link>
            </div>

            {/* 3 khóa học gần nhất từ mockCourseData */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5">
                {recentCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </>
    );
};

export default RecentCoursesSection;