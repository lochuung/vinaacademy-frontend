import Link from "next/link";
import { LearningCourse } from "@/types/navbar";
import { CourseList } from "@/components/layout/navbar/user-learning/CourseList";
import { ViewAllButton } from "@/components/layout/navbar/user-learning/ViewAllButton";
import { useContinueLearning } from "@/hooks/course/useContinueLearning";

const UserLearning = () => {
    // Use our custom hook to fetch courses in progress
    const { courses, isLoading, error } = useContinueLearning({ 
        limit: 5, // Show up to 5 courses in the dropdown
        enabled: true 
    });

    return (
        <div className="relative group">
            <Link href="/my-courses" className="flex items-center space-x-2 hover:text-gray-500">
                <span>Khóa học của tôi</span>
            </Link>
            <div
                className="absolute right-0 top-10 w-72 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-4">
                    <h3 className="font-bold text-lg mb-3">Khóa học của tôi</h3>

                    {isLoading ? (
                        <div className="py-4 text-center text-gray-500">
                            <p>Đang tải khóa học...</p>
                        </div>
                    ) : error ? (
                        <div className="py-4 text-center text-gray-500">
                            <p>{error instanceof Error ? error.message : "Lỗi khi tải khóa học"}</p>
                        </div>
                    ) : (
                        <CourseList courses={courses} />
                    )}

                    <ViewAllButton />
                </div>
            </div>
        </div>
    );
};

export default UserLearning;