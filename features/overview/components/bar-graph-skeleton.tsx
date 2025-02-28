import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Component BarGraphSkeleton hiển thị giao diện xương cá (skeleton UI) cho biểu đồ dạng cột
export function BarGraphSkeleton() {
    return (
        <Card>
            {/* Phần header của card: hiển thị xương cá mô phỏng tiêu đề và phần mô tả */}
            <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
                {/* Khối chứa xương cá cho tiêu đề và mô tả */}
                <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
                    {/* Xương cá mô phỏng tiêu đề */}
                    <Skeleton className='h-6 w-[180px]' />
                    {/* Xương cá mô phỏng mô tả */}
                    <Skeleton className='h-4 w-[250px]' />
                </div>
                {/* Khối hiển thị thêm một số xương cá mô phỏng thông tin phụ (có thể là chỉ số hoặc số liệu nhỏ) */}
                <div className='flex'>
                    {[1, 2].map((i) => (
                        <div
                            key={i}
                            className='relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
                        >
                            {/* Xương cá mô phỏng tiêu đề phụ */}
                            <Skeleton className='h-3 w-[80px]' />
                            {/* Xương cá mô phỏng số liệu chính */}
                            <Skeleton className='h-8 w-[100px] sm:h-10' />
                        </div>
                    ))}
                </div>
            </CardHeader>
            {/* Phần nội dung của card: chứa biểu đồ cột xương cá */}
            <CardContent className='px-2 sm:p-6'>
                {/* Các hình dạng cột mô phỏng biểu đồ */}
                <div className='flex aspect-auto h-[280px] w-full items-end justify-around gap-2 pt-8'>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <Skeleton
                            key={i}
                            className='w-full'
                            style={{
                                // Chiều cao cột được tính ngẫu nhiên từ 20% đến 100%
                                height: `${Math.max(20, Math.random() * 100)}%`
                            }}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}