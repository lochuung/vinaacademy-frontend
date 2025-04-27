import { ShoppingCart } from "lucide-react";

interface CartButtonProps {
    itemCount: number;
    onClick: () => void;
    isActive: boolean;
}

export const CartButton = ({ itemCount, onClick, isActive }: CartButtonProps) => {
    return (
        <button
            className={`relative flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
                isActive 
                    ? "bg-gray-100 text-black" 
                    : "hover:bg-gray-50 text-gray-700 hover:text-black"
            }`}
            onClick={onClick}
            aria-label={`Giỏ hàng${itemCount > 0 ? ` (${itemCount})` : ''}`}
            aria-expanded={isActive}
            aria-haspopup="true"
        >
            <ShoppingCart className="w-5 h-5" strokeWidth={2} />
            
            {itemCount > 0 && (
                <span 
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full shadow-sm"
                    aria-hidden="true"
                >
                    {itemCount > 99 ? "99+" : itemCount}
                </span>
            )}
        </button>
    );
};