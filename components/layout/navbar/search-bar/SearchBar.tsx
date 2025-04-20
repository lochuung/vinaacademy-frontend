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


    // Reset danh mục con khi thay đổi danh mục
    useEffect(() => {
        setSelectedSubCategories([]);
        setSelectedTopics([]);
    }, [selectedCategories]);

    // Reset chủ đề khi thay đổi danh mục con
    useEffect(() => {
        setSelectedTopics([]);
    }, [selectedSubCategories]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        // Xây dựng URL query params
        const params = new URLSearchParams();

        if (searchTerm) params.append("q", searchTerm);
        if (selectedCategories.length > 0) params.append("categories", selectedCategories.join(","));

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

        if (priceRange.min) params.append("minPrice", priceRange.min);
        if (priceRange.max) params.append("maxPrice", priceRange.max);
        if (level.length > 0) params.append("level", level.join(","));

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
                className="w-full px-4 py-2 border border-black bg-white text-black rounded-full focus:outline-none focus:ring-2 focus:ring-black pr-16"
            />
            <button
                type="submit"
                className="absolute right-3 text-black"
                aria-label="Tìm kiếm"
            >
                <FaSearch/>
            </button>
        </form>
    );
};

export default SearchBar;