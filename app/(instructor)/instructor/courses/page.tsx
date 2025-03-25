"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Grid, List, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Giả lập dữ liệu khóa học
const mockCourses = [
    {
        id: 's1',
        title: 'Lập trình JavaScript từ cơ bản đến nâng cao',
        students: 128,
        rating: 4.7,
        income: 1240,
        lastUpdated: '2025-02-15',
        published: true,
        thumbnail: '/api/placeholder/400/220'
    },
    {
        id: 's2',
        title: 'Xây dựng ứng dụng web với ReactJS và NextJS',
        students: 86,
        rating: 4.5,
        income: 860,
        lastUpdated: '2025-03-01',
        published: true,
        thumbnail: '/api/placeholder/400/220'
    },
    {
        id: 's3',
        title: 'UI/UX Design cho người mới bắt đầu',
        students: 0,
        rating: 0,
        income: 0,
        lastUpdated: '2025-03-05',
        published: false,
        thumbnail: '/api/placeholder/400/220'
    },
    {
        id: 's4',
        title: 'Backend development với NodeJS và ExpressJS',
        students: 42,
        rating: 4.2,
        income: 420,
        lastUpdated: '2025-02-28',
        published: true,
        thumbnail: '/api/placeholder/400/220'
    }
];

export default function InstructorCoursesPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [courses, setCourses] = useState(mockCourses);
    const [searchTerm, setSearchTerm] = useState('');

    // Lọc khóa học theo từ khóa tìm kiếm
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Khóa học của tôi</h1>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                    {/* Thanh công cụ */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                        {/* Tìm kiếm */}
                        <div className="relative flex-grow max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                                placeholder="Tìm kiếm khóa học..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Các nút công cụ */}
                        <div className="flex items-center space-x-3">
                            <Button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                                <Filter className="h-4 w-4 mr-2" />
                                Lọc
                            </Button>
                            <Button
                                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid className="h-5 w-5 text-gray-700" />
                            </Button>
                            <Button
                                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
                                onClick={() => setViewMode('list')}
                            >
                                <List className="h-5 w-5 text-gray-700" />
                            </Button>
                            <Link href="/instructor/courses/new">
                                <Button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                                    Tạo khóa học mới
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Danh sách khóa học - Chế độ lưới */}
                    {viewMode === 'grid' && (
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredCourses.map((course) => (
                                <div key={course.id} className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="relative">
                                        <img className="h-48 w-full object-cover" src={course.thumbnail} alt={course.title} />
                                        <div className="absolute top-2 right-2">
                                            <button className="p-1 rounded-full bg-white shadow">
                                                <MoreVertical className="h-5 w-5 text-gray-500" />
                                            </button>
                                        </div>
                                        {!course.published && (
                                            <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                                                Bản nháp
                                            </div>
                                        )}
                                    </div>
                                    <div className="px-4 py-4">
                                        <Link href={`/instructor/courses/${course.id}/content`}>
                                            <div className="text-lg font-medium text-gray-900 hover:text-gray-600 line-clamp-2 mb-2">
                                                {course.title}
                                            </div>
                                        </Link>

                                        <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                                            <div>{course.students} học viên</div>
                                            {course.rating > 0 && (
                                                <div className="flex items-center">
                                                    <svg className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    {course.rating.toFixed(1)}
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-sm text-gray-500 flex justify-between items-center">
                                            <div>Cập nhật: {new Date(course.lastUpdated).toLocaleDateString('vi-VN')}</div>
                                            {course.income > 0 && <div>{course.income.toLocaleString()}k đ</div>}
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                                        <Link href={`/instructor/courses/${course.id}/edit`}>
                                            <div className="text-sm font-medium text-black hover:text-gray-700">
                                                Chỉnh sửa khóa học
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Danh sách khóa học - Chế độ danh sách */}
                    {viewMode === 'list' && (
                        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Khóa học</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Học viên</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Đánh giá</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Doanh thu</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cập nhật</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Trạng thái</th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Tùy chọn</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {filteredCourses.map((course) => (
                                        <tr key={course.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                <div className="flex items-center">
                                                    <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded">
                                                        <img src={course.thumbnail} alt="" className="h-full w-full object-cover" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="font-medium text-gray-900">{course.title}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {course.students}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {course.rating > 0 ? (
                                                    <div className="flex items-center">
                                                        <svg className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        {course.rating.toFixed(1)}
                                                    </div>
                                                ) : '-'}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {course.income > 0 ? `${course.income.toLocaleString()}k đ` : '-'}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {new Date(course.lastUpdated).toLocaleDateString('vi-VN')}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                {course.published ? (
                                                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                        Đã xuất bản
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                                                        Bản nháp
                                                    </span>
                                                )}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <Link href={`/instructor/courses/${course.id}/edit`}>
                                                    <div className="text-black hover:text-gray-600 mr-4">Chỉnh sửa</div>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}