"use client";

import {useState} from 'react';
import {Check, ChevronDown, Clock, EyeIcon, Filter, Search, X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";

export default function AdminPendingCoursesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Mẫu dữ liệu khóa học chờ phê duyệt
    const pendingCourses = [
        {
            id: '1',
            title: 'JavaScript Advanced: ES6 và Beyond',
            instructor: 'Nguyễn Thành',
            category: 'Lập trình Web',
            submitted: '12/02/2024',
            thumbnail: '/placeholder.jpg'
        },
        {
            id: '2',
            title: 'Python cho Data Science và AI',
            instructor: 'Phạm Thảo',
            category: 'Khoa học dữ liệu',
            submitted: '14/02/2024',
            thumbnail: '/placeholder.jpg'
        },
        {
            id: '3',
            title: 'UI/UX Design: Từ cơ bản đến nâng cao',
            instructor: 'Hoàng Linh',
            category: 'Thiết kế',
            submitted: '15/02/2024',
            thumbnail: '/placeholder.jpg'
        },
        {
            id: '4',
            title: 'MySQL và PostgreSQL: So sánh và ứng dụng',
            instructor: 'Vũ Duy',
            category: 'Cơ sở dữ liệu',
            submitted: '15/02/2024',
            thumbnail: '/placeholder.jpg'
        },
        {
            id: '5',
            title: 'Marketing Online: Chiến lược và thực thi',
            instructor: 'Mai Anh',
            category: 'Marketing',
            submitted: '16/02/2024',
            thumbnail: '/placeholder.jpg'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Khóa học chờ phê duyệt</h1>
                    <p className="text-muted-foreground">
                        Xem xét và phê duyệt các khóa học mới trên nền tảng
                    </p>
                </div>
                <Button variant="outline">
                    <Clock className="mr-2 h-4 w-4"/>
                    Lịch sử phê duyệt
                </Button>
            </div>

            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                <div className="relative w-full md:w-auto md:flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"/>
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
                    <Filter className="mr-2 h-4 w-4"/>
                    Bộ lọc
                </Button>
            </div>

            {showFilters && (
                <Card>
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                            <div>
                                <label className="text-sm font-medium">Thể loại</label>
                                <div className="relative">
                                    <select
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md">
                                        <option>Tất cả thể loại</option>
                                        <option>Lập trình Web</option>
                                        <option>Khoa học dữ liệu</option>
                                        <option>Thiết kế</option>
                                        <option>Marketing</option>
                                    </select>
                                    <ChevronDown
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"/>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Ngày nộp</label>
                                <div className="relative">
                                    <select
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md">
                                        <option>Tất cả</option>
                                        <option>Hôm nay</option>
                                        <option>7 ngày qua</option>
                                        <option>30 ngày qua</option>
                                    </select>
                                    <ChevronDown
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"/>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Giảng viên</label>
                                <div className="relative">
                                    <select
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md">
                                        <option>Tất cả giảng viên</option>
                                        <option>Nguyễn Thành</option>
                                        <option>Phạm Thảo</option>
                                        <option>Hoàng Linh</option>
                                        <option>Vũ Duy</option>
                                        <option>Mai Anh</option>
                                    </select>
                                    <ChevronDown
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"/>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4 space-x-2">
                            <Button variant="outline">Đặt lại</Button>
                            <Button>Áp dụng</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="bg-white rounded-md shadow">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Khóa học</TableHead>
                            <TableHead>Giảng viên</TableHead>
                            <TableHead>Thể loại</TableHead>
                            <TableHead>Ngày nộp</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pendingCourses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-10 w-16 bg-gray-200 rounded"></div>
                                        <div className="font-medium">{course.title}</div>
                                    </div>
                                </TableCell>
                                <TableCell>{course.instructor}</TableCell>
                                <TableCell>{course.category}</TableCell>
                                <TableCell>{course.submitted}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="outline" size="sm">
                                            <EyeIcon className="h-4 w-4 mr-1"/>
                                            Xem
                                        </Button>
                                        <Button variant="outline" size="sm"
                                                className="text-green-600 border-green-600 hover:bg-green-50">
                                            <Check className="h-4 w-4 mr-1"/>
                                            Duyệt
                                        </Button>
                                        <Button variant="outline" size="sm"
                                                className="text-red-600 border-red-600 hover:bg-red-50">
                                            <X className="h-4 w-4 mr-1"/>
                                            Từ chối
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Hiển thị 1-5 của 22 khóa học chờ duyệt
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
                    <Button variant="outline" size="sm">
                        Sau
                    </Button>
                </div>
            </div>
        </div>
    );
}