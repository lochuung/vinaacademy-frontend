'use client';

import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/api-response";
import { AxiosResponse } from "axios";
import { SectionDto } from "@/types/section";

/**
 * Lấy tất cả các phần học của một khóa học
 * @param courseId ID của khóa học
 * @returns Danh sách các phần học
 */
export const getSectionsByCourse = async (courseId: string): Promise<SectionDto[]> => {
    try {
        const response: AxiosResponse<ApiResponse<SectionDto[]>> = await apiClient.get(
            `/sections/course/${courseId}`
        );
        // Sắp xếp lại theo thứ tự orderIndex để đảm bảo hiển thị đúng
        const sections = response.data.data;
        return sections.sort((a, b) => a.orderIndex - b.orderIndex);
    } catch (error) {
        console.error("getSectionsByCourse error:", error);
        return [];
    }
};

/**
 * Lấy phần học theo ID
 * @param id ID của phần học
 * @returns Thông tin về phần học
 */
export const getSectionById = async (id: string): Promise<SectionDto | null> => {
    try {
        const response: AxiosResponse<ApiResponse<SectionDto>> = await apiClient.get(
            `/sections/${id}`
        );
        return response.data.data;
    } catch (error) {
        console.error("getSectionById error:", error);
        return null;
    }
};

/**
 * Tạo phần học mới
 * @param sectionData Dữ liệu phần học mới
 * @returns Phần học đã tạo
 */
export const createSection = async (sectionData: {
    title: string,
    courseId: string,
    orderIndex?: number // Giữ là optional vì backend sẽ bỏ qua
}): Promise<SectionDto | null> => {
    try {
        const response: AxiosResponse<ApiResponse<SectionDto>> = await apiClient.post(
            '/sections',
            sectionData
        );
        return response.data.data;
    } catch (error) {
        console.error("createSection error:", error);
        return null;
    }
};

/**
 * Cập nhật phần học
 * @param id ID của phần học
 * @param sectionData Dữ liệu cập nhật
 * @returns Phần học đã cập nhật
 */
export const updateSection = async (
    id: string,
    sectionData: {
        title: string,
        courseId: string,
        orderIndex: number
    }
): Promise<SectionDto | null> => {
    try {
        const response: AxiosResponse<ApiResponse<SectionDto>> = await apiClient.put(
            `/sections/${id}`,
            sectionData
        );
        return response.data.data;
    } catch (error) {
        console.error("updateSection error:", error);
        return null;
    }
};

/**
 * Xóa phần học
 * @param id ID của phần học cần xóa
 * @returns true nếu xóa thành công
 */
export const deleteSection = async (id: string): Promise<boolean> => {
    try {
        await apiClient.delete(`/sections/${id}`);
        // Sau khi xóa thành công, có thể cần cập nhật lại thứ tự của các sections còn lại
        return true;
    } catch (error) {
        console.error("deleteSection error:", error);
        return false;
    }
};

/**
 * Sắp xếp lại thứ tự các phần học
 * @param courseId ID của khóa học
 * @param sectionIds Danh sách ID các phần học theo thứ tự mới
 * @returns true nếu cập nhật thành công
 */
export const reorderSections = async (courseId: string, sectionIds: string[]): Promise<boolean> => {
    try {
        await apiClient.put(`/sections/reorder/${courseId}`, sectionIds);
        return true;
    } catch (error) {
        console.error("reorderSections error:", error);
        return false;
    }
};