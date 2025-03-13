// app/(student)/learning/page.tsx
import { FC } from 'react';
import VideoPlayer from '@/components/student/VideoPlayer';
import CourseContent from '@/components/student/CourseContent';
import NotesArea from '@/components/student/NotesArea';
import LearningHeader from '@/components/student/LearningHeader';
import LearningTabs from '@/components/student/LearningTabs';

interface LearningPageProps {
    params: {
        courseId: string;
        lessonId: string;
    };
}

const LearningPage: FC<LearningPageProps> = async ({ params }) => {
    // In a real application, you would fetch this data from your API
    // based on the courseId and lessonId
    const mockCourseData = {
        id: params.courseId,
        title: 'Python for Complete Beginners',
        currentLesson: {
            id: params.lessonId,
            title: 'Using operators',
            videoUrl: '/api/video/lesson-1',
            description: 'Learn how to use basic operators in Python',
            duration: '10min',
        },
        sections: [
            {
                id: '1',
                title: 'Getting Started',
                lessons: [
                    { id: '1', title: 'Introduction', duration: '4min', isCompleted: true },
                    { id: '2', title: 'Setting up your environment', duration: '8min', isCompleted: true },
                ],
            },
            {
                id: '2',
                title: 'Python Basics',
                lessons: [
                    { id: '3', title: 'Using operators', duration: '10min', isCompleted: false, isCurrent: true },
                    { id: '4', title: 'Understanding Python Operators: A Comprehensive Guide', duration: '2min', isCompleted: false },
                    { id: '5', title: 'Prompting AI to generate code (Example 1)', duration: '10min', isCompleted: false },
                    { id: '6', title: 'Prompting AI to generate code (Example 2)', duration: '7min', isCompleted: false },
                    { id: '7', title: 'Quiz 2: Section 2 Quiz', duration: '5min', isCompleted: false },
                ],
            },
            {
                id: '3',
                title: 'Branching and Loops',
                lessons: [
                    { id: '8', title: 'If statements', duration: '15min', isCompleted: false },
                    { id: '9', title: 'For loops', duration: '12min', isCompleted: false },
                    { id: '10', title: 'While loops', duration: '10min', isCompleted: false },
                ],
            },
        ],
        progress: 25, // percent
    };

    return (
        <div className="flex flex-col h-screen bg-white text-black">
            <LearningHeader
                courseTitle={mockCourseData.title}
                progress={mockCourseData.progress}
            />

            <div className="flex flex-1 overflow-hidden">
                {/* Main content area */}
                <div className="flex flex-col flex-1 overflow-hidden">
                    <VideoPlayer
                        videoUrl={mockCourseData.currentLesson.videoUrl}
                        title={mockCourseData.currentLesson.title}
                    />

                    <LearningTabs
                        lesson={mockCourseData.currentLesson}
                        courseId={mockCourseData.id}
                    />
                </div>

                {/* Course content sidebar - can be toggled */}
                <div className="w-96 border-l border-gray-200 bg-white overflow-y-auto hidden md:block">
                    <CourseContent
                        title={mockCourseData.title}
                        sections={mockCourseData.sections}
                        courseId={mockCourseData.id}
                    />
                </div>
            </div>
        </div>
    );
};

export default LearningPage;