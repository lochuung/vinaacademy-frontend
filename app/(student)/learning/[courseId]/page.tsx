// app/(student)/learning/page.tsx
'use client';

import { FC, useState } from 'react';
import VideoPlayer from '@/components/student/learning/VideoPlayer';
import ReadingContent from '@/components/student/learning/ReadingContent';
import CourseContent from '@/components/student/learning/CourseContent';
import LearningHeader from '@/components/student/learning/LearningHeader';
import LearningTabs from '@/components/student/learning/LearningTabs';

interface LearningPageProps {
    params: {
        courseId: string;
        lessonId: string;
    };
}

const LearningPage: FC<LearningPageProps> = ({ params }) => {
    const [currentTimestamp, setCurrentTimestamp] = useState<number>(0);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

    // Trong ứng dụng thực tế, bạn sẽ lấy dữ liệu này từ API của bạn
    // dựa trên courseId và lessonId
    const mockCourseData = {
        id: params.courseId,
        title: 'Python cho Người Mới Bắt Đầu',
        currentLesson: {
            id: params.lessonId,
            title: 'Sử dụng toán tử',
            type: 'video', // Thêm trường type để xác định loại bài học: 'video' hoặc 'reading'
            videoUrl: '/api/video/lesson-1',
            description: 'Học cách sử dụng các toán tử cơ bản trong Python',
            duration: '10 phút',
        },
        sections: [
            {
                id: '1',
                title: 'Bắt Đầu',
                lessons: [
                    { id: '1', title: 'Giới thiệu', duration: '4 phút', isCompleted: true },
                    { id: '2', title: 'Thiết lập môi trường của bạn', duration: '8 phút', isCompleted: true },
                ],
            },
            {
                id: '2',
                title: 'Cơ Bản về Python',
                lessons: [
                    { id: '3', title: 'Sử dụng toán tử', duration: '10 phút', isCompleted: false, isCurrent: true },
                    {
                        id: '4',
                        title: 'Tìm hiểu toán tử Python: Hướng dẫn toàn diện',
                        duration: '15 phút đọc',
                        isCompleted: false,
                        type: 'reading'
                    },
                    { id: '5', title: 'Hướng dẫn AI tạo mã (Ví dụ 1)', duration: '10 phút', isCompleted: false },
                    { id: '6', title: 'Hướng dẫn AI tạo mã (Ví dụ 2)', duration: '7 phút', isCompleted: false },
                    { id: '7', title: 'Bài kiểm tra 2: Kiểm tra Phần 2', duration: '5 phút', isCompleted: false },
                ],
            },
            {
                id: '3',
                title: 'Rẽ Nhánh và Vòng Lặp',
                lessons: [
                    { id: '8', title: 'Câu lệnh if', duration: '15 phút', isCompleted: false },
                    { id: '9', title: 'Vòng lặp for', duration: '12 phút', isCompleted: false },
                    { id: '10', title: 'Vòng lặp while', duration: '10 phút', isCompleted: false },
                ],
            },
        ],
        progress: 25, // phần trăm
    };

    const handleTimeUpdate = (time: number) => {
        setCurrentTimestamp(time);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Kiểm tra xem bài học hiện tại có phải là dạng đọc hay không
    const isReadingLesson = mockCourseData.currentLesson.type === 'reading';

    return (
        <div className="flex flex-col h-screen bg-white text-black">
            <LearningHeader
                courseTitle={mockCourseData.title}
                progress={mockCourseData.progress}
            />

            <div className="flex flex-1 overflow-hidden">
                {/* Khu vực nội dung chính - bố cục theo chiều dọc */}
                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col">
                        {/* Hiển thị nội dung học tập dựa theo loại bài học */}
                        {isReadingLesson ? (
                            <div className="w-full p-4 bg-white">
                                <ReadingContent
                                    lessonId={mockCourseData.currentLesson.id}
                                    courseId={mockCourseData.id}
                                />
                            </div>
                        ) : (
                            <div className="w-full bg-black">
                                <VideoPlayer
                                    videoUrl={mockCourseData.currentLesson.videoUrl}
                                    title={mockCourseData.currentLesson.title}
                                    onTimeUpdate={handleTimeUpdate}
                                />
                            </div>
                        )}

                        {/* Các tab học tập dưới nội dung - không có overflow riêng */}
                        <div>
                            <LearningTabs
                                lesson={mockCourseData.currentLesson}
                                courseId={mockCourseData.id}
                                currentTimestamp={currentTimestamp}
                            />
                        </div>
                    </div>
                </div>

                {/* Thanh bên nội dung khóa học - có thể ẩn hiện */}
                <div className={`border-l border-gray-200 bg-white overflow-y-auto transition-all duration-300 ${sidebarOpen ? 'w-96' : 'w-0'} hidden md:block`}>
                    {sidebarOpen && (
                        <CourseContent
                            title={mockCourseData.title}
                            sections={mockCourseData.sections}
                            courseId={mockCourseData.id}
                        />
                    )}
                </div>
            </div>

            {/* Nút chuyển đổi thanh bên trên di động */}
            <button
                onClick={toggleSidebar}
                className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg md:hidden z-50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
    );
};

export default LearningPage;