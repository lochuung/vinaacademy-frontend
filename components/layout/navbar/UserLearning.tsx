import Link from "next/link";
import { useState, useEffect } from "react";
import { LearningCourse } from "@/types/navbar";
import { CourseList } from "@/components/layout/navbar/CourseList";
import { ViewAllButton } from "@/components/layout/navbar/ViewAllButton";
import { mockEnrolledCourses } from "@/data/mockCourseData";

const UserLearning = () => {
    const [courses, setCourses] = useState<LearningCourse[]>([]);

    useEffect(() => {
        // Chuyển đổi dữ liệu từ mockEnrolledCourses sang định dạng LearningCourse
        const learningCourses = mockEnrolledCourses.map(course => ({
            id: course.id,
            name: course.name,
            progress: course.progress,
            image: course.image,
            lastAccessed: course.lastAccessed,
            instructor: course.instructor,
            totalLessons: course.totalLessons,
            completedLessons: course.completedLessons,
            category: course.category
        }));

        setCourses(learningCourses);
    }, []);

    return (
        <div className="relative group">
            <Link href="/my-courses" className="flex items-center space-x-2 hover:text-gray-600">
                <span>Khóa học của tôi</span>
            </Link>
            <div className="absolute right-0 top-10 w-72 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-4">
                    <h3 className="font-bold text-lg mb-3">Khóa học của tôi</h3>
                    <CourseList courses={courses} />
                    <ViewAllButton />
                </div>
            </div>
        </div>
    );
};

export default UserLearning;