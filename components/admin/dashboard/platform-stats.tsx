"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, GraduationCap, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface PlatformStatsProps {
    timeRange: 'week' | 'month' | 'year';
}

export default function PlatformStats({ timeRange }: PlatformStatsProps) {
    // Giả lập dữ liệu thống kê dựa trên khoảng thời gian
    const getStats = () => {
        switch (timeRange) {
            case 'week':
                return {
                    totalUsers: 24652,
                    userChange: 2.4,
                    totalCourses: 456,
                    courseChange: 1.8,
                    totalInstructors: 128,
                    instructorChange: 0.9,
                    totalRevenue: 45600000,
                    revenueChange: 3.2
                };
            case 'month':
                return {
                    totalUsers: 25120,
                    userChange: 8.5,
                    totalCourses: 486,
                    courseChange: 5.2,
                    totalInstructors: 134,
                    instructorChange: 4.1,
                    totalRevenue: 215450000,
                    revenueChange: 12.7
                };
            case 'year':
                return {
                    totalUsers: 28450,
                    userChange: 32.6,
                    totalCourses: 680,
                    courseChange: 24.8,
                    totalInstructors: 187,
                    instructorChange: 18.5,
                    totalRevenue: 2654000000,
                    revenueChange: 42.3
                };
            default:
                return {
                    totalUsers: 25120,
                    userChange: 8.5,
                    totalCourses: 486,
                    courseChange: 5.2,
                    totalInstructors: 134,
                    instructorChange: 4.1,
                    totalRevenue: 215450000,
                    revenueChange: 12.7
                };
        }
    };

    const stats = getStats();

    // Hàm định dạng số
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('vi-VN').format(num);
    };

    // Hàm định dạng tiền tệ
    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(num);
    };

    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatNumber(stats.totalUsers)}</div>
                    <div className="flex items-center pt-1 text-sm">
                        {stats.userChange > 0 ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={stats.userChange > 0 ? "text-green-500" : "text-red-500"}>
                            {stats.userChange}%
                        </span>
                        <span className="text-gray-500 ml-1">so với kỳ trước</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tổng khóa học</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatNumber(stats.totalCourses)}</div>
                    <div className="flex items-center pt-1 text-sm">
                        {stats.courseChange > 0 ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={stats.courseChange > 0 ? "text-green-500" : "text-red-500"}>
                            {stats.courseChange}%
                        </span>
                        <span className="text-gray-500 ml-1">so với kỳ trước</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tổng giảng viên</CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatNumber(stats.totalInstructors)}</div>
                    <div className="flex items-center pt-1 text-sm">
                        {stats.instructorChange > 0 ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={stats.instructorChange > 0 ? "text-green-500" : "text-red-500"}>
                            {stats.instructorChange}%
                        </span>
                        <span className="text-gray-500 ml-1">so với kỳ trước</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
                    <div className="flex items-center pt-1 text-sm">
                        {stats.revenueChange > 0 ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={stats.revenueChange > 0 ? "text-green-500" : "text-red-500"}>
                            {stats.revenueChange}%
                        </span>
                        <span className="text-gray-500 ml-1">so với kỳ trước</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}