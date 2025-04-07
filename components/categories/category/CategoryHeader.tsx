// components/CategoryHeader.tsx

interface CategoryHeaderProps {
    category?: string;
    subCategory?: string;
}

export function CategoryHeader({category, subCategory}: CategoryHeaderProps) {
    if (!category) return null;

    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
                {subCategory ? `Khóa học về ${subCategory}` : `Khóa học về ${category}`}
            </h1>
            <p className="text-lg text-gray-700">
                Học {subCategory || category} từ những chuyên gia hàng đầu trong lĩnh vực
            </p>
        </div>
    );
}