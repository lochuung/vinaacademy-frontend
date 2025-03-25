"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

interface RevenueOverviewProps {
    className?: string;
}

// Mock data cho biểu đồ doanh thu
const monthlyRevenueData = [
    { name: 'T1', revenue: 28500000, courses: 12 },
    { name: 'T2', revenue: 32800000, courses: 14 },
    { name: 'T3', revenue: 37500000, courses: 15 },
    { name: 'T4', revenue: 42100000, courses: 18 },
    { name: 'T5', revenue: 48600000, courses: 22 },
    { name: 'T6', revenue: 52300000, courses: 25 },
    { name: 'T7', revenue: 56700000, courses: 28 },
    { name: 'T8', revenue: 61200000, courses: 30 },
    { name: 'T9', revenue: 68500000, courses: 35 },
    { name: 'T10', revenue: 75800000, courses: 38 },
    { name: 'T11', revenue: 82400000, courses: 42 },
    { name: 'T12', revenue: 90500000, courses: 45 },
];

// Mock data cho biểu đồ phân bố doanh thu
const revenueDistributionData = [
    { name: 'Khóa học công nghệ', value: 45 },
    { name: 'Khóa học kinh doanh', value: 25 },
    { name: 'Khóa học ngôn ngữ', value: 15 },
    { name: 'Khóa học kỹ năng mềm', value: 10 },
    { name: 'Khóa học khác', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Format to currency
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    }).format(value);
};

export default function RevenueOverview({ className }: RevenueOverviewProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Tổng quan doanh thu</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Doanh thu theo tháng</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={monthlyRevenueData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis
                                        yAxisId="left"
                                        orientation="left"
                                        stroke="#8884d8"
                                        tickFormatter={(value) => value >= 1000000 ? `${(value / 1000000).toFixed(0)}tr` : value.toString()}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        stroke="#82ca9d"
                                    />
                                    <Tooltip
                                        formatter={(value, name) => {
                                            if (name === 'revenue') return [formatCurrency(value as number), 'Doanh thu'];
                                            return [value, 'Số khóa học'];
                                        }}
                                    />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="revenue" name="Doanh thu" fill="#8884d8" />
                                    <Bar yAxisId="right" dataKey="courses" name="Số khóa học" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Phân bố doanh thu theo danh mục</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={revenueDistributionData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={true}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        nameKey="name"
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {revenueDistributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value}%`, 'Tỷ lệ']} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h4 className="text-gray-500 text-sm">Doanh thu năm</h4>
                        <p className="text-2xl font-bold mt-1">677,400,000 ₫</p>
                        <p className="text-sm text-green-600 flex items-center mt-1">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                            </svg>
                            +25.4% so với năm trước
                        </p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h4 className="text-gray-500 text-sm">Phí nền tảng</h4>
                        <p className="text-2xl font-bold mt-1">135,480,000 ₫</p>
                        <p className="text-sm text-gray-500 mt-1">20% tổng doanh thu</p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h4 className="text-gray-500 text-sm">Chi trả cho giảng viên</h4>
                        <p className="text-2xl font-bold mt-1">541,920,000 ₫</p>
                        <p className="text-sm text-gray-500 mt-1">80% tổng doanh thu</p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h4 className="text-gray-500 text-sm">Giá trung bình/khóa học</h4>
                        <p className="text-2xl font-bold mt-1">345,000 ₫</p>
                        <p className="text-sm text-green-600 flex items-center mt-1">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                            </svg>
                            +5.2% so với năm trước
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}