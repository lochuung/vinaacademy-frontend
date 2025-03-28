// components/student/CourseContent.tsx
"use client";

import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Circle, Play } from 'lucide-react';

interface LessonType {
    id: string;
    title: string;
    duration: string;
    isCompleted?: boolean;
    isCurrent?: boolean;
}

interface SectionType {
    id: string;
    title: string;
    lessons: LessonType[];
}

interface CourseContentProps {
    title: string;
    sections: SectionType[];
    courseId: string;
}

const CourseContent: FC<CourseContentProps> = ({ title, sections: initialSections, courseId }) => {
    const [sections, setSections] = useState<SectionType[]>(initialSections);
    const [expandedSections, setExpandedSections] = useState<string[]>(
        // Mặc định, mở rộng tất cả các phần hoặc chỉ phần có bài học hiện tại
        initialSections.map(section => section.id)
    );

    // Tải trạng thái hoàn thành từ localStorage khi khởi tạo
    useEffect(() => {
        const savedCompletionStatus = localStorage.getItem(`course-${courseId}-completion`);

        if (savedCompletionStatus) {
            try {
                const completionData = JSON.parse(savedCompletionStatus);

                // Cập nhật các phần với trạng thái hoàn thành đã lưu
                const updatedSections = sections.map(section => ({
                    ...section,
                    lessons: section.lessons.map(lesson => ({
                        ...lesson,
                        isCompleted: completionData[lesson.id] || lesson.isCompleted || false
                    }))
                }));

                setSections(updatedSections);
            } catch (error) {
                console.error("Lỗi khi tải trạng thái hoàn thành:", error);
            }
        }
    }, [courseId]);

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prevExpanded =>
            prevExpanded.includes(sectionId)
                ? prevExpanded.filter(id => id !== sectionId)
                : [...prevExpanded, sectionId]
        );
    };

    const toggleLessonCompletion = (lessonId: string, isCompleted: boolean) => {
        // Cập nhật trạng thái các phần
        const updatedSections = sections.map(section => ({
            ...section,
            lessons: section.lessons.map(lesson =>
                lesson.id === lessonId
                    ? { ...lesson, isCompleted }
                    : lesson
            )
        }));

        setSections(updatedSections);

        // Lưu vào localStorage
        const savedCompletionStatus = localStorage.getItem(`course-${courseId}-completion`) || '{}';
        try {
            const completionData = JSON.parse(savedCompletionStatus);
            completionData[lessonId] = isCompleted;
            localStorage.setItem(`course-${courseId}-completion`, JSON.stringify(completionData));
        } catch (error) {
            console.error("Lỗi khi lưu trạng thái hoàn thành:", error);
        }

        // Ở đây bạn cũng sẽ gọi API để cập nhật server
        // Ví dụ: api.updateLessonCompletion(courseId, lessonId, isCompleted);
    };

    // Tính tổng thời lượng và số bài học
    const totalLessons = sections.reduce((acc, section) => acc + section.lessons.length, 0);
    const totalDuration = sections
        .flatMap(section => section.lessons)
        .reduce((acc, lesson) => {
            const durationMatch = lesson.duration.match(/(\d+)/);
            return acc + (durationMatch ? parseInt(durationMatch[1]) : 0);
        }, 0);

    // Tính phần trăm tiến độ
    const completedLessons = sections
        .flatMap(section => section.lessons)
        .filter(lesson => lesson.isCompleted)
        .length;

    const progressPercentage = totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    const formatTotalDuration = () => {
        const hours = Math.floor(totalDuration / 60);
        const minutes = totalDuration % 60;
        return hours > 0 ? `${hours} giờ ${minutes} phút` : `${minutes} phút`;
    };

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold">Nội dung khóa học</h2>
                <button className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="p-4 border-b border-gray-200">
                <p className="text-sm text-gray-500">
                    {totalLessons} bài học • {formatTotalDuration()} tổng thời lượng
                </p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className={`h-2.5 rounded-full transition-all duration-300 ${progressPercentage === 100
                            ? "bg-black"
                            : progressPercentage >= 80
                                ? "bg-gray-900"
                                : progressPercentage >= 60
                                    ? "bg-gray-700"
                                    : progressPercentage >= 40
                                        ? "bg-gray-500"
                                        : progressPercentage >= 20
                                            ? "bg-gray-400"
                                            : "bg-gray-300"
                            }`}
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <p className="mt-1 text-sm text-gray-500">{progressPercentage}% hoàn thành</p>
            </div>


            <div className="overflow-y-auto flex-1">
                {sections.map((section) => (
                    <div key={section.id} className="border-b border-gray-200">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="flex justify-between items-center w-full p-4 text-left font-medium hover:bg-gray-50"
                        >
                            <span>{section.title}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 transform transition-transform ${expandedSections.includes(section.id) ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {expandedSections.includes(section.id) && (
                            <div className="bg-gray-50">
                                {section.lessons.map((lesson) => (
                                    <div key={lesson.id} className="flex items-center">
                                        {/* Ô đánh dấu trạng thái hoàn thành */}
                                        <button
                                            className="flex-none ml-4 mr-1 focus:outline-none"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                toggleLessonCompletion(lesson.id, !lesson.isCompleted);
                                            }}
                                            aria-label={lesson.isCompleted ? "Đánh dấu chưa hoàn thành" : "Đánh dấu đã hoàn thành"}
                                        >
                                            {lesson.isCompleted ? (
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <Circle className="w-5 h-5 text-gray-400" />
                                            )}
                                        </button>

                                        <Link
                                            href={`/learning/${courseId}/lesson/${lesson.id}`}
                                            className="flex-1"
                                        >
                                            <div
                                                className={`flex items-start py-4 pr-4 border-t border-gray-200 hover:bg-gray-100 cursor-pointer ${lesson.isCurrent ? 'bg-gray-100' : ''}`}
                                            >
                                                <div className="mr-3 mt-1">
                                                    {lesson.isCurrent && (
                                                        <Play className="w-5 h-5 text-blue-500 fill-current" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm">{lesson.title}</p>
                                                    <div className="flex items-center mt-1">
                                                        <svg className="w-4 h-4 text-gray-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="text-xs text-gray-500">{lesson.duration}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseContent;