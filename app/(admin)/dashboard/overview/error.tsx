'use client'; // Chỉ định rằng file này sẽ được render phía client

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // Import các component Alert từ thư mục components/ui
import { AlertCircle } from 'lucide-react'; // Import icon AlertCircle từ thư viện lucide-react

// Định nghĩa component OverviewError
export default function OverviewError({ error }: { error: Error }) {
    return (
        <Alert variant='destructive'> {/* Sử dụng component Alert với biến thể destructive */}
            <AlertCircle className='h-4 w-4' /> {/* Icon AlertCircle */}
            <AlertTitle>Error</AlertTitle> {/* Tiêu đề của Alert */}
            <AlertDescription>
                Failed to load statistics: {error.message} {/* Mô tả lỗi */}
            </AlertDescription>
        </Alert>
    );
}