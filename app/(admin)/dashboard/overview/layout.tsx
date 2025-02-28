import PageContainer from '@/components/layout/page-container'; // Import component PageContainer từ thư mục components/layout
import React from 'react'; // Import React

// Định nghĩa component OverViewLayout với các props là sales, pie_stats, bar_stats, area_stats
// layout.tsx nên chỉ chứa cấu trúc cơ bản
export default function OverViewLayout({
    children,
    header,
    metrics,
    charts
}: {
    children: React.ReactNode;
    header?: React.ReactNode;
    metrics?: React.ReactNode;
    charts?: React.ReactNode;
}) {
    return (
        <PageContainer>
            <div className='flex flex-1 flex-col space-y-2'>
                {header}
                {metrics}
                {charts}
                {children}
            </div>
        </PageContainer>
    );
}
