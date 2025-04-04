// components/SubCategoryHeader.tsx

interface SubCategoryHeaderProps {
    category?: string;
    subCategory?: string;
    selectedTopic: string | null;
}

export function SubCategoryHeader({ category, subCategory, selectedTopic }: SubCategoryHeaderProps) {
    if (!subCategory) return null;

    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
                {selectedTopic
                    ? `Khóa học về ${selectedTopic}`
                    : `Khóa học về ${subCategory}`}
            </h1>
            <p className="text-lg text-gray-700">
                {selectedTopic
                    ? `Khóa học về ${selectedTopic} từ giảng viên hàng đầu`
                    : `Học ${subCategory} từ những chuyên gia hàng đầu trong lĩnh vực`}
            </p>
        </div>
    );
}