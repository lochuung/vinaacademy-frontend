"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft, Plus, Grip, ChevronUp, ChevronDown,
    Edit, Trash2, File, Video, FileText, Monitor
} from 'lucide-react';
import { useParams } from 'next/navigation';

// Định nghĩa kiểu dữ liệu
interface Lecture {
    id: string;
    title: string;
    type: 'video' | 'text' | 'file' | 'quiz';
    duration?: number; // seconds
    isPublished: boolean;
    order: number;
}

interface Section {
    id: string;
    title: string;
    order: number;
    lectures: Lecture[];
}

// Giả lập dữ liệu nội dung khóa học
const mockSections: Section[] = [
    {
        id: "s1",
        title: "Giới thiệu",
        order: 1,
        lectures: [
            {
                id: "l1",
                title: "Giới thiệu về khóa học",
                type: "video",
                duration: 320, // seconds
                isPublished: true,
                order: 1
            },
            {
                id: "l2",
                title: "Cài đặt môi trường phát triển",
                type: "text",
                isPublished: true,
                order: 2
            }
        ]
    },
    {
        id: "s2",
        title: "JavaScript cơ bản",
        order: 2,
        lectures: [
            {
                id: "l3",
                title: "Biến và kiểu dữ liệu",
                type: "video",
                duration: 745, // seconds
                isPublished: true,
                order: 1
            },
            {
                id: "l4",
                title: "Cấu trúc điều khiển",
                type: "video",
                duration: 830, // seconds
                isPublished: true,
                order: 2
            },
            {
                id: "l5",
                title: "Bài tập thực hành",
                type: "file",
                isPublished: true,
                order: 3
            }
        ]
    },
    {
        id: "s3",
        title: "ES6 và JavaScript hiện đại",
        order: 3,
        lectures: [
            {
                id: "l6",
                title: "Arrow functions",
                type: "video",
                duration: 520, // seconds
                isPublished: false,
                order: 1
            },
            {
                id: "l7",
                title: "Destructuring",
                type: "video",
                duration: 635, // seconds
                isPublished: false,
                order: 2
            }
        ]
    }
];

// Helper function to format seconds to MM:SS
const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Helper function to get icon for lecture type
const getLectureTypeIcon = (type: string) => {
    switch (type) {
        case 'video':
            return <Video className="h-4 w-4 text-blue-500" />;
        case 'text':
            return <FileText className="h-4 w-4 text-green-500" />;
        case 'file':
            return <File className="h-4 w-4 text-orange-500" />;
        case 'quiz':
            return <Monitor className="h-4 w-4 text-purple-500" />;
        default:
            return <File className="h-4 w-4 text-gray-500" />;
    }
};

export default function CourseContentPage() {
    const params = useParams();
    const courseId = params.id as string;

    const [sections, setSections] = useState<Section[]>(mockSections);
    const [expandedSections, setExpandedSections] = useState<string[]>(mockSections.map(s => s.id));
    const [isDragging, setIsDragging] = useState(false);

    // Toggle section expansion
    const toggleSection = (sectionId: string) => {
        if (expandedSections.includes(sectionId)) {
            setExpandedSections(expandedSections.filter(id => id !== sectionId));
        } else {
            setExpandedSections([...expandedSections, sectionId]);
        }
    };

    // Add new section
    const addSection = () => {
        const newSection: Section = {
            id: `s${Date.now()}`,
            title: "Phần mới",
            order: sections.length + 1,
            lectures: []
        };
        setSections([...sections, newSection]);
        setExpandedSections([...expandedSections, newSection.id]);
    };

    // Add new lecture to section
    const addLecture = (sectionId: string) => {
        const updatedSections = sections.map(section => {
            if (section.id === sectionId) {
                const newLecture: Lecture = {
                    id: `l${Date.now()}`,
                    title: "Bài giảng mới",
                    type: "video",
                    duration: 0,
                    isPublished: false,
                    order: section.lectures.length + 1
                };
                return {
                    ...section,
                    lectures: [...section.lectures, newLecture]
                };
            }
            return section;
        });
        setSections(updatedSections);
    };

    // Delete section
    const deleteSection = (sectionId: string) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa phần này?")) {
            setSections(sections.filter(section => section.id !== sectionId));
            setExpandedSections(expandedSections.filter(id => id !== sectionId));
        }
    };

    // Delete lecture
    const deleteLecture = (sectionId: string, lectureId: string) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bài giảng này?")) {
            const updatedSections = sections.map(section => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        lectures: section.lectures.filter(lecture => lecture.id !== lectureId)
                    };
                }
                return section;
            });
            setSections(updatedSections);
        }
    };

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <Link href={`/instructor/courses`}>
                            <div className="mr-2 text-gray-500 hover:text-gray-700">
                                <ArrowLeft className="h-5 w-5" />
                            </div>
                        </Link>
                        <h1 className="text-2xl font-semibold text-gray-900">Quản lý nội dung khóa học</h1>
                    </div>
                    <div className="flex space-x-3">
                        <Link href={`/instructor/courses/${courseId}/edit`}>
                            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                                Chỉnh sửa thông tin
                            </button>
                        </Link>
                        <Link href={`/instructor/courses/${courseId}/preview`}>
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                                Xem trước
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium text-gray-900">Nội dung khóa học</h2>
                            <button
                                type="button"
                                onClick={addSection}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            >
                                <Plus className="h-4 w-4 mr-2" /> Thêm phần mới
                            </button>
                        </div>
                    </div>

                    <div className={`p-6 space-y-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
                        {sections.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500">Chưa có nội dung nào. Hãy thêm phần học đầu tiên.</p>
                            </div>
                        ) : (
                            sections.sort((a, b) => a.order - b.order).map((section) => (
                                <div
                                    key={section.id}
                                    className="border border-gray-200 rounded-md overflow-hidden"
                                >
                                    {/* Section header */}
                                    <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                                        <div className="flex items-center">
                                            <button
                                                type="button"
                                                className="text-gray-400 hover:text-gray-500 mr-2"
                                                onMouseDown={() => setIsDragging(true)}
                                                onMouseUp={() => setIsDragging(false)}
                                            >
                                                <Grip className="h-5 w-5" />
                                            </button>
                                            <div>
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        Phần {section.order}: {section.title}
                                                    </span>
                                                    <span className="ml-2 text-xs text-gray-500">
                                                        {section.lectures.length} bài giảng
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                type="button"
                                                className="text-gray-400 hover:text-gray-500 p-1"
                                                onClick={() => toggleSection(section.id)}
                                            >
                                                {expandedSections.includes(section.id) ? (
                                                    <ChevronUp className="h-5 w-5" />
                                                ) : (
                                                    <ChevronDown className="h-5 w-5" />
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                className="text-gray-400 hover:text-blue-500 p-1"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                type="button"
                                                className="text-gray-400 hover:text-red-500 p-1"
                                                onClick={() => deleteSection(section.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Section content */}
                                    {expandedSections.includes(section.id) && (
                                        <div className="bg-white p-4">
                                            <div className="space-y-2">
                                                {section.lectures.sort((a, b) => a.order - b.order).map((lecture) => (
                                                    <div
                                                        key={lecture.id}
                                                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                                                    >
                                                        <div className="flex items-center">
                                                            <button
                                                                type="button"
                                                                className="text-gray-400 hover:text-gray-500 mr-2"
                                                                onMouseDown={() => setIsDragging(true)}
                                                                onMouseUp={() => setIsDragging(false)}
                                                            >
                                                                <Grip className="h-4 w-4" />
                                                            </button>
                                                            <div className="flex items-center mr-2">
                                                                {getLectureTypeIcon(lecture.type)}
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {lecture.title}
                                                                </div>
                                                                <div className="text-xs text-gray-500 flex items-center">
                                                                    {lecture.type === 'video' && lecture.duration && (
                                                                        <span>{formatDuration(lecture.duration)}</span>
                                                                    )}
                                                                    {!lecture.isPublished && (
                                                                        <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">
                                                                            Bản nháp
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Link href={`/instructor/courses/${courseId}/lectures/${lecture.id}`}>
                                                                <button
                                                                    type="button"
                                                                    className="text-gray-400 hover:text-blue-500 p-1"
                                                                >
                                                                    <Edit className="h-4 w-4" />
                                                                </button>
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                className="text-gray-400 hover:text-red-500 p-1"
                                                                onClick={() => deleteLecture(section.id, lecture.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => addLecture(section.id)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                                >
                                                    <Plus className="h-3 w-3 mr-1" /> Thêm bài giảng
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            >
                                Lưu bản nháp
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            >
                                Xuất bản khóa học
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}