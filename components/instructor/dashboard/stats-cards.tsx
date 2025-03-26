"use client";

import { DollarSign, Users, TrendingUp, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardsProps {
    timeRange: 'week' | 'month' | 'year';
}

export default function StatsCards({ timeRange }: StatsCardsProps) {
    // Simulate different stats based on time range
    const getStats = () => {
        switch (timeRange) {
            case 'week':
                return {
                    revenue: 1250000,
                    revenueChange: 5.2,
                    students: 18,
                    studentsChange: 7.1,
                    courses: 5,
                    avgRating: 4.7,
                    completionRate: 68,
                    viewCount: 432
                };
            case 'month':
                return {
                    revenue: 5450000,
                    revenueChange: 12.5,
                    students: 86,
                    studentsChange: 15.3,
                    courses: 5,
                    avgRating: 4.5,
                    completionRate: 72,
                    viewCount: 1854
                };
            case 'year':
                return {
                    revenue: 65400000,
                    revenueChange: 32.8,
                    students: 984,
                    studentsChange: 45.2,
                    courses: 8,
                    avgRating: 4.6,
                    completionRate: 75,
                    viewCount: 25421
                };
            default:
                return {
                    revenue: 5450000,
                    revenueChange: 12.5,
                    students: 86,
                    studentsChange: 15.3,
                    courses: 5,
                    avgRating: 4.5,
                    completionRate: 72,
                    viewCount: 1854
                };
        }
    };

    const stats = getStats();

    // Format numbers
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('vi-VN').format(num);
    };

    // Format to currency
    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(num);
    };

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(stats.revenue)}</div>
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

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Học viên mới</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatNumber(stats.students)}</div>
                    <div className="flex items-center pt-1 text-sm">
                        {stats.studentsChange > 0 ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={stats.studentsChange > 0 ? "text-green-500" : "text-red-500"}>
                            {stats.studentsChange}%
                        </span>
                        <span className="text-gray-500 ml-1">so với kỳ trước</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Số lượt xem</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatNumber(stats.viewCount)}</div>
                    <p className="text-xs text-muted-foreground pt-1">
                        Tổng số lượt xem khóa học
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Đánh giá trung bình</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.avgRating}</div>
                    <div className="flex items-center space-x-1 pt-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 fill-current ${i < Math.floor(stats.avgRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}