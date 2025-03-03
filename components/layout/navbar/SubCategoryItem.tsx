import { ChevronRight } from "lucide-react"; // Import icon ChevronRight từ thư viện lucide-react
import { SubCategory } from "@/types/navbar"; // Import kiểu dữ liệu SubCategory từ thư mục types/navbar
import TrendingTopics from "./TrendingTopics"; // Import component TrendingTopics

// Định nghĩa component SubCategoryItem với prop subCategory là một đối tượng SubCategory
const SubCategoryItem = ({ subCategory }: { subCategory: SubCategory }) => {
    return (
        <div className="relative group/subitem"> {/* Container chính của SubCategoryItem */}
            <a href={subCategory.link} className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"> {/* Liên kết đến subcategory */}
                {subCategory.name} {/* Tên của subcategory */}
                <ChevronRight className="w-4 h-4" /> {/* Icon ChevronRight */}
            </a>
            <TrendingTopics topics={subCategory.trendingTopics} /> {/* Hiển thị TrendingTopics với dữ liệu trendingTopics */}
        </div>
    );
};

export default SubCategoryItem; // Xuất component SubCategoryItem để sử dụng ở nơi khác