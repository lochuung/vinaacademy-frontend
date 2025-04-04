// components/CoursesPagination.tsx
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

    // Tạo danh sách số trang
    // Nếu có nhiều trang, chỉ hiển thị một số trang xung quanh trang hiện tại
    const getPageNumbers = (): number[] => {
        const pageNumbers: number[] = [];

        if (totalPages <= 7) {
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
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

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
        <div className="flex justify-center mt-10">
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft size={16} />
                </Button>

                {getPageNumbers().map((page, index) => {
                    if (page < 0) {
                        // Hiển thị dấu "..." thay vì số trang
                        return (
                            <Button key={`ellipsis-${index}`} variant="outline" disabled>
                                ...
                            </Button>
                        );
                    }

                    return (
                        <Button
                            key={page}
                            variant={page === currentPage ? "default" : "outline"}
                            onClick={() => onPageChange(page)}
                            className={page === currentPage ? "bg-black" : ""}
                        >
                            {page}
                        </Button>
                    );
                })}

                <Button
                    variant="outline"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight size={16} />
                </Button>
            </div>
        </div>
    );
}