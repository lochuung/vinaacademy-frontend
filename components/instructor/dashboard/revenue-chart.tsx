"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

// Mock data cho biểu đồ doanh thu
const revenueData = [
    { name: 'T1', revenue: 4500000 },
    { name: 'T2', revenue: 5200000 },
    { name: 'T3', revenue: 4900000 },
    { name: 'T4', revenue: 5800000 },
    { name: 'T5', revenue: 6700000 },
    { name: 'T6', revenue: 7100000 },
    { name: 'T7', revenue: 8200000 },
    { name: 'T8', revenue: 7800000 },
    { name: 'T9', revenue: 8500000 },
    { name: 'T10', revenue: 9100000 },
    { name: 'T11', revenue: 9800000 },
    { name: 'T12', revenue: 10500000 },
];

// Format to currency
const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    }).format(num);
};

export default function RevenueChart() {
    return (
        <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                <CardTitle className="text-base font-medium">Doanh thu theo tháng</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={revenueData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                        <YAxis
                            tickFormatter={(value) => value >= 1000000 ? `${(value / 1000000).toFixed(0)}tr` : value.toString()}
                            tick={{ fill: '#6b7280' }}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'white', borderColor: '#e5e7eb' }}
                            formatter={(value: any) => [formatCurrency(value), 'Doanh thu']}
                        />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#000000"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                            name="Doanh thu"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}