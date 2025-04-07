"use client";

import {useState} from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar
} from 'recharts';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

type UserGrowthProps = {
    timeRange: 'week' | 'month' | 'quarter' | 'year';
};

export default function UserGrowth({timeRange}: UserGrowthProps) {
    const [view, setView] = useState<'growth' | 'demographics' | 'retention'>('growth');

    // Mô phỏng dữ liệu tăng trưởng người dùng dựa trên timeRange
    const generateGrowthData = () => {
        if (timeRange === 'week') {
            return [
                {name: 'Thứ 2', students: 45, instructors: 3, total: 48},
                {name: 'Thứ 3', students: 52, instructors: 4, total: 56},
                {name: 'Thứ 4', students: 62, instructors: 5, total: 67},
                {name: 'Thứ 5', students: 58, instructors: 4, total: 62},
                {name: 'Thứ 6', students: 72, instructors: 6, total: 78},
                {name: 'Thứ 7', students: 85, instructors: 7, total: 92},
                {name: 'CN', students: 68, instructors: 5, total: 73},
            ];
        } else if (timeRange === 'month') {
            return Array.from({length: 30}, (_, i) => ({
                name: `${i + 1}`,
                students: 30 + Math.floor(Math.random() * 60),
                instructors: 2 + Math.floor(Math.random() * 6),
                get total() {
                    return this.students + this.instructors
                }
            }));
        } else if (timeRange === 'quarter') {
            return [
                {name: 'Tuần 1', students: 260, instructors: 18, total: 278},
                {name: 'Tuần 2', students: 285, instructors: 20, total: 305},
                {name: 'Tuần 3', students: 310, instructors: 22, total: 332},
                {name: 'Tuần 4', students: 335, instructors: 23, total: 358},
                {name: 'Tuần 5', students: 350, instructors: 24, total: 374},
                {name: 'Tuần 6', students: 375, instructors: 26, total: 401},
                {name: 'Tuần 7', students: 390, instructors: 27, total: 417},
                {name: 'Tuần 8', students: 410, instructors: 28, total: 438},
                {name: 'Tuần 9', students: 425, instructors: 30, total: 455},
                {name: 'Tuần 10', students: 445, instructors: 32, total: 477},
                {name: 'Tuần 11', students: 465, instructors: 33, total: 498},
                {name: 'Tuần 12', students: 490, instructors: 35, total: 525},
            ];
        } else {
            return [
                {name: 'T1', students: 950, instructors: 68, total: 1018},
                {name: 'T2', students: 1050, instructors: 75, total: 1125},
                {name: 'T3', students: 1150, instructors: 82, total: 1232},
                {name: 'T4', students: 1250, instructors: 89, total: 1339},
                {name: 'T5', students: 1350, instructors: 96, total: 1446},
                {name: 'T6', students: 1450, instructors: 103, total: 1553},
                {name: 'T7', students: 1550, instructors: 110, total: 1660},
                {name: 'T8', students: 1650, instructors: 117, total: 1767},
                {name: 'T9', students: 1750, instructors: 124, total: 1874},
                {name: 'T10', students: 1850, instructors: 131, total: 1981},
                {name: 'T11', students: 1950, instructors: 138, total: 2088},
                {name: 'T12', students: 2050, instructors: 145, total: 2195},
            ];
        }
    };

    const growthData = generateGrowthData();

    // Dữ liệu về nhân khẩu học của người dùng
    const demographicsData = [
        {name: '18-24', value: 35},
        {name: '25-34', value: 45},
        {name: '35-44', value: 15},
        {name: '45+', value: 5},
    ];

    const genderData = [
        {name: 'Nam', value: 60},
        {name: 'Nữ', value: 40},
    ];

    const locationData = [
        {name: 'Hà Nội', value: 35},
        {name: 'TP.HCM', value: 40},
        {name: 'Đà Nẵng', value: 10},
        {name: 'Khác', value: 15},
    ];

    // Dữ liệu về giữ chân người dùng
    const retentionData = [
        {name: 'Tuần 1', rate: 100},
        {name: 'Tuần 2', rate: 85},
        {name: 'Tuần 3', rate: 75},
        {name: 'Tuần 4', rate: 68},
        {name: 'Tuần 5', rate: 62},
        {name: 'Tuần 6', rate: 58},
        {name: 'Tuần 7', rate: 55},
        {name: 'Tuần 8', rate: 52},
    ];

    // Màu sắc cho biểu đồ
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
    const GENDER_COLORS = ['#0088FE', '#FF8042'];

    // Custom tooltip cho biểu đồ
    const CustomTooltip = ({active, payload, label}: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border rounded shadow-sm">
                    <p className="font-medium">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{color: entry.color}}>
                            {entry.name}: {entry.value}
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
                    <TabsTrigger value="growth">Tăng trưởng</TabsTrigger>
                    <TabsTrigger value="demographics">Nhân khẩu học</TabsTrigger>
                    <TabsTrigger value="retention">Giữ chân</TabsTrigger>
                </TabsList>

                <TabsContent value="growth" className="space-y-4">
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={growthData}
                                margin={{top: 10, right: 30, left: 0, bottom: 0}}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip content={<CustomTooltip/>}/>
                                <Legend/>
                                <Line
                                    type="monotone"
                                    dataKey="students"
                                    name="Học viên"
                                    stroke="#8884d8"
                                    activeDot={{r: 8}}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="instructors"
                                    name="Giảng viên"
                                    stroke="#82ca9d"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    name="Tổng"
                                    stroke="#ff7300"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Tổng người dùng mới</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {growthData.reduce((sum, item) => sum + item.total, 0)}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Học viên mới</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {growthData.reduce((sum, item) => sum + item.students, 0)}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Giảng viên mới</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {growthData.reduce((sum, item) => sum + item.instructors, 0)}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="demographics" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Độ tuổi */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Độ tuổi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-52">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={demographicsData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={70}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {demographicsData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                                ))}
                                            </Pie>
                                            <Tooltip/>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Giới tính */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Giới tính</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-52">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={genderData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={70}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {genderData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`}
                                                          fill={GENDER_COLORS[index % GENDER_COLORS.length]}/>
                                                ))}
                                            </Pie>
                                            <Tooltip/>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Vị trí */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Địa điểm</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-52">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={locationData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={70}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {locationData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                                ))}
                                            </Pie>
                                            <Tooltip/>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="retention" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tỷ lệ giữ chân người dùng</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={retentionData}
                                        margin={{top: 10, right: 30, left: 0, bottom: 0}}
                                    >
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="name"/>
                                        <YAxis domain={[0, 100]}/>
                                        <Tooltip content={<CustomTooltip/>}/>
                                        <Legend/>
                                        <Bar
                                            dataKey="rate"
                                            name="Tỷ lệ giữ chân (%)"
                                            fill="#8884d8"
                                            background={{fill: '#eee'}}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 bg-gray-50 p-4 rounded-md">
                                <h3 className="font-medium mb-2">Phân tích giữ chân người dùng</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Tỷ lệ giữ chân trung bình sau 8
                                    tuần: {retentionData.reduce((sum, item) => sum + item.rate, 0) / retentionData.length}%
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-medium mb-1">Tỷ lệ chuyển đổi</h4>
                                        <p className="text-sm text-gray-600">
                                            Người dùng miễn phí sang trả phí: 12.5%
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Người dùng dùng thử sang trả phí đầy đủ: 35.8%
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium mb-1">Tỷ lệ rời bỏ</h4>
                                        <p className="text-sm text-gray-600">
                                            Tuần đầu tiên: {100 - retentionData[1].rate}%
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Tháng đầu tiên: {100 - retentionData[3].rate}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}