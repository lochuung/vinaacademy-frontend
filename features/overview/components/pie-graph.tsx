'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart';

// Dữ liệu cho biểu đồ tròn: mỗi đối tượng đại diện cho 1 trình duyệt với số lượng visitors và màu sắc
const chartData = [
    { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
    { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
    { browser: 'firefox', visitors: 287, fill: 'var(--color-firefox)' },
    { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
    { browser: 'other', visitors: 190, fill: 'var(--color-other)' }
];

// Cấu hình biểu đồ: định nghĩa nhãn và màu cho từng trình duyệt được hiển thị
const chartConfig = {
    visitors: {
        label: 'Visitors' // Nhãn tổng số lượt truy cập
    },
    chrome: {
        label: 'Chrome',
        color: 'hsl(var(--chart-1))'
    },
    safari: {
        label: 'Safari',
        color: 'hsl(var(--chart-2))'
    },
    firefox: {
        label: 'Firefox',
        color: 'hsl(var(--chart-3))'
    },
    edge: {
        label: 'Edge',
        color: 'hsl(var(--chart-4))'
    },
    other: {
        label: 'Other',
        color: 'hsl(var(--chart-5))'
    }
} satisfies ChartConfig;

// Component PieGraph hiển thị biểu đồ tròn (donut chart) kèm thông tin lượt truy cập tổng hợp
export function PieGraph() {
    // Tính tổng số visitors từ tất cả trình duyệt
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
    }, []);

    return (
        <Card className='flex flex-col'>
            {/* Header của Card: tiêu đề biểu đồ và mô tả về khoảng thời gian */}
            <CardHeader className='items-center pb-0'>
                <CardTitle>Pie Chart - Donut with Text</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>

            {/* Nội dung của Card: chứa biểu đồ tròn */}
            <CardContent className='flex-1 pb-0'>
                <ChartContainer
                    config={chartConfig} // Truyền cấu hình nhãn và màu cho biểu đồ
                    className='mx-auto aspect-square max-h-[360px]' // Thiết lập kích thước container cho biểu đồ
                >
                    <PieChart>
                        {/* ChartTooltip: hiển thị thông tin tooltip khi hover vào phần của biểu đồ */}
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData} // Dữ liệu cho biểu đồ
                            dataKey='visitors' // Thuộc tính sử dụng để tính toán diện tích của từng phần
                            nameKey='browser'  // Thuộc tính hiển thị tên cho từng phần
                            innerRadius={60}   // Bán kính trong (tạo hiệu ứng donut)
                            strokeWidth={5}    // Độ dày của đường viền giữa các phần
                        >
                            {/* Label hiển thị nằm ở giữa biểu đồ, gồm tổng số visitors và nhãn "Visitors" */}
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor='middle'
                                                dominantBaseline='middle'
                                            >
                                                {/* Hiển thị tổng số visitors */}
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className='fill-foreground text-3xl font-bold'
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                {/* Hiển thị nhãn "Visitors" bên dưới số lượng */}
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className='fill-muted-foreground'
                                                >
                                                    Visitors
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>

            {/* Footer của Card: hiển thị thông tin bổ sung và xu hướng */}
            <CardFooter className='flex-col gap-2 text-sm'>
                <div className='flex items-center gap-2 font-medium leading-none'>
                    Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
                </div>
                <div className='leading-none text-muted-foreground'>
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}