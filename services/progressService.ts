'use client';

import apiClient from "@/lib/apiClient";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/types/api-response";
import { LessonProgressDto } from "@/types/lesson";

/**
 * Lấy tiến độ học tập cho một khóa học
 * @param courseId ID của khóa học
 * @returns Thông tin về tiến độ học tập
 */
export const getCourseProgress = async (courseId: string) => {
    try {
        const response: AxiosResponse = await apiClient.get(`/courses/${courseId}/progress`);
        return response.data.data;
    } catch (error) {
        console.error("getCourseProgress error:", error);
        return null;
    }
};

/**
 * Cập nhật tiến độ hoàn thành của một bài học
 * @param lessonId ID của bài học
 * @param completed Trạng thái hoàn thành
 * @returns true nếu cập nhật thành công
 */
export const updateLessonProgress = async (lessonId: string, completed: boolean): Promise<boolean> => {
    try {
        const response: AxiosResponse = await apiClient.post(
            `/lessons/${lessonId}/progress`,
            { completed }
        );
        return response.data.success;
    } catch (error) {
        console.error("updateLessonProgress error:", error);
        return false;
    }
};

/**
 * Đánh dấu hoàn thành một khóa học
 * @param enrollmentId ID của đăng ký khóa học
 * @returns true nếu cập nhật thành công
 */
export const markCourseAsCompleted = async (enrollmentId: number): Promise<boolean> => {
    try {
        const response: AxiosResponse = await apiClient.patch(
            `/enrollments/${enrollmentId}/status?status=COMPLETED`
        );
        return !!response.data.data;
    } catch (error) {
        console.error("markCourseAsCompleted error:", error);
        return false;
    }
};

/**
 * Lấy danh sách tiến độ của tất cả bài học trong một khóa học
 * @param courseId ID của khóa học
 * @returns Danh sách tiến độ của các bài học
 */
export const getAllLessonProgressByCourse = async (courseId: string): Promise<LessonProgressDto[]> => {
    try {
        const response: AxiosResponse<ApiResponse<LessonProgressDto[]>> = await apiClient.get(
            `/lesson-progress/${courseId}`
        );
        return response.data.data;
    } catch (error) {
        console.error("getAllLessonProgressByCourse error:", error);
        return [];
    }
};