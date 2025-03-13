"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Check } from 'lucide-react';

export default function Filters() {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
    const [dateRange, setDateRange] = useState<string>('all');

    // Mock data
    const categories = [
        { id: 'web-dev', name: 'Web Development' },
        { id: 'mobile-dev', name: 'Mobile Development' },
        { id: 'data-science', name: 'Data Science' },
        { id: 'design', name: 'Design' },
        { id: 'marketing', name: 'Marketing' },
        { id: 'business', name: 'Business' },
        { id: 'it-software', name: 'IT & Software' },
        { id: 'personal-dev', name: 'Personal Development' },
    ];

    const ratings = [5, 4, 3, 2, 1];

    const dateRanges = [
        { id: 'all', name: 'Tất cả thời gian' },
        { id: 'today', name: 'Hôm nay' },
        { id: 'last-week', name: '7 ngày qua' },
        { id: 'last-month', name: '30 ngày qua' },
        { id: 'last-3-months', name: '3 tháng qua' },
        { id: 'last-year', name: '1 năm qua' },
    ];

    // Toggle category selection
    const toggleCategory = (categoryId: string) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    // Toggle rating selection
    const toggleRating = (rating: number) => {
        if (selectedRatings.includes(rating)) {
            setSelectedRatings(selectedRatings.filter(r => r !== rating));
        } else {
            setSelectedRatings([...selectedRatings, rating]);
        }
    };

    // Handle price range change
    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setPriceRange([value, priceRange[1]]);
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setPriceRange([priceRange[0], value]);
    };

    // Format price to VND
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(price);
    };

    // Reset all filters
    const resetFilters = () => {
        setPriceRange([0, 1000000]);
        setSelectedCategories([]);
        setSelectedRatings([]);
        setDateRange('all');
    };

    // Apply filters
    const applyFilters = () => {
        // This would pass the filter state to the parent component
        console.log('Applying filters:', {
            priceRange,
            selectedCategories,
            selectedRatings,
            dateRange
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Price Range */}
            <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Khoảng giá</h3>
                <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label htmlFor="min-price" className="block text-xs text-gray-500">
                                Từ
                            </label>
                            <input
                                type="number"
                                id="min-price"
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                placeholder="0"
                                value={priceRange[0]}
                                onChange={handleMinPriceChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="max-price" className="block text-xs text-gray-500">
                                Đến
                            </label>
                            <input
                                type="number"
                                id="max-price"
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                placeholder="1.000.000"
                                value={priceRange[1]}
                                onChange={handleMaxPriceChange}
                            />
                        </div>
                    </div>
                    <div className="text-xs text-gray-500">
                        {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Danh mục</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                    {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                            <input
                                id={`category-${category.id}`}
                                name={`category-${category.id}`}
                                type="checkbox"
                                className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                                checked={selectedCategories.includes(category.id)}
                                onChange={() => toggleCategory(category.id)}
                            />
                            <label
                                htmlFor={`category-${category.id}`}
                                className="ml-2 text-sm text-gray-700"
                            >
                                {category.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ratings */}
            <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Đánh giá</h3>
                <div className="space-y-2">
                    {ratings.map((rating) => (
                        <div key={rating} className="flex items-center">
                            <input
                                id={`rating-${rating}`}
                                name={`rating-${rating}`}
                                type="checkbox"
                                className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                                checked={selectedRatings.includes(rating)}
                                onChange={() => toggleRating(rating)}
                            />
                            <label
                                htmlFor={`rating-${rating}`}
                                className="ml-2 text-sm text-gray-700 flex items-center"
                            >
                                {[...Array(rating)].map((_, i) => (
                                    <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                {[...Array(5 - rating)].map((_, i) => (
                                    <svg key={i} className="h-4 w-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="ml-1">& trở lên</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Date Range */}
            <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Thời gian cập nhật</h3>
                <div className="space-y-2">
                    {dateRanges.map((range) => (
                        <div key={range.id} className="flex items-center">
                            <input
                                id={`date-${range.id}`}
                                name="date-range"
                                type="radio"
                                className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                                checked={dateRange === range.id}
                                onChange={() => setDateRange(range.id)}
                            />
                            <label
                                htmlFor={`date-${range.id}`}
                                className="ml-2 text-sm text-gray-700"
                            >
                                {range.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action buttons */}
            <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={resetFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Đặt lại
                </Button>
                <Button className="bg-black text-white" onClick={applyFilters}>
                    <Check className="h-4 w-4 mr-2" />
                    Áp dụng
                </Button>
            </div>
        </div>
    );
}