// components/student/LearningTabs.tsx
"use client";

import { FC, useState } from 'react';
import NotesArea from './NotesArea';
import ReadingContent from './ReadingContent';
import QuestionsArea from './QuestionsArea';

interface LessonType {
    id: string;
    title: string;
    videoUrl: string;
    description: string;
    duration: string;
}

interface LearningTabsProps {
    lesson: LessonType;
    courseId: string;
}

const LearningTabs: FC<LearningTabsProps> = ({ lesson, courseId }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'questions' | 'readings'>('overview');

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex px-6 -mb-px">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 ${activeTab === 'overview'
                            ? 'border-black text-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('notes')}
                        className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 ${activeTab === 'notes'
                            ? 'border-black text-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Notes
                    </button>
                    <button
                        onClick={() => setActiveTab('questions')}
                        className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 ${activeTab === 'questions'
                            ? 'border-black text-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Q&A
                    </button>
                    <button
                        onClick={() => setActiveTab('readings')}
                        className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 ${activeTab === 'readings'
                            ? 'border-black text-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Readings
                    </button>
                </nav>
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'overview' && (
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
                        <p className="text-gray-700 mb-6">{lesson.description}</p>

                        {/* Lesson navigation */}
                        <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                            <button className="flex items-center text-blue-600 hover:text-blue-800">
                                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Previous Lesson
                            </button>
                            <button className="flex items-center text-blue-600 hover:text-blue-800">
                                Next Lesson
                                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'notes' && (
                    <NotesArea lessonId={lesson.id} courseId={courseId} />
                )}

                {activeTab === 'questions' && (
                    <QuestionsArea lessonId={lesson.id} courseId={courseId} />
                )}

                {activeTab === 'readings' && (
                    <ReadingContent lessonId={lesson.id} courseId={courseId} />
                )}
            </div>
        </div>
    );
};

export default LearningTabs;