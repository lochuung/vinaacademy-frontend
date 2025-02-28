import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Component AreaGraphSkeleton hiển thị giao diện xương cá (skeleton) cho biểu đồ dạng area
export function AreaGraphSkeleton() {
    return (
        <Card>
            {/* Phần header của thẻ card: chứa các xương cá để mô phỏng tiêu đề và mô tả */}
            <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
                <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
                    {/* Xương cá mô phỏng tiêu đề */}
                    <Skeleton className='h-6 w-[180px]' />
                    {/* Xương cá mô phỏng mô tả */}
                    <Skeleton className='h-4 w-[250px]' />
                </div>
            </CardHeader>
            {/* Phần nội dung của thẻ card: chứa biểu đồ dạng area với xương cá */}
            <CardContent className='px-2 sm:p-6'>
                {/* Hình dạng biểu đồ dạng area */}
                <div className='relative aspect-auto h-[280px] w-full'>
                    {/* Màu gradient mô phỏng biểu đồ */}
                    <div className='absolute inset-0 rounded-lg bg-gradient-to-t from-primary/5 to-primary/20' />
                    {/* Xương cá mô phỏng trục x (x-axis) */}
                    <Skeleton className='absolute bottom-0 left-0 right-0 h-[1px]' />{' '}
                    {/* Xương cá mô phỏng trục y (y-axis) */}
                    <Skeleton className='absolute bottom-0 left-0 top-0 w-[1px]' />{' '}
                </div>
            </CardContent>
        </Card>
    );
}