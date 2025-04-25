import Link from "next/link";
import { useState, useEffect } from "react";
import { LearningCourse } from "@/types/navbar";
import { CourseList } from "@/components/layout/navbar/user-learning/CourseList";
import { ViewAllButton } from "@/components/layout/navbar/user-learning/ViewAllButton";
import { getUserEnrollments, EnrollmentResponse } from "@/services/enrollmentService";


const UserLearning = () => {
    const [courses, setCourses] = useState<LearningCourse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserEnrollments = async () => {
            try {
                setLoading(true);
                // Fetch user enrollments, with status IN_PROGRESS to get the active courses
                const response = await getUserEnrollments(0, 10, 'IN_PROGRESS');

                if (response && response.content) {
                    // Convert enrollment data to LearningCourse format
                    const learningCourses: LearningCourse[] = response.content.map((enrollment: EnrollmentResponse) => ({
                        id: enrollment.courseId,
                        name: enrollment.courseName || "",
                        progress: enrollment.progressPercentage || 0,
                        image: enrollment.courseImage || "/placeholder-course.jpg",
                        lastAccessed: enrollment.lastAccessedAt,
                        instructor: enrollment.instructorName || "",
                        totalLessons: enrollment.totalLessons || 0,
                        completedLessons: enrollment.completedLessons || 0,
                        category: enrollment.category || ""
                    }));

                    setCourses(learningCourses);
                }
            } catch (err) {
                console.error("Error fetching user enrollments:", err);
                setError("Failed to load your courses");
            } finally {
                setLoading(false);
            }
        };

        fetchUserEnrollments();
    }, []);

    return (
        <div className="relative group">
            <Link href="/my-courses" className="flex items-center space-x-2 hover:text-gray-500">
                <span>Khóa học của tôi</span>
            </Link>
            <div
                className="absolute right-0 top-10 w-72 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-4">
                    <h3 className="font-bold text-lg mb-3">Khóa học của tôi</h3>

                    {loading ? (
                        <div className="py-4 text-center text-gray-500">
                            <p>Đang tải khóa học...</p>
                        </div>
                    ) : error ? (
                        <div className="py-4 text-center text-gray-500">
                            <p>{error}</p>
                        </div>
                    ) : (
                        <CourseList courses={courses} />
                    )}

                    <ViewAllButton />
                </div>
            </div>
        </div>
    );
};

export default UserLearning;