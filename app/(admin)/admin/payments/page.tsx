"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    Filter,
    Download,
    ChevronDown,
    ArrowUpRight,
    ArrowDownLeft,
    CreditCard,
    DollarSign,
    BarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function AdminPaymentsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

    // Dữ liệu cho biểu đồ (mẫu)
    const transactions = [
        {
            id: 'T1',
            date: '18/02/2024',
            time: '10:24',
            amount: 2500000,
            type: 'in',
            description: 'Thanh toán khóa học JavaScript Advanced',
            user: 'Trần Lan',
            status: 'Thành công'
        },
        {
            id: 'T2',
            date: '18/02/2024',
            time: '14:35',
            amount: 3200000,
            type: 'in',
            description: 'Thanh toán khóa học Python for Data Science',
            user: 'Ngọc Ánh',
            status: 'Thành công'
        },
        {
            id: 'T3',
            date: '17/02/2024',
            time: '16:42',
            amount: 1800000,
            type: 'in',
            description: 'Thanh toán khóa học UI/UX Design Principles',
            user: 'Hoàng Phúc',
            status: 'Thành công'
        },
        {
            id: 'T4',
            date: '17/02/2024',
            time: '09:11',
            amount: 1500000,
            type: 'out',
            description: 'Rút tiền về tài khoản ngân hàng',
            user: 'Nguyễn Thành (GV)',
            status: 'Đang xử lý'
        },
        {
            id: 'T5',
            date: '16/02/2024',
            time: '15:20',
            amount: 2400000,
            type: 'in',
            description: 'Thanh toán khóa học Digital Marketing',
            user: 'Vũ Quỳnh',
            status: 'Chờ xác nhận'
        },
        {
            id: 'T6',
            date: '16/02/2024',
            time: '11:05',
            amount: 2800000,
            type: 'out',
            description: 'Rút tiền về tài khoản ngân hàng',
            user: 'Phạm Thảo (GV)',
            status: 'Thành công'
        },
        {
            id: 'T7',
            date: '15/02/2024',
            time: '14:30',
            amount: 1950000,
            type: 'in',
            description: 'Thanh toán khóa học React Fundamentals',
            user: 'Tuấn Dũng',
            status: 'Thành công'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Quản lý thanh toán</h1>
                    <p className="text-muted-foreground">
                        Quản lý các giao dịch và thanh toán trên nền tảng
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Xuất báo cáo
                    </Button>
                    <Link href="/admin/payments/withdrawals">
                        <Button>
                            <DollarSign className="mr-2 h-4 w-4" />
                            Yêu cầu rút tiền
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Thống kê thanh toán */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng doanh thu
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">158.500.000 đ</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            12% so với tháng trước
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng chi
                        </CardTitle>
                        <ArrowDownLeft className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">98.250.000 đ</div>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            8% so với tháng trước
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Số giao dịch
                        </CardTitle>
                        <BarChart className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,245</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            15% so với tháng trước
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Chờ xử lý
                        </CardTitle>
                        <CreditCard className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                            3 yêu cầu rút tiền, 5 thanh toán
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Bộ lọc */}
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                <div className="relative w-full md:w-auto md:flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm giao dịch..."
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
                <div className="bg-white border rounded-md overflow-hidden flex">
                    <button
                        className={`px-3 py-1.5 text-sm ${timeRange === 'week' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setTimeRange('week')}
                    >
                        Tuần
                    </button>
                    <button
                        className={`px-3 py-1.5 text-sm ${timeRange === 'month' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setTimeRange('month')}
                    >
                        Tháng
                    </button>
                    <button
                        className={`px-3 py-1.5 text-sm ${timeRange === 'year' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setTimeRange('year')}
                    >
                        Năm
                    </button>
                </div>
            </div>

            {showFilters && (
                <Card>
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
                            <div>
                                <label className="text-sm font-medium">Loại giao dịch</label>
                                <div className="relative">
                                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md">
                                        <option>Tất cả</option>
                                        <option>Thu</option>
                                        <option>Chi</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Trạng thái</label>
                                <div className="relative">
                                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md">
                                        <option>Tất cả</option>
                                        <option>Thành công</option>
                                        <option>Đang xử lý</option>
                                        <option>Chờ xác nhận</option>
                                        <option>Thất bại</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Từ ngày</label>
                                <input
                                    type="date"
                                    className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Đến ngày</label>
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

            {/* Danh sách giao dịch */}
            <div className="bg-white rounded-md shadow">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Ngày</TableHead>
                            <TableHead>Mô tả</TableHead>
                            <TableHead>Người dùng</TableHead>
                            <TableHead>Số tiền</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell className="font-medium">{transaction.id}</TableCell>
                                <TableCell>
                                    {transaction.date}
                                    <div className="text-xs text-gray-500">{transaction.time}</div>
                                </TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.user}</TableCell>
                                <TableCell>
                                    <span className={`flex items-center ${transaction.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>
                                        {transaction.type === 'in' ? '+' : '-'}
                                        {transaction.amount.toLocaleString()} đ
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium
                                        ${transaction.status === 'Thành công' ? 'bg-green-100 text-green-800' :
                                            transaction.status === 'Đang xử lý' ? 'bg-blue-100 text-blue-800' :
                                                transaction.status === 'Chờ xác nhận' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                        {transaction.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                        Chi tiết
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Hiển thị 1-7 của 1,245 giao dịch
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
                        42
                    </Button>
                    <Button variant="outline" size="sm">
                        Sau
                    </Button>
                </div>
            </div>
        </div>
    );
}