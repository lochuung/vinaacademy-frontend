import PageContainer from '@/components/layout/page-container'; // Import component PageContainer từ thư mục components/layout
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import các component Card từ thư mục components/ui
import React from 'react'; // Import React

// Hàm OverViewLayout nhận vào các props là sales, pie_stats, bar_stats, area_stats
export default function OverViewLayout({
    sales,
    pie_stats,
    bar_stats,
    area_stats
}: {
    sales: React.ReactNode;
    pie_stats: React.ReactNode;
    bar_stats: React.ReactNode;
    area_stats: React.ReactNode;
}) {
    return (
        // Sử dụng PageContainer để bao bọc toàn bộ nội dung
        <PageContainer>
            <div className='flex flex-1 flex-col space-y-2'> {/* Container chính */}
                <div className='flex items-center justify-between space-y-2'> {/* Header */}
                    <h2 className='text-2xl font-bold tracking-tight'>
                        Hi, Welcome back 👋
                    </h2>
                </div>
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'> {/* Grid chứa các thẻ Card */}
                    {/* Thẻ Card hiển thị tổng doanh thu */}
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'> {/* Header của Card */}
                            <CardTitle className='text-sm font-medium'>
                                Total Revenue
                            </CardTitle>
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
                        <CardContent> {/* Nội dung của Card */}
                            <div className='text-2xl font-bold'>$45,231.89</div>
                            <p className='text-xs text-muted-foreground'>
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    {/* Thẻ Card hiển thị số lượng đăng ký */}
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'> {/* Header của Card */}
                            <CardTitle className='text-sm font-medium'>
                                Subscriptions
                            </CardTitle>
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
                        <CardContent> {/* Nội dung của Card */}
                            <div className='text-2xl font-bold'>+2350</div>
                            <p className='text-xs text-muted-foreground'>
                                +180.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    {/* Thẻ Card hiển thị số lượng bán hàng */}
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'> {/* Header của Card */}
                            <CardTitle className='text-sm font-medium'>Sales</CardTitle>
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
                        <CardContent> {/* Nội dung của Card */}
                            <div className='text-2xl font-bold'>+12,234</div>
                            <p className='text-xs text-muted-foreground'>
                                +19% from last month
                            </p>
                        </CardContent>
                    </Card>
                    {/* Thẻ Card hiển thị số lượng người dùng đang hoạt động */}
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'> {/* Header của Card */}
                            <CardTitle className='text-sm font-medium'>Active Now</CardTitle>
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
                        <CardContent> {/* Nội dung của Card */}
                            <div className='text-2xl font-bold'>+573</div>
                            <p className='text-xs text-muted-foreground'>
                                +201 since last hour
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'> {/* Grid chứa các biểu đồ */}
                    <div className='col-span-4'>{bar_stats}</div> {/* Biểu đồ bar */}
                    <div className='col-span-4 md:col-span-3'>
                        {/* sales arallel routes */}
                        {sales}
                    </div>
                    <div className='col-span-4'>{area_stats}</div> {/* Biểu đồ area */}
                    <div className='col-span-4 md:col-span-3'>{pie_stats}</div> {/* Biểu đồ pie */}
                </div>
            </div>
        </PageContainer>
    );
}