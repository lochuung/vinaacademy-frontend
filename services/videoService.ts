import { VideoDto, VideoStatus } from '@/types/video';
import apiClient from '@/lib/apiClient';
import { ApiResponse } from '@/types/api-response';
import { AxiosResponse } from 'axios';

export const getMasterPlaylistUrl = (videoId: string): string => {
    return `/api/videos/${videoId}/master.m3u8`;
}

/**
 * Gets the thumbnail URL for a video
 * @param videoId ID of the video
 * @returns URL to the video thumbnail
 */
export const getVideoThumbnailUrl = (videoId: string): string => {
    return `/api/videos/${videoId}/thumbnail`;
};

/**
 * Upload a video for a lesson
 * @param file Video file to upload
 * @param lessonId ID of the lesson the video belongs to
 * @param onProgress Optional callback for tracking upload progress
 * @returns Video metadata or null if upload fails
 */
export const uploadVideo = async (
    file: File, 
    lessonId: string, 
    onProgress?: (progress: number) => void
): Promise<VideoDto | null> => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const metadata = JSON.stringify({ lessonId });
        formData.append('metadata', new Blob([metadata], { type: 'application/json' }));
        
        const response: AxiosResponse<ApiResponse<VideoDto>> = await apiClient.post('/videos/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (onProgress && progressEvent.total) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(percentCompleted);
                }
            }
        });
        
        return response.data.data;
    } catch (error) {
        console.error("uploadVideo error:", error);
        return null;
    }
};