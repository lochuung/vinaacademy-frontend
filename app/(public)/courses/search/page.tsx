"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { mockCourses } from "@/data/mockCourses";
import SearchResults from "@/components/courses/search-course/search/SearchResults";
import FilterSidebar from "@/components/courses/search-course/filters/FilterSidebar";
import MobileFilterToggle from "@/components/courses/search-course/filters/MobileFilterToggle";
import NoResultsFound from "@/components/courses/search-course/ui/NoResultsFound";
import SearchHeader from "@/components/courses/search-course/search/SearchHeader";
// Types
export type FilterUpdates = {
    [key: string]: string | null;
};

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State for search and filter params
    const [query, setQuery] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [subCategories, setSubCategories] = useState<string[]>([]);
    const [topics, setTopics] = useState<string[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [levels, setLevels] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    // UI state
    const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Initialize state from URL params
    useEffect(() => {
        setQuery(searchParams.get("q") || "");

        const categoriesParam = searchParams.get("categories") || "";
        setCategories(categoriesParam ? categoriesParam.split(",") : []);

        const subCategoriesParam = searchParams.get("subCategories") || "";
        setSubCategories(subCategoriesParam ? subCategoriesParam.split(",") : []);

        const topicsParam = searchParams.get("topics") || "";
        setTopics(topicsParam ? topicsParam.split(",") : []);
        setSelectedTopics(topicsParam ? topicsParam.split(",") : []);

        setMinPrice(searchParams.get("minPrice") || "");
        setMaxPrice(searchParams.get("maxPrice") || "");

        const levelsParam = searchParams.get("level") || "";
        setLevels(levelsParam ? levelsParam.split(",") : []);

        const pageParam = searchParams.get("page") || "1";
        setCurrentPage(parseInt(pageParam));
    }, [searchParams]);

    // Initialize courses data
    useEffect(() => {
        setFilteredCourses(mockCourses);
    }, []);

    // Filter courses when params change
    useEffect(() => {
        if (categories.length === 0 && subCategories.length === 0 && topics.length === 0 &&
            !query && !minPrice && !maxPrice && levels.length === 0) {
            return;
        }

        let results = [...mockCourses];

        if (query) {
            const searchQuery = query.toLowerCase();
            results = results.filter(course =>
                course.title.toLowerCase().includes(searchQuery) ||
                course.instructor.toLowerCase().includes(searchQuery) ||
                course.description.toLowerCase().includes(searchQuery)
            );
        }

        // Filter by category
        if (categories.length > 0) {
            results = results.filter(course => categories.includes(course.category));
        }

        // Filter by subcategory
        if (subCategories.length > 0) {
            results = results.filter(course =>
                subCategories.some(sub => course.subCategory.includes(sub))
            );
        }

        // Filter by topic
        if (topics.length > 0) {
            results = results.filter(course =>
                topics.some(topic => course.topic === topic)
            );
        }

        // Filter by price range
        if (minPrice) {
            results = results.filter(course => parseInt(course.price) >= parseInt(minPrice) * 1000);
        }

        if (maxPrice) {
            results = results.filter(course => parseInt(course.price) <= parseInt(maxPrice) * 1000);
        }

        // Filter by level
        if (levels.length > 0) {
            results = results.filter(course => levels.includes(course.level));
        }

        setFilteredCourses(results);

        // Reset to page 1 when filters change (except when page param itself changes)
        if (!searchParams.toString().includes("page=")) {
            setCurrentPage(1);
        }
    }, [query, categories, subCategories, topics, minPrice, maxPrice, levels, searchParams]);

    // Toggle mobile filters visibility
    const toggleMobileFilters = () => {
        setShowMobileFilters(!showMobileFilters);
    };

    // Apply filters by updating URL params
    const applyFilters = (newFilters: FilterUpdates) => {
        const params = new URLSearchParams(searchParams.toString());

        // Update params based on new filters
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        // Reset to page 1 when applying new filters
        params.set("page", "1");

        router.push(`/courses/search?${params.toString()}`);
    };

    // Clear all filters
    const clearAllFilters = () => {
        router.push('/courses/search?page=1');
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6">Kết quả tìm kiếm</h1>

                {/* Search header with query and result count */}
                {query && (
                    <SearchHeader query={query} resultCount={filteredCourses.length} />
                )}

                {/* Main content with sidebar layout */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Mobile filter toggle */}
                    <MobileFilterToggle
                        toggleMobileFilters={toggleMobileFilters}
                    />

                    {/* Filter sidebar */}
                    <FilterSidebar
                        showMobileFilters={showMobileFilters}
                        toggleMobileFilters={toggleMobileFilters}
                        categories={categories}
                        subCategories={subCategories}
                        topics={topics}
                        selectedTopics={selectedTopics}
                        setSelectedTopics={setSelectedTopics}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        levels={levels}
                        applyFilters={applyFilters}
                        clearAllFilters={clearAllFilters}
                    />

                    {/* Course results */}
                    <div className="lg:w-3/4">
                        {filteredCourses.length > 0 ? (
                            <SearchResults
                                courses={filteredCourses}
                            />
                        ) : (
                            <NoResultsFound />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}