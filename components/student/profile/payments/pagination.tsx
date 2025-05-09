"use client";

import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface OrderPaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

export default function OrderPagination({
  totalPages,
  currentPage,
  handlePageChange,
}: OrderPaginationProps) {
  // Generate array of page numbers to display
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      // If 7 or fewer pages, show all
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Show first page, last page, current page, and pages around current
      const pages = [1];

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      // Add ellipsis before middle pages if needed
      if (startPage > 2) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis after middle pages if needed
      if (endPage < totalPages - 1) {
        pages.push(-2); // -2 represents ellipsis (using different key)
      }

      // Add last page
      pages.push(totalPages);

      return pages;
    }
  }, [totalPages, currentPage]);

  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-0">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
            className={`${
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "hover:bg-gray-100"
            }`}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {pageNumbers.map((pageNum, idx) => {
          // If pageNum is negative, it's an ellipsis
          if (pageNum < 0) {
            return (
              <PaginationItem key={`ellipsis-${pageNum}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          // Regular page number
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (pageNum === currentPage) return;
                  handlePageChange(pageNum);
                }}
                isActive={pageNum === currentPage}
                className={
                  pageNum === currentPage
                    ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 hover:text-indigo-800"
                    : "hover:bg-gray-100"
                }
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) handlePageChange(currentPage + 1);
            }}
            className={`${
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "hover:bg-gray-100"
            }`}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
