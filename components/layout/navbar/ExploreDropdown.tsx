import { Category } from "@/types/navbar"; // Import kiểu dữ liệu Category từ thư mục types/navbar
import CategoryItem from "./CategoryItem"; // Import component CategoryItem

// Định nghĩa interface cho các props của component ExploreDropdown
interface ExploreDropdownProps {
    categories: Category[]; // Prop categories là một mảng các đối tượng Category
}

// Định nghĩa component ExploreDropdown
const ExploreDropdown = ({ categories }: ExploreDropdownProps) => {
    return (
        <div className="relative group"> {/* Container chính của ExploreDropdown */}
            <button className="hover:text-gray-600 py-2"> {/* Nút bấm để mở dropdown */}
                Khám phá
            </button>
            <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"> {/* Container của dropdown */}
                <div className="py-2"> {/* Padding cho dropdown */}
                    {categories.map((category, index) => (
                        <CategoryItem key={index} category={category} /> // Hiển thị từng category
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExploreDropdown; // Xuất component ExploreDropdown để sử dụng ở nơi khác