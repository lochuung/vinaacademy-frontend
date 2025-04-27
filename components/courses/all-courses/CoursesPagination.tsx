// components/CoursesPagination.tsx
import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface CoursesPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function CoursesPagination({
                                      currentPage,
                                      totalPages,
                                      onPageChange
                                  }: CoursesPaginationProps) {
    // Không hiển thị phân trang nếu chỉ có 1 trang
    if (totalPages <= 1) return null;

    // Tạo danh sách số trang với logic responsive
    const getPageNumbers = (): number[] => {
        const pageNumbers: number[] = [];

        // Logic cho màn hình nhỏ - chỉ hiển thị điều hướng và trang hiện tại
        const isMobileView = typeof window !== 'undefined' && window.innerWidth < 640;
        
        if (isMobileView) {
            // Cho màn hình mobile, chỉ hiển thị trang hiện tại và nút điều hướng
            if (currentPage > 1) {
                pageNumbers.push(1); // Trang đầu tiên
                
                if (currentPage > 2) {
                    pageNumbers.push(-1); // Dấu ... 
                }
            }
            
            pageNumbers.push(currentPage); // Trang hiện tại
            
            if (currentPage < totalPages) {
                if (currentPage < totalPages - 1) {
                    pageNumbers.push(-2); // Dấu ...
                }
                
                pageNumbers.push(totalPages); // Trang cuối
            }
        } else if (totalPages <= 7) {
            // Nếu tổng số trang ≤ 7, hiện tất cả số trang
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Luôn hiển thị trang đầu và trang cuối
            // Hiển thị 2 trang trước và 2 trang sau trang hiện tại

            // Thêm trang đầu tiên
            pageNumbers.push(1);

            // Xác định phạm vi các trang hiển thị
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            // Thêm dấu "..." nếu cần
            if (startPage > 2) {
                pageNumbers.push(-1); // -1 đại diện cho dấu "..."
            }

            // Thêm các trang giữa
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            // Thêm dấu "..." nếu cần
            if (endPage < totalPages - 1) {
                pageNumbers.push(-2); // -2 đại diện cho dấu "..." thứ hai
            }

            // Thêm trang cuối cùng
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="flex justify-center mt-6 sm:mt-10">
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                <Button
                    variant="outline"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-8 w-8 sm:h-10 sm:w-10 p-0"
                >
                    <ChevronLeft size={16}/>
                </Button>

                <div className="hidden sm:flex gap-1 sm:gap-2">
                    {getPageNumbers().map((page, index) => {
                        if (page < 0) {
                            // Hiển thị dấu "..." thay vì số trang
                            return (
                                <Button key={`ellipsis-${index}`} variant="outline" disabled className="h-8 sm:h-10 w-8 sm:w-10 p-0">
                                    ...
                                </Button>
                            );
                        }

                        return (
                            <Button
                                key={page}
                                variant={page === currentPage ? "default" : "outline"}
                                onClick={() => onPageChange(page)}
                                className={`h-8 sm:h-10 w-8 sm:w-10 p-0 ${page === currentPage ? "bg-black" : ""}`}
                            >
                                {page}
                            </Button>
                        );
                    })}
                </div>

                {/* Hiển thị phiên bản đơn giản hơn trên mobile */}
                <div className="flex sm:hidden items-center">
                    <span className="mx-2 text-sm font-medium">
                        {currentPage} / {totalPages}
                    </span>
                </div>

                <Button
                    variant="outline"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 sm:h-10 sm:w-10 p-0"
                >
                    <ChevronRight size={16}/>
                </Button>
            </div>
        </div>
    );
}