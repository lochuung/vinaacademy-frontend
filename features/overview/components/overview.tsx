import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaGraph } from './area-graph';
import { BarGraph } from './bar-graph';
import { PieGraph } from './pie-graph';
import { RecentSales } from './recent-sales';

// Component OverViewPage hiển thị trang tổng quan (overview) của dashboard
export default function OverViewPage() {
    return (
        // PageContainer bọc toàn bộ nội dung của trang
        <PageContainer>
            {/* Khối chứa phần tiêu đề và nút Download */}
            <div className='flex flex-1 flex-col space-y-2'>
                {/* Header với lời chào và nút Download (chỉ hiển thị trên màn hình md trở lên) */}
                <div className='flex items-center justify-between space-y-2'>
                    <h2 className='text-2xl font-bold tracking-tight'>
                        Hi, Welcome back 👋
                    </h2>
                    <div className='hidden items-center space-x-2 md:flex'>
                        <Button>Download</Button>
                    </div>
                </div>
                {/* Các tab để chuyển đổi giữa các chế độ hiển thị */}
                <Tabs defaultValue='overview' className='space-y-4'>
                    {/* Danh sách các tab */}
                    <TabsList>
                        <TabsTrigger value='overview'>Overview</TabsTrigger>
                        <TabsTrigger value='analytics' disabled>
                            Analytics
                        </TabsTrigger>
                    </TabsList>
                    {/* Nội dung hiển thị cho tab "Overview" */}
                    <TabsContent value='overview' className='space-y-4'>
                        {/* Lưới các thẻ tổng quan (cards) với thông tin Revenue, Subscriptions, Sales, Active Now */}
                        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                            {/* Card hiển thị Total Revenue */}
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                        Total Revenue
                                    </CardTitle>
                                    {/* Icon minh họa cho doanh thu */}
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        className='h-4 w-4 text-muted-foreground'
                                    >
                                        <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>$45,231.89</div>
                                    <p className='text-xs text-muted-foreground'>
                                        +20.1% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            {/* Card hiển thị Subscriptions */}
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                        Subscriptions
                                    </CardTitle>
                                    {/* Icon minh họa cho Subscriptions */}
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        className='h-4 w-4 text-muted-foreground'
                                    >
                                        <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                                        <circle cx='9' cy='7' r='4' />
                                        <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>+2350</div>
                                    <p className='text-xs text-muted-foreground'>
                                        +180.1% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            {/* Card hiển thị Sales */}
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                        Sales
                                    </CardTitle>
                                    {/* Icon minh họa cho Sales */}
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        className='h-4 w-4 text-muted-foreground'
                                    >
                                        <rect width='20' height='14' x='2' y='5' rx='2' />
                                        <path d='M2 10h20' />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>+12,234</div>
                                    <p className='text-xs text-muted-foreground'>
                                        +19% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            {/* Card hiển thị Active Now */}
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                        Active Now
                                    </CardTitle>
                                    {/* Icon minh họa cho Active Now */}
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        className='h-4 w-4 text-muted-foreground'
                                    >
                                        <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-2xl font-bold'>+573</div>
                                    <p className='text-xs text-muted-foreground'>
                                        +201 since last hour
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        {/* Lưới chứa các biểu đồ tổng quan */}
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
                            {/* Biểu đồ cột: BarGraph */}
                            <div className='col-span-4'>
                                <BarGraph />
                            </div>
                            {/* Card chứa thông tin về Recent Sales */}
                            <Card className='col-span-4 md:col-span-3'>
                                <CardHeader>
                                    <CardTitle>Recent Sales</CardTitle>
                                    <CardDescription>
                                        You made 265 sales this month.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RecentSales />
                                </CardContent>
                            </Card>
                            {/* Biểu đồ dạng area: AreaGraph */}
                            <div className='col-span-4'>
                                <AreaGraph />
                            </div>
                            {/* Biểu đồ hình tròn: PieGraph */}
                            <div className='col-span-4 md:col-span-3'>
                                <PieGraph />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </PageContainer>
    );
}