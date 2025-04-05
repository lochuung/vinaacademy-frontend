'use client';

import { FC, useState, useEffect } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { BookOpen, Video, FileText, PenSquare, Clock, Users, ChevronRight, CheckCircle } from 'lucide-react';
import LearningHeader from '@/components/student/learning/LearningHeader';
import { Course } from '@/types/lecture';
import { mockCourseData } from '@/data/mockLearningData';
import StatusToast from '@/components/student/learning/shared/StatusToast';

interface CoursePageProps {
    params: Promise<{
        slug: string;
    }>;
}

const CoursePage: FC<CoursePageProps> = ({ params }) => {
    // Unwrap the params Promise
    const unwrappedParams = use(params);
    const slug = unwrappedParams.slug;

    const [course, setCourse] = useState<Course>(mockCourseData as unknown as Course);
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Lấy thông tin khóa học từ API hoặc dữ liệu mẫu
    useEffect(() => {
        // Trong thực tế, bạn sẽ gọi API để lấy thông tin khóa học dựa trên slug
        // const fetchCourse = async () => {
        //   const response = await fetch(`/api/courses/by-slug/${slug}`);
        //   const data = await response.json();
        //   setCourse(data);
        //   setLoading(false);
        // };
        // fetchCourse();

        // Mô phỏng việc tải dữ liệu
        setLoading(true);
        setTimeout(() => {
            setCourse(mockCourseData as unknown as Course);
            setLoading(false);
        }, 500);
    }, [slug]);

    const handleContinueLearning = () => {
        setToastMessage('Tiếp tục học tập từ bài học cuối cùng');
        setShowToast(true);
    };

    if (loading) {
        return (
            <div className="flex flex-col h-screen bg-white text-black">
                <LearningHeader
                    courseTitle={mockCourseData.title}
                    progress={mockCourseData.progress}
                    courseSlug={slug}
                />
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    // Tính tổng số bài học
    const totalLectures = course.sections.reduce(
        (acc, section) => acc + section.lectures.length,
        0
    );

    // Đếm số bài học theo loại
    const countLecturesByType = (type: string) => {
        return course.sections
            .flatMap(section => section.lectures)
            .filter(lecture => lecture.type === type)
            .length;
    };

    // Icon cho loại bài học
    const getLectureTypeIcon = (type: string) => {
        switch (type) {
            case 'video':
                return <Video className="w-4 h-4 text-blue-500" />;
            case 'reading':
                return <BookOpen className="w-4 h-4 text-green-500" />;
            case 'quiz':
                return <FileText className="w-4 h-4 text-orange-500" />;
            case 'assignment':
                return <PenSquare className="w-4 h-4 text-purple-500" />;
            default:
                return <Video className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <LearningHeader
                courseTitle={course.title}
                progress={course.progress}
                courseSlug={slug}
            />

            <div className="container mx-auto p-4 sm:p-6 md:p-8 flex-1">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    {/* Header của khóa học */}
                    <div className="p-6 md:p-8 border-b border-gray-200">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{course.title}</h1>
                        <div className="mt-4 flex flex-wrap items-center gap-6">
                            <div className="flex items-center text-gray-600">
                                <Clock className="w-5 h-5 mr-2" />
                                <span>20 giờ tổng thời lượng</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <FileText className="w-5 h-5 mr-2" />
                                <span>{totalLectures} bài học</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Users className="w-5 h-5 mr-2" />
                                <span>1,234 học viên</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                <span>Cập nhật lần cuối: T3/2025</span>
                            </div>
                        </div>

                        {/* Thanh tiến độ */}
                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">Tiến độ học tập</span>
                                <span className="text-sm font-medium text-blue-600">{course.progress}% hoàn thành</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${course.progress}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Tiếp tục học */}
                        {course.currentLecture && (
                            <div className="mt-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">Tiếp tục học</h2>
                                <Link
                                    href={`/learning/${slug}/lecture/${course.currentLecture.id}`}
                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                                    onClick={handleContinueLearning}
                                >
                                    <div className="flex items-center">
                                        {getLectureTypeIcon(course.currentLecture.type)}
                                        <div className="ml-3">
                                            <p className="font-medium text-gray-800">{course.currentLecture.title}</p>
                                            <p className="text-sm text-gray-500">{course.currentLecture.duration}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Nội dung khóa học */}
                    <div className="p-6 md:p-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Nội dung khóa học</h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="p-4 bg-blue-50 rounded-lg flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-blue-700">Video</p>
                                    <p className="text-xl font-bold text-blue-900">{countLecturesByType('video')}</p>
                                </div>
                                <Video className="w-8 h-8 text-blue-500" />
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-green-700">Bài đọc</p>
                                    <p className="text-xl font-bold text-green-900">{countLecturesByType('reading')}</p>
                                </div>
                                <BookOpen className="w-8 h-8 text-green-500" />
                            </div>
                            <div className="p-4 bg-orange-50 rounded-lg flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-orange-700">Bài kiểm tra</p>
                                    <p className="text-xl font-bold text-orange-900">{countLecturesByType('quiz')}</p>
                                </div>
                                <FileText className="w-8 h-8 text-orange-500" />
                            </div>
                            <div className="p-4 bg-purple-50 rounded-lg flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-purple-700">Bài tập</p>
                                    <p className="text-xl font-bold text-purple-900">{countLecturesByType('assignment')}</p>
                                </div>
                                <PenSquare className="w-8 h-8 text-purple-500" />
                            </div>
                        </div>

                        {/* Danh sách các phần */}
                        <div className="space-y-4">
                            {course.sections.map((section, sectionIndex) => (
                                <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                                        <h3 className="font-medium text-gray-800">
                                            Phần {sectionIndex + 1}: {section.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">{section.lectures.length} bài học</p>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        {section.lectures.map((lecture, lectureIndex) => (
                                            <Link
                                                key={lecture.id}
                                                href={`/learning/${slug}/lecture/${lecture.id}`}
                                                className="flex items-center p-4 hover:bg-gray-50 transition"
                                            >
                                                <div className="w-8 text-center text-gray-500 mr-2">
                                                    {lecture.isCompleted ? (
                                                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                                                    ) : (
                                                        <span>{sectionIndex + 1}.{lectureIndex + 1}</span>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center">
                                                        {getLectureTypeIcon(lecture.type || 'video')}
                                                        <span className="ml-2 font-medium text-gray-800">{lecture.title}</span>
                                                        {lecture.isCurrent && (
                                                            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                                                Đang học
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {lecture.duration}
                                                    </p>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Thông báo trạng thái */}
            {showToast && (
                <StatusToast
                    message={toastMessage}
                    type="success"
                    show={showToast}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
};

export default CoursePage;