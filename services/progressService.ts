'use client';

import apiClient from "@/lib/apiClient";
import { AxiosResponse } from "axios";

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