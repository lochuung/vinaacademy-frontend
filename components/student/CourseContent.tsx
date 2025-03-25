// components/student/CourseContent.tsx
"use client";

import { FC, useState } from 'react';
import Link from 'next/link';

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

const CourseContent: FC<CourseContentProps> = ({ title, sections, courseId }) => {
    const [expandedSections, setExpandedSections] = useState<string[]>(
        // By default, expand all sections or just the one with current lesson
        sections.map(section => section.id)
    );

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prevExpanded =>
            prevExpanded.includes(sectionId)
                ? prevExpanded.filter(id => id !== sectionId)
                : [...prevExpanded, sectionId]
        );
    };

    // Calculate total duration and lesson count
    const totalLessons = sections.reduce((acc, section) => acc + section.lessons.length, 0);
    const totalDuration = sections
        .flatMap(section => section.lessons)
        .reduce((acc, lesson) => {
            const durationMatch = lesson.duration.match(/(\d+)min/);
            return acc + (durationMatch ? parseInt(durationMatch[1]) : 0);
        }, 0);

    const formatTotalDuration = () => {
        const hours = Math.floor(totalDuration / 60);
        const minutes = totalDuration % 60;
        return hours > 0 ? `${hours}hr ${minutes}min` : `${minutes}min`;
    };

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold">Course content</h2>
                <button className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="p-4 border-b border-gray-200">
                <p className="text-sm text-gray-500">{totalLessons} lessons • {formatTotalDuration()} total length</p>
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
                                    <Link
                                        href={`/learning/${courseId}/lesson/${lesson.id}`}
                                        key={lesson.id}
                                    >
                                        <div
                                            className={`flex items-start p-4 border-t border-gray-200 hover:bg-gray-100 cursor-pointer ${lesson.isCurrent ? 'bg-gray-100' : ''
                                                }`}
                                        >
                                            <div className="mr-3 mt-1">
                                                {lesson.isCompleted ? (
                                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                ) : lesson.isCurrent ? (
                                                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                                                    </svg>
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