import Link from "next/link"; // Import component Link từ next/link
import { LearningCourse } from "@/types/navbar"; // Import kiểu dữ liệu LearningCourse từ thư mục types/navbar
import { CourseList } from "@/components/layout/navbar/CourseList"; // Import component CourseList
import { ViewAllButton } from "@/components/layout/navbar/ViewAllButton"; // Import component ViewAllButton

// Định nghĩa interface cho các props của component UserLearning
interface UserLearningProps {
    courses: LearningCourse[]; // Prop courses là một mảng các đối tượng LearningCourse
}

// Định nghĩa component UserLearning
const UserLearning = ({ courses }: UserLearningProps) => {
    return (
        <div className="relative group">
            <button className="flex items-center space-x-2 hover:text-gray-600">
                <span>Khóa học của tôi</span> {/* Nút bấm để mở dropdown */}
            </button>
            <div className="absolute right-0 top-10 w-72 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-4">
                    <h3 className="font-bold text-lg mb-3">Khóa học của tôi</h3> {/* Tiêu đề của dropdown */}
                    <CourseList courses={courses} /> {/* Hiển thị danh sách các khóa học */}
                    <ViewAllButton /> {/* Hiển thị nút ViewAllButton */}
                </div>
            </div>
        </div>
    );
};

export default UserLearning; // Xuất component UserLearning để sử dụng ở nơi khác
