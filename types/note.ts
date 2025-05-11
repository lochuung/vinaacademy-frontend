export interface Note {
    id: string;
    noteText: string;
    timeStampSeconds: number; // Video timestamp in seconds
    createdDate: Date;
    updatedDate: Date;
    videoId: string;
}
