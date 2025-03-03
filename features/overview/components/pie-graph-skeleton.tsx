import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Component PieGraphSkeleton hiển thị giao diện xương cá (skeleton UI)
// dành cho biểu đồ tròn (pie chart) khi dữ liệu đang được tải về
export function PieGraphSkeleton() {
    return (
        <Card>
            {/* Phần header của Card: mô phỏng tiêu đề và mô tả của biểu đồ */}
            <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0'>
                <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
                    {/* Xương cá mô phỏng tiêu đề */}
                    <Skeleton className='h-6 w-[180px]' />
                    {/* Xương cá mô phỏng mô tả */}
                    <Skeleton className='h-4 w-[250px]' />
                </div>
            </CardHeader>
            {/* Phần nội dung của Card: chứa biểu đồ tròn xương cá */}
            <CardContent className='p-6'>
                <div className='flex h-[280px] items-center justify-center'>
                    {/* Xương cá hình tròn mô phỏng phần hiển thị của biểu đồ tròn */}
                    <Skeleton className='h-[300px] w-[300px] rounded-full' />
                </div>
            </CardContent>
        </Card>
    );
}