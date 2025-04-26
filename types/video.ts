export interface VideoDto {
    id: string;
    url: string;
    duration?: number;
    thumbnailUrl?: string;
    lessonId: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

export enum VideoStatus {
    NO_VIDEO = "NO_VIDEO",
    PROCESSING = "PROCESSING", 
    READY = "READY",
    FAILED = "FAILED"
}
