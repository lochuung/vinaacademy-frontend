"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCourseSlugById } from "@/services/courseService";

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

interface CourseProgressDetailProps {
    courseId: string;
    courseSlug?: string;
    courseName: string;
    instructor: string;
    totalModules: number;
    completedModules: number;
    overallProgress: number;
    lastAccessed: string;
    modules: CourseModule[];
}

const CourseProgressDetail = ({
    courseId,
    courseSlug,
    courseName: courseTitle,
    instructor,
    totalModules,
    completedModules,
    overallProgress,
    lastAccessed,
    modules,
}: CourseProgressDetailProps) => {
    const [expandedModules, setExpandedModules] = useState<number[]>([]);
    const [validSlug, setValidSlug] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Make sure we have a valid slug for navigation
    useEffect(() => {
        const fetchCourseSlug = async () => {
            // If we already have a slug from props, use it
            if (courseSlug) {
                setValidSlug(courseSlug);
                setIsLoading(false);
                return;
            }

            // If no slug in props, fetch from API using courseId
            if (courseId) {
                setIsLoading(true);
                try {
                    const slug = await getCourseSlugById(courseId);
                    if (slug) {
                        setValidSlug(slug);
                    } else {
                        console.error("No slug returned from API for courseId:", courseId);
                    }
                } catch (error) {
                    console.error("Error fetching course slug:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchCourseSlug();
    }, [courseId, courseSlug]);

    // Log the slug for debugging
    useEffect(() => {
        if (validSlug) {
            console.log(`CourseProgressDetail using slug: ${validSlug} for course: ${courseTitle}`);
        }
    }, [validSlug, courseTitle]);

    const toggleModule = (moduleId: number) => {
        if (expandedModules.includes(moduleId)) {
            setExpandedModules(expandedModules.filter((id) => id !== moduleId));
        } else {
            setExpandedModules([...expandedModules, moduleId]);
        }
    };

    // Handle navigation to learning page
    const handleContinueLearning = (e: React.MouseEvent) => {
        e.preventDefault();
        if (validSlug) {
            router.push(`/learning/${validSlug}`);
        }
    };

    // Handle navigation to specific lesson
    const navigateToLesson = (e: React.MouseEvent, lessonId: string) => {
        e.preventDefault();
        if (validSlug) {
            router.push(`/learning/${validSlug}/lecture/${lessonId}`);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{courseTitle}</h2>
                <p className="text-gray-600">Giảng viên: {instructor}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-800 font-medium">Tiến độ tổng thể</p>
                    <div className="flex items-center mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                                className="h-2.5 rounded-full bg-black"
                                style={{ width: `${overallProgress}%` }}
                            ></div>
                        </div>
                        <span className="text-gray-800 font-bold">{overallProgress}%</span>
                    </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-800 font-medium">Hoàn thành module</p>
                    <p className="mt-2 text-gray-800 font-bold">
                        {completedModules} / {totalModules} modules
                    </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-800 font-medium">Truy cập gần đây</p>
                    <p className="mt-2 text-gray-800 font-bold">{lastAccessed}</p>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold mb-4">Nội dung khóa học</h3>

                <div className="space-y-4">
                    {modules.map((module) => (
                        <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleModule(Number(module.id))}
                                className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-900">{module.title}</span>
                                    <span className="ml-4 text-sm text-gray-500">
                                        {module.completedLessons}/{module.totalLessons} bài học • {module.duration}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                        <div
                                            className="h-2 rounded-full bg-black"
                                            style={{
                                                width: `${((module.completedLessons / module.totalLessons) * 100).toFixed(2)}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <svg
                                        className={`w-5 h-5 text-gray-500 transform transition-transform ${expandedModules.includes(Number(module.id)) ? "rotate-180" : ""
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </div>
                            </button>

                            {expandedModules.includes(Number(module.id)) && (
                                <div className="p-4 border-t border-gray-200">
                                    <ul className="divide-y divide-gray-200">
                                        {module.lessons.map((lesson) => (
                                            <li key={lesson.id} className="py-3">
                                                <a
                                                    href="#"
                                                    onClick={(e) => navigateToLesson(e, lesson.id)}
                                                    className="flex items-center group cursor-pointer"
                                                >
                                                    <div
                                                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${lesson.isCompleted
                                                            ? "bg-gray-200 text-gray-700"
                                                            : "bg-gray-100 text-gray-400"
                                                            }`}
                                                    >
                                                        {lesson.isCompleted ? (
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    clipRule="evenodd"
                                                                ></path>
                                                            </svg>
                                                        ) : (
                                                            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                                                        )}
                                                    </div>
                                                    <div className="flex-grow">
                                                        <div className="flex items-center">
                                                            {/* Lesson type icon */}
                                                            <span className="mr-2">
                                                                {lesson.type === 'video' && (
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                )}
                                                                {lesson.type === 'quiz' && (
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                                    </svg>
                                                                )}
                                                                {lesson.type === 'reading' && (
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                                    </svg>
                                                                )}
                                                                {lesson.type === 'assignment' && (
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                                    </svg>
                                                                )}
                                                            </span>
                                                            <span className="text-gray-900 group-hover:text-blue-600">{lesson.title}</span>
                                                        </div>
                                                        <span className="text-sm text-gray-500">{lesson.duration}</span>
                                                    </div>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Continue Learning Button */}
            <div className="mt-6">
                {isLoading ? (
                    <button
                        disabled
                        className="w-full sm:w-auto px-6 py-3 bg-gray-300 text-gray-500 rounded-lg"
                    >
                        Đang tải...
                    </button>
                ) : (
                    <button
                        onClick={handleContinueLearning}
                        className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Tiếp tục học
                    </button>
                )}
            </div>
        </div>
    );
};

export default CourseProgressDetail;