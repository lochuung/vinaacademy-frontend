'use client';

import apiClient from "@/lib/apiClient";
import { ApiResponse, PaginatedResponse } from "@/types/api-response";
import { CourseDetailsResponse, CourseDto, CourseRequest, CourseSearchRequest, CourseStatusCountDto, CourseStatusRequest } from "@/types/course";
import { CourseData, CourseLevel, CourseStatus } from "@/types/new-course";
import { AxiosResponse } from "axios";
import { UserDto } from "@/types/course";
import { uploadImage } from "./imageService";
import { CourseInstructorDto, CourseInstructorDtoRequest } from "@/types/instructor-course";

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

export async function searchCoursesDetail(
    search: CourseSearchRequest,
    page = 0,
    size = 10,
    sortBy = 'name',
    sortDirection: 'asc' | 'desc' = 'asc'
): Promise<PaginatedResponse<CourseDetailsResponse> | null> {
    try {
        const response: AxiosResponse = await apiClient.get('/courses/searchdetails', {
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
        console.error("searchCoursesDetail error:", error);
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

export const uploadImageAndCreateCourse = async (courseData: CourseData): Promise<CourseDto | null> => {
    // Upload image first
    if (!courseData.thumbnail) {
        //   toast({
        //     title: 'Lỗi',
        //     description: 'Vui lòng chọn hình ảnh thumbnail cho khóa học',
        //     variant: 'destructive',
        //   });
        return null;
    }

    const uploadedImage = await uploadImage(courseData.thumbnail);

    if (!uploadedImage) {

        return null;
    }
    // Prepare course request with the uploaded image
    const courseRequest: CourseRequest = {
        name: courseData.title,
        description: courseData.description,
        slug: courseData.slug || courseData.slug,
        price: courseData.price,
        level: courseData.level as CourseLevel,
        language: courseData.language,
        categoryId: Number(courseData.category), // Convert string to number if needed
        image: uploadedImage.id, // Use the image ID from the upload response
        status: CourseStatus.DRAFT, // Set initial status as DRAFT
    };

    // Create the course
    const createdCourse = await createCourse(courseRequest);

    if (!createdCourse) {

        return null;
    }

    return createdCourse;
}


/**
 * Lấy ID khóa học từ slug
 * @param slug Slug của khóa học
 * @returns ID của khóa học hoặc null nếu không tìm thấy
 */
export const getCourseIdBySlug = async (slug: string): Promise<string | null> => {
    try {
        const response = await apiClient.get(`/courses/id-by-slug/${slug}`);
        if (response.data && response.data.data && response.data.data.id) {
            return response.data.data.id;
        }
        return null;
    } catch (error) {
        console.error('Error getting course ID by slug:', error);
        return null;
    }
};

// Thêm vào courseService.ts

/**
 * Lấy danh sách khóa học của giảng viên đăng nhập
 * @param page Số trang (bắt đầu từ 0)
 * @param size Số lượng bản ghi mỗi trang
 * @param sortBy Trường để sắp xếp
 * @param sortDirection Hướng sắp xếp (asc/desc)
 * @returns Danh sách khóa học của giảng viên theo trang
 */
export async function getInstructorCourses(
    page = 0,
    size = 10,
    sortBy = 'createdDate',
    sortDirection: 'asc' | 'desc' = 'desc'
): Promise<PaginatedResponse<CourseDto> | null> {
    try {
        console.log(`Gửi request lấy khóa học của giảng viên với params:`, {
            page, size, sortBy, sortDirection
        });

        const response: AxiosResponse = await apiClient.get('/courses/instructor/courses', {
            params: {
                page,
                size,
                sortBy,
                sortDirection
            }
        });

        console.log('Kết quả từ API:', response.data);
        return response.data.data;
    } catch (error) {
        console.error("getInstructorCourses error:", error);
        return null;
    }
}

export async function createInstructorCourse(course: CourseInstructorDtoRequest): Promise<CourseInstructorDto | null> {
    try {
        const response: AxiosResponse = await apiClient.post('/courseinstructor', course);
        return response.data.data;
    } catch (error) {
        console.error("createCourseInstructor error:", error);
        return null;
    }
}

export async function getStatusCourse(): Promise<CourseStatusCountDto | null> {
    try {
        const response: AxiosResponse = await apiClient.get('/courses/statuscount');
        console.log("getCountStatus of course complete:", response.data.data);
        return response.data.data;
    } catch (error) {
        console.error("getCountStatus of course error:", error);
        return null;
    }
}

export async function updateStatusCourse(statusRequest: CourseStatusRequest): Promise<Boolean | null> {
    try {
        const response: AxiosResponse = await apiClient.put('/courses/statuschange', statusRequest);
        console.log("update course Status of course complete:", response.data.data);
        return response.data.data;
    } catch (error) {
        console.error("update course Status of course error:", error);
        return null;
    }
}

/**
 * Gửi khóa học đi duyệt (chuyển sang trạng thái PENDING)
 * @param courseId ID của khóa học
 * @returns true nếu thành công, false nếu thất bại
 */
export async function submitCourseForReview(courseId: string): Promise<boolean> {
    try {
        const response: AxiosResponse<ApiResponse<boolean>> = await apiClient.put(
            `/courses/submit-for-review/${courseId}`
        );
        return response.data.data;
    } catch (error) {
        console.error("Lỗi khi gửi khóa học đi duyệt:", error);
        return false;
    }
}