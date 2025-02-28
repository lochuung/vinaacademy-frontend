'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

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

// Dữ liệu biểu đồ: tổng số khách truy cập từ Desktop và Mobile trong 6 tháng
const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 }
];

// Cấu hình biểu đồ: định nghĩa nhãn và màu cho từng kiểu dữ liệu (desktop và mobile)
// Sử dụng 'satisfies ChartConfig' để đảm bảo cấu hình phù hợp với kiểu ChartConfig
const chartConfig = {
    desktop: {
        label: 'Desktop',                        // Nhãn cho dữ liệu từ Desktop
        color: 'hsl(var(--chart-1))'              // Màu hiển thị lấy từ biến CSS --chart-1
    },
    mobile: {
        label: 'Mobile',                         // Nhãn cho dữ liệu từ Mobile
        color: 'hsl(var(--chart-2))'              // Màu hiển thị lấy từ biến CSS --chart-2
    }
} satisfies ChartConfig;

// Component AreaGraph hiển thị biểu đồ dạng area (area chart) được xếp chồng (stacked)
export function AreaGraph() {
    return (
        <Card>
            {/* Phần header của card với tiêu đề và mô tả của biểu đồ */}
            <CardHeader>
                <CardTitle>Area Chart - Stacked</CardTitle>
                <CardDescription>
                    Showing total visitors for the last 6 months
                </CardDescription>
            </CardHeader>
            {/* Phần nội dung của card chứa biểu đồ */}
            <CardContent>
                {/* ChartContainer: Component bọc ngoài biểu đồ, nhận cấu hình và định dạng kích thước */}
                <ChartContainer
                    config={chartConfig}  // Truyền cấu hình màu và nhãn cho biểu đồ
                    className='aspect-auto h-[310px] w-full' // Thiết lập kích thước cho container biểu đồ
                >
                    {/* AreaChart: Component biểu đồ dạng diện tích dùng thư viện Recharts */}
                    <AreaChart
                        accessibilityLayer     // Cho phép truy cập hỗ trợ (accessibility)
                        data={chartData}         // Dữ liệu được hiển thị
                        margin={{
                            left: 12,
                            right: 12
                        }}                      // Đặt khoảng cách bên trái và bên phải của biểu đồ
                    >
                        {/* CartesianGrid: Lưới 2D của biểu đồ, chỉ hiển thị đường kẻ ngang */}
                        <CartesianGrid vertical={false} />
                        {/* XAxis: Trục hoành của biểu đồ */}
                        <XAxis
                            dataKey='month'                              // Dùng thuộc tính 'month' làm giá trị trên trục X
                            tickLine={false}                             // Ẩn đường tick của trục
                            axisLine={false}                             // Ẩn đường trục
                            tickMargin={8}                               // Khoảng cách giữa tick và giá trị hiển thị
                            tickFormatter={(value) => value.slice(0, 3)} // Chỉ hiển thị 3 ký tự đầu tiên của tháng (ví dụ: Jan, Feb, ...)
                        />
                        {/* ChartTooltip: Tooltip hiển thị thông tin khi hover qua biểu đồ */}
                        <ChartTooltip
                            cursor={false}   // Ẩn con trỏ khi hover
                            content={<ChartTooltipContent indicator='dot' />} // Hiển thị tooltip với chỉ thị dạng chấm
                        />
                        {/* Area cho dữ liệu mobile: vẽ diện tích cho số liệu Mobile */}
                        <Area
                            dataKey='mobile'              // Lấy dữ liệu từ 'mobile' trong chartData
                            type='natural'                // Kiểu đường cong tự nhiên
                            fill='var(--color-mobile)'    // Màu nền lấy từ biến CSS custom cho mobile
                            fillOpacity={0.4}             // Độ mờ của màu nền
                            stroke='var(--color-mobile)'  // Màu đường viền
                            stackId='a'                   // Chỉ định cùng 1 stack để các area xếp chồng lên nhau
                        />
                        {/* Area cho dữ liệu desktop: vẽ diện tích cho số liệu Desktop */}
                        <Area
                            dataKey='desktop'             // Lấy dữ liệu từ 'desktop' trong chartData
                            type='natural'                // Kiểu đường cong tự nhiên
                            fill='var(--color-desktop)'   // Màu nền lấy từ biến CSS custom cho desktop
                            fillOpacity={0.4}             // Độ mờ của màu nền
                            stroke='var(--color-desktop)' // Màu đường viền
                            stackId='a'                   // Dùng chung stack với mobile để xếp chồng
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            {/* Phần chân của card chứa thông tin bổ sung cho biểu đồ */}
            <CardFooter>
                <div className='flex w-full items-start gap-2 text-sm'>
                    <div className='grid gap-2'>
                        {/* Hiển thị thông tin xu hướng của biểu đồ, ví dụ tăng 5.2% trong tháng này */}
                        <div className='flex items-center gap-2 font-medium leading-none'>
                            Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
                        </div>
                        {/* Hiển thị khoảng thời gian của dữ liệu biểu đồ */}
                        <div className='flex items-center gap-2 leading-none text-muted-foreground'>
                            January - June 2024
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}