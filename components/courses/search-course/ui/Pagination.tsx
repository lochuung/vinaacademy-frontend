"use client";

import React from "react";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({currentPage, totalPages, onPageChange}: PaginationProps) => {
    // No need for pagination if only one page
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const maxDisplayPages = 5; // Show maximum 5 page buttons at once

        // Calculate start and end pages to display
        let startPage = Math.max(1, currentPage - Math.floor(maxDisplayPages / 2));
        let endPage = startPage + maxDisplayPages - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxDisplayPages + 1);
        }

        // First page and ellipsis if needed
        if (startPage > 1) {
            pages.push(
                <button
                    key="1"
                    onClick={() => onPageChange(1)}
                    className="px-3 py-1 rounded-md hover:bg-gray-200 text-sm"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(
                    <span key="ellipsis1" className="px-2">
            ...
          </span>
                );
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-3 py-1 rounded-md text-sm ${
                        i === currentPage
                            ? "bg-black text-white font-semibold"
                            : "hover:bg-gray-200"
                    }`}
                >
                    {i}
                </button>
            );
        }

        // Last page and ellipsis if needed
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <span key="ellipsis2" className="px-2">
            ...
          </span>
                );
            }
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className="px-3 py-1 rounded-md hover:bg-gray-200 text-sm"
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="flex justify-center items-center space-x-1">
            {/* Previous button */}
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`flex items-center justify-center p-2 rounded-md ${
                    currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-100"
                }`}
                aria-label="Previous page"
            >
                <FaChevronLeft className="w-4 h-4"/>
            </button>

            {/* Page numbers */}
            <div className="flex items-center">{renderPageNumbers()}</div>

            {/* Next button */}
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center p-2 rounded-md ${
                    currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-100"
                }`}
                aria-label="Next page"
            >
                <FaChevronRight className="w-4 h-4"/>
            </button>
        </div>
    );
};

export default Pagination;