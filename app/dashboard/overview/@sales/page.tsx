import React from 'react'; // Import React
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import các component Card từ thư mục components/ui

// Định nghĩa component SalesPage
export default function SalesPage() {
    return (
        <Card> {/* Sử dụng component Card */}
            <CardHeader> {/* Header của Card */}
                <CardTitle>Sales Overview</CardTitle> {/* Tiêu đề của Card */}
            </CardHeader>
            <CardContent> {/* Nội dung của Card */}
                <div className='text-2xl font-bold'>+12,234</div> {/* Số liệu bán hàng */}
                <p className='text-xs text-muted-foreground'>+19% from last month</p> {/* Tỷ lệ tăng trưởng */}
            </CardContent>
        </Card>
    );
}