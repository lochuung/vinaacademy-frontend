import { useState, useRef } from 'react';
import { Upload, Loader2, AlertTriangle } from 'lucide-react';

interface DropZoneProps {
    uploading: boolean;
    progress: number;
    fileError: string | null;
    onFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUploadVideo: (file: File) => void;
}

const DropZone: React.FC<DropZoneProps> = ({
    uploading,
    progress,
    fileError,
    onFileSelected,
    handleUploadVideo
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);
    
    const onUploadClick = () => {
        fileInputRef.current?.click();
    };
    
    // Drag and drop handlers
    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
    
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Only set dragging to false if we're leaving the drop zone itself
        if (e.target === dropZoneRef.current) {
            setIsDragging(false);
        }
    };
    
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            handleUploadVideo(file);
        }
    };
    
    return (
        <div>
            <div
                ref={dropZoneRef}
                className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 ${isDragging 
                    ? 'border-blue-400 bg-blue-50' 
                    : uploading 
                        ? 'border-yellow-300 bg-yellow-50' 
                        : fileError 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-gray-300 bg-gray-50'} 
                border-dashed rounded-lg transition-all cursor-pointer`}
                onClick={onUploadClick}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="space-y-2 text-center">
                    {uploading ? (
                        <div className="mx-auto h-12 w-12 text-yellow-500 flex items-center justify-center">
                            <Loader2 className="h-10 w-10 animate-spin" />
                        </div>
                    ) : fileError ? (
                        <div className="mx-auto h-12 w-12 text-red-500 flex items-center justify-center">
                            <AlertTriangle className="h-10 w-10" />
                        </div>
                    ) : isDragging ? (
                        <div className="mx-auto h-12 w-12 text-blue-500 flex items-center justify-center">
                            <Upload className="h-10 w-10" />
                        </div>
                    ) : (
                        <svg
                            className="mx-auto h-14 w-14 text-gray-400"
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
                    )}
                    
                    <div className="flex text-sm justify-center">
                        {uploading ? (
                            <p className="font-medium text-yellow-700">
                                Đang tải lên video...
                            </p>
                        ) : fileError ? (
                            <p className="font-medium text-red-700">
                                {fileError}
                            </p>
                        ) : isDragging ? (
                            <p className="font-medium text-blue-700">
                                Thả để tải lên
                            </p>
                        ) : (
                            <>
                                <label
                                    htmlFor="video-upload"
                                    className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-700"
                                >
                                    <span>Tải video lên</span>
                                    <input
                                        id="video-upload"
                                        name="video-upload"
                                        type="file"
                                        accept="video/mp4,video/quicktime,video/webm,video/x-msvideo"
                                        className="sr-only"
                                        onChange={onFileSelected}
                                        ref={fileInputRef}
                                    />
                                </label>
                                <p className="pl-1 text-gray-600">hoặc kéo thả file vào đây</p>
                            </>
                        )}
                    </div>
                    
                    {!uploading && !fileError && (
                        <p className="text-xs text-gray-500">
                            MP4, MOV, WEBM, AVI (tối đa 2GB)
                        </p>
                    )}
                    
                    {uploading && (
                        <div className="w-full mt-4 px-8">
                            <div className="text-xs text-gray-700 mb-1 flex justify-between font-medium">
                                <span>Đang tải lên video ({progress}%)</span>
                                <span>{(progress).toFixed(2)} / 100%  </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DropZone;
