"use client";

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

// Mock data cho biểu đồ số lượng học viên
const studentData = [
    {name: 'T1', students: 15},
    {name: 'T2', students: 22},
    {name: 'T3', students: 18},
    {name: 'T4', students: 25},
    {name: 'T5', students: 35},
    {name: 'T6', students: 42},
    {name: 'T7', students: 48},
    {name: 'T8', students: 52},
    {name: 'T9', students: 58},
    {name: 'T10', students: 65},
    {name: 'T11', students: 68},
    {name: 'T12', students: 75},
];

export default function StudentsChart() {
    return (
        <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                <CardTitle className="text-base font-medium">Học viên mới theo tháng</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={studentData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                        <XAxis dataKey="name" tick={{fill: '#6b7280'}}/>
                        <YAxis tick={{fill: '#6b7280'}}/>
                        <Tooltip
                            contentStyle={{backgroundColor: 'white', borderColor: '#e5e7eb'}}
                            formatter={(value: any) => [`${value} học viên`, 'Học viên mới']}
                        />
                        <Bar
                            dataKey="students"
                            fill="#000000"
                            radius={[4, 4, 0, 0]}
                            name="Học viên mới"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}