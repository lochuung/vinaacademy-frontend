import Image from 'next/image';
import Link from 'next/link';
import { Tag } from 'lucide-react';
import CourseRating from '@/components/cart/ui/CourseRating';
import CourseStats from '@/components/cart/ui/CourseStats';
import { CartItemDisplay } from '@/context/CartContext';

interface CartItemCardProps {
    item: CartItemDisplay;
    onRemove: (id: number) => void;
    onSaveForLater: (id: number) => void;
    onAddToFavorites: (id: number) => void;
}

export default function CartItemCard({
    item,
    onRemove,
    onSaveForLater,
    onAddToFavorites
}: CartItemCardProps) {
    return (
        <div className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">
            {/* Course Image */}
            <div className="flex-shrink-0 w-32 h-32 relative">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="rounded object-cover"
                />
            </div>

            {/* Course Details */}
            <div className="flex-grow">
                <Link href={`/courses/${item.courseId}`}>
                    <h3 className="font-semibold text-lg hover:underline">
                        {item.name}
                    </h3>
                </Link>
                <p className="text-sm text-gray-600">Giảng viên: {item.instructor}</p>

                {/* Rating Stars */}
                <CourseRating
                    rating={item.rating}
                    className="text-sm text-gray-600 mt-1"
                />

                {/* Course Stats */}
                <CourseStats
                    totalStudents={item.totalStudents}
                    totalHours={item.totalHours}
                    lectures={item.lectures}
                    level={item.level}
                    className="mt-1"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 min-w-[120px]">
                <button
                    className="text-red-600 hover:text-red-800 hover:underline text-sm text-left w-fit"
                    onClick={() => onRemove(item.id)}
                >
                    Xóa
                </button>
                <button
                    className="text-black hover:text-gray-700 hover:underline text-sm text-left w-fit"
                    onClick={() => onSaveForLater(item.id)}
                >
                    Lưu lại sau
                </button>
                <button
                    className="text-black hover:text-gray-700 hover:underline text-sm text-left w-fit"
                    onClick={() => onAddToFavorites(item.id)}
                >
                    Thêm vào yêu thích
                </button>
            </div>

            {/* Price Information */}
            <div className="text-right min-w-[120px]">
                <div className="font-bold text-lg flex items-center justify-end gap-1">
                    <span>{item.price.toLocaleString()}đ</span>
                    <Tag className="w-4 h-4" />
                </div>
                <div className="text-sm text-gray-500 line-through">
                    {item.originalPrice.toLocaleString()}đ
                </div>
            </div>
        </div>
    );
}