"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { categoriesData } from "@/data/categories";
import { mockCourses } from "@/data/mockCourses";
import { Tag, Star, Users, Filter, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FaSearch } from "react-icons/fa";

// Định nghĩa kiểu cho các phần của bộ lọc
type SectionKey = 'categories' | 'price' | 'level' | 'rating';

// Định nghĩa kiểu cho các tham số cập nhật bộ lọc
type FilterUpdates = {
    [key: string]: string | null;
};

// Sử dụng cấu trúc từ dữ liệu thực tế
interface TrendingTopic {
    name: string;
    link: string;
    students: string;
}

interface SubCategory {
    name: string;
    link: string;
    trendingTopics: TrendingTopic[];
}

interface Category {
    name: string;
    link: string;
    subCategories: SubCategory[];
}

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Sử dụng useState với giá trị ban đầu là null, sau đó cập nhật trong useEffect
    // Giúp tránh sự không khớp khi hydration
    const [query, setQuery] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [subCategories, setSubCategories] = useState<string[]>([]);
    const [topics, setTopics] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [levels, setLevels] = useState<string[]>([]);

    // Khởi tạo state từ search params (chỉ phía client)
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

        // Tự động mở rộng các danh mục đã chọn
        if (categoriesParam) {
            setExpandedCategories(categoriesParam.split(","));
        }

        if (subCategoriesParam) {
            setExpandedSubCategories(subCategoriesParam.split(","));
        }
    }, [searchParams]);

    const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // State cho việc mở rộng các phần
    const [expandedSections, setExpandedSections] = useState<Record<SectionKey, boolean>>({
        categories: true,
        price: true,
        level: true,
        rating: true,
    });

    // State cho danh mục được mở rộng
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [expandedSubCategories, setExpandedSubCategories] = useState<string[]>([]);

    // State cho các chủ đề được chọn
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

    // State cho form input khoảng giá, tách biệt khỏi URL params
    const [priceInputs, setPriceInputs] = useState({
        min: "",
        max: ""
    });

    // Cập nhật price inputs khi URL params thay đổi
    useEffect(() => {
        setPriceInputs({
            min: minPrice,
            max: maxPrice
        });
    }, [minPrice, maxPrice]);

    // Danh sách các mức độ
    const levelOptions = ["Cơ bản", "Trung cấp", "Nâng cao"];

    // Danh sách các xếp hạng
    const ratingOptions = [
        { value: "4.5", label: "4.5 trở lên" },
        { value: "4.0", label: "4.0 trở lên" },
        { value: "3.5", label: "3.5 trở lên" },
        { value: "3.0", label: "3.0 trở lên" }
    ];

    // Khởi tạo courses là mảng rỗng để tránh không khớp hydration
    useEffect(() => {
        setFilteredCourses(mockCourses);
    }, []);

    // Lọc khóa học khi mount lần đầu và khi URL params thay đổi
    useEffect(() => {
        // Chỉ lọc sau khi render phía client lần đầu
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

        // Lọc theo danh mục
        if (categories.length > 0) {
            results = results.filter(course => categories.includes(course.category));
        }

        // Lọc theo danh mục con
        if (subCategories.length > 0) {
            // Giả sử subCategories chứa tên của danh mục con
            results = results.filter(course =>
                subCategories.some(sub => course.subCategory.includes(sub))
            );
        }

        // Lọc theo chủ đề
        if (topics.length > 0) {
            // Giả sử topics chứa tên của chủ đề
            results = results.filter(course =>
                topics.some(topic => course.topic === topic)
            );
        }

        // Lọc theo giá
        if (minPrice) {
            results = results.filter(course => parseInt(course.price) >= parseInt(minPrice) * 1000);
        }

        if (maxPrice) {
            results = results.filter(course => parseInt(course.price) <= parseInt(maxPrice) * 1000);
        }

        // Lọc theo cấp độ
        if (levels.length > 0) {
            results = results.filter(course => levels.includes(course.level));
        }

        setFilteredCourses(results);
    }, [query, categories, subCategories, topics, minPrice, maxPrice, levels]);

    // Chuyển đổi trạng thái mở rộng của phần
    const toggleSection = (section: SectionKey) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Chuyển đổi trạng thái hiển thị bộ lọc trên mobile
    const toggleMobileFilters = () => {
        setShowMobileFilters(!showMobileFilters);
    };

    // Áp dụng bộ lọc bằng cách cập nhật URL
    const applyFilters = (newFilters: FilterUpdates) => {
        const params = new URLSearchParams(searchParams.toString());

        // Cập nhật params dựa trên bộ lọc mới
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        router.push(`/courses/search?${params.toString()}`);
    };

    // Xử lý việc chuyển đổi danh mục chính
    const handleCategoryToggle = (categoryName: string) => {
        // Toggle trạng thái mở rộng của danh mục
        if (expandedCategories.includes(categoryName)) {
            setExpandedCategories(expandedCategories.filter(cat => cat !== categoryName));
        } else {
            setExpandedCategories([...expandedCategories, categoryName]);
        }

        // Cập nhật bộ lọc
        let newCategories;
        if (categories.includes(categoryName)) {
            newCategories = categories.filter(c => c !== categoryName);
        } else {
            newCategories = [...categories, categoryName];
        }

        applyFilters({
            categories: newCategories.length > 0 ? newCategories.join(',') : null
        });
    };

    // Xử lý việc chuyển đổi danh mục con
    const handleSubCategoryToggle = (subCategoryId: string) => {
        // Toggle trạng thái mở rộng của danh mục con
        if (expandedSubCategories.includes(subCategoryId)) {
            setExpandedSubCategories(expandedSubCategories.filter(id => id !== subCategoryId));
        } else {
            setExpandedSubCategories([...expandedSubCategories, subCategoryId]);
        }

        // Cập nhật bộ lọc
        let newSubCategories;
        if (subCategories.includes(subCategoryId)) {
            newSubCategories = subCategories.filter(id => id !== subCategoryId);
        } else {
            newSubCategories = [...subCategories, subCategoryId];
        }

        applyFilters({
            subCategories: newSubCategories.length > 0 ? newSubCategories.join(',') : null
        });
    };

    // Xử lý việc chuyển đổi chủ đề
    const handleTopicToggle = (topicName: string) => {
        let newTopics;
        if (topics.includes(topicName)) {
            newTopics = topics.filter(name => name !== topicName);
        } else {
            newTopics = [...topics, topicName];
        }

        // Cập nhật state ngay lập tức để UI phản hồi nhanh chóng
        setSelectedTopics(newTopics);

        applyFilters({
            topics: newTopics.length > 0 ? newTopics.join(',') : null
        });
    };

    // Xử lý việc chuyển đổi cấp độ
    const handleLevelToggle = (levelName: string) => {
        let newLevels;

        if (levels.includes(levelName)) {
            newLevels = levels.filter(l => l !== levelName);
        } else {
            newLevels = [...levels, levelName];
        }

        applyFilters({
            level: newLevels.length > 0 ? newLevels.join(',') : null
        });
    };

    // Áp dụng khoảng giá
    const applyPriceRange = () => {
        applyFilters({
            minPrice: priceInputs.min || null,
            maxPrice: priceInputs.max || null
        });
    };

    // Xóa tất cả bộ lọc
    const clearAllFilters = () => {
        router.push('/courses/search');
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6">Kết quả tìm kiếm</h1>

                {/* Hiển thị từ khóa tìm kiếm */}
                {query && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            {filteredCourses.length} kết quả cho "{query}"
                        </h2>
                    </div>
                )}

                {/* Main content với layout sidebar */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Mobile filter toggle */}
                    <div className="lg:hidden mb-4">
                        <Button
                            onClick={toggleMobileFilters}
                            variant="outline"
                            className="w-full flex items-center justify-between"
                        >
                            <span className="flex items-center">
                                <Filter size={16} className="mr-2" />
                                Bộ lọc
                            </span>
                            <ChevronDown size={16} />
                        </Button>
                    </div>

                    {/* Filter sidebar - ẩn trên mobile trừ khi được chuyển đổi */}
                    <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block lg:w-1/4`}>
                        <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24" style={{ position: "sticky", top: "24px" }}>
                            <div className="lg:hidden flex justify-between items-center mb-4">
                                <h3 className="font-bold">Bộ lọc</h3>
                                <Button variant="ghost" size="sm" onClick={toggleMobileFilters}>
                                    <X size={18} />
                                </Button>
                            </div>

                            {/* Bộ lọc danh mục phân cấp */}
                            <div className="mb-6 border-b pb-4">
                                <div
                                    className="flex justify-between items-center cursor-pointer mb-2"
                                    onClick={() => toggleSection('categories')}
                                >
                                    <h3 className="font-semibold">Danh mục</h3>
                                    {expandedSections.categories ?
                                        <ChevronUp size={16} /> :
                                        <ChevronDown size={16} />
                                    }
                                </div>

                                {expandedSections.categories && (
                                    <div className="space-y-2 mt-3 max-h-96 overflow-y-auto pr-1">
                                        {categoriesData.map((category) => (
                                            <div key={category.name} className="mb-2">
                                                {/* Danh mục chính */}
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        id={`category-${category.name}`}
                                                        checked={categories.includes(category.name)}
                                                        onCheckedChange={() => handleCategoryToggle(category.name)}
                                                    />
                                                    <div
                                                        className="flex items-center justify-between w-full ml-2 cursor-pointer"
                                                        onClick={() => handleCategoryToggle(category.name)}
                                                    >
                                                        <Label
                                                            htmlFor={`category-${category.name}`}
                                                            className="text-sm cursor-pointer font-medium"
                                                        >
                                                            {category.name}
                                                        </Label>
                                                        {expandedCategories.includes(category.name) ?
                                                            <ChevronUp size={14} /> :
                                                            <ChevronDown size={14} />
                                                        }
                                                    </div>
                                                </div>

                                                {/* Danh mục con */}
                                                {expandedCategories.includes(category.name) && (
                                                    <div className="ml-6 mt-1">
                                                        {category.subCategories.map(subCat => (
                                                            <div key={subCat.name} className="mt-2">
                                                                <div className="flex items-center">
                                                                    <Checkbox
                                                                        id={`subcat-${subCat.name}`}
                                                                        checked={subCategories.includes(subCat.name)}
                                                                        onCheckedChange={() => handleSubCategoryToggle(subCat.name)}
                                                                    />
                                                                    <div
                                                                        className="flex items-center justify-between w-full ml-2 cursor-pointer"
                                                                        onClick={() => handleSubCategoryToggle(subCat.name)}
                                                                    >
                                                                        <Label
                                                                            htmlFor={`subcat-${subCat.name}`}
                                                                            className="text-sm cursor-pointer"
                                                                        >
                                                                            {subCat.name}
                                                                        </Label>
                                                                        {expandedSubCategories.includes(subCat.name) ?
                                                                            <ChevronUp size={14} /> :
                                                                            <ChevronDown size={14} />
                                                                        }
                                                                    </div>
                                                                </div>

                                                                {/* Chủ đề thịnh hành */}
                                                                {expandedSubCategories.includes(subCat.name) && (
                                                                    <div className="ml-6 mt-1">
                                                                        {subCat.trendingTopics.map(topic => (
                                                                            <div key={topic.name} className="flex items-center mt-1">
                                                                                <Checkbox
                                                                                    id={`topic-${topic.name}`}
                                                                                    checked={selectedTopics.includes(topic.name)}
                                                                                    onCheckedChange={() => handleTopicToggle(topic.name)}
                                                                                />
                                                                                <div className="ml-2 flex items-center">
                                                                                    <Label
                                                                                        htmlFor={`topic-${topic.name}`}
                                                                                        className="text-sm cursor-pointer"
                                                                                        onClick={() => handleTopicToggle(topic.name)}
                                                                                    >
                                                                                        {topic.name}
                                                                                    </Label>
                                                                                    <span className="ml-2 text-xs text-gray-500">
                                                                                        {topic.students}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Bộ lọc khoảng giá */}
                            <div className="mb-6 border-b pb-4">
                                <div
                                    className="flex justify-between items-center cursor-pointer mb-2"
                                    onClick={() => toggleSection('price')}
                                >
                                    <h3 className="font-semibold">Mức giá</h3>
                                    {expandedSections.price ?
                                        <ChevronUp size={16} /> :
                                        <ChevronDown size={16} />
                                    }
                                </div>

                                {expandedSections.price && (
                                    <div className="space-y-3 mt-3">
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                placeholder="Từ"
                                                value={priceInputs.min}
                                                onChange={(e) => setPriceInputs({ ...priceInputs, min: e.target.value })}
                                                className="w-1/2 p-2 text-sm border border-gray-300 rounded bg-white text-gray-700"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Đến"
                                                value={priceInputs.max}
                                                onChange={(e) => setPriceInputs({ ...priceInputs, max: e.target.value })}
                                                className="w-1/2 p-2 text-sm border border-gray-300 rounded bg-white text-gray-700"
                                            />
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Nhập giá trị theo đơn vị nghìn đồng (VD: 100 = 100.000đ)
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full mt-2"
                                            onClick={applyPriceRange}
                                        >
                                            Áp dụng
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Bộ lọc cấp độ */}
                            <div className="mb-6 border-b pb-4">
                                <div
                                    className="flex justify-between items-center cursor-pointer mb-2"
                                    onClick={() => toggleSection('level')}
                                >
                                    <h3 className="font-semibold">Cấp độ</h3>
                                    {expandedSections.level ?
                                        <ChevronUp size={16} /> :
                                        <ChevronDown size={16} />
                                    }
                                </div>

                                {expandedSections.level && (
                                    <div className="space-y-2 mt-3">
                                        {levelOptions.map((levelItem) => (
                                            <div key={levelItem} className="flex items-center">
                                                <Checkbox
                                                    id={`level-${levelItem}`}
                                                    checked={levels.includes(levelItem)}
                                                    onCheckedChange={() => handleLevelToggle(levelItem)}
                                                />
                                                <Label
                                                    htmlFor={`level-${levelItem}`}
                                                    className="ml-2 text-sm cursor-pointer"
                                                    onClick={() => handleLevelToggle(levelItem)}
                                                >
                                                    {levelItem}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Bộ lọc đánh giá */}
                            <div className="mb-6">
                                <div
                                    className="flex justify-between items-center cursor-pointer mb-2"
                                    onClick={() => toggleSection('rating')}
                                >
                                    <h3 className="font-semibold">Đánh giá</h3>
                                    {expandedSections.rating ?
                                        <ChevronUp size={16} /> :
                                        <ChevronDown size={16} />
                                    }
                                </div>

                                {expandedSections.rating && (
                                    <div className="space-y-2 mt-3">
                                        {ratingOptions.map((option) => (
                                            <div key={option.value} className="flex items-center">
                                                <Checkbox
                                                    id={`rating-${option.value}`}
                                                />
                                                <Label htmlFor={`rating-${option.value}`} className="ml-2 text-sm flex items-center">
                                                    <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                                                    {option.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Nút xóa tất cả bộ lọc */}
                            {(categories.length > 0 || subCategories.length > 0 || topics.length > 0 || minPrice || maxPrice || levels.length > 0) && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full mb-4 text-blue-600 border-blue-600"
                                    onClick={clearAllFilters}
                                >
                                    <X size={16} className="mr-1" />
                                    Xóa tất cả bộ lọc
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Kết quả khóa học */}
                    <div className="lg:w-3/4">
                        {/* Sắp xếp và số lượng kết quả */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-gray-600 mb-2 sm:mb-0">{filteredCourses.length} khóa học được tìm thấy</p>
                            <div className="flex items-center">
                                <span className="text-sm mr-2 text-gray-600">Sắp xếp theo:</span>
                                <select className="bg-white border border-gray-300 rounded p-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Phổ biến nhất</option>
                                    <option>Đánh giá cao nhất</option>
                                    <option>Mới nhất</option>
                                    <option>Giá: Thấp đến cao</option>
                                    <option>Giá: Cao đến thấp</option>
                                </select>
                            </div>
                        </div>

                        {/* Thẻ khóa học */}
                        {filteredCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredCourses.map(course => (
                                    <Link href={`/courses/${course.id}`} key={course.id}>
                                        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                            <div className="flex flex-col md:flex-row">
                                                <div className="relative h-48 md:h-auto md:w-2/5">
                                                    <Image
                                                        src={course.image}
                                                        alt={course.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    {course.discount > 0 && (
                                                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                            -{course.discount}%
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-4 md:w-3/5">
                                                    <h3 className="text-lg font-semibold mb-1 line-clamp-2">{course.title}</h3>
                                                    <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
                                                    <div className="flex items-center gap-1 mb-2">
                                                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                                        <span className="text-sm font-medium">{course.rating}</span>
                                                        <span className="text-xs text-gray-500 ml-1">({course.students})</span>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                            {course.category}
                                                        </span>
                                                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                                                            {course.level}
                                                        </span>
                                                    </div>
                                                    <div className="mt-auto">
                                                        <span className="font-bold text-lg">{parseInt(course.price).toLocaleString()}đ</span>
                                                        {course.originalPrice && (
                                                            <span className="text-sm text-gray-500 line-through ml-2">
                                                                {parseInt(course.originalPrice).toLocaleString()}đ
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-8 rounded-lg text-center">
                                <p className="text-xl text-gray-600 mb-4">Không tìm thấy khóa học phù hợp</p>
                                <p className="text-gray-500 mb-6">Vui lòng thử từ khóa khác hoặc điều chỉnh bộ lọc</p>
                                <Button onClick={() => window.history.back()} variant="outline">
                                    Quay lại
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}