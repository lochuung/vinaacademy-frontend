import Image from "next/image"; // Import component Image từ next/image
import {ProgressBar} from "./ProgressBar"; // Import component ProgressBar
import {LearningCourse} from "@/types/navbar";

// Định nghĩa interface cho các props của component CourseItem
interface CourseItemProps {
    course: LearningCourse; // Prop course là một đối tượng LearningCourse
}

// Định nghĩa component CourseItem
const CourseItem = ({course}: CourseItemProps) => {
    return (
        <li className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"> {/* Một mục trong danh sách khóa học */}
            <div className="relative w-16 h-16 flex-shrink-0"> {/* Hình ảnh của khóa học */}
                <Image
                    src={course.image}
                    alt={course.name}
                    fill
                    className="rounded-md object-cover"
                />
            </div>
            <div className="flex-1 min-w-0"> {/* Thông tin của khóa học */}
                <h4 className="text-sm font-medium text-gray-900 truncate">
                    {course.name}
                </h4>
                <div className="mt-1">
                    <ProgressBar progress={course.progress}/> {/* Hiển thị ProgressBar */}
                    <p className="text-xs text-gray-500 mt-1">
                        {course.progress}% hoàn thành
                    </p>
                </div>
            </div>
        </li>
    );
};

export default CourseItem; // Xuất component CourseItem