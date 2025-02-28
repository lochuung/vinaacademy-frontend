import { ChevronRight, Flame } from "lucide-react"; // Import các icon ChevronRight và Flame từ thư viện lucide-react
import { Category } from "@/types/navbar"; // Import kiểu dữ liệu Category từ thư mục types/navbar
import SubCategoryItem from "./SubCategoryItem"; // Import component SubCategoryItem

// Định nghĩa component CategoryItem với prop category là một đối tượng Category
const CategoryItem = ({ category }: { category: Category }) => {
    return (
        <div className="relative group/item"> {/* Container chính của CategoryItem */}
            <a href={category.link} className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"> {/* Liên kết đến category */}
                {category.name} {/* Tên của category */}
                <ChevronRight className="w-4 h-4" /> {/* Icon ChevronRight */}
            </a>
            <div className="absolute left-full top-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 -ml-2 z-50"> {/* Container của subcategories */}
                <div className="py-2"> {/* Padding cho subcategories */}
                    {category.subCategories.map((subCategory, index) => (
                        <SubCategoryItem key={index} subCategory={subCategory} /> // Hiển thị từng subcategory
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryItem; // Xuất component CategoryItem để sử dụng ở nơi khác