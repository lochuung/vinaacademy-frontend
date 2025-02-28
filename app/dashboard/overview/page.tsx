// components/overview/page.tsx
import React from 'react';
import OverViewLayout from './layout';
import { DashboardHeader } from '@/features/overview/components/DashboardHeader';
import { MetricsGrid } from '@/features/overview/components/MetricsGrid';
import { ChartsGrid } from '@/features/overview/components/ChartsGrid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Import các component Card từ thư mục components/ui
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarGraph } from '@/features/overview/components/bar-graph';
import { AreaGraph } from '@/features/overview/components/area-graph';
import { PieGraph } from '@/features/overview/components/pie-graph';
import { RecentSales } from '@/features/overview/components/recent-sales';

// Định nghĩa các types cho metrics data
interface MetricCardData {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
}

// Component chính của trang Overview
export default function OverviewPage() {
    // Data cho metrics cards - có thể được fetched từ API trong thực tế
    const metricsData: MetricCardData[] = [
        {
            title: 'Total Revenue',
            value: '$45,231.89',
            change: '+20.1% from last month',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            ),
        },
        {
            title: 'Subscriptions',
            value: '+2350',
            change: '+180.1% from last month',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
        },
        {
            title: 'Sales',
            value: '+12,234',
            change: '+19% from last month',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                </svg>
            ),
        },
        {
            title: 'Active Now',
            value: '+573',
            change: '+201 since last hour',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
            ),
        },
    ];

    return (
        <OverViewLayout>
            {/* Header Component */}
            <DashboardHeader
                title="Hi, Welcome back 👋"
                actions={
                    <div className="hidden items-center space-x-2 md:flex">
                        <Button>Download</Button>
                    </div>
                }
            />

            {/* Tabs Component */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics" disabled>
                        Analytics
                    </TabsTrigger>
                </TabsList>

                {/* Overview Content */}
                <TabsContent value="overview" className="space-y-4">
                    {/* Metrics Grid */}
                    <MetricsGrid metrics={metricsData} />

                    {/* Charts Grid */}
                    <ChartsGrid
                        barChart={<BarGraph />}
                        areaChart={<AreaGraph />}
                        pieChart={<PieGraph />}
                        recentSales={
                            <Card>
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
                        }
                    />
                </TabsContent>
            </Tabs>
        </OverViewLayout>
    );
}