"use client";

import {useEffect, useState} from "react";
import {mockCourses} from "@/data/mockCourses";
import {categoriesData} from "@/data/categories";

// Import components
import {HeroSection} from "@/components/courses/all-courses/HeroSection";
import {SortingControl} from "@/components/courses/all-courses/SortingControl";
import {MobileFilterDrawer} from "@/components/courses/all-courses/MobileFilterDrawer";
import {CoursesGrid} from "@/components/courses/all-courses/CoursesGrid";
import { useDebounce } from "use-debounce";


export default function AllCoursesPage() {
    // State cho các khóa học và bộ lọc
    const [courses, setCourses] = useState(mockCourses);
    const [filteredCourses, setFilteredCourses] = useState(mockCourses);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchQueryDebounce, setSearchQueryDebounce] = useDebounce(searchQuery, 600);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [sortBy, setSortBy] = useState("popular");
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 12;

    // Lấy danh sách các danh mục
    const categories = categoriesData.map(cat => ({
        value: cat.name,
        label: cat.name
    }));

    // Lấy danh sách các cấp độ khóa học
    const levels = ["Cơ bản", "Trung cấp", "Nâng cao"];

    // Thực hiện lọc khóa học
    useEffect(() => {
        let result = [...mockCourses];

        // Lọc theo từ khóa tìm kiếm
        if (searchQueryDebounce) {
            result = result.filter(
                course =>
                    course.title.toLowerCase().includes(searchQueryDebounce.toLowerCase()) ||
                    course.instructor.toLowerCase().includes(searchQueryDebounce.toLowerCase())
            );
        }

        // Lọc theo danh mục
        if (selectedCategory) {
            result = result.filter(course => course.category === selectedCategory);
        }

        // Lọc theo cấp độ
        if (selectedLevel) {
            result = result.filter(course => course.level === selectedLevel);
        }

        // Lọc theo khoảng giá
        if (priceRange) {
            switch (priceRange) {
                case "free":
                    result = result.filter(course => parseInt(course.price) === 0);
                    break;
                case "under_500k":
                    result = result.filter(
                        course => parseInt(course.price) > 0 && parseInt(course.price) < 500000
                    );
                    break;
                case "500k_1m":
                    result = result.filter(
                        course => parseInt(course.price) >= 500000 && parseInt(course.price) <= 1000000
                    );
                    break;
                case "over_1m":
                    result = result.filter(course => parseInt(course.price) > 1000000);
                    break;
            }
        }

        // Sắp xếp khóa học
        switch (sortBy) {
            case "popular":
                result.sort((a, b) => b.students - a.students);
                break;
            case "newest":
                result.sort((a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime());
                break;
            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;
            case "price_low":
                result.sort((a, b) => parseInt(a.price) - parseInt(b.price));
                break;
            case "price_high":
                result.sort((a, b) => parseInt(b.price) - parseInt(a.price));
                break;
        }

        setFilteredCourses(result);
        setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi bộ lọc
    }, [searchQueryDebounce, selectedCategory, selectedLevel, priceRange, sortBy]);

    // Tính toán số trang và các khóa học hiện tại
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    const currentCourses = filteredCourses.slice(
        (currentPage - 1) * coursesPerPage,
        currentPage * coursesPerPage
    );

    // Xử lý chuyển trang
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    // Xử lý xóa tất cả bộ lọc
    const clearAllFilters = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setSelectedLevel("");
        setPriceRange("");
        setSortBy("popular");
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero section với thanh tìm kiếm */}
            <HeroSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            {/* Main content */}
            <div className="container mx-auto px-4 py-12">
                {/* Sorting controls */}
                <SortingControl
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    totalCourses={filteredCourses.length}
                />

                {/* Mobile filter button */}
                <div className="md:hidden mb-4">
                    <MobileFilterDrawer
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedLevel={selectedLevel}
                        setSelectedLevel={setSelectedLevel}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        clearAllFilters={clearAllFilters}
                        levels={levels}
                    />
                </div>

                {/* Layout chính khóa học */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Danh sách khóa học */}
                    <div className="flex-grow">
                        <CoursesGrid
                            courses={currentCourses}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            clearAllFilters={clearAllFilters}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}