"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {FaSearch} from "react-icons/fa";
import {categoriesData} from "@/data/categories";
import {useCategories} from "@/context/CategoryContext";

const SearchBar = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({min: "", max: ""});
    const [level, setLevel] = useState<string[]>([]);

    // Use shared categories context instead of fetching directly
    const {categories, isLoading} = useCategories();

    const levels = ["Cơ bản", "Trung cấp", "Nâng cao"];

    // Lấy danh sách danh mục con dựa trên danh mục đã chọn
    const getSubCategories = () => {
        if (selectedCategories.length === 0) return [];

        // If using API data
        if (categories.length > 0) {
            let allSubCategories: any[] = [];

            selectedCategories.forEach(catSlug => {
                const category = categories.find(cat => cat.slug === catSlug);
                if (category && category.subCategories) {
                    allSubCategories = [...allSubCategories, ...category.subCategories];
                }
            });

            return allSubCategories;
        }

        // Fallback to mock data
        let allSubCategories: { name: string; link: string; trendingTopics: any[] }[] = [];

        selectedCategories.forEach(catName => {
            const category = categoriesData.find(cat => cat.name === catName);
            if (category) {
                allSubCategories = [...allSubCategories, ...category.subCategories];
            }
        });

        return allSubCategories;
    };

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