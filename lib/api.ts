import { apiClient } from "./axiosClient";

// Lấy danh sách khóa học
export const fetchCourses = async () => {
    try {
        const response = await apiClient.get("/courses");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
        throw error;
    }
};

// Lấy thông tin khóa học theo slug
export const fetchCourseBySlug = async (slug: string) => {
    try {
        const response = await apiClient.get(`/courses/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin khóa học:", error);
        throw error;
    }
};
