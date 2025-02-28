import { FaShoppingCart } from "react-icons/fa"; // Import icon FaShoppingCart từ thư viện react-icons

interface CartButtonProps {
    itemCount: number; // Định nghĩa prop itemCount là một số
}


export const CartButton = ({ itemCount }: CartButtonProps) => {
    return (
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <FaShoppingCart className="w-5 h-5 text-black" />
            {itemCount > 0 && (
                <span className="absolute -top-0 -right-0 flex items-center justify-center bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full">
                    {itemCount}
                </span>
            )}
        </button>
    );
};
