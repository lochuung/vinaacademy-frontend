"use client";

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {categoriesData} from "@/data/categories";
import {mockCourses} from "@/data/mockCourses";

// Import components
import {LoadingState} from "@/components/categories/ui/LoadingState";
import {NotFoundState} from "@/components/categories/ui/NotFoundState";
import {CategoryNavigation} from "@/components/categories/category/CategoryNavigation";
import {CategoryHeader} from "@/components/categories/category/CategoryHeader";
import {FilterSidebar} from "@/components/categories/category/FilterSidebar";
import {SortingControls} from "@/components/categories/category/SortingControls";
import {TrendingTopics} from "@/components/categories/category/TrendingTopics";
import {CourseTabs} from "@/components/categories/ui/CourseTabs";
import {CourseGrid} from "@/components/categories/ui/CourseGrid";

export default function CategoryPage() {
    const router = useRouter();
    const params = useParams();
    const category = params.category as string;
    const subcategory = params.subcategory as string | undefined;
    const topic = params.topic as string | undefined;

    const [categoryInfo, setCategoryInfo] = useState<{
        category?: string;
        categoryLink?: string;
        subCategory?: string;
        subCategoryLink?: string;
        topic?: string;
        topicLink?: string;
    }>({
        category: undefined,
        categoryLink: undefined,
        subCategory: undefined,
        subCategoryLink: undefined,
        topic: undefined,
        topicLink: undefined
    });

    const [courses, setCourses] = useState<any[]>([]);
    const [sortBy, setSortBy] = useState("popular");
    const [selectedLevel, setSelectedLevel] = useState<string | undefined>(undefined);
    const [priceRange, setPriceRange] = useState<string | undefined>(undefined);
    const [categoryData, setCategoryData] = useState<any>(undefined);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [matchingCount, setMatchingCount] = useState(0);
    const [subCategories, setSubCategories] = useState<{ name: string, link: string }[]>([]);
    const [trendingTopics, setTrendingTopics] = useState<{ name: string, link: string, students: string }[]>([]);
    const [activeTab, setActiveTab] = useState("popular");

    // Parse the URL path to determine category
    useEffect(() => {
        if (category) {
            // Find category info from categoriesData based on current slug
            const foundCategory = categoriesData.find(cat => {
                const categoryPathParts = cat.link.split('/');
                const categorySlug = categoryPathParts[categoryPathParts.length - 1];
                return categorySlug === category;
            });

            if (foundCategory) {
                setCategoryData(foundCategory);

                // Find courses that belong to this category
                const matchingCourses = mockCourses.filter(course => {
                    const courseCategory = categoriesData.find(cat => cat.link === course.categoryLink);
                    return courseCategory && courseCategory.link === foundCategory.link;
                });

                setMatchingCount(matchingCourses.length);

                if (matchingCourses.length > 0) {
                    // Set category information
                    setCategoryInfo({
                        category: foundCategory.name,
                        categoryLink: foundCategory.link,
                        subCategory: undefined,
                        subCategoryLink: undefined,
                        topic: undefined,
                        topicLink: undefined
                    });

                    // Create subcategory list
                    if (foundCategory.subCategories) {
                        setSubCategories(foundCategory.subCategories.map(subCat => ({
                            name: subCat.name,
                            link: subCat.link
                        })));

                        // Check if a subcategory is selected
                        if (subcategory) {
                            // Find subcategory info
                            const foundSubCategory = foundCategory.subCategories.find(sub => {
                                const subPathParts = sub.link.split('/');
                                const subSlug = subPathParts[subPathParts.length - 1];
                                return subSlug === subcategory;
                            });

                            if (foundSubCategory) {
                                // Update selected subcategory info
                                setCategoryInfo(prev => ({
                                    ...prev,
                                    subCategory: foundSubCategory.name,
                                    subCategoryLink: foundSubCategory.link
                                }));

                                // Only show topics from this subcategory
                                if (foundSubCategory.trendingTopics && foundSubCategory.trendingTopics.length > 0) {
                                    setTrendingTopics(foundSubCategory.trendingTopics.map(topic => ({
                                        name: topic.name,
                                        link: topic.link,
                                        students: topic.students
                                    })));
                                } else {
                                    setTrendingTopics([]);
                                }
                            } else {
                                setTrendingTopics([]);
                            }
                        } else {
                            // If no subcategory is selected, show all topics from all subcategories
                            // Get all trending topics from all subcategories
                            const allTopics: { name: string, link: string, students: string }[] = [];

                            // Loop through each subcategory
                            foundCategory.subCategories.forEach(subCat => {
                                if (subCat.trendingTopics && subCat.trendingTopics.length > 0) {
                                    // Add topics from this subcategory to the array
                                    subCat.trendingTopics.forEach(topic => {
                                        allTopics.push({
                                            name: topic.name,
                                            link: topic.link,
                                            students: topic.students
                                        });
                                    });
                                }
                            });

                            // Update state with all topics from all subcategories
                            setTrendingTopics(allTopics);
                        }
                    }
                }
            }
        }
    }, [category, subcategory]);

    // Filter courses when category info or filters change
    useEffect(() => {
        if (!categoryInfo.category) return;

        // Filter courses by category and subcategory if available
        let filtered = mockCourses.filter((course) => {
            // If a subcategory is selected
            if (categoryInfo.subCategory && categoryInfo.subCategoryLink) {
                return course.categoryLink === categoryInfo.categoryLink &&
                    course.subCategoryLink === categoryInfo.subCategoryLink;
            }
            // If only main category
            return course.categoryLink === categoryInfo.categoryLink;
        });

        // Filter by level
        if (selectedLevel) {
            filtered = filtered.filter((course) => course.level === selectedLevel);
        }

        // Filter by price
        if (priceRange) {
            switch (priceRange) {
                case "free":
                    filtered = filtered.filter((course) => parseInt(course.price) === 0);
                    break;
                case "low":
                    filtered = filtered.filter((course) =>
                        parseInt(course.price) > 0 && parseInt(course.price) <= 500000
                    );
                    break;
                case "medium":
                    filtered = filtered.filter((course) =>
                        parseInt(course.price) > 500000 && parseInt(course.price) <= 1000000
                    );
                    break;
                case "high":
                    filtered = filtered.filter((course) => parseInt(course.price) > 1000000);
                    break;
            }
        }

        // Sort courses
        switch (sortBy) {
            case "popular":
                filtered.sort((a, b) => b.students - a.students);
                break;
            case "rating":
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case "newest":
                filtered.sort((a, b) => b.id - a.id);
                break;
            case "price-low":
                filtered.sort((a, b) => parseInt(a.price) - parseInt(b.price));
                break;
            case "price-high":
                filtered.sort((a, b) => parseInt(b.price) - parseInt(a.price));
                break;
        }

        setCourses(filtered);
    }, [categoryInfo, sortBy, selectedLevel, priceRange]);

    // Handle error when category not found
    if (matchingCount === 0) {
        return <NotFoundState/>;
    }

    if (!categoryInfo.category) {
        return <LoadingState/>;
    }

    // Reset all filters
    const resetFilters = () => {
        setSelectedLevel(undefined);
        setPriceRange(undefined);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation tabs */}
            <CategoryNavigation
                categoryData={categoryData}
                categoryInfo={categoryInfo}
            />

            <div className="container mx-auto px-4 py-8">
                {/* Title section */}
                <CategoryHeader
                    category={categoryInfo.category}
                    subCategory={categoryInfo.subCategory}
                />

                {/* Course Grid with Sidebar - New Layout */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filter Panel */}
                    <FilterSidebar
                        selectedLevel={selectedLevel}
                        setSelectedLevel={setSelectedLevel}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        subCategories={subCategories}
                        categoryInfo={categoryInfo}
                        router={router}
                    />

                    {/* Main Content Area */}
                    <div className="flex-grow">
                        {/* Sort dropdown and applied filters */}
                        <SortingControls
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            selectedLevel={selectedLevel}
                            setSelectedLevel={setSelectedLevel}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                        />

                        {/* Trending Topics Grid */}
                        <TrendingTopics
                            topics={trendingTopics}
                            category={category}
                            subcategory={subcategory}
                            categoryData={categoryData}
                        />

                        {/* Course Tabs */}
                        <CourseTabs
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />

                        {/* Course Grid */}
                        <CourseGrid
                            courses={courses}
                            resetFilters={resetFilters}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}