//cho trang quản lý học viên
'use client';

import apiClient from "@/lib/apiClient";
import { AxiosResponse } from "axios";
import { ApiResponse, PaginatedResponse } from "@/types/api-response";

// Interface cho StudentProgressDto từ backend
export interface StudentProgressDto {
    studentId: string;
    studentName: string;
    studentEmail: string;
    courseId: string;
    courseName: string;
    progress: number;
    status: 'IN_PROGRESS' | 'COMPLETED' | 'DROPPED';
}

/**
 * Lấy danh sách tiến độ học viên của tất cả khóa học mà instructor dạy
 * @param page Số trang (bắt đầu từ 0)
 * @param size Số lượng bản ghi mỗi trang
 * @param courseId ID khóa học (tuỳ chọn - nếu muốn lọc theo khóa học)
 * @param search Từ khoá tìm kiếm (tuỳ chọn)
 * @param status Trạng thái tiến độ học tập (tuỳ chọn)
 * @param sortBy Trường để sắp xếp (mặc định là startAt)
 * @param sortDirection Hướng sắp xếp (asc/desc)
 * @returns Danh sách tiến độ học viên theo trang
 */
export const getStudentsProgress = async (
    page: number = 0,
    size: number = 10,
    courseId?: string,
    search?: string,
    status?: 'IN_PROGRESS' | 'COMPLETED' | 'DROPPED',
    sortBy: string = 'startAt',
    sortDirection: 'asc' | 'desc' = 'desc'
): Promise<PaginatedResponse<StudentProgressDto> | null> => {
    try {
        console.log('Gửi request lấy tiến độ học viên với params:', {
            page, size, courseId, search, status, sortBy, sortDirection
        });

        // Xác định URL dựa vào việc có courseId hay không
        const url = courseId
            ? `/instructor/courses/${courseId}/students-progress`
            : '/instructor/courses/students-progress';

        const response: AxiosResponse = await apiClient.get(url, {
            params: {
                page,
                size,
                search,
                status,
                sortBy,
                sortDirection
            }
        });

        console.log('Kết quả từ API:', response.data);
        return response.data.data;
    } catch (error) {
        console.error("getStudentsProgress error:", error);
        return null;
    }
};

/**
 * Lấy danh sách tiến độ học viên cho một khóa học cụ thể
 * @param courseId ID của khóa học
 * @param page Số trang (bắt đầu từ 0)
 * @param size Số lượng bản ghi mỗi trang
 * @param search Từ khoá tìm kiếm (tuỳ chọn)
 * @param status Trạng thái tiến độ học tập (tuỳ chọn)
 * @param sortBy Trường để sắp xếp (mặc định là startAt)
 * @param sortDirection Hướng sắp xếp (asc/desc)
 * @returns Danh sách tiến độ học viên theo trang
 */
export const getStudentsProgressByCourse = async (
    courseId: string,
    page: number = 0,
    size: number = 10,
    search?: string,
    status?: 'IN_PROGRESS' | 'COMPLETED' | 'DROPPED',
    sortBy: string = 'startAt',
    sortDirection: 'asc' | 'desc' = 'desc'
): Promise<PaginatedResponse<StudentProgressDto> | null> => {
    return getStudentsProgress(page, size, courseId, search, status, sortBy, sortDirection);
};

/**
 * Hàm helper để chuyển đổi từ dạng enum ProgressStatus sang text hiển thị
 * @param status Trạng thái tiến độ học tập
 * @returns Text hiển thị tương ứng
 */
export const getStatusDisplayText = (status: 'IN_PROGRESS' | 'COMPLETED' | 'DROPPED'): string => {
    switch (status) {
        case 'COMPLETED':
            return 'Đã hoàn thành';
        case 'IN_PROGRESS':
            return 'Đang học';
        case 'DROPPED':
            return 'Đã dừng học';
        default:
            return 'Không xác định';
    }
};

/**
 * Hàm helper để chuyển đổi từ text hiển thị sang dạng enum ProgressStatus
 * @param displayText Text hiển thị
 * @returns Trạng thái tiến độ học tập tương ứng
 */
export const getStatusFromDisplayText = (displayText: string): 'IN_PROGRESS' | 'COMPLETED' | 'DROPPED' | undefined => {
    switch (displayText) {
        case 'Đã hoàn thành':
            return 'COMPLETED';
        case 'Đang học':
            return 'IN_PROGRESS';
        case 'Đã dừng học':
        case 'Chưa bắt đầu': // Mapping từ UI display text
            return 'DROPPED';
        default:
            return undefined;
    }
};