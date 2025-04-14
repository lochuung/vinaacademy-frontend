"use client";

import {FC, useState, useEffect} from 'react';
import { getLessonById } from '@/services/lessonService';
import { LessonDto } from '@/types/lesson';

interface ReadingContentProps {
    lectureId: string;
    courseId: string;
}

interface ContentSection {
    heading: string;
    content: string;
}

interface ReadingContent {
    title: string;
    sections: ContentSection[];
}

const ReadingContent: FC<ReadingContentProps> = ({lectureId, courseId}) => {
    const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
    const [isLoading, setIsLoading] = useState(true);
    const [lessonData, setLessonData] = useState<LessonDto | null>(null);
    const [readingContent, setReadingContent] = useState<ReadingContent | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch lesson data
    useEffect(() => {
        const fetchLessonData = async () => {
            setIsLoading(true);
            try {
                const data = await getLessonById(lectureId);
                if (data) {
                    setLessonData(data);
                    
                    // Parse the content if it exists
                    if (data.content) {
                        try {
                            // Try to parse as JSON first (in case content is stored as structured data)
                            const parsedContent = JSON.parse(data.content);
                            setReadingContent(parsedContent);
                        } catch (parseError) {
                            // If not JSON, treat as markdown/text content with a single section
                            setReadingContent({
                                title: data.title,
                                sections: [
                                    {
                                        heading: data.title,
                                        content: data.content
                                    }
                                ]
                            });
                        }
                    } else {
                        setError('Nội dung bài đọc không có sẵn.');
                    }
                } else {
                    setError('Không thể tải nội dung bài học.');
                }
            } catch (err) {
                console.error('Error fetching lesson data:', err);
                setError('Đã xảy ra lỗi khi tải nội dung bài học.');
            } finally {
                setIsLoading(false);
            }
        };

        if (lectureId) {
            fetchLessonData();
        }
    }, [lectureId]);

    const getFontSizeClass = () => {
        switch (fontSize) {
            case 'sm':
                return 'text-sm';
            case 'md':
                return 'text-base';
            case 'lg':
                return 'text-lg';
            case 'xl':
                return 'text-xl';
            default:
                return 'text-base';
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error || !readingContent) {
        return (
            <div className="max-w-3xl mx-auto text-center py-10">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    {error || "Không thể tải nội dung bài đọc"}
                </h2>
                <p className="text-gray-500">
                    Vui lòng thử lại sau hoặc liên hệ với hỗ trợ viên nếu vấn đề vẫn tiếp diễn.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* Điều khiển đọc */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">{readingContent.title}</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setFontSize('sm')}
                        className={`p-1 ${fontSize === 'sm' ? 'text-blue-600' : 'text-gray-500'}`}
                        title="Cỡ chữ nhỏ"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M5 5a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5zm2 1v8h6V6H7z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                    <button
                        onClick={() => setFontSize('md')}
                        className={`p-1 ${fontSize === 'md' ? 'text-blue-600' : 'text-gray-500'}`}
                        title="Cỡ chữ vừa"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M5 5a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5zm2 1v8h6V6H7z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                    <button
                        onClick={() => setFontSize('lg')}
                        className={`p-1 ${fontSize === 'lg' ? 'text-blue-600' : 'text-gray-500'}`}
                        title="Cỡ chữ lớn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M5 5a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5zm2 1v8h6V6H7z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                    <button
                        onClick={() => setFontSize('xl')}
                        className={`p-1 ${fontSize === 'xl' ? 'text-blue-600' : 'text-gray-500'}`}
                        title="Cỡ chữ rất lớn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M5 5a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5zm2 1v8h6V6H7z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Nội dung đọc */}
            <div className={`space-y-8 ${getFontSizeClass()}`}>
                {readingContent.sections.map((section, index) => (
                    <div key={index} className="reading-section">
                        <h2 className="text-xl font-bold mb-3">{section.heading}</h2>
                        <div className="prose prose-slate max-w-none">
                            {section.content.split('```').map((part, i) => {
                                if (i % 2 === 0) {
                                    // Nội dung văn bản
                                    return (
                                        <div key={i} className="mb-4 whitespace-pre-line">
                                            {part}
                                        </div>
                                    );
                                } else {
                                    // Khối mã
                                    const [language, ...codeLines] = part.split('\n');
                                    const code = codeLines.join('\n');

                                    return (
                                        <div key={i} className="mb-4">
                                            <div className="bg-gray-100 rounded-md p-4 overflow-x-auto">
                                                <pre className="text-sm">
                                                    <code>{code}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Điều hướng */}
            <div className="mt-12 pt-4 border-t border-gray-200 flex justify-between">
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"/>
                    </svg>
                    Bài học trước
                </button>
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                    Bài học tiếp theo
                    <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ReadingContent;