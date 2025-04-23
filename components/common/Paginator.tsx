// components/common/Pagination.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    // Tạo một mảng các số trang để hiển thị
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            // Hiển thị tất cả các trang nếu số trang <= 5
            for (let i = 0; i < totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Luôn hiển thị trang đầu tiên
            pages.push(0);

            // Xác định trang bắt đầu và kết thúc của phạm vi trang
            let startPage = Math.max(1, currentPage - 1);
            let endPage = Math.min(totalPages - 2, currentPage + 1);

            // Điều chỉnh để đảm bảo hiển thị 3 trang ở giữa
            if (endPage - startPage < 2) {
                if (startPage === 1) {
                    endPage = Math.min(totalPages - 2, 3);
                } else {
                    startPage = Math.max(1, totalPages - 4);
                }
            }

            // Thêm dấu chấm lửng sau trang đầu tiên nếu cần
            if (startPage > 1) {
                pages.push(-1); // -1 đại diện cho dấu chấm lửng
            }

            // Thêm các trang ở giữa
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            // Thêm dấu chấm lửng trước trang cuối cùng nếu cần
            if (endPage < totalPages - 2) {
                pages.push(-2); // -2 đại diện cho dấu chấm lửng
            }

            // Luôn hiển thị trang cuối cùng
            pages.push(totalPages - 1);
        }

        return pages;
    };

    return (
        <div className="flex justify-center mt-6">
            <nav className="inline-flex items-center rounded-md shadow-sm" aria-label="Pagination">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className={`px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    <span className="sr-only">Trang trước</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                {getPageNumbers().map((pageNum, i) => (
                    pageNum < 0 ? (
                        <span key={`ellipsis-${i}`} className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                        </span>
                    ) : (
                        <button
                            key={`page-${pageNum}`}
                            onClick={() => onPageChange(pageNum)}
                            className={`px-4 py-2 border border-gray-300 text-sm font-medium ${pageNum === currentPage
                                    ? "bg-black text-white hover:bg-gray-800"
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                            aria-current={pageNum === currentPage ? "page" : undefined}
                        >
                            {pageNum + 1}
                        </button>
                    )
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className={`px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage >= totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    <span className="sr-only">Trang sau</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
            </nav>
        </div>
    );
};

export default Pagination;