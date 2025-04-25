import apiClient from "@/lib/apiClient";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/types/api-response";
import { CourseType } from "@/types/instructor-course";

/**
 * Lấy thông tin giảng viên theo ID
 * @param instructorId ID của giảng viên
 */
export const getInstructorById = async (instructorId: string): Promise<any | null> => {
    try {
        const response: AxiosResponse<ApiResponse<any>> = await apiClient.get(`/instructors/${instructorId}`);
        return response.data.data;
    } catch (error) {
        console.error("getInstructorById error:", error);
        return null;
    }
};

/**
 * Lấy danh sách khóa học của giảng viên theo ID
 * @param instructorId ID của giảng viên
 */
export const getInstructorCourses = async (instructorId: string): Promise<CourseType[] | null> => {
    try {
        const response: AxiosResponse<ApiResponse<CourseType[]>> = await apiClient.get(`/instructors/${instructorId}/courses`);
        return response.data.data;
    } catch (error) {
        console.error("getInstructorCourses error:", error);
        return null;
    }
};