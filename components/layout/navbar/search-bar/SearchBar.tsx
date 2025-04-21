"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {FaSearch} from "react-icons/fa";

const SearchBar = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({min: "", max: ""});
    const [level, setLevel] = useState<string[]>([]);
  
    const [inputError, setInputError] = useState("");

    // Reset danh mục con khi thay đổi danh mục
    useEffect(() => {
        setSelectedSubCategories([]);
        setSelectedTopics([]);
    }, [selectedCategories]);

    // Reset chủ đề khi thay đổi danh mục con
    useEffect(() => {
        setSelectedTopics([]);
    }, [selectedSubCategories]);

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

        if (searchTerm.trim().length < 2) {
            setInputError("Từ khóa tìm kiếm phải có ít nhất 2 ký tự");
            return;
        }

        // Xây dựng URL query params
        const params = new URLSearchParams();

        params.append("q", searchTerm.trim());
        
        if (selectedCategories.length > 0) {
            params.append("categories", selectedCategories.join(","));
        }

        if (selectedSubCategories.length === 1) {
            params.append("subCategory", selectedSubCategories[0]);
        } else if (selectedSubCategories.length > 1) {
            params.append("subCategories", selectedSubCategories.join(","));
        }

        if (selectedTopics.length === 1) {
            params.append("topic", selectedTopics[0]);
        } else if (selectedTopics.length > 1) {
            params.append("topics", selectedTopics.join(","));
        }

        if (priceRange.min) {
            params.append("minPrice", priceRange.min);
        }
        if (priceRange.max) {
            params.append("maxPrice", priceRange.max);
        }
        if (level.length > 0) {
            params.append("level", level.join(","));
        }

        // Add default page parameter
        params.append("page", "1");

        // Redirect to the new courses search URL structure
        router.push(`/courses/search?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="relative flex items-center w-1/3">
            <input
                type="text"
                value={searchTerm}
                required
                minLength={3}
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