"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CourseProgressDetail from "@/components/student/progress/CourseProgressDetail";
import { getCourseBySlug } from "@/services/courseService";
import { getCourseProgress } from "@/services/progressService";

// Define interfaces for course data
interface CourseModule {
    id: string;
    title: string;
    totalLessons: number;
    completedLessons: number;
    duration: string;
    lessons: CourseLesson[];
}

interface CourseLesson {
    id: string;
    title: string;
    duration: string;
    isCompleted: boolean;
    type: "video" | "quiz" | "assignment" | "reading";
}

interface CourseProgressData {
    id: string;
    slug: string;
    name: string;
    instructor: string;
    totalModules: number;
    completedModules: number;
    overallProgress: number;
    lastAccessed: string;
    modules: CourseModule[];
}

export default function LearningCoursePage() {
    const params = useParams();
    const courseSlug = params.slug as string;
    const [isLoading, setIsLoading] = useState(true);
    const [courseData, setCourseData] = useState<CourseProgressData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Get course details from slug
                const courseDetails = await getCourseBySlug(courseSlug);
                if (!courseDetails) {
                    setError("Không tìm thấy khóa học");
                    setIsLoading(false);
                    return;
                }

                // Get learning progress information
                const progressData = await getCourseProgress(courseDetails.id.toString());
                if (!progressData) {
                    setError("Không tìm thấy thông tin tiến độ học tập");
                    setIsLoading(false);
                    return;
                }

                // Format data to match component structure
                const courseProgressData: CourseProgressData = {
                    id: String(courseDetails.id),
                    slug: courseSlug, // Use the slug from the URL params
                    name: courseDetails.name,
                    instructor: courseDetails.instructors?.[0]?.fullName || "Không có thông tin",
                    totalModules: courseDetails.sections?.length || 0,
                    completedModules: progressData.completedSections || 0,
                    overallProgress: progressData.progressPercentage || 0,
                    lastAccessed: progressData.lastAccessedAt ? formatDate(progressData.lastAccessedAt) : "Chưa có dữ liệu",
                    modules: (courseDetails.sections || []).map(section => {
                        // Calculate completed lessons in section
                        const lessonIds = section.lessons?.map(lesson => lesson.id) || [];
                        const completedLessonsInSection = progressData.completedLessonIds?.filter(
                            (id: string) => lessonIds.includes(id)
                        ).length || 0;

                        return {
                            id: String(section.id), // Convert id to string to match interface
                            title: section.title,
                            totalLessons: section.lessons?.length || 0,
                            completedLessons: completedLessonsInSection,
                            duration: formatDuration(calculateSectionDuration(section.lessons || [])),
                            lessons: (section.lessons || []).map(lesson => ({
                                id: String(lesson.id), // Convert id to string to match interface
                                title: lesson.title,
                                duration: formatDuration(lesson.videoDuration || 0),
                                isCompleted: progressData.completedLessonIds?.includes(lesson.id) || false,
                                type: mapLessonType(lesson.type)
                            }))
                        };
                    })
                };

                setCourseData(courseProgressData);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu khóa học:", err);
                setError("Đã có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
            } finally {
                setIsLoading(false);
            }
        };

        if (courseSlug) {
            fetchData();
        }
    }, [courseSlug]);

    // Calculate total duration of a section (in seconds)
    const calculateSectionDuration = (lessons: any[]): number => {
        return lessons.reduce((total, lesson) => {
            return total + (lesson.videoDuration || 0);
        }, 0);
    };

    // Convert time from seconds to "X hours Y minutes" format
    const formatDuration = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        if (hours > 0) {
            return `${hours} giờ ${minutes} phút`;
        }
        return `${minutes} phút`;
    };

    // Format date
    const formatDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return dateString;
        }
    };

    // Convert lesson type to UI format
    const mapLessonType = (type: string | undefined): "video" | "quiz" | "assignment" | "reading" => {
        switch (type?.toUpperCase()) {
            case 'VIDEO': return 'video';
            case 'QUIZ': return 'quiz';
            case 'ASSIGNMENT': return 'assignment';
            case 'READING': return 'reading';
            default: return 'video';
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!courseData || error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-700">{error || "Không tìm thấy khóa học"}</h1>
                    <p className="mt-2 text-gray-500">Khóa học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa</p>
                    <Link
                        href="/my-courses"
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
            {/* Back button */}
            <div className="mb-6">
                <Link href="/my-courses" className="inline-flex items-center text-gray-600 hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Quay lại danh sách khóa học
                </Link>
            </div>

            <CourseProgressDetail
                courseId={courseData.id}
                courseSlug={courseData.slug}
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