"use client";

import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlatformStats from '@/components/admin/dashboard/platform-stats';
import RevenueOverview from '@/components/admin/dashboard/revenue-overview';
import ActiveUsers from '@/components/admin/dashboard/active-users';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
    const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="h-9 gap-1.5 bg-white"
                        onClick={() => { }}
                    >
                        <Calendar className="h-4 w-4" />
                        <span>
                            {timeRange === 'week' && '7 ngày qua'}
                            {timeRange === 'month' && '30 ngày qua'}
                            {timeRange === 'year' && '365 ngày qua'}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
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
            </div>

            {/* Platform statistics */}
            <PlatformStats timeRange={timeRange} />

            {/* Revenue overview and active users */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RevenueOverview className="col-span-1 md:col-span-2" />
                <ActiveUsers className="col-span-1" />
            </div>

            {/* Recent activities */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Khóa học mới</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((_, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded bg-gray-200"></div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {["JavaScript Advanced", "Python for Data Science", "React Fundamentals", "UI/UX Design Principles", "Digital Marketing"][index]}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Đăng ký: {[24, 18, 15, 12, 8][index]} học viên
                                        </p>
                                        <div className="mt-1 flex items-center">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${index % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {index % 2 === 0 ? 'Đã duyệt' : 'Chờ duyệt'}
                                            </span>
                                            <span className="ml-2 text-xs text-gray-500">
                                                {[2, 3, 4, 5, 6][index]} ngày trước
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Giảng viên mới</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((_, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-sm font-medium text-gray-600">
                                                {["NT", "HL", "VD", "PT", "MA"][index]}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {["Nguyễn Thành", "Hoàng Linh", "Vũ Duy", "Phạm Thảo", "Mai Anh"][index]}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Chuyên môn: {["Frontend", "Backend", "UI/UX", "Data Science", "Marketing"][index]}
                                        </p>
                                        <div className="mt-1 flex items-center">
                                            <span className="text-xs text-gray-500">
                                                {[3, 4, 5, 6, 7][index]} ngày trước
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Đánh giá gần đây</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((_, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-sm font-medium text-gray-600">
                                                {["TL", "NA", "HP", "VQ", "TD"][index]}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center">
                                            <p className="text-sm font-medium text-gray-900 truncate mr-1">
                                                {["Trần Lan", "Ngọc Ánh", "Hoàng Phúc", "Vũ Quỳnh", "Tuấn Dũng"][index]}
                                            </p>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`h-3 w-3 ${i < [5, 4, 5, 3, 4][index] ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-700 line-clamp-2">
                                            {[
                                                "Khóa học rất hay, dễ hiểu và nhiều ví dụ thực tế.",
                                                "Giảng viên nhiệt tình nhưng cần bổ sung thêm bài tập.",
                                                "Tuyệt vời! Đã học được rất nhiều kiến thức mới.",
                                                "Nội dung hữu ích nhưng cần cập nhật một số phần.",
                                                "Rất hài lòng với khóa học này. Sẽ giới thiệu cho bạn bè."
                                            ][index]}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {[1, 2, 2, 3, 4][index]} ngày trước • {["JavaScript Advanced", "Python for Data Science", "React Fundamentals", "UI/UX Design", "Marketing"][index]}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-lg shadow">
                    <h3 className="font-medium text-gray-900">Khóa học chờ phê duyệt</h3>
                    <p className="mt-1 text-3xl font-semibold text-black">5</p>
                    <div className="mt-2">
                        <a href="/admin/courses/pending" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Xem ngay →
                        </a>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                    <h3 className="font-medium text-gray-900">Yêu cầu rút tiền</h3>
                    <p className="mt-1 text-3xl font-semibold text-black">8</p>
                    <div className="mt-2">
                        <a href="/admin/payments/withdrawals" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Xem ngay →
                        </a>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                    <h3 className="font-medium text-gray-900">Báo cáo vi phạm</h3>
                    <p className="mt-1 text-3xl font-semibold text-black">3</p>
                    <div className="mt-2">
                        <a href="/admin/reports/violations" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Xem ngay →
                        </a>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                    <h3 className="font-medium text-gray-900">Hỗ trợ chưa giải đáp</h3>
                    <p className="mt-1 text-3xl font-semibold text-black">12</p>
                    <div className="mt-2">
                        <a href="/admin/supports" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Xem ngay →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}