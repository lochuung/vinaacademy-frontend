import apiClient from "@/lib/apiClient";
import { ApiResponse, PaginatedResponse } from "@/types/api-response";
import { CourseDto } from "@/types/course";
import { AxiosResponse } from "axios";
import { InstructorInfoDto } from "@/types/instructor";

/**
 * Lấy thông tin giảng viên theo ID
 * @param instructorId ID của giảng viên
 * @returns Thông tin chi tiết của giảng viên hoặc null nếu không tìm thấy
 */
export const getInstructorById = async (instructorId: string): Promise<InstructorInfoDto | null> => {
    try {
        const response: AxiosResponse<ApiResponse<InstructorInfoDto>> = await apiClient.get(`/instructor/${instructorId}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching instructor with ID ${instructorId}:`, error);
        return null;
    }
};

// /**
//  * Kiểm tra một người dùng có phải là giảng viên hay không
//  * @param userId ID của người dùng cần kiểm tra
//  * @returns true nếu người dùng là giảng viên, false nếu không phải
//  */
// export const checkIfUserIsInstructor = async (userId: string): Promise<boolean> => {
//     try {
//         const response: AxiosResponse<ApiResponse<boolean>> = await apiClient.get(`/instructor/check/${userId}`);
//         return response.data.data;
//     } catch (error) {
//         console.error(`Error checking if user ${userId} is an instructor:`, error);
//         return false;
//     }
// };

/**
 * Lấy danh sách khóa học đã published của một giảng viên bất kỳ
 * @param instructorId ID của giảng viên
 * @param page Số trang (bắt đầu từ 0)
 * @param size Số lượng bản ghi mỗi trang
 * @param sortBy Trường để sắp xếp
 * @param sortDirection Hướng sắp xếp (asc/desc)
 * @returns Danh sách khóa học đã published của giảng viên theo trang
 */
export const getInstructorCourses = async (
    instructorId: string,
    page = 0,
    size = 10,
    sortBy = 'createdDate',
    sortDirection: 'asc' | 'desc' = 'desc'
): Promise<PaginatedResponse<CourseDto> | null> => {
    try {
        const response: AxiosResponse<ApiResponse<PaginatedResponse<CourseDto>>> = await apiClient.get(
            `/courses/instructor/${instructorId}/published`,
            {
                params: {
                    page,
                    size,
                    sortBy,
                    sortDirection
                }
            }
        );
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching published courses for instructor ${instructorId}:`, error);
        return null;
    }
};

/**
 * Lấy số lượng khóa học đã published của một giảng viên bất kỳ
 * @param instructorId ID của giảng viên
 * @returns Số lượng khóa học đã published của giảng viên
 */
export const countPublishedCoursesByInstructor = async (instructorId: string): Promise<number> => {
    try {
        const response: AxiosResponse<ApiResponse<number>> = await apiClient.get(
            `/courses/instructor/${instructorId}/published/count`
        );
        return response.data.data;
    } catch (error) {
        console.error(`Error counting published courses for instructor ${instructorId}:`, error);
        return 0;
    }
};

/**
 * Đăng ký trở thành giảng viên
 * @returns Thông tin của giảng viên mới đăng ký
 */
export const registerAsInstructor = async (): Promise<InstructorInfoDto | null> => {
    try {
        const response: AxiosResponse<ApiResponse<InstructorInfoDto>> = await apiClient.post('/instructor/register');
        return response.data.data;
    } catch (error) {
        console.error('Error registering as instructor:', error);
        throw error;
    }
};