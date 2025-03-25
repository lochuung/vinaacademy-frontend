"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

// Mock data cho biểu đồ tương tác
const engagementData = [
    { name: 'T1', views: 750, completions: 120 },
    { name: 'T2', views: 820, completions: 150 },
    { name: 'T3', views: 880, completions: 180 },
    { name: 'T4', views: 950, completions: 220 },
    { name: 'T5', views: 1020, completions: 250 },
    { name: 'T6', views: 1150, completions: 270 },
    { name: 'T7', views: 1250, completions: 300 },
    { name: 'T8', views: 1350, completions: 320 },
    { name: 'T9', views: 1450, completions: 350 },
    { name: 'T10', views: 1550, completions: 380 },
    { name: 'T11', views: 1650, completions: 420 },
    { name: 'T12', views: 1750, completions: 450 },
];

export default function EngagementChart() {
    return (
        <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                <CardTitle className="text-base font-medium">Lượt xem & Hoàn thành</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={engagementData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                        <YAxis tick={{ fill: '#6b7280' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'white', borderColor: '#e5e7eb' }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="views"
                            stroke="#000000"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                            name="Lượt xem"
                        />
                        <Line
                            type="monotone"
                            dataKey="completions"
                            stroke="#6D6D6D"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                            name="Hoàn thành"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}