import { useState, useRef, useEffect } from 'react';
import { Video, Play, Upload, X, Loader2, AlertTriangle, Eye } from 'lucide-react';
import { Lecture } from '@/types/lecture';
import { uploadVideo, getMasterPlaylistUrl } from '@/services/videoService';
import { VideoStatus } from '@/types/video';
import { toast } from 'react-toastify';
import { useHLS } from '@/hooks/video/useHLS';
import { getLessonById } from '@/services/lessonService';
import { useQueryClient } from '@tanstack/react-query';
import { createErrorToast, createSuccessToast } from '@/components/ui/toast-cus';

interface VideoUploaderProps {
    lecture: Lecture;
    setLecture: React.Dispatch<React.SetStateAction<Lecture>>;
}

// HLS Video Preview component
interface HLSVideoPreviewProps {
    videoRef: React.MutableRefObject<HTMLVideoElement>;
    lectureId: string;
}

const HLSVideoPreview: React.FC<HLSVideoPreviewProps> = ({ videoRef, lectureId }) => {
    // Use HLS hook to handle streaming
    const { isLoading, error } = useHLS(lectureId, videoRef);

    return (
        <div className="relative w-full aspect-video">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <Loader2 className="h-8 w-8 text-white animate-spin" />
                </div>
            )}

            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white p-4">
                    <AlertTriangle className="h-8 w-8 text-red-500 mb-2" />
                    <p className="text-center">{error}</p>
                </div>
            )}

            <video
                ref={videoRef}
                className="w-full h-full"
                controls
                autoPlay
                playsInline
            ></video>
        </div>
    );
};


export default function VideoUploader({
    lecture,
    setLecture
}: VideoUploaderProps) {
    const [showVideoPreview, setShowVideoPreview] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [processingStatus, setProcessingStatus] = useState<VideoStatus | null>(lecture.status || null);
    const [videoId, setVideoId] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    // For HLS video preview when lecture.duration > 0
    const hlsVideoRef = useRef<HTMLVideoElement>(null) as React.MutableRefObject<HTMLVideoElement>;
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Get TanStack Query client to invalidate the cache
    const queryClient = useQueryClient();

    // Format seconds to MM:SS
    const formatDuration = (seconds: number): string => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle video upload with API integration and progress tracking
    const handleUploadVideo = async (file: File) => {
        if (!file || !lecture.id) return;

        setUploading(true);
        setProgress(0);

        try {
            // Upload the video with progress tracking
            const videoData = await uploadVideo(file, lecture.id, (progressPercent) => {
                setProgress(progressPercent);
            });

            if (videoData) {
                // Update video ID
                setVideoId(videoData.id);
                setProcessingStatus(videoData.status as VideoStatus);

                // Update lecture with new video information
                setLecture({
                    ...lecture,
                    duration: videoData.duration ? String(videoData.duration) : lecture.duration,
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
                                    // Fix: Use the proper invalidation format for TanStack Query
                                    queryClient.invalidateQueries({ queryKey: ['lesson', lecture.id] });
                                    return;
                                }
                                interval = Math.min(interval * 2, maxInterval); // exponential increase
                                timeoutId = setTimeout(videoProcessTracking, interval);
                            }
                        });
                };

                timeoutId = setTimeout(videoProcessTracking, interval);

                createSuccessToast("Video đã được tải lên thành công và đang xử lý")
            } else {
                throw new Error('Không thể tải lên video');
            }
        } catch (error) {
            console.error('Error uploading video:', error);
            createErrorToast('Lỗi khi tải lên video. Vui lòng thử lại.');
        } finally {
            setUploading(false);
        }
    };

    const onUploadClick = () => {
        fileInputRef.current?.click();
    };

    const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleUploadVideo(file);
        }
    };

    // Render status badge based on processing status
    const renderStatusBadge = () => {
        switch (processingStatus) {
            case VideoStatus.PROCESSING:
                return (
                    <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded flex items-center">
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Đang xử lý video...
                    </div>
                );
            case VideoStatus.FAILED:
                return (
                    <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Xử lý video thất bại
                    </div>
                );
            case VideoStatus.READY:
                return (
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded flex items-center">
                        <span className="h-2 w-2 bg-green-500 rounded-full inline-block mr-1"></span>
                        Sẵn sàng
                    </div>
                );
            default:
                return null;
        }
    };

    // Determine if video can be played
    const canPlayVideo = Number(lecture.duration) > 0 && lecture.status === VideoStatus.READY;

    return (
        <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload video
            </label>

            {lecture.status !== VideoStatus.NO_VIDEO ? (
                <div className="mb-4">
                    <div className="bg-gray-100 p-4 rounded-md">
                        <div className="flex items-center justify-between flex-wrap">
                            <div className="flex items-center">
                                <Video className="h-5 w-5 text-gray-400 mr-3" />
                                <div>
                                    <span className="text-sm font-medium text-gray-900 block">Video đã tải lên</span>
                                    <span className="text-xs text-gray-500">
                                        {Number(lecture.duration) > 0
                                            ? formatDuration(Number(lecture.duration))
                                            : 'Đang xác định thời lượng...'}
                                    </span>
                                </div>

                                <div className="ml-3">
                                    {renderStatusBadge()}
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 mt-2 sm:mt-0">
                                {canPlayVideo && (
                                    <button
                                        type="button"
                                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                        onClick={() => setShowVideoPreview(true)}
                                    >
                                        <Play className="h-4 w-4 inline mr-1" />
                                        Xem trước
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="text-sm font-medium text-black hover:text-gray-700"
                                    onClick={onUploadClick}
                                >
                                    Thay thế
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="video/*"
                                    className="hidden"
                                    onChange={onFileSelected}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Video preview modal */}
                    {showVideoPreview && (
                        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                            <div className="relative bg-black w-full max-w-4xl mx-4 rounded-lg overflow-hidden">
                                <button
                                    type="button"
                                    className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 z-10"
                                    onClick={() => {
                                        setShowVideoPreview(false);
                                        if (videoRef.current) {
                                            videoRef.current.pause();
                                        }
                                        if (hlsVideoRef.current) {
                                            hlsVideoRef.current.pause();
                                        }
                                    }}
                                >
                                    <X className="h-6 w-6" />
                                </button>
                                {Number(lecture.duration) > 0 ? (
                                    // Use HLS streaming for better video preview when video has duration
                                    <HLSVideoPreview
                                        videoRef={hlsVideoRef}
                                        lectureId={lecture.id || ''}
                                    />
                                ) : (
                                    // Fallback to direct video URL when no duration available
                                    <video
                                        ref={videoRef}
                                        className="w-full"
                                        controls
                                        autoPlay
                                    ></video>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="flex text-sm text-gray-600 justify-center">
                            <label
                                htmlFor="video-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none"
                            >
                                <span>Tải video lên</span>
                                <input
                                    id="video-upload"
                                    name="video-upload"
                                    type="file"
                                    accept="video/*"
                                    className="sr-only"
                                    onChange={onFileSelected}
                                />
                            </label>
                            <p className="pl-1">hoặc kéo thả vào đây</p>
                        </div>
                        <p className="text-xs text-gray-500">MP4, MOV tối đa 2GB</p>
                        {(uploading) && (
                            <div className="w-full mt-2">
                                <div className="text-xs text-gray-500 mb-1 flex justify-between">
                                    <span>Đang tải lên ({progress}%)</span>
                                    <span>{Math.round(progress / 100 * 2000) / 1000} / 2 GB</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-black h-2.5 rounded-full transition-all"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {lecture.type === 'video' && Number(lecture.duration) === 0 && lecture.status === VideoStatus.NO_VIDEO && (
                <div className="mt-3 text-sm text-red-500">
                    <span className="font-medium">Lưu ý:</span> Bạn cần tải lên video để hoàn tất bài giảng.
                </div>
            )}
        </div>
    );
}