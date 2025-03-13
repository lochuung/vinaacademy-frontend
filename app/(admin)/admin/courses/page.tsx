"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Download,
    Edit,
    Check,
    X,
    EyeIcon,
    Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CourseList from '@/components/admin/courses/course-list';
import Filters from '@/components/admin/courses/filters';

export default function AdminCoursesPage() {
    const [view, setView] = useState<'all' | 'published' | 'draft' | 'pending' | 'rejected'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Simulate fetching courses
    const getCourses = () => {
        // This would be replaced with actual API call
        return {
            all: 486,
            published: 420,
            draft: 36,
            pending: 22,
            rejected: 8
        };
    };

    const courseCounts = getCourses();

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Quản lý khóa học</h1>
                    <p className="text-muted-foreground">
                        Quản lý tất cả khóa học trên nền tảng
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Xuất
                    </Button>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Thêm khóa học
                    </Button>
                </div>
            </div>

            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                <div className="relative w-full md:w-auto md:flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm khóa học..."
                        className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 text-sm focus:border-black focus:ring-black"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button
                    variant="outline"
                    className="md:w-auto"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter className="mr-2 h-4 w-4" />
                    Bộ lọc
                </Button>
            </div>

            {showFilters && (
                <Card>
                    <CardContent className="p-4">
                        <Filters />
                    </CardContent>
                </Card>
            )}

            <div className="flex border-b">
                <button
                    className={`px-4 py-2 text-sm font-medium ${view === 'all'
                        ? 'border-b-2 border-black text-black'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    onClick={() => setView('all')}
                >
                    Tất cả ({courseCounts.all})
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium ${view === 'published'
                        ? 'border-b-2 border-black text-black'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    onClick={() => setView('published')}
                >
                    Đã xuất bản ({courseCounts.published})
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium ${view === 'draft'
                        ? 'border-b-2 border-black text-black'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    onClick={() => setView('draft')}
                >
                    Bản nháp ({courseCounts.draft})
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium ${view === 'pending'
                        ? 'border-b-2 border-black text-black'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    onClick={() => setView('pending')}
                >
                    Chờ duyệt ({courseCounts.pending})
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium ${view === 'rejected'
                        ? 'border-b-2 border-black text-black'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    onClick={() => setView('rejected')}
                >
                    Từ chối ({courseCounts.rejected})
                </button>
            </div>

            <CourseList view={view} searchQuery={searchQuery} />

            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Hiển thị 1-20 của {courseCounts[view]} khóa học
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                        Trước
                    </Button>
                    <Button variant="outline" size="sm" className="bg-black text-white">
                        1
                    </Button>
                    <Button variant="outline" size="sm">
                        2
                    </Button>
                    <Button variant="outline" size="sm">
                        3
                    </Button>
                    <span>...</span>
                    <Button variant="outline" size="sm">
                        12
                    </Button>
                    <Button variant="outline" size="sm">
                        Sau
                    </Button>
                </div>
            </div>
        </div>
    );
}