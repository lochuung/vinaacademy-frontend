"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {FaSearch} from "react-icons/fa";

const SearchBar = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [inputError, setInputError] = useState("");

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
        window.location.href = `/courses/search?${params.toString()}`;
    };

    return (
        <form onSubmit={handleSearch} className="relative flex items-center w-1/3">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm bất cứ thứ gì..."
                className={`w-full px-4 py-2 border ${inputError ? 'border-red-500' : 'border-black'} bg-white text-black rounded-full focus:outline-none focus:ring-2 focus:ring-black pr-16`}
                aria-invalid={!!inputError}
                aria-describedby={inputError ? "search-error" : undefined}
            />
            <button
                type="submit"
                className="absolute right-3 text-black"
                aria-label="Tìm kiếm"
            >
                <FaSearch/>
            </button>
            {inputError && (
                <p id="search-error" className="absolute -bottom-6 left-0 text-xs text-white bg-red-500 p-1 rounded">
                    {inputError}
                </p>
            )}
        </form>
    );
};

export default SearchBar;