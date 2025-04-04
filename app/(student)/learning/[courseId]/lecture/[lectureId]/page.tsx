'use client';

import { FC, useState, useEffect } from 'react';
import { use } from 'react';
import VideoPlayer from '@/components/student/learning/content-area/VideoPlayer';
import ReadingContent from '@/components/student/learning/content-area/ReadingContent';
import QuizContent from '@/components/student/learning/content-area/QuizContent';
import CourseContent from '@/components/student/learning/CourseContent';
import LearningHeader from '@/components/student/learning/LearningHeader';
import LearningTabs from '@/components/student/learning/LearningTabs';
import { Lecture } from '@/types/lecture';
import {
    mockCourseData, videoLectureExample, readingLectureExample, quizLectureExample,
    assignmentLectureExample
} from '@/data/mockLearningData';

interface LecturePageProps {
    params: Promise<{
        courseId: string;
        lectureId: string;
    }>;
}

const LecturePage: FC<LecturePageProps> = ({ params }) => {
    // Unwrap the params Promise
    const unwrappedParams = use(params);
    const courseId = unwrappedParams.courseId;
    const lectureId = unwrappedParams.lectureId;

    const [currentTimestamp, setCurrentTimestamp] = useState<number>(0);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [currentLecture, setCurrentLecture] = useState<Lecture>(mockCourseData.currentLecture);
    const [loading, setLoading] = useState(true);

    // Lấy bài học từ API hoặc dữ liệu mẫu dựa trên lectureId
    useEffect(() => {
        // Trong thực tế, bạn sẽ gọi API để lấy thông tin bài học
        // const fetchLecture = async () => {
        //   const response = await fetch(`/api/courses/${courseId}/lectures/${lectureId}`);
        //   const data = await response.json();
        //   setCurrentLecture(data);
        //   setLoading(false);
        // };
        // fetchLecture();

        // Mô phỏng việc tải dữ liệu
        setLoading(true);
        setTimeout(() => {
            // Tìm bài học từ dữ liệu mẫu
            let foundLecture: Lecture | null = null;

            // Tìm trong tất cả các phần của khóa học
            for (const section of mockCourseData.sections) {
                const lecture = section.lectures.find(l => l.id === lectureId);
                if (lecture) {
                    foundLecture = lecture;
                    break;
                }
            }

            // Nếu không tìm thấy theo ID, kiểm tra loại bài học từ URL
            if (!foundLecture) {
                const searchParams = typeof window !== 'undefined'
                    ? new URLSearchParams(window.location.search)
                    : new URLSearchParams('');
                const type = searchParams.get('type');

                if (type === 'video') {
                    foundLecture = videoLectureExample as Lecture;
                } else if (type === 'reading') {
                    foundLecture = readingLectureExample as Lecture;
                } else if (type === 'quiz') {
                    foundLecture = quizLectureExample as Lecture;
                } else if (type === 'assignment') {
                    foundLecture = assignmentLectureExample as Lecture;
                } else {
                    // Mặc định là bài học hiện tại nếu không tìm thấy
                    foundLecture = mockCourseData.currentLecture;
                }
            }

            setCurrentLecture(foundLecture);
            setLoading(false);
        }, 500);
    }, [courseId, lectureId]);

    const handleTimeUpdate = (time: number) => {
        setCurrentTimestamp(time);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    if (loading) {
        return (
            <div className="flex flex-col h-screen bg-white text-black">
                <LearningHeader
                    courseTitle={mockCourseData.title}
                    progress={mockCourseData.progress}
                    courseId={courseId}
                />
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    // Kiểm tra loại bài học
    const isReadingLecture = currentLecture.type === 'reading';
    const isQuizLecture = currentLecture.type === 'quiz';
    const isAssignmentLecture = currentLecture.type === 'assignment';
    const isVideoLecture = currentLecture.type === 'video';

    // Component hiển thị Assignment
    const AssignmentContent = () => {
        // Hiển thị giao diện cho bài tập assignment
        const assignment = currentLecture.assignmentDetails;

        if (!assignment) return <div>Không có thông tin bài tập</div>;

        return (
            <div className="max-w-3xl mx-auto py-8 px-4">
                <h1 className="text-2xl font-bold mb-6">{currentLecture.title}</h1>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold">Thông tin bài tập</h2>
                                <p className="text-sm text-gray-500 mt-1">Thời gian: {currentLecture.duration}</p>
                            </div>
                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                Điểm tối đa: {assignment.maxPoints}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 prose max-w-none">
                        <div dangerouslySetInnerHTML={{
                            __html: assignment.instructions
                                .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
                                .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>')
                                .replace(/^###(.*$)/gim, '<h3 class="text-lg font-medium mt-5 mb-2">$1</h3>')
                                .replace(/\n/gim, '<br>')
                        }}></div>
                    </div>

                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Thời hạn nộp bài: {new Date(assignment.deadline).toLocaleDateString('vi-VN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Định dạng file: {assignment.allowedFileTypes.join(', ')}
                                </p>
                            </div>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Nộp bài tập
                            </button>
                        </div>
                    </div>
                </div>

                {assignment.resources.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-3">Tài liệu tham khảo</h3>
                        <div className="space-y-2">
                            {assignment.resources.map(resource => (
                                <div key={resource.id} className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                                        </svg>
                                        {resource.title} ({resource.type.toUpperCase()})
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-screen bg-white text-black">
            <LearningHeader
                courseTitle={mockCourseData.title}
                progress={mockCourseData.progress}
                courseId={courseId}
            />

            <div className="flex flex-1 overflow-hidden">
                {/* Khu vực nội dung chính - bố cục theo chiều dọc */}
                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col h-full">
                        {/* Hiển thị nội dung học tập dựa theo loại bài học */}
                        {isQuizLecture ? (
                            <div className="w-full flex-1 bg-gray-50">
                                <QuizContent
                                    lectureId={currentLecture.id}
                                    courseId={courseId}
                                />
                            </div>
                        ) : isReadingLecture ? (
                            <div className="w-full p-4 bg-white">
                                <ReadingContent
                                    lectureId={currentLecture.id}
                                    courseId={courseId}
                                />
                            </div>
                        ) : isAssignmentLecture ? (
                            <div className="w-full p-4 bg-white">
                                <AssignmentContent />
                            </div>
                        ) : (
                            <div className="w-full bg-black">
                                {currentLecture.videoUrl && (
                                    <VideoPlayer
                                        videoUrl={currentLecture.videoUrl}
                                        title={currentLecture.title}
                                        onTimeUpdate={handleTimeUpdate}
                                    />
                                )}
                            </div>
                        )}

                        {/* Các tab học tập chỉ hiển thị cho bài học video và reading */}
                        {(isVideoLecture || isReadingLecture) && (
                            <div>
                                <LearningTabs
                                    lecture={currentLecture}
                                    courseId={courseId}
                                    currentTimestamp={currentTimestamp}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Thanh bên nội dung khóa học - có thể ẩn hiện */}
                <div className={`border-l border-gray-200 bg-white overflow-y-auto transition-all duration-300 ${sidebarOpen ? 'w-96' : 'w-0'} hidden md:block`}>
                    {sidebarOpen && (
                        <CourseContent
                            title={mockCourseData.title}
                            sections={mockCourseData.sections}
                            courseId={courseId}
                        />
                    )}
                </div>
            </div>

            {/* Nút chuyển đổi thanh bên trên di động */}
            <button
                onClick={toggleSidebar}
                className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg md:hidden z-50"
                title="Toggle Sidebar"
                aria-label="Toggle Sidebar"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
    );
};

export default LecturePage;