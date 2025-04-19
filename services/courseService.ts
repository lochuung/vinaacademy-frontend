'use client';

import apiClient from "@/lib/apiClient";
import { ApiResponse, PaginatedResponse } from "@/types/api-response";
import { CourseDetailsResponse, CourseDto, CourseRequest, CourseSearchRequest } from "@/types/course";
import { AxiosResponse } from "axios";
import { UserDto } from "@/types/course";

// 📌 GET /courses/pagination
export async function getCoursesPaginated(
    page = 0,
    size = 5,
    sortBy = 'name',
    sortDirection: 'asc' | 'desc' = 'asc',
    categorySlug?: string,
    minRating = 0
): Promise<PaginatedResponse<CourseDto> | null> {
    try {
        const response: AxiosResponse = await apiClient.get('/courses/pagination', {
            params: {
                page,
                size,
                sortBy,
                sortDirection,
                categorySlug,
                minRating
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("getCoursesPaginated error:", error);
        return null;
    }
}

// 🔍 GET /courses/{slug} - Get course by slug
export async function getCourseBySlug(slug: string): Promise<CourseDetailsResponse | null> {
    try {
        const response: AxiosResponse = await apiClient.get(`/courses/${slug}`);
        return response.data.data;
    } catch (error) {
        console.error(`getCourseBySlug error for slug ${slug}:`, error);
        return null;
    }
}

export async function existCourseBySlug(slug: string): Promise<Boolean> {
    try {
        const response: AxiosResponse = await apiClient.get(`/courses/check/${slug}`);
        if (response.status === 200) {
            console.log(`Course with slug ${slug} data=` + response.data.data);
            return response.data.data;
        }
    } catch (error) {
        console.error(`getCourseBySlug error for slug ${slug}:`, error);
        return false;
    } finally {
    }
    return false;
}

// 🔍 GET /courses/search
export async function searchCourses(
    search: CourseSearchRequest,
    page = 0,
    size = 10,
    sortBy = 'name',
    sortDirection: 'asc' | 'desc' = 'asc'
): Promise<PaginatedResponse<CourseDto> | null> {
    try {
        const response: AxiosResponse = await apiClient.get('/courses/search', {
            params: {
                ...search,
                page,
                size,
                sortBy,
                sortDirection
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("searchCourses error:", error);
        return null;
    }
}

// ➕ POST /courses
export async function createCourse(course: CourseRequest): Promise<CourseDto | null> {
    try {
        const response: AxiosResponse = await apiClient.post('/courses', course);
        return response.data.data;
    } catch (error) {
        console.error("createCourse error:", error);
        return null;
    }
}

// 📝 PUT /courses/crud/{slug}
export async function updateCourse(slug: string, course: CourseRequest): Promise<CourseDto | null> {
    try {
        const response: AxiosResponse = await apiClient.put(`/courses/crud/${slug}`, course);
        return response.data.data;
    } catch (error) {
        console.error("updateCourse error:", error);
        return null;
    }
}

// ❌ DELETE /courses/crud/{slug}
export async function deleteCourse(slug: string): Promise<boolean> {
    try {
        await apiClient.delete(`/courses/crud/${slug}`);
        return true;
    } catch (error) {
        console.error("deleteCourse error:", error);
        return false;
    }
}


export const getCourseLearning = async (slug: string): Promise<CourseDto | null> => {
    try {
        const response: AxiosResponse<ApiResponse<CourseDto>> = await apiClient.get(
            `/courses/${slug}/learning`
        );
        return response.data.data;
    } catch (error) {
        console.error("getCourseLearning error:", error);
        return null;
    }
}

/**
 * Lấy thông tin về khóa học bằng ID
 * @param id ID của khóa học
 * @returns Thông tin chi tiết của khóa học
 */
export const getCourseById = async (id: string): Promise<CourseDto | null> => {
    try {
        const response: AxiosResponse = await apiClient.get(`/courses/id/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching course by ID ${id}:`, error);
        return null;
    }
};

/**
 * Lấy slug của khóa học từ ID khóa học
 * @param id ID của khóa học cần lấy slug
 * @returns Slug của khóa học
 */
export const getCourseSlugById = async (id: string): Promise<string | null> => {
    try {
        const response: AxiosResponse = await apiClient.get(`/courses/slug/${id}`);
        return response.data.data.slug;
    } catch (error) {
        console.error(`Error fetching course slug for ID ${id}:`, error);
        return null;
    }
};

/**
 * Giao diện mở rộng từ CourseDto để bao gồm thông tin instructor
 * Sử dụng cho các tính năng cần thông tin instructor mà không muốn lấy toàn bộ CourseDetailsResponse
 */
export interface CourseWithInstructorDto extends CourseDto {
    instructorName?: string;
    instructorId?: string;
    instructorAvatar?: string;
}

/**
 * Lấy thông tin khóa học kèm thông tin giảng viên
 * @param courseId ID của khóa học
 * @returns Thông tin khóa học kèm theo thông tin giảng viên
 */
export const getCourseWithInstructor = async (courseId: string): Promise<CourseWithInstructorDto | null> => {
    try {
        // Trước tiên, lấy thông tin cơ bản của khóa học
        const courseBasicInfo = await getCourseById(courseId);
        if (!courseBasicInfo) {
            return null;
        }

        // Sau đó, lấy thông tin chi tiết (có instructor) bằng slug
        // Điều này hiệu quả hơn vì chúng ta đã biết slug từ thông tin cơ bản
        const courseDetailInfo = await getCourseBySlug(courseBasicInfo.slug);

        if (courseDetailInfo) {
            // Kết hợp thông tin từ cả hai nguồn
            return {
                ...courseBasicInfo,
                instructorName: courseDetailInfo.ownerInstructor?.fullName,
                instructorId: courseDetailInfo.ownerInstructor?.id,
                instructorAvatar: courseDetailInfo.ownerInstructor?.avatarUrl
            };
        }

        // Nếu không lấy được thông tin chi tiết, thử gọi API riêng
        const response: AxiosResponse<ApiResponse<UserDto[]>> = await apiClient.get(`/courses/${courseId}/instructors`);
        const instructors = response.data.data;

        if (instructors && instructors.length > 0) {
            return {
                ...courseBasicInfo,
                instructorName: instructors[0].fullName,
                instructorId: instructors[0].id,
                instructorAvatar: instructors[0].avatarUrl
            };
        }

        // Nếu không có thông tin instructor, trả về thông tin cơ bản
        return courseBasicInfo;
    } catch (error) {
        console.error(`Error fetching course with instructor for ID ${courseId}:`, error);
        return null;
    }
};

/**
 * Lấy danh sách giảng viên của một khóa học
 * @param courseId ID của khóa học
 * @returns Danh sách các giảng viên của khóa học
 */
export const getCourseInstructors = async (courseId: string): Promise<UserDto[] | null> => {
    try {
        const response: AxiosResponse<ApiResponse<UserDto[]>> = await apiClient.get(`/courses/${courseId}/instructors`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching instructors for course ID ${courseId}:`, error);
        return null;
    }
};