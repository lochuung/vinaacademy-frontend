import { useState } from "react";

interface UsePaginationProps {
    initialPage?: number;
    initialTotalPages?: number;
}

export function usePagination({ 
    initialPage = 0, 
    initialTotalPages = 1
}: UsePaginationProps = {}) {
    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [totalPages, setTotalPages] = useState<number>(initialTotalPages);
    
    // Go to previous page if available
    const goToPreviousPage = () => {
        setCurrentPage(prev => Math.max(0, prev - 1));
    };
    
    // Go to next page if available
    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    };
    
    // Go to a specific page
    const goToPage = (page: number) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };
    
    return {
        currentPage,
        totalPages,
        setCurrentPage,
        setTotalPages,
        goToPreviousPage,
        goToNextPage,
        goToPage,
        hasPreviousPage: currentPage > 0,
        hasNextPage: currentPage < totalPages - 1
    };
}