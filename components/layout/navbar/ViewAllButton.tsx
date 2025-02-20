import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ViewAllButtonProps {
    href?: string;
    className?: string;
}

export const ViewAllButton = ({
    href = "/my-learning",
    className = ""
}: ViewAllButtonProps) => {
    return (
        <Link
            href={href}
            className={`
                mt-4 flex items-center justify-center space-x-2
                w-full px-4 py-2 bg-gray-100 hover:bg-gray-200
                text-gray-700 font-medium rounded-lg
                transition-colors duration-200
                ${className}
            `}
        >
            <span>Xem tất cả</span>
            <ChevronRight className="w-4 h-4" />
        </Link>
    );
};