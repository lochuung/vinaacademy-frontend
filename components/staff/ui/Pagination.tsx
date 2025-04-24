import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationExampleProps = {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
};

export default function PaginationLayout({
  totalPages,
  currentPage,
  handlePageChange,
}: PaginationExampleProps) {
  // Function to generate array of page numbers to display
  const getPageNumbers = (): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];

    // Always add first page
    pageNumbers.push(1);

    // Add ellipsis after first page if needed
    if (currentPage > 3) {
      pageNumbers.push("ellipsis-1");
    }

    // Add page before current if it exists and isn't the first page
    if (currentPage > 2) {
      pageNumbers.push(currentPage - 1);
    }

    // Add current page if it's not the first or last page
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageNumbers.push(currentPage);
    }

    // Add page after current if it exists and isn't the last page
    if (currentPage < totalPages - 1) {
      pageNumbers.push(currentPage + 1);
    }

    // Add ellipsis before last page if needed
    if (currentPage < totalPages - 2) {
      pageNumbers.push("ellipsis-2");
    }

    // Always add last page if it's not the first page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {getPageNumbers().map((page: number | string, index: number) => {
          if (typeof page === "string" && page.includes("ellipsis")) {
            return (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage == page}
                onClick={() => {
                  if (currentPage !== page) {
                    handlePageChange(page as number);
                  }
                }}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
