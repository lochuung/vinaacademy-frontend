"use client";

import {useState} from 'react';
import {ArrowUpRight, BookOpen, Calendar, ChevronDown, DollarSign, Download, Layers, Users} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import RevenueReport from '@/components/admin/reports/revenue-report';
import UserGrowth from '@/components/admin/reports/user-growth';
import CoursePerformance from '@/components/admin/reports/course-performance';

export default function AdminReportsPage() {
    const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Báo cáo thống kê</h1>
                    <p className="text-muted-foreground">
                        Phân tích dữ liệu và hiệu suất của nền tảng
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="h-9 gap-1.5 bg-white"
                    >
                        <Calendar className="h-4 w-4"/>
                        <span>
                            {timeRange === 'week' && '7 ngày qua'}
                            {timeRange === 'month' && '30 ngày qua'}
                            {timeRange === 'quarter' && '3 tháng qua'}
                            {timeRange === 'year' && '12 tháng qua'}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50"/>
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4"/>
                        Xuất báo cáo
                    </Button>
                </div>
            </div>

            {/* Time range selector */}
            <div className="bg-white border rounded-md overflow-hidden flex mb-6">
                <button
                    className={`px-4 py-2 text-sm ${timeRange === 'week' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setTimeRange('week')}
                >
                    Tuần
                </button>
                <button
                    className={`px-4 py-2 text-sm ${timeRange === 'month' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setTimeRange('month')}
                >
                    Tháng
                </button>
                <button
                    className={`px-4 py-2 text-sm ${timeRange === 'quarter' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setTimeRange('quarter')}
                >
                    Quý
                </button>
                <button
                    className={`px-4 py-2 text-sm ${timeRange === 'year' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setTimeRange('year')}
                >
                    Năm
                </button>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng doanh thu
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">158.500.000 đ</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1"/>
                            12% so với kỳ trước
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Người dùng mới
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,248</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1"/>
                            8% so với kỳ trước
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Khóa học mới
                        </CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1"/>
                            15% so với kỳ trước
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Ghi danh mới
                        </CardTitle>
                        <Layers className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2,456</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1"/>
                            18% so với kỳ trước
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main reports */}
            <Tabs defaultValue="revenue" className="space-y-4">
                <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="revenue">Báo cáo doanh thu</TabsTrigger>
                    <TabsTrigger value="users">Tăng trưởng người dùng</TabsTrigger>
                    <TabsTrigger value="courses">Hiệu suất khóa học</TabsTrigger>
                </TabsList>

                <TabsContent value="revenue">
                    <Card>
                        <CardHeader>
                            <CardTitle>Báo cáo doanh thu</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-96">
                                <RevenueReport timeRange={timeRange}/>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="users">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tăng trưởng người dùng</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-96">
                                <UserGrowth timeRange={timeRange}/>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="courses">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hiệu suất khóa học</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-96">
                                <CoursePerformance timeRange={timeRange}/>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}