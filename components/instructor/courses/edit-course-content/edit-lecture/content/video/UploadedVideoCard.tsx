import { Video, Play, RefreshCw, AlertTriangle } from 'lucide-react';
import { Lecture } from '@/types/lecture';
import { VideoStatus } from '@/types/video';
import StatusBadge from './StatusBadge';

interface UploadedVideoCardProps {
    lecture: Lecture;
    processingStatus: VideoStatus | null;
    canPlayVideo: boolean;
    onPreviewClick: () => void;
    onReplaceClick: () => void;
    uploading: boolean;
}

// Format seconds to MM:SS
const formatDuration = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00';
    
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const UploadedVideoCard: React.FC<UploadedVideoCardProps> = ({
    lecture,
    processingStatus,
    canPlayVideo,
    onPreviewClick,
    onReplaceClick,
    uploading
}) => {
    const isErrorState = processingStatus === null && lecture.status === VideoStatus.ERROR 
    || processingStatus === VideoStatus.ERROR;
    
    return (
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 transition-all hover:border-gray-300">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-100">
                        <Video className="h-7 w-7 text-blue-600" />
                    </div>
                    
                    <div>
                        <span className="text-sm font-medium text-gray-900 block mb-1">Video đã tải lên</span>
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                                Thời lượng: {Number(lecture.duration) > 0
                                    ? formatDuration(Number(lecture.duration))
                                    : 'Đang xác định...'}
                            </span>
                            <StatusBadge status={processingStatus} />
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 ml-auto">
                    {canPlayVideo && (
                        <button
                            type="button"
                            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded transition flex items-center gap-1.5"
                            onClick={onPreviewClick}
                        >
                            <Play className="h-4 w-4" />
                            Xem trước
                        </button>
                    )}
                    <button
                        type="button"
                        className="text-sm font-medium text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-300 px-3 py-1.5 rounded transition flex items-center gap-1.5"
                        onClick={onReplaceClick}
                        disabled={uploading}
                    >
                        <RefreshCw className={`h-4 w-4 ${uploading ? 'animate-spin' : ''}`} />
                        {uploading ? 'Đang tải lên...' : 'Thay thế video'}
                    </button>
                </div>
            </div>
            
            {isErrorState && (
                <div className="mt-4 text-sm bg-red-50 text-red-700 p-3 rounded-md border border-red-200">
                    <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium">
                                {processingStatus === VideoStatus.ERROR 
                                    ? 'Lỗi xử lý video' 
                                    : 'Xử lý video thất bại'}
                            </p>
                            <p className="mt-1">
                                {processingStatus === VideoStatus.ERROR 
                                    ? 'Có lỗi xảy ra khi xử lý video. Vui lòng kiểm tra định dạng video và thử lại.' 
                                    : 'Có thể do định dạng video không được hỗ trợ hoặc file bị lỗi. Vui lòng thử tải lên một file khác.'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadedVideoCard;
