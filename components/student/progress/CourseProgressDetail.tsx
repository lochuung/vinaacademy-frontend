"use client";

import { useState } from "react";
import Link from "next/link";

interface CourseModule {
    id: number;
    title: string;
    totalLessons: number;
    completedLessons: number;
    duration: string;
    lessons: CourseLesson[];
}

interface CourseLesson {
    id: number;
    title: string;
    duration: string;
    isCompleted: boolean;
    type: "video" | "quiz" | "assignment" | "reading";
}

interface CourseProgressDetailProps {
    courseId: number;
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
    const courseIdentifier = courseSlug || courseId.toString();

    const toggleModule = (moduleId: number) => {
        if (expandedModules.includes(moduleId)) {
            setExpandedModules(expandedModules.filter((id) => id !== moduleId));
        } else {
            setExpandedModules([...expandedModules, moduleId]);
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
                                onClick={() => toggleModule(module.id)}
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
                                                width: `${(module.completedLessons / module.totalLessons) * 100}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <svg
                                        className={`w-5 h-5 text-gray-500 transform transition-transform ${expandedModules.includes(module.id) ? "rotate-180" : ""
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

                            {expandedModules.includes(module.id) && (
                                <div className="p-4 border-t border-gray-200">
                                    <ul className="divide-y divide-gray-200">
                                        {module.lessons.map((lesson) => (
                                            <li key={lesson.id} className="py-3">
                                                <Link
                                                    href={`/learning/${courseIdentifier}/lecture/${lesson.id}`}
                                                    className="flex items-center group"
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
                                                            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <span
                                                                className={`font-medium ${lesson.isCompleted ? "text-gray-600" : "text-gray-900"
                                                                    } group-hover:text-black`}
                                                            >
                                                                {lesson.title}
                                                            </span>
                                                            <span className="text-sm text-gray-500 ml-2">
                                                                {lesson.duration}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center mt-1">
                                                            <LessonTypeIcon type={lesson.type} />
                                                            <span className="text-xs text-gray-500 ml-1 capitalize">
                                                                {lesson.type}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 flex justify-between">
                <Link
                    href="/my-courses"
                    className="text-black hover:text-gray-700 font-medium flex items-center"
                >
                    <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        ></path>
                    </svg>
                    Trở về danh sách khóa học
                </Link>
                <Link
                    href={`/learning/${courseIdentifier}`}
                    className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                    Tiếp tục học
                </Link>
            </div>
        </div>
    );
};

// Component hiển thị biểu tượng tương ứng với loại bài học
const LessonTypeIcon = ({ type }: { type: CourseLesson["type"] }) => {
    switch (type) {
        case "video":
            return (
                <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    ></path>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
            );
        case "quiz":
            return (
                <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
            );
        case "assignment":
            return (
                <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                </svg>
            );
        case "reading":
            return (
                <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                </svg>
            );
        default:
            return null;
    }
};

export default CourseProgressDetail;