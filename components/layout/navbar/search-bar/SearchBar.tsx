"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const SearchBar = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [inputError, setInputError] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    // Clear error when search term changes
    useEffect(() => {
        if (searchTerm) {
            setInputError("");
        }
    }, [searchTerm]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate searchTerm
        if (!searchTerm.trim()) {
            setInputError("Vui lòng nhập từ khóa tìm kiếm");
            return;
        }

        if (searchTerm.trim().length < 3) {
            setInputError("Từ khóa tìm kiếm phải có ít nhất 3 ký tự");
            return;
        }

        // Xây dựng URL query params
        const params = new URLSearchParams();
        // Add default page parameter
        params.append("page", "1");

        // Add search term parameter
        params.append("q", searchTerm.trim());

        // Redirect to the new courses search URL structure
        router.push(`/courses/search?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full">
            <div className={`flex items-center relative transition-all duration-200 ${isFocused ? 'ring-2 ring-black' : ''}`}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm kiếm khóa học, giảng viên..."
                    className={`w-full px-4 py-2 pr-12 border ${inputError ? 'border-red-500' : 'border-gray-300'} 
                        bg-white text-black rounded-full focus:outline-none focus:border-black transition-all duration-200
                        placeholder:text-gray-400 text-sm md:text-base`}
                    aria-invalid={!!inputError}
                    aria-describedby={inputError ? "search-error" : undefined}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <button
                    type="submit"
                    className="absolute right-3 p-1 text-gray-500 hover:text-black transition-colors duration-200"
                    aria-label="Tìm kiếm"
                >
                    <Search className="w-5 h-5" />
                </button>
            </div>
            {inputError && (
                <div className="absolute mt-1 inset-x-0">
                    <p id="search-error" className="text-xs text-white bg-red-500 px-3 py-1 rounded-md shadow-sm">
                        {inputError}
                    </p>
                </div>
            )}
        </form>
    );
};

export default SearchBar;