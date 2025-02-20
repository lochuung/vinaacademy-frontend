import Link from "next/link";
import { LearningCourse } from "@/types/navbar";
import { CourseList } from "@/components/ui/navbar/CourseList";
import { ViewAllButton } from "@/components/ui/navbar/ViewAllButton";


interface UserLearningProps {
    courses: LearningCourse[];
}

const UserLearning = ({ courses }: UserLearningProps) => {
    return (
        <div className="relative group">
            <button className="flex items-center space-x-2 hover:text-gray-600">
                <span>Khóa học của tôi</span>
            </button>
            <div className="absolute right-0 top-10 w-72 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-4">
                    <h3 className="font-bold text-lg mb-3">Khóa học của tôi</h3>
                    <CourseList courses={courses} />
                    <ViewAllButton />
                </div>
            </div>
        </div>
    );
};
export default UserLearning;
