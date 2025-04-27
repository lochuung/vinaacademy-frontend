import { useState, useRef } from 'react';
import { Video, AlertTriangle } from 'lucide-react';
import { Lecture } from '@/types/lecture';
import { uploadVideo } from '@/services/videoService';
import { VideoStatus } from '@/types/video';
import { useQueryClient } from '@tanstack/react-query';
import { getLessonById } from '@/services/lessonService';
import { createErrorToast, createSuccessToast } from '@/components/ui/toast-cus';
import DropZone from './video/DropZone';
import VideoPreviewModal from './video/VideoPreviewModal';
import UploadedVideoCard from './video/UploadedVideoCard';
interface VideoUploaderProps {
    lecture: Lecture;
    setLecture: React.Dispatch<React.SetStateAction<Lecture>>;
}

export default function VideoUploader({
    lecture,
    setLecture
}: VideoUploaderProps) {
    const [showVideoPreview, setShowVideoPreview] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [processingStatus, setProcessingStatus] = useState<VideoStatus | null>(lecture.status || null);
    const [fileError, setFileError] = useState<string | null>(null);
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsVideoRef = useRef<HTMLVideoElement>(null) as React.MutableRefObject<HTMLVideoElement>;
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Get TanStack Query client to invalidate the cache
    const queryClient = useQueryClient();

    // Validate file before upload
    const validateFile = (file: File): boolean => {
        const maxSize = 2 * 1024 * 1024 * 1024; // 2GB
        const acceptedTypes = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo'];
        
        if (file.size > maxSize) {
            setFileError('Kích thước file quá lớn (tối đa 2GB)');
            return false;
        }
        
        if (!acceptedTypes.includes(file.type)) {
            setFileError('Định dạng file không được hỗ trợ. Vui lòng sử dụng MP4, MOV, WEBM hoặc AVI.');
            return false;
        }
        
        setFileError(null);
        return true;
    };

    // Handle video upload with API integration and progress tracking
    const handleUploadVideo = async (file: File) => {
        if (!file || !lecture.id || !validateFile(file)) {
            return;
        }
        
        setUploading(true);
        setProgress(0);
        setProcessingStatus(VideoStatus.PROCESSING);

        try {
            // Upload the video with progress tracking
            const videoData = await uploadVideo(file, lecture.id, (progressPercent) => {
                setProgress(progressPercent);
            });

            if (videoData) {
                // Update video ID and status
                setProcessingStatus(videoData.status as VideoStatus);

                // Update lecture with new video information
                setLecture({
                    ...lecture,
                    duration: videoData.duration ? String(videoData.duration) : lecture.duration,
                    status: videoData.status as VideoStatus
                });

                let interval = 2000; // start with 2s
                const maxInterval = 30000; // 30s max
                let timeoutId: NodeJS.Timeout;

                const videoProcessTracking = () => {
                    getLessonById(lecture.id)
                        .then((lesson) => {
                            if (lesson) {
                                setProcessingStatus(lesson.status as VideoStatus);
                                
                                if (lesson.status === VideoStatus.READY) {
                                    clearTimeout(timeoutId);
                                    queryClient.invalidateQueries({ queryKey: ['lesson', lecture.id] });
                                    createSuccessToast("Video đã xử lý thành công và sẵn sàng phát");
                                    return;
                                } else if (lesson.status === VideoStatus.ERROR) {
                                    clearTimeout(timeoutId);
                                    createErrorToast(
                                        lesson.status === VideoStatus.ERROR 
                                            ? 'Có lỗi xảy ra khi xử lý video. Vui lòng kiểm tra định dạng video và thử lại.'
                                            : 'Xử lý video thất bại. Vui lòng thử lại với file khác.'
                                    );
                                    return;
                                }
                                
                                interval = Math.min(interval * 2, maxInterval); // exponential increase
                                timeoutId = setTimeout(videoProcessTracking, interval);
                            }
                        });
                };

                timeoutId = setTimeout(videoProcessTracking, interval);
                createSuccessToast("Video đã được tải lên thành công và đang xử lý");
            } else {
                throw new Error('Không thể tải lên video');
            }
        } catch (error) {
            console.error('Error uploading video:', error);
            setProcessingStatus(VideoStatus.ERROR);
            createErrorToast('Lỗi khi tải lên video. Vui lòng thử lại.');
        } finally {
            setUploading(false);
        }
    };

    // Handler for file input change
    const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleUploadVideo(file);
        }
    };

    // Determine if video can be played
    const canPlayVideo = Number(lecture.duration) > 0 && lecture.status === VideoStatus.READY;

    return (
        <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Video className="h-4 w-4" /> Video bài giảng
            </label>

            {lecture.status !== VideoStatus.NO_VIDEO ? (
                <div className="mb-4">
                    <UploadedVideoCard 
                        lecture={lecture}
                        processingStatus={processingStatus}
                        canPlayVideo={canPlayVideo}
                        onPreviewClick={() => setShowVideoPreview(true)}
                        onReplaceClick={() => fileInputRef.current?.click()}
                        uploading={uploading}
                    />

                    {/* Hidden file input for uploading */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/mp4,video/quicktime,video/webm,video/x-msvideo"
                        className="hidden"
                        onChange={onFileSelected}
                    />

                    {/* Video preview modal */}
                    {showVideoPreview && (
                        <VideoPreviewModal
                            videoRef={videoRef}
                            hlsVideoRef={hlsVideoRef}
                            lectureId={lecture.id || ''}
                            lectureTitle={lecture.title}
                            duration={Number(lecture.duration)}
                            onClose={() => setShowVideoPreview(false)}
                        />
                    )}
                </div>
            ) : (
                <DropZone
                    uploading={uploading}
                    progress={progress}
                    fileError={fileError}
                    onFileSelected={onFileSelected}
                    handleUploadVideo={handleUploadVideo}
                />
            )}

            {lecture.type === 'video' && lecture.status === VideoStatus.NO_VIDEO && (
                <div className="mt-3 text-sm flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-amber-700">
                        <span className="font-medium">Lưu ý:</span> Bạn cần tải lên video để hoàn tất bài giảng.
                    </p>
                </div>
            )}
        </div>
    );
}