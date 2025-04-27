import { Loader2, AlertTriangle, CheckCircle, AlertOctagon } from 'lucide-react';
import { VideoStatus } from '@/types/video';

interface StatusBadgeProps {
    status: VideoStatus | null;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    switch (status) {
        case VideoStatus.PROCESSING:
            return (
                <div className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 border border-yellow-200">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Đang xử lý video...
                </div>
            );
        case VideoStatus.ERROR:
            return (
                <div className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 border border-red-200">
                    <AlertOctagon className="h-3 w-3" />
                    Lỗi xử lý video
                </div>
            );
        case VideoStatus.READY:
            return (
                <div className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 border border-green-200">
                    <CheckCircle className="h-3 w-3" />
                    Sẵn sàng phát
                </div>
            );
        default:
            return null;
    }
};

export default StatusBadge;
