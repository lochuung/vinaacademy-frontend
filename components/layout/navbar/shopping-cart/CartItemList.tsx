import { CartItem } from "@/types/navbar";
import Image from "next/image";
import { X } from "lucide-react";

interface CartItemListProps {
    items: CartItem[];
    onRemove?: (id: number) => void;
}

export const CartItemList = ({ items, onRemove }: CartItemListProps) => {
    if (items.length === 0) {
        return (
            <div className="py-6 text-center text-gray-500">
                <p>Giỏ hàng của bạn đang trống</p>
                <p className="text-sm mt-2">Khám phá các khóa học ngay!</p>
            </div>
        );
    }

    return (
        <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {items.map((item) => (
                <CartItemRow
                    key={item.id}
                    item={item}
                    onRemove={onRemove}
                />
            ))}
        </ul>
    );
};

interface CartItemRowProps {
    item: CartItem;
    onRemove?: (id: number) => void;
}

const CartItemRow = ({ item, onRemove }: CartItemRowProps) => {
    const handleRemove = () => {
        if (onRemove) {
            onRemove(item.id);
        }
    };

    return (
        <li className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                    loading="lazy"
                />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                    {item.name}
                </h4>
                <p className="text-sm text-gray-500 mt-1">{item.price}</p>
            </div>
            {onRemove && (
                <button
                    onClick={handleRemove}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    aria-label="Xóa khỏi giỏ hàng"
                >
                    <X className="w-4 h-4 text-gray-400" />
                </button>
            )}
        </li>
    );
};