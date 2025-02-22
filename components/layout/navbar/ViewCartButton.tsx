import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface ViewCartButtonProps {
    href?: string;
    className?: string;
}

export const ViewCartButton = ({
    href = "/cart",
    className = ""
}: ViewCartButtonProps) => {
    return (
        <Link
            href={href}
            className={`
                flex items-center justify-center space-x-2
                w-full px-4 py-2 bg-black hover:bg-gray-800
                text-white font-medium rounded-lg
                transition-colors duration-200
                ${className}
            `}
        >
            <ShoppingCart className="w-4 h-4" />
            <span>Xem giỏ hàng</span>
        </Link>
    );
};