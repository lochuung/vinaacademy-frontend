"use client";

import { useState } from 'react';
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
    Cell,
    LineChart,
    Line
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type CoursePerformanceProps = {
    timeRange: 'week' | 'month' | 'quarter' | 'year';
};

export default function CoursePerformance({ timeRange }: CoursePerformanceProps) {
    const [view, setView] = useState<'popular' | 'engagement' | 'ratings'>('popular');

    // Dữ liệu về khóa học phổ biến
    const popularCoursesData = [
        { name: 'JavaScript Advanced', enrollments: 245, revenue: 49000000 },
        { name: 'Python for Data Science', enrollments: 210, revenue: 42000000 },
        { name: 'React Fundamentals', enrollments: 185, revenue: 37000000 },
        { name: 'UI/UX Design', enrollments: 165, revenue: 33000000 },
        { name: 'Node.js Backend', enrollments: 140, revenue: 28000000 },
        { name: 'Digital Marketing', enrollments: 125, revenue: 25000000 },
        { name: 'Flutter Development', enrollments: 110, revenue: 22000000 },
        { name: 'Machine Learning', enrollments: 95, revenue: 19000000 },
    ];

    // Dữ liệu về tương tác khóa học
    const generateEngagementData = () => {
        if (timeRange === 'week') {
            return [
                { name: 'Thứ 2', completionRate: 28, watchTime: 142, assignments: 86 },
                { name: 'Thứ 3', completionRate: 32, watchTime: 158, assignments: 94 },
                { name: 'Thứ 4', completionRate: 37, watchTime: 172, assignments: 102 },
                { name: 'Thứ 5', completionRate: 35, watchTime: 165, assignments: 98 },
                { name: 'Thứ 6', completionRate: 42, watchTime: 188, assignments: 110 },
                { name: 'Thứ 7', completionRate: 48, watchTime: 210, assignments: 125 },
                { name: 'CN', completionRate: 44, watchTime: 196, assignments: 115 },
            ];
        } else if (timeRange === 'month') {
            return Array.from({ length: 30 }, (_, i) => ({
                name: `${i + 1}`,
                completionRate: 25 + Math.floor(Math.random() * 25),
                watchTime: 140 + Math.floor(Math.random() * 80),
                assignments: 80 + Math.floor(Math.random() * 50),
            }));
        } else if (timeRange === 'quarter') {
            return [
                { name: 'Tuần 1', completionRate: 32, watchTime: 165, assignments: 98 },
                { name: 'Tuần 2', completionRate: 35, watchTime: 172, assignments: 102 },
                { name: 'Tuần 3', completionRate: 38, watchTime: 178, assignments: 105 },
                { name: 'Tuần 4', completionRate: 40, watchTime: 185, assignments: 110 },
                { name: 'Tuần 5', completionRate: 42, watchTime: 192, assignments: 114 },
                { name: 'Tuần 6', completionRate: 45, watchTime: 198, assignments: 118 },
                { name: 'Tuần 7', completionRate: 47, watchTime: 205, assignments: 122 },
                { name: 'Tuần 8', completionRate: 48, watchTime: 212, assignments: 126 },
                { name: 'Tuần 9', completionRate: 50, watchTime: 218, assignments: 130 },
                { name: 'Tuần 10', completionRate: 52, watchTime: 225, assignments: 134 },
                { name: 'Tuần 11', completionRate: 54, watchTime: 232, assignments: 138 },
                { name: 'Tuần 12', completionRate: 58, watchTime: 240, assignments: 145 },
            ];
        } else {
            return [
                { name: 'T1', completionRate: 32, watchTime: 165, assignments: 98 },
                { name: 'T2', completionRate: 35, watchTime: 172, assignments: 102 },
                { name: 'T3', completionRate: 38, watchTime: 178, assignments: 105 },
                { name: 'T4', completionRate: 42, watchTime: 185, assignments: 110 },
                { name: 'T5', completionRate: 45, watchTime: 192, assignments: 114 },
                { name: 'T6', completionRate: 48, watchTime: 198, assignments: 118 },
                { name: 'T7', completionRate: 52, watchTime: 205, assignments: 122 },
                { name: 'T8', completionRate: 55, watchTime: 212, assignments: 126 },
                { name: 'T9', completionRate: 58, watchTime: 218, assignments: 130 },
                { name: 'T10', completionRate: 62, watchTime: 225, assignments: 134 },
                { name: 'T11', completionRate: 65, watchTime: 232, assignments: 138 },
                { name: 'T12', completionRate: 68, watchTime: 240, assignments: 145 },
            ];
        }
    };

    const engagementData = generateEngagementData();

    // Dữ liệu đánh giá khóa học
    const ratingsData = [
        { name: '5 sao', value: 58 },
        { name: '4 sao', value: 32 },
        { name: '3 sao', value: 7 },
        { name: '2 sao', value: 2 },
        { name: '1 sao', value: 1 },
    ];

    // Màu sắc cho biểu đồ
    const COLORS = ['#4CAF50', '#8BC34A', '#FFEB3B', '#FF9800', '#F44336'];

    // Top khóa học theo đánh giá
    const topRatedCourses = [
        { name: 'Machine Learning', rating: 4.9, reviews: 85 },
        { name: 'JavaScript Advanced', rating: 4.8, reviews: 120 },
        { name: 'UI/UX Design', rating: 4.8, reviews: 95 },
        { name: 'Python for Data Science', rating: 4.7, reviews: 110 },
        { name: 'React Fundamentals', rating: 4.6, reviews: 105 },
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
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border rounded shadow-sm">
                    <p className="font-medium">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                            {entry.name === 'Tỷ lệ hoàn thành' ? '%' :
                                entry.name === 'Thời gian xem' ? ' phút' : ''}
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
                    <TabsTrigger value="popular">Phổ biến</TabsTrigger>
                    <TabsTrigger value="engagement">Tương tác</TabsTrigger>
                    <TabsTrigger value="ratings">Đánh giá</TabsTrigger>
                </TabsList>

                <TabsContent value="popular" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Khóa học phổ biến nhất</CardTitle>
                            <CardDescription>Theo lượt ghi danh</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={popularCoursesData}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                                        layout="vertical"
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis type="category" dataKey="name" width={150} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend />
                                        <Bar
                                            dataKey="enrollments"
                                            name="Lượt ghi danh"
                                            fill="#8884d8"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Doanh thu theo khóa học</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={popularCoursesData}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                                        layout="vertical"
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            type="number"
                                            tickFormatter={(value) => {
                                                if (value >= 1000000) return `${value / 1000000}tr`;
                                                return value;
                                            }}
                                        />
                                        <YAxis type="category" dataKey="name" width={150} />
                                        <Tooltip
                                            formatter={(value: any) => formatCurrency(value)}
                                            content={<CustomTooltip />}
                                        />
                                        <Legend />
                                        <Bar
                                            dataKey="revenue"
                                            name="Doanh thu"
                                            fill="#82ca9d"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="engagement" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tương tác với khóa học</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={engagementData}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="completionRate"
                                            name="Tỷ lệ hoàn thành"
                                            stroke="#8884d8"
                                            activeDot={{ r: 8 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="watchTime"
                                            name="Thời gian xem"
                                            stroke="#82ca9d"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="assignments"
                                            name="Bài tập đã nộp"
                                            stroke="#ffc658"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Tỷ lệ hoàn thành trung bình</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {Math.round(engagementData.reduce((sum, item) => sum + item.completionRate, 0) / engagementData.length)}%
                                </div>
                                <p className="text-xs text-gray-500">
                                    {timeRange === 'week' ? '7 ngày qua' :
                                        timeRange === 'month' ? '30 ngày qua' :
                                            timeRange === 'quarter' ? '3 tháng qua' : '12 tháng qua'}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Thời gian xem trung bình</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {Math.round(engagementData.reduce((sum, item) => sum + item.watchTime, 0) / engagementData.length)} phút
                                </div>
                                <p className="text-xs text-gray-500">
                                    Mỗi học viên mỗi ngày
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Bài tập đã nộp trung bình</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {Math.round(engagementData.reduce((sum, item) => sum + item.assignments, 0) / engagementData.length)}
                                </div>
                                <p className="text-xs text-gray-500">
                                    Mỗi ngày
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="ratings" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Phân bố đánh giá</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={ratingsData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {ratingsData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-4">
                                    <div className="text-sm font-medium text-center">
                                        Đánh giá trung bình: 4.4/5
                                    </div>
                                    <div className="text-xs text-gray-500 text-center">
                                        Dựa trên 1,248 đánh giá
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Khóa học được đánh giá cao nhất</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {topRatedCourses.map((course, index) => (
                                        <div key={index} className="flex items-center justify-between border-b pb-2">
                                            <div>
                                                <h4 className="text-sm font-medium">{course.name}</h4>
                                                <p className="text-xs text-gray-500">{course.reviews} đánh giá</p>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="font-medium mr-1">{course.rating}</span>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Phản hồi phổ biến</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium">Điểm mạnh</h3>
                                    <ul className="list-disc pl-5 mt-1 text-sm">
                                        <li>Nội dung thực tế và cập nhật (87%)</li>
                                        <li>Giảng viên giàu kinh nghiệm và truyền cảm hứng (82%)</li>
                                        <li>Bài tập và thực hành hữu ích (78%)</li>
                                        <li>Tài liệu học tập đầy đủ và chi tiết (75%)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium">Điểm cần cải thiện</h3>
                                    <ul className="list-disc pl-5 mt-1 text-sm">
                                        <li>Cần nhiều bài tập thực hành hơn (42%)</li>
                                        <li>Phản hồi với câu hỏi của học viên chậm (38%)</li>
                                        <li>Một số nội dung quá khó đối với người mới bắt đầu (25%)</li>
                                        <li>Thời lượng của một số video quá dài (22%)</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}