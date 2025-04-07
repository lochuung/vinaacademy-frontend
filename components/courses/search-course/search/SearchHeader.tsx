// SearchHeader.tsx
"use client";

interface SearchHeaderProps {
    query: string;
    resultCount: number;
}

export default function SearchHeader({query, resultCount}: SearchHeaderProps) {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
                {resultCount} kết quả cho "{query}"
            </h2>
        </div>
    );
}