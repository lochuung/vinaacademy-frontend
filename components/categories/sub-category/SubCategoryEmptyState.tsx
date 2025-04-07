// components/SubCategoryEmptyState.tsx
import {Button} from "@/components/ui/button";

interface SubCategoryEmptyStateProps {
    resetFilters: () => void;
}

export function SubCategoryEmptyState({resetFilters}: SubCategoryEmptyStateProps) {
    return (
        <div className="bg-white p-8 text-center border rounded-md">
            <p className="text-xl text-gray-600 mb-4">Không tìm thấy khóa học phù hợp</p>
            <p className="text-gray-500 mb-6">Vui lòng điều chỉnh bộ lọc</p>
            <Button onClick={resetFilters} variant="outline">
                Xóa bộ lọc
            </Button>
        </div>
    );
}