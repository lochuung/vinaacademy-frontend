import { cancelUpload, ChunkUploadResult, getUploadStatus, initiateChunkUpload, InitiateUploadRequest, uploadChunk, UploadSessionDto } from "@/services/chunkUploadService";
import { useCallback, useRef, useState } from "react";


interface UseChunkUploadOptions {
    chunkSize?: number;
    onProgress?: (progress: number) => void;
    onComplete?: (session: UploadSessionDto) => void;
    onError?: (error: string) => void;
}

export const useChunkUpload = (options: UseChunkUploadOptions = {}) => {
    const {
        chunkSize = 1024 * 1024, // default 1MB
        onProgress,
        onComplete,
        onError
    } = options;

    const calculateFileHash = async (file: File): Promise<string> => {
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(bin => bin.toString(16).padStart(2, '0')).join('');
    };

    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentSession, setCurrentSession] = useState<UploadSessionDto | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Refs để tracking
    const abortControllerRef = useRef<AbortController | null>(null);
    const uploadingRef = useRef(false);

    const uploadFile = useCallback(async (file: File, lessonId?: string): Promise<void> => {
        if (uploadingRef.current) {
            setError("Đang có một quá trình tải lên đang diễn ra");
            return;
        }
        try {
            setIsUploading(true);
            setError(null);
            setProgress(0);
            uploadingRef.current = true;
            // 1. Create abort controller for cancellation
            abortControllerRef.current = new AbortController();
            // 2. Calculate file hash for resume capability
            const fileHash = await calculateFileHash(file);
            // 3. Initiate upload session
            const initiateRequest: InitiateUploadRequest = {
                filename: file.name,
                fileSize: file.size,
                fileHash,
                chunkSize,
                mimeType: file.type
            };

            const initateResult: ChunkUploadResult = await initiateChunkUpload(initiateRequest, abortControllerRef.current?.signal);
            if (!initateResult.success || !initateResult.data) {
                throw new Error(initateResult.error || 'Có lỗi xảy ra khi tạo phiên upload');
            }
            const session = initateResult.data;
            setCurrentSession(session);
            // 4. Upload chunks
            const totalChunks = Math.ceil(file.size / chunkSize);
            for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
                // 4.1 Check if upload was cancelled
                if (abortControllerRef.current?.signal.aborted) {
                    throw new Error("Phiên tải lên đã bị hủy");
                }

                // slice file
                const start = chunkNumber * chunkSize;
                const end = Math.min(start + chunkSize, file.size);
                const chunk = file.slice(start, end);
                // upload the chunk
                const chunkResult = await uploadChunk(chunk, {
                    sessionId: session.sessionId,
                    chunkNumber
                });

                if (!chunkResult.success) {
                    throw new Error(chunkResult.error || `Không thể upload chunk ${chunkNumber}`);
                }

                // 4.2 Update progress
                const progressPercent = (chunkNumber + 1) * 1.0 / totalChunks * 100;
                setProgress(progressPercent);
                onProgress?.(progressPercent);
                // 4.3 Update session data
                if (chunkResult.data) {
                    setCurrentSession(chunkResult.data);
                }
            }

            // 5. Get final status
            const statusResult = await getUploadStatus(session.sessionId);
            if (statusResult.success && statusResult.data) {
                setCurrentSession(statusResult.data);
                if (statusResult.data.status === 'COMPLETED') {
                    onComplete?.(statusResult.data);
                }
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Upload failed';
            setError(errorMessage);
            onError?.(errorMessage);
        } finally {
            setIsUploading(false);
            uploadingRef.current = false;
            abortControllerRef.current = null;
        }
    }, [chunkSize, onProgress, onComplete, onError]);

    const cancelCurrentUpload = useCallback(async () => {
        if (currentSession && isUploading) {
            abortControllerRef.current?.abort();

            const result = await cancelUpload(currentSession.sessionId);
            if (!result.success) {
                setError(result.error || 'Failed to cancel upload');
            }

            setIsUploading(false);
            uploadingRef.current = false;
            setCurrentSession(null);
            setProgress(0);
        }
    }, [currentSession, isUploading]);

    const resetUpload = useCallback(() => {
        setCurrentSession(null);
        setProgress(0);
        setError(null);
        setIsUploading(false);
        uploadingRef.current = false;
        abortControllerRef.current = null;
    }, []);

    return {
        uploadFile,
        cancelCurrentUpload,
        resetUpload,
        isUploading,
        progress,
        currentSession,
        error
    };
};
