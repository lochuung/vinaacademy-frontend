import { FaShoppingCart } from "react-icons/fa";

interface CartButtonProps {
    itemCount: number;
    isActive: boolean; // Thêm prop isActive để biết trạng thái active của button
    onClick?: () => void; // Thêm prop onClick (tùy chọn)
}

export const CartButton = ({ itemCount, isActive, onClick }: CartButtonProps) => {
    return (
        <button
            className={`relative p-2 rounded-full transition-colors duration-200 ${isActive ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
            onClick={onClick}
            aria-label="Giỏ hàng"
            aria-expanded={isActive}
            aria-haspopup="true"
        >
            <FaShoppingCart className="w-5 h-5 text-black" />
            {itemCount > 0 && (
                <span className="absolute -top-0 -right-0 flex items-center justify-center bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full">
                    {itemCount > 99 ? "99+" : itemCount}
                </span>
            )}
        </button>
    );
};