// components/CourseFilterTags.tsx
import { X } from "lucide-react";

interface CourseFilterTagsProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedLevel: string;
    setSelectedLevel: (level: string) => void;
    priceRange: string;
    setPriceRange: (range: string) => void;
    clearAllFilters: () => void;
}

export function CourseFilterTags({
    selectedCategory,
    setSelectedCategory,
    selectedLevel,
    setSelectedLevel,
    priceRange,
    setPriceRange,
    clearAllFilters
}: CourseFilterTagsProps) {
    // Nếu không có bộ lọc nào được chọn, không hiển thị gì
    if (!selectedCategory && !selectedLevel && !priceRange) {
        return null;
    }

    // Hàm lấy text hiển thị cho khoảng giá
    const getPriceRangeText = (range: string): string => {
        switch (range) {
            case "free":
                return "Miễn phí";
            case "under_500k":
                return "Dưới 500.000đ";
            case "500k_1m":
                return "500.000đ - 1.000.000đ";
            case "over_1m":
                return "Trên 1.000.000đ";
            default:
                return "";
        }
    };

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory && (
                <div className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                    <span>Danh mục: {selectedCategory}</span>
                    <button onClick={() => setSelectedCategory("")} className="ml-2">
                        <X size={14} />
                    </button>
                </div>
            )}

            {selectedLevel && (
                <div className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                    <span>Cấp độ: {selectedLevel}</span>
                    <button onClick={() => setSelectedLevel("")} className="ml-2">
                        <X size={14} />
                    </button>
                </div>
            )}

            {priceRange && (
                <div className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                    <span>Giá: {getPriceRangeText(priceRange)}</span>
                    <button onClick={() => setPriceRange("")} className="ml-2">
                        <X size={14} />
                    </button>
                </div>
            )}

            <button
                onClick={clearAllFilters}
                className="text-gray-600 text-sm underline"
            >
                Xóa tất cả
            </button>
        </div>
    );
}