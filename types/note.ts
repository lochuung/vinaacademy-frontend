export interface Note {
    id: string;
    content: string;
    timestamp: number; // Video timestamp in seconds
    createdAt: Date;
    updatedAt: Date;
    lectureId: string;
}