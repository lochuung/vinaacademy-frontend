export enum EnrollmentProgressStatus {
    IN_PROGRESS, COMPLETED, DROPPED
}

export interface EnrollmentProgressDto {
    id?: number;
    progressPercentage: number; // 0-100
    status: EnrollmentProgressStatus;
}

export interface LessonProgress {
    completed: boolean;
    lastWatchedTime?: number | null;
}
