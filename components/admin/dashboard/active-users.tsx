"use client";

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

interface ActiveUsersProps {
    className?: string;
}

// Mock data cho biểu đồ người dùng hoạt động
const activeUsersData = [
    {name: 'T1', activeUsers: 8450, newUsers: 1245},
    {name: 'T2', activeUsers: 9120, newUsers: 1380},
    {name: 'T3', activeUsers: 10250, newUsers: 1520},
    {name: 'T4', activeUsers: 11380, newUsers: 1680},
    {name: 'T5', activeUsers: 12450, newUsers: 1780},
    {name: 'T6', activeUsers: 13620, newUsers: 1850},
    {name: 'T7', activeUsers: 15240, newUsers: 1920},
    {name: 'T8', activeUsers: 16830, newUsers: 2150},
    {name: 'T9', activeUsers: 18420, newUsers: 2380},
    {name: 'T10', activeUsers: 20150, newUsers: 2510},
    {name: 'T11', activeUsers: 22380, newUsers: 2680},
    {name: 'T12', activeUsers: 24650, newUsers: 2840},
];

export default function ActiveUsers({className}: ActiveUsersProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Người dùng hoạt động</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={activeUsersData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Line
                                type="monotone"
                                dataKey="activeUsers"
                                name="Người dùng hoạt động"
                                stroke="#8884d8"
                                activeDot={{r: 8}}
                            />
                            <Line
                                type="monotone"
                                dataKey="newUsers"
                                name="Người dùng mới"
                                stroke="#82ca9d"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                            <h4 className="text-gray-500 text-sm">Tổng người dùng</h4>
                            <span
                                className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">+12.5%</span>
                        </div>
                        <p className="text-2xl font-bold mt-1">24,650</p>
                        <div className="mt-4">
                            <div className="flex justify-between mb-1 text-xs">
                                <span>Học viên</span>
                                <span>85%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="flex justify-between mb-1 text-xs">
                                <span>Giảng viên</span>
                                <span>15%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{width: '15%'}}></div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                            <h4 className="text-gray-500 text-sm">Tỷ lệ giữ chân</h4>
                            <span
                                className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">+5.2%</span>
                        </div>
                        <p className="text-2xl font-bold mt-1">78.4%</p>
                        <div className="mt-4 space-y-3">
                            <div>
                                <div className="flex justify-between mb-1 text-xs">
                                    <span>Mobile</span>
                                    <span>62%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '62%'}}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1 text-xs">
                                    <span>Desktop</span>
                                    <span>32%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-indigo-500 h-2 rounded-full" style={{width: '32%'}}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1 text-xs">
                                    <span>Tablet</span>
                                    <span>6%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-pink-500 h-2 rounded-full" style={{width: '6%'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}