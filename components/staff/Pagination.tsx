import { Course } from "@/types/new-course";
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        hasMore: boolean;
    };
    courses: Course[]; 
    isLoading?: boolean;
    page: number;
    paginationRange: (number | string)[];
    handlePageChange: (page: number) => void;
}

const Pagination = ({pagination, courses, page, handlePageChange, isLoading, paginationRange} : PaginationProps) => {
    return (
        <div className="px-4 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <p className="text-sm text-gray-700">
                    Đang hiển thị từ <span className="font-medium">{courses.length ? (page - 1) * 5 + 1 : 0}</span> đến{' '}
                    <span className="font-medium">{Math.min(page * 5, pagination.totalItems)}</span> trong{' '}
                    <span className="font-medium">{pagination.totalItems}</span> kết quả
                </p>
                <div className="flex space-x-1">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1 || isLoading}
                        className="h-8 w-8"
                    >
                        <ChevronLeft size={16} />
                    </Button>

                    {paginationRange.map((pageNum, i) =>
                        pageNum === '...' ? (
                            <span key={`ellipsis-${i}`} className="flex items-center justify-center h-8 w-8">
                                ...
                            </span>
                        ) : (
                            <Button
                                key={`page-${pageNum}`}
                                variant={page === pageNum ? "default" : "outline"}
                                size="icon"
                                onClick={() => handlePageChange(Number(pageNum))}
                                className="h-8 w-8"
                            >
                                {pageNum}
                            </Button>
                        )
                    )}

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= pagination.totalPages || isLoading}
                        className="h-8 w-8"
                    >
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Pagination;