export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
    timestamp: string;
}

export type BaseDto = {
    createdDate: string; // ISO datetime string
    updatedDate: string; // ISO datetime string
    createdBy?: string;
    lastModifiedBy?: string;
};

export interface PaginatedResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number; // current page
    first: boolean;
    last: boolean;
}
