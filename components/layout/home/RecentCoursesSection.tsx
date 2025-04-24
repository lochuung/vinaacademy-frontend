"use client";

import Link from "next/link";
import {useEffect, useState, useRef} from "react";
import {mockEnrolledCourses} from "@/data/mockCourseData";
import CourseCard from "@/components/layout/home/CourseCard";
import { useAuth } from "@/context/AuthContext";
import { Clock } from "lucide-react";
import { useInView } from "framer-motion";

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

    const { isAuthenticated } = useAuth();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
    
    if (!isAuthenticated) {
        return null;
    }

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
        <div 
            ref={sectionRef}
            className="transform transition-all duration-500 ease-out"
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(15px)"
            }}
        >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="flex items-center gap-2 px-1 sm:px-2">
                    <div className="bg-green-100 p-1.5 rounded-md shadow-sm">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">Tiếp tục học</h2>
                </div>
                <Link 
                    href="/my-courses" 
                    className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium flex items-center gap-1 pr-2 transition-colors duration-200"
                >
                    <span>Xem tất cả</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 px-1 sm:px-2">
                {recentCourses.map((course) => (
                    <CourseCard key={course.id} course={course}/>
                ))}
            </div>
        </div>
    );
};

export default RecentCoursesSection;