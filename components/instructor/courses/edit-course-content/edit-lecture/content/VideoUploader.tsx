import {Video, Play} from 'lucide-react';
import {Lecture} from '@/types/lecture';

interface VideoUploaderProps {
    lecture: Lecture;
    setLecture: React.Dispatch<React.SetStateAction<Lecture>>;
    isUploading: boolean;
    uploadProgress: number;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function VideoUploader({
                                          lecture,
                                          setLecture,
                                          isUploading,
                                          uploadProgress,
                                          handleFileUpload
                                      }: VideoUploaderProps) {
    // Format seconds to MM:SS
    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload video
            </label>

            {lecture.videoUrl ? (
                <div className="mb-4">
                    <div className="bg-gray-100 p-4 rounded-md">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Video className="h-5 w-5 text-gray-400 mr-3"/>
                                <div>
                                    <span className="text-sm font-medium text-gray-900 block">Video đã tải lên</span>
                                    {lecture.duration && (
                                        <span
                                            className="text-xs text-gray-500">{formatDuration(lecture.duration)}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button
                                    type="button"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                    onClick={() => {
                                        // Giả lập xem trước
                                        window.alert("Xem trước video");
                                    }}
                                >
                                    <Play className="h-4 w-4 inline mr-1"/>
                                    Xem
                                </button>
                                <button
                                    type="button"
                                    className="text-sm font-medium text-black hover:text-gray-700"
                                >
                                    Thay thế
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                                    onChange={handleFileUpload}
                                />
                            </label>
                            <p className="pl-1">hoặc kéo thả vào đây</p>
                        </div>
                        <p className="text-xs text-gray-500">MP4, MOV tối đa 2GB</p>
                        {isUploading && (
                            <div className="w-full mt-2">
                                <div className="text-xs text-gray-500 mb-1 flex justify-between">
                                    <span>Đang tải lên ({uploadProgress}%)</span>
                                    <span>{Math.round(uploadProgress / 100 * 2000) / 1000} / 2 GB</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-black h-2.5 rounded-full transition-all"
                                        style={{width: `${uploadProgress}%`}}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}