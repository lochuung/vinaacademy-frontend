"use client";

import Link from "next/link";
import {useRef} from "react";
import CourseCard from "@/components/layout/home/CourseCard";
import { useAuth } from "@/context/AuthContext";
import { Clock } from "lucide-react";
import { useInView } from "framer-motion";
import { useContinueLearning } from "@/hooks/course/useContinueLearning";
import { LearningCourse } from "@/types/navbar";

const RecentCoursesSection = () => {
    const { isAuthenticated } = useAuth();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
    
    // Use our custom hook to fetch recent courses
    const { courses, isLoading } = useContinueLearning({ 
        limit: 3,
        enabled: isAuthenticated 
    });

    if (!isAuthenticated) {
        return null;
    }

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
                {isLoading ? (
                    // Loading skeleton
                    Array(3).fill(0).map((_, i) => (
                        <div key={i} className="bg-white rounded-lg shadow-md p-3 animate-pulse">
                            <div className="w-full h-32 bg-gray-200 rounded-md mb-3"></div>
                            <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                            <div className="h-2 bg-gray-200 rounded w-full mb-3"></div>
                            <div className="flex justify-between">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    courses.length > 0 ? (
                        courses.map((course: LearningCourse) => (
                            <CourseCard 
                                key={course.slug} 
                                course={{
                                    id: Number(course.id),
                                    slug: course.slug,
                                    name: course.name,
                                    instructor: course.instructor || 'Unknown Instructor',
                                    category: course.category,
                                    image: course.image,
                                    progress: Number(course.progress),
                                    lastAccessed: course.lastAccessed,
                                    completedLessons: course.completedLessons || 0,
                                    totalLessons: course.totalLessons || 0,
                                }}
                            />
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-10">
                            <p className="text-gray-500">Bạn chưa có khóa học nào đang học.</p>
                            <Link href="/courses" className="mt-4 inline-block text-blue-600 hover:underline">
                                Khám phá khóa học mới
                            </Link>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default RecentCoursesSection;