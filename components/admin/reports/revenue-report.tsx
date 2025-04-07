"use client";

import {useState} from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend
} from 'recharts';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

type RevenueReportProps = {
    timeRange: 'week' | 'month' | 'quarter' | 'year';
};

export default function RevenueReport({timeRange}: RevenueReportProps) {
    const [view, setView] = useState<'overview' | 'categories' | 'comparison'>('overview');

    // Mô phỏng dữ liệu doanh thu dựa trên timeRange
    const generateData = () => {
        if (timeRange === 'week') {
            return [
                {name: 'Thứ 2', revenue: 12500000, profit: 8750000, cost: 3750000},
                {name: 'Thứ 3', revenue: 14200000, profit: 9940000, cost: 4260000},
                {name: 'Thứ 4', revenue: 16800000, profit: 11760000, cost: 5040000},
                {name: 'Thứ 5', revenue: 15600000, profit: 10920000, cost: 4680000},
                {name: 'Thứ 6', revenue: 19200000, profit: 13440000, cost: 5760000},
                {name: 'Thứ 7', revenue: 22500000, profit: 15750000, cost: 6750000},
                {name: 'CN', revenue: 18700000, profit: 13090000, cost: 5610000},
            ];
        } else if (timeRange === 'month') {
            return Array.from({length: 30}, (_, i) => ({
                name: `${i + 1}`,
                revenue: 5000000 + Math.random() * 20000000,
                profit: 3500000 + Math.random() * 14000000,
                cost: 1500000 + Math.random() * 6000000,
            }));
        } else if (timeRange === 'quarter') {
            return [
                {name: 'Tuần 1', revenue: 95000000, profit: 66500000, cost: 28500000},
                {name: 'Tuần 2', revenue: 102000000, profit: 71400000, cost: 30600000},
                {name: 'Tuần 3', revenue: 108000000, profit: 75600000, cost: 32400000},
                {name: 'Tuần 4', revenue: 115000000, profit: 80500000, cost: 34500000},
                {name: 'Tuần 5', revenue: 120000000, profit: 84000000, cost: 36000000},
                {name: 'Tuần 6', revenue: 125000000, profit: 87500000, cost: 37500000},
                {name: 'Tuần 7', revenue: 130000000, profit: 91000000, cost: 39000000},
                {name: 'Tuần 8', revenue: 135000000, profit: 94500000, cost: 40500000},
                {name: 'Tuần 9', revenue: 140000000, profit: 98000000, cost: 42000000},
                {name: 'Tuần 10', revenue: 145000000, profit: 101500000, cost: 43500000},
                {name: 'Tuần 11', revenue: 150000000, profit: 105000000, cost: 45000000},
                {name: 'Tuần 12', revenue: 158500000, profit: 110950000, cost: 47550000},
            ];
        } else {
            return [
                {name: 'T1', revenue: 380000000, profit: 266000000, cost: 114000000},
                {name: 'T2', revenue: 410000000, profit: 287000000, cost: 123000000},
                {name: 'T3', revenue: 425000000, profit: 297500000, cost: 127500000},
                {name: 'T4', revenue: 440000000, profit: 308000000, cost: 132000000},
                {name: 'T5', revenue: 455000000, profit: 318500000, cost: 136500000},
                {name: 'T6', revenue: 470000000, profit: 329000000, cost: 141000000},
                {name: 'T7', revenue: 485000000, profit: 339500000, cost: 145500000},
                {name: 'T8', revenue: 500000000, profit: 350000000, cost: 150000000},
                {name: 'T9', revenue: 515000000, profit: 360500000, cost: 154500000},
                {name: 'T10', revenue: 530000000, profit: 371000000, cost: 159000000},
                {name: 'T11', revenue: 545000000, profit: 381500000, cost: 163500000},
                {name: 'T12', revenue: 580000000, profit: 406000000, cost: 174000000},
            ];
        }
    };

    const data = generateData();

    // Dữ liệu cho biểu đồ thể loại
    const categoryData = [
        {name: 'Lập trình Web', revenue: 42500000},
        {name: 'Khoa học dữ liệu', revenue: 38750000},
        {name: 'Thiết kế', revenue: 35200000},
        {name: 'Marketing', revenue: 28450000},
        {name: 'Ngoại ngữ', revenue: 13600000},
    ];

    // Dữ liệu so sánh năm trước với năm nay
    const comparisonData = [
        {name: 'T1', current: 380000000, previous: 320000000},
        {name: 'T2', current: 410000000, previous: 340000000},
        {name: 'T3', current: 425000000, previous: 360000000},
        {name: 'T4', current: 440000000, previous: 380000000},
        {name: 'T5', current: 455000000, previous: 395000000},
        {name: 'T6', current: 470000000, previous: 410000000},
        {name: 'T7', current: 485000000, previous: 430000000},
        {name: 'T8', current: 500000000, previous: 450000000},
        {name: 'T9', current: 515000000, previous: 465000000},
        {name: 'T10', current: 530000000, previous: 480000000},
        {name: 'T11', current: 545000000, previous: 495000000},
        {name: 'T12', current: 580000000, previous: 510000000},
    ];

    // Format số tiền (VNĐ)
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    // Custom tooltip cho biểu đồ
    const CustomTooltip = ({active, payload, label}: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border rounded shadow-sm">
                    <p className="font-medium">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{color: entry.color}}>
                            {entry.name}: {formatCurrency(entry.value)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-4">
            <Tabs value={view} onValueChange={(value: string) => setView(value as any)} className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                    <TabsTrigger value="categories">Theo thể loại</TabsTrigger>
                    <TabsTrigger value="comparison">So sánh</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={data}
                                margin={{top: 10, right: 30, left: 0, bottom: 0}}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis
                                    tickFormatter={(value) => {
                                        if (value >= 1000000) return `${value / 1000000}tr`;
                                        return value;
                                    }}
                                />
                                <Tooltip content={<CustomTooltip/>}/>
                                <Legend/>
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    name="Doanh thu"
                                    stackId="1"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="profit"
                                    name="Lợi nhuận"
                                    stackId="2"
                                    stroke="#82ca9d"
                                    fill="#82ca9d"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="cost"
                                    name="Chi phí"
                                    stackId="3"
                                    stroke="#ffc658"
                                    fill="#ffc658"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Tổng doanh thu</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {formatCurrency(data.reduce((sum, item) => sum + item.revenue, 0))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Tổng lợi nhuận</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {formatCurrency(data.reduce((sum, item) => sum + item.profit, 0))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Tổng chi phí</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {formatCurrency(data.reduce((sum, item) => sum + item.cost, 0))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="categories">
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={categoryData}
                                margin={{top: 10, right: 30, left: 0, bottom: 0}}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis
                                    tickFormatter={(value) => {
                                        if (value >= 1000000) return `${value / 1000000}tr`;
                                        return value;
                                    }}
                                />
                                <Tooltip content={<CustomTooltip/>}/>
                                <Legend/>
                                <Bar dataKey="revenue" name="Doanh thu" fill="#8884d8"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h3 className="font-medium mb-2">Phân bổ doanh thu theo thể loại</h3>
                            <div className="space-y-3">
                                {categoryData.map((category, index) => (
                                    <div key={index}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm">{category.name}</span>
                                            <span
                                                className="text-sm font-medium">{formatCurrency(category.revenue)}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-indigo-600 h-2 rounded-full"
                                                style={{
                                                    width: `${(category.revenue / categoryData.reduce((sum, item) => sum + item.revenue, 0)) * 100}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="comparison">
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={comparisonData}
                                margin={{top: 10, right: 30, left: 0, bottom: 0}}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis
                                    tickFormatter={(value) => {
                                        if (value >= 1000000) return `${value / 1000000}tr`;
                                        return value;
                                    }}
                                />
                                <Tooltip content={<CustomTooltip/>}/>
                                <Legend/>
                                <Bar dataKey="current" name="Năm nay" fill="#8884d8"/>
                                <Bar dataKey="previous" name="Năm trước" fill="#82ca9d"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Phân tích so sánh</CardTitle>
                                <CardDescription>So sánh doanh thu năm nay với năm trước</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-medium mb-2">Tổng doanh thu</h3>
                                        <div className="flex items-center justify-between">
                                            <span>Năm nay:</span>
                                            <span className="font-medium">
                                                {formatCurrency(comparisonData.reduce((sum, item) => sum + item.current, 0))}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Năm trước:</span>
                                            <span className="font-medium">
                                                {formatCurrency(comparisonData.reduce((sum, item) => sum + item.previous, 0))}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-2">Tăng trưởng</h3>
                                        <div className="flex items-center justify-between">
                                            <span>Giá trị tăng:</span>
                                            <span className="font-medium text-green-600">
                                                {formatCurrency(
                                                    comparisonData.reduce((sum, item) => sum + item.current, 0) -
                                                    comparisonData.reduce((sum, item) => sum + item.previous, 0)
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Phần trăm tăng:</span>
                                            <span className="font-medium text-green-600">
                                                {Math.round(
                                                    ((comparisonData.reduce((sum, item) => sum + item.current, 0) -
                                                            comparisonData.reduce((sum, item) => sum + item.previous, 0)) /
                                                        comparisonData.reduce((sum, item) => sum + item.previous, 0)) * 100
                                                )}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}