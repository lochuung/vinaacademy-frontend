// SortSelector.tsx
"use client";

interface SortSelectorProps {
    onChange?: (value: string) => void;
}

export default function SortSelector({onChange}: SortSelectorProps) {
    return (
        <div className="flex items-center">
            <span className="text-sm mr-2 text-gray-600">Sắp xếp theo:</span>
            <select
                className="bg-white border border-gray-300 rounded p-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => onChange && onChange(e.target.value)}
            >
                <option value="popular">Phổ biến nhất</option>
                <option value="rating">Đánh giá cao nhất</option>
                <option value="newest">Mới nhất</option>
                <option value="price_asc">Giá: Thấp đến cao</option>
                <option value="price_desc">Giá: Cao đến thấp</option>
            </select>
        </div>
    );
}
