// components/student/LearningTabs.tsx
import { FC, useState } from 'react';
import { BookOpen, PenSquare, MessageSquare, FileText, Search, Users } from 'lucide-react';
import NotesArea from './NotesArea';
import QuestionsArea from './QuestionsArea';
import DiscussionArea from './DiscussionArea';
import ReviewsArea from './ReviewArea';

interface Lesson {
    id: string;
    title: string;
    videoUrl: string;
    description: string;
    duration: string;
}

interface LearningTabsProps {
    lesson: Lesson;
    courseId: string;
    currentTimestamp?: number;
}

const LearningTabs: FC<LearningTabsProps> = ({ lesson, courseId, currentTimestamp = 0 }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'q&a' | 'discussion' | 'announcements' | 'reviews' | 'tools'>('overview');

    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            {/* Tab điều hướng phía trên */}
            <div className="bg-white border-b border-gray-200">
                <div className="flex overflow-x-auto hide-scrollbar">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-3 flex items-center text-sm font-medium whitespace-nowrap ${activeTab === 'overview'
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-700 hover:text-gray-900'
                            }`}
                    >
                        <Search size={16} className="mr-2" />
                        Tổng quan
                    </button>
                    <button
                        onClick={() => setActiveTab('q&a')}
                        className={`px-4 py-3 flex items-center text-sm font-medium whitespace-nowrap ${activeTab === 'q&a'
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-700 hover:text-gray-900'
                            }`}
                    >
                        <MessageSquare size={16} className="mr-2" />
                        Hỏi đáp
                    </button>
                    <button
                        onClick={() => setActiveTab('discussion')}
                        className={`px-4 py-3 flex items-center text-sm font-medium whitespace-nowrap ${activeTab === 'discussion'
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-700 hover:text-gray-900'
                            }`}
                    >
                        <Users size={16} className="mr-2" />
                        Thảo luận
                    </button>
                    <button
                        onClick={() => setActiveTab('notes')}
                        className={`px-4 py-3 flex items-center text-sm font-medium whitespace-nowrap ${activeTab === 'notes'
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-700 hover:text-gray-900'
                            }`}
                    >
                        <PenSquare size={16} className="mr-2" />
                        Ghi chú
                    </button>
                    <button
                        onClick={() => setActiveTab('announcements')}
                        className={`px-4 py-3 flex items-center text-sm font-medium whitespace-nowrap ${activeTab === 'announcements'
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-700 hover:text-gray-900'
                            }`}
                    >
                        <BookOpen size={16} className="mr-2" />
                        Thông báo
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`px-4 py-3 flex items-center text-sm font-medium whitespace-nowrap ${activeTab === 'reviews'
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-700 hover:text-gray-900'
                            }`}
                    >
                        <PenSquare size={16} className="mr-2" />
                        Đánh giá
                    </button>
                    <button
                        onClick={() => setActiveTab('tools')}
                        className={`px-4 py-3 flex items-center text-sm font-medium whitespace-nowrap ${activeTab === 'tools'
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-700 hover:text-gray-900'
                            }`}
                    >
                        <FileText size={16} className="mr-2" />
                        Công cụ học tập
                    </button>
                </div>
            </div>

            {/* Nội dung tab - đã loại bỏ overflow để cho phép cuộn từ parent */}
            <div className="flex-1">
                {activeTab === 'overview' && (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
                        <p className="text-gray-700">{lesson.description}</p>
                        <div className="mt-4 text-sm text-gray-500">Thời lượng: {lesson.duration}</div>
                    </div>
                )}

                {activeTab === 'notes' && (
                    <NotesArea
                        courseId={courseId}
                        lessonId={lesson.id}
                        currentTimestamp={currentTimestamp}
                    />
                )}

                {activeTab === 'q&a' && (
                    <QuestionsArea
                        courseId={courseId}
                        lessonId={lesson.id}
                    />
                )}

                {activeTab === 'discussion' && (
                    <DiscussionArea
                        courseId={courseId}
                        lessonId={lesson.id}
                    />
                )}

                {activeTab === 'announcements' && (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">Thông Báo</h2>
                        <p className="text-gray-700">Xem các thông báo quan trọng từ giảng viên của bạn.</p>
                        {/* Component Thông báo sẽ được đặt ở đây */}
                    </div>
                )}

                {activeTab === 'reviews' && (
                    // <div className="p-6">
                    //     <h2 className="text-2xl font-bold mb-4">Đánh Giá</h2>
                    //     <p className="text-gray-700">Xem những gì học viên khác đang nói về khóa học này.</p>
                    //     {/* Component Đánh giá sẽ được đặt ở đây */}
                    // </div>
                    <ReviewsArea 
                        courseId={courseId}
                    />
                )}

                {activeTab === 'tools' && (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">Công Cụ Học Tập</h2>
                        <p className="text-gray-700">Truy cập các tài nguyên và công cụ học tập bổ sung.</p>
                        {/* Component Công cụ học tập sẽ được đặt ở đây */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LearningTabs;