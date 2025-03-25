"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    Filter,
    Download,
    Plus,
    ChevronDown,
    MoreHorizontal,
    Users,
    UserCog,
    UserCheck,
    User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function AdminUsersPage() {
    const [view, setView] = useState<'all' | 'students' | 'instructors' | 'admins'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Mô phỏng dữ liệu người dùng
    const getUserCounts = () => {
        // Đây sẽ được thay thế bằng API call thực tế
        return {
            all: 24826,
            students: 24126,
            instructors: 685,
            admins: 15
        };
    };

    const userCounts = getUserCounts();

    // Mẫu dữ liệu người dùng
    const users = [
        {
            id: 'U1',
            name: 'Nguyễn Văn An',
            email: 'nguyenvanan@example.com',
            role: 'student',
            status: 'active',
            joinDate: '12/01/2024',
            courses: 3,
            lastActive: '18/02/2024'
        },
        {
            id: 'U2',
            name: 'Trần Thanh Bình',
            email: 'tranthanhbinh@example.com',
            role: 'student',
            status: 'active',
            joinDate: '05/12/2023',
            courses: 5,
            lastActive: '18/02/2024'
        },
        {
            id: 'U3',
            name: 'Lê Thị Cẩm',
            email: 'lethicam@example.com',
            role: 'student',
            status: 'inactive',
            joinDate: '22/11/2023',
            courses: 1,
            lastActive: '05/01/2024'
        },
        {
            id: 'U4',
            name: 'Phạm Thảo',
            email: 'phamthao@example.com',
            role: 'instructor',
            status: 'active',
            joinDate: '15/09/2023',
            courses: 2,
            lastActive: '17/02/2024'
        },
        {
            id: 'U5',
            name: 'Hoàng Linh',
            email: 'hoanglinh@example.com',
            role: 'instructor',
            status: 'active',
            joinDate: '08/10/2023',
            courses: 3,
            lastActive: '18/02/2024'
        },
        {
            id: 'U6',
            name: 'Đỗ Quang Minh',
            email: 'doquangminh@example.com',
            role: 'admin',
            status: 'active',
            joinDate: '10/08/2023',
            courses: 0,
            lastActive: '18/02/2024'
        },
        {
            id: 'U7',
            name: 'Vũ Ngọc Hà',
            email: 'vungocha@example.com',
            role: 'student',
            status: 'active',
            joinDate: '18/01/2024',
            courses: 2,
            lastActive: '16/02/2024'
        }
    ];

    // Lọc người dùng dựa trên chế độ xem hiện tại
    const filteredUsers = users.filter(user => {
        if (view === 'all') return true;
        if (view === 'students') return user.role === 'student';
        if (view === 'instructors') return user.role === 'instructor';
        if (view === 'admins') return user.role === 'admin';
        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Quản lý người dùng</h1>
                    <p className="text-muted-foreground">
                        Quản lý tất cả người dùng trên nền tảng
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Xuất
                    </Button>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Thêm người dùng
                    </Button>
                </div>
            </div>

            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                <div className="relative w-full md:w-auto md:flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm người dùng..."
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
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
                            <div>
                                <label className="text-sm font-medium">Vai trò</label>
                                <div className="relative">
                                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md">
                                        <option>Tất cả vai trò</option>
                                        <option>Học viên</option>
                                        <option>Giảng viên</option>
                                        <option>Quản trị viên</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Trạng thái</label>
                                <div className="relative">
                                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md">
                                        <option>Tất cả trạng thái</option>
                                        <option>Đang hoạt động</option>
                                        <option>Không hoạt động</option>
                                        <option>Đã khóa</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Đăng ký từ</label>
                                <input
                                    type="date"
                                    className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Đăng ký đến</label>
                                <input
                                    type="date"
                                    className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4 space-x-2">
                            <Button variant="outline">Đặt lại</Button>
                            <Button>Áp dụng</Button>
                        </div>
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
                    <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        Tất cả ({userCounts.all.toLocaleString()})
                    </div>
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium ${view === 'students'
                            ? 'border-b-2 border-black text-black'
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    onClick={() => setView('students')}
                >
                    <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Học viên ({userCounts.students.toLocaleString()})
                    </div>
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium ${view === 'instructors'
                            ? 'border-b-2 border-black text-black'
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    onClick={() => setView('instructors')}
                >
                    <div className="flex items-center">
                        <UserCheck className="h-4 w-4 mr-1" />
                        Giảng viên ({userCounts.instructors.toLocaleString()})
                    </div>
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium ${view === 'admins'
                            ? 'border-b-2 border-black text-black'
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    onClick={() => setView('admins')}
                >
                    <div className="flex items-center">
                        <UserCog className="h-4 w-4 mr-1" />
                        Quản trị viên ({userCounts.admins.toLocaleString()})
                    </div>
                </button>
            </div>

            <div className="bg-white rounded-md shadow">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[250px]">Người dùng</TableHead>
                            <TableHead>Vai trò</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead>Ngày tham gia</TableHead>
                            <TableHead>Khóa học</TableHead>
                            <TableHead>Hoạt động gần đây</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-sm font-medium text-gray-600">
                                                {user.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'admin'
                                            ? 'bg-purple-100 text-purple-800'
                                            : user.role === 'instructor'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {user.role === 'admin' ? 'Quản trị viên' : user.role === 'instructor' ? 'Giảng viên' : 'Học viên'}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {user.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                                    </span>
                                </TableCell>
                                <TableCell>{user.joinDate}</TableCell>
                                <TableCell>{user.courses}</TableCell>
                                <TableCell>{user.lastActive}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end">
                                        <Button variant="ghost" size="sm">
                                            <MoreHorizontal className="h-4 w-4" />
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
                    Hiển thị 1-7 của {view === 'all' ? userCounts.all : view === 'students' ? userCounts.students : view === 'instructors' ? userCounts.instructors : userCounts.admins} người dùng
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
                        {Math.ceil(userCounts[view] / 20)}
                    </Button>
                    <Button variant="outline" size="sm">
                        Sau
                    </Button>
                </div>
            </div>
        </div>
    );
}