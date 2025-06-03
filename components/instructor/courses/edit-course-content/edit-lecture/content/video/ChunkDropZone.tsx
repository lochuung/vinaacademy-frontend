import { useState, useRef, useCallback } from 'react';
import { Upload, Loader2, AlertTriangle, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useChunkUpload } from '@/hooks/upload/use-chunk-upload';
import { UploadSessionDto } from '@/services/chunkUploadService';

interface ChunkUploadDropZoneProps {
    accept?: string;
    maxSize?: number;
    lessonId?: string;
    onUploadComplete?: (session: UploadSessionDto) => void;
    onUploadError?: (error: string) => void;
    className?: string;
}

export const ChunkUploadDropZone: React.FC<ChunkUploadDropZoneProps> = ({
    accept = "video/mp4,video/quicktime,video/webm,video/x-msvideo",
    maxSize = 2 * 1024 * 1024 * 1024, // 2GB
    lessonId,
    onUploadComplete,
    onUploadError,
    className = ""
}) => {
    const [dragActive, setDragActive] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);


    const {
        uploadFile,
        cancelCurrentUpload,
        resetUpload,
        isUploading,
        progress,
        currentSession,
        error
    } = useChunkUpload({
        chunkSize: 5 * 1024 * 1024, // 5MB chunks
        onComplete: onUploadComplete,
        onError: onUploadError
    });

    const validateFile = useCallback((file: File): boolean => {
        setValidationError(null);

        if (file.size > maxSize) {
            setValidationError(`File size exceeds ${Math.round(maxSize / (1024 * 1024 * 1024))}GB limit`);
            return false;
        }

        if (accept) {
            const acceptedTypes = accept.split(',').map(type => type.trim());
            if (!acceptedTypes.includes(file.type)) {
                setValidationError('File type not supported');
                return false;
            }
        }

        return true;
    }, [maxSize, accept]);

    const handleFileSelect = useCallback(async (file: File) => {
        if (!validateFile(file)) {
            return;
        }

        await uploadFile(file, lessonId);
    }, [validateFile, uploadFile, lessonId]);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    }, [handleFileSelect]);

    const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
        // Reset input value
        e.target.value = '';
    }, [handleFileSelect]);


    const getStatusIcon = () => {
        if (error || validationError) return <AlertCircle className="h-8 w-8 text-red-500" />;
        if (currentSession?.status === 'COMPLETED') return <CheckCircle className="h-8 w-8 text-green-500" />;
        if (isUploading) return <Upload className="h-8 w-8 text-blue-500 animate-pulse" />;
        return <Upload className="h-8 w-8 text-gray-400" />;
    };

    const getStatusText = () => {
        if (error) return `Error: ${error}`;
        if (validationError) return `Validation Error: ${validationError}`;
        if (currentSession?.status === 'COMPLETED') return 'Upload completed successfully!';
        if (isUploading) return `Uploading... ${Math.round(progress)}%`;
        return 'Drop your file here or click to browse';
    };

    return (
        <div className={`relative ${className}`}>
            <div
                className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${isUploading ? 'pointer-events-none opacity-75' : 'cursor-pointer hover:bg-gray-50'}
          ${error || validationError ? 'border-red-300 bg-red-50' : ''}
          ${currentSession?.status === 'COMPLETED' ? 'border-green-300 bg-green-50' : ''}
        `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept={accept}
                    onChange={handleFileInputChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isUploading}
                />

                <div className="flex flex-col items-center space-y-4">
                    {getStatusIcon()}

                    <div className="text-sm text-gray-600">
                        {getStatusText()}
                    </div>

                    {isUploading && (
                        <div className="w-full max-w-xs">
                            <div className="bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>{Math.round(progress)}%</span>
                                {currentSession && (
                                    <span>{currentSession.uploadedChunks}/{currentSession.totalChunks} chunks</span>
                                )}
                            </div>
                        </div>
                    )}

                    {isUploading && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                cancelCurrentUpload();
                            }}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:text-red-800 transition-colors"
                        >
                            <X className="h-4 w-4" />
                            <span>Cancel Upload</span>
                        </button>
                    )}

                    {(error || validationError) && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                resetUpload();
                                setValidationError(null);
                            }}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            <Upload className="h-4 w-4" />
                            <span>Try Again</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChunkUploadDropZone;
