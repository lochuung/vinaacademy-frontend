'use client'; // Chỉ định rằng file này sẽ được render phía client

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // Import các component Alert từ thư mục components/ui
import { Button } from '@/components/ui/button'; // Import component Button từ thư mục components/ui
import { Card, CardContent, CardHeader } from '@/components/ui/card'; // Import các component Card từ thư mục components/ui
import { AlertCircle } from 'lucide-react'; // Import icon AlertCircle từ thư viện lucide-react
import { useRouter } from 'next/navigation'; // Import hook useRouter từ next/navigation
import { useTransition } from 'react'; // Import hook useTransition từ react

// Định nghĩa interface cho các props của component StatsError
interface StatsErrorProps {
    error: Error; // Prop error là một đối tượng Error
    reset: () => void; // Prop reset là một hàm không có tham số và không trả về giá trị
}

// Định nghĩa component StatsError
export default function StatsError({ error, reset }: StatsErrorProps) {
    const router = useRouter(); // Sử dụng hook useRouter để lấy đối tượng router
    const [isPending, startTransition] = useTransition(); // Sử dụng hook useTransition để quản lý trạng thái chuyển tiếp

    // Định nghĩa hàm reload để làm mới trang và reset trạng thái lỗi
    const reload = () => {
        startTransition(() => {
            router.refresh(); // Làm mới trang
            reset(); // Gọi hàm reset để reset trạng thái lỗi
        });
    };

    return (
        <Card className='border-red-500'> {/* Sử dụng component Card với viền màu đỏ */}
            <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'> {/* Header của Card */}
                <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'> {/* Nội dung bên trong Header */}
                    <Alert variant='destructive' className='border-none'> {/* Sử dụng component Alert với biến thể destructive */}
                        <AlertCircle className='h-4 w-4' /> {/* Icon AlertCircle */}
                        <AlertTitle>Error</AlertTitle> {/* Tiêu đề của Alert */}
                        <AlertDescription className='mt-2'>
                            Failed to load statistics: {error.message} {/* Mô tả lỗi */}
                        </AlertDescription>
                    </Alert>
                </div>
            </CardHeader>
            <CardContent className='flex h-[316px] items-center justify-center p-6'> {/* Nội dung của Card */}
                <div className='text-center'> {/* Nội dung được căn giữa */}
                    <p className='mb-4 text-sm text-muted-foreground'>
                        Unable to display statistics at this time {/* Thông báo không thể hiển thị thống kê */}
                    </p>
                    <Button
                        onClick={() => reload()} // Gọi hàm reload khi nhấn nút
                        variant='outline'
                        className='min-w-[120px]'
                        disabled={isPending} // Vô hiệu hóa nút khi đang trong trạng thái chuyển tiếp
                    >
                        Try again {/* Văn bản trên nút */}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}