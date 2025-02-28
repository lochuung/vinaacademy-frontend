import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Component RecentSalesSkeleton hiển thị giao diện xương cá (skeleton UI)
// dùng cho phần hiển thị các giao dịch bán hàng khi dữ liệu đang được tải về
export function RecentSalesSkeleton() {
    return (
        <Card>
            {/* Phần header của Card: mô phỏng tiêu đề và mô tả của phần Recent Sales */}
            <CardHeader>
                {/* Xương cá mô phỏng tiêu đề (CardTitle) */}
                <Skeleton className='h-6 w-[140px]' />
                {/* Xương cá mô phỏng mô tả (CardDescription) */}
                <Skeleton className='h-4 w-[180px]' />
            </CardHeader>
            {/* Phần nội dung của Card: hiển thị danh sách các giao dịch bán hàng dạng xương cá */}
            <CardContent>
                <div className='space-y-8'>
                    {/* Lặp 5 lần để tạo 5 dòng giao dịch mẫu */}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className='flex items-center'>
                            {/* Xương cá mô phỏng avatar của người bán */}
                            <Skeleton className='h-9 w-9 rounded-full' />
                            <div className='ml-4 space-y-1'>
                                {/* Xương cá mô phỏng tên của người bán */}
                                <Skeleton className='h-4 w-[120px]' />
                                {/* Xương cá mô phỏng email hoặc thông tin phụ */}
                                <Skeleton className='h-4 w-[160px]' />
                            </div>
                            {/* Xương cá mô phỏng số tiền giao dịch */}
                            <Skeleton className='ml-auto h-4 w-[80px]' />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}